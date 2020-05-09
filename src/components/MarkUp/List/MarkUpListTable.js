import React from "react";
import Table from "react-bootstrap/Table";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import {Link} from "react-router-dom";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faEye, faTrash} from "@fortawesome/free-solid-svg-icons";
import {Button} from "react-bootstrap";
import * as PropTypes from "prop-types";

export default function MarkUpListTable({markUps, onDeleteMarkUp}) {

    return (
        <Table bordered hover striped>
            <thead>
            <tr>
                <th>Категория</th>
                <th>Процент наценки</th>
            </tr>
            </thead>
            <tbody>
            {markUps.length === 0 ?
                <tr align="center">
                    <td colSpan="6">Нет доступных наценок.</td>
                </tr> :
                markUps.map((markUp) => (
                    <tr key={markUp.id}>
                        <td>{markUp.markUpName}</td>
                        <td>{markUp.markUpPercent}</td>
                        <td>
                            <ButtonGroup>
                                <Link to={"markUp/" + markUp.id}
                                      className="btn btn-sm btn-outline-primary">
                                    <FontAwesomeIcon icon={faEye}/>
                                </Link>
                                <Button size="sm" variant="outline-danger"
                                        onClick={() => onDeleteMarkUp(markUp.id)}>
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
MarkUpListTable.propTypes={
    markUps: PropTypes.array.isRequired,
    onDeleteMarkUp: PropTypes.func.isRequired,
}