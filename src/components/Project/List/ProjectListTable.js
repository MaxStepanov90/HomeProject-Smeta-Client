import React from "react";
import Table from "react-bootstrap/Table";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import {Link} from "react-router-dom";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faEye, faTrash} from "@fortawesome/free-solid-svg-icons";
import Button from "react-bootstrap/Button";
import * as PropTypes from "prop-types";

export default function ProjectListTable({projects, onSortData, sortToggle, onDeleteProject}) {

    return (
        <Table bordered hover striped>
            <thead>
            <tr>
                <th>Номер</th>
                <th onClick={() => onSortData}>
                    Дата
                    <div className={sortToggle ? "arrow arrow-down" : "arrow arrow-up"}/>
                </th>
                <th>Название</th>
                <th>Адрес</th>
                <th>Заказчик</th>
            </tr>
            </thead>
            <tbody>
            {projects.length === 0 ?
                <tr align="center">
                    <td colSpan="6">Нет доступных проектов.</td>
                </tr> :
                projects.map((project) => (
                    <tr key={project.id}>
                        <td>{project.projectContract}</td>
                        <td>{project.projectCreationDate}</td>
                        <td>{project.projectName}</td>
                        <td>{project.projectAddress}</td>
                        <td>{project.projectOwner}</td>
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
ProjectListTable.propTypes = {
    projects: PropTypes.string.isRequired,
    sortToggle: PropTypes.number.isRequired,
    onSortData: PropTypes.func.isRequired,
    onDeleteProject: PropTypes.func.isRequired,
}
