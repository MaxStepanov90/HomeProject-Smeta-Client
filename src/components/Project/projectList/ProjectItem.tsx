import React, {Fragment} from "react";
import {IProject} from "../../../interfaces/IProject";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import {Link} from "react-router-dom";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faEye, faTrash} from "@fortawesome/free-solid-svg-icons";
import Button from "react-bootstrap/Button";
import {deleteProject} from "../../../service/actions/projectActions";
import {useDispatch} from "react-redux";

type ProjectItemProps = {
    project: IProject
}
export const ProjectItem:React.FC<ProjectItemProps> = ({project}) => {

    const dispatch = useDispatch()

    return (
      <Fragment>
          <tr>
              <td>{project.contract}</td>
              <td>{project.creationDate}</td>
              <td>{project.name}</td>
              <td>{project.address}</td>
              <td>{project.owner}</td>
              <td>
                  <ButtonGroup>
                      <Link to={"projectInfo/" + project.id}
                            className="btn btn-sm btn-outline-primary">
                          <FontAwesomeIcon icon={faEye}/>
                      </Link>
                      <Button size="sm" variant="outline-danger"
                              onClick={() => dispatch(deleteProject(project.id))}>
                          <FontAwesomeIcon icon={faTrash}/>
                      </Button>
                  </ButtonGroup>
              </td>
          </tr>
      </Fragment>
    )
}
