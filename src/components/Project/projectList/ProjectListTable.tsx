import React from "react";
import Table from "react-bootstrap/Table";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import {Link} from "react-router-dom";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faEye, faTrash} from "@fortawesome/free-solid-svg-icons";
import Button from "react-bootstrap/Button";
import {IProject} from "../../../interfaces/IProject";
import './ProjectStyle.css';

type ProjectListTableProps = {
    projects: IProject[],
    onDeleteProject: (id: number | undefined) => void,
}

export const ProjectListTable: React.FC<ProjectListTableProps> = ({projects,  onDeleteProject}) => {

    return (
        <Table bordered hover striped>
            <thead>
            <tr>
                <th>Номер</th>
                <th>Дата</th>
                <th>Название</th>
                <th>Адрес</th>
                <th>Заказчик</th>
            </tr>
            </thead>
            <tbody>
            {projects.length === 0 ?
                <tr>
                    <td align="center" colSpan={6}>Нет доступных проектов.</td>
                </tr> :
                projects.map((project: IProject) => (
                    <tr key={project.id}>
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
                                        onClick={() => onDeleteProject(project.id)}>
                                    <FontAwesomeIcon icon={faTrash}/>
                                </Button>
                            </ButtonGroup>
                        </td>
                    </tr>
                ))
            }
            </tbody>
        </Table>
    )
}
