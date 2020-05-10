import React, {Fragment} from "react";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import {Link} from "react-router-dom";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faEye, faTrash} from "@fortawesome/free-solid-svg-icons";
import Button from "react-bootstrap/Button";
import Table from "react-bootstrap/Table";
import ProjectInfoButtonGroup from "./ProjectInfoButtonGroup";
import * as PropTypes from "prop-types";

export default function EstimatesTable ({estimates, estimateName, projectId, onDeleteEstimate}) {

    return(
        <Fragment>
            <ProjectInfoButtonGroup projectId={projectId}/>
            <Table bordered hover striped>
                <thead>
                <tr>
                    <th>Смета</th>
                    <th>Договорная цена</th>
                    <th>Выполнено</th>
                    <th>Оплачено</th>
                    <th>К оплате</th>
                    <th></th>
                </tr>
                </thead>
                <tbody>
                {estimates.length === 0 ?
                    <tr align="center">
                        <td colSpan="6">Нет доступных смет.</td>
                    </tr> :
                    estimates.map((estimate) => (
                        <tr key={estimate.id}>
                            <td>{estimate.estimateName}</td>
                            <td>{estimate.estimateCost}</td>
                            <td>{estimate.estimatePerformance}</td>
                            <td>{estimate.estimatePayment}</td>
                            <td>{estimate.estimateNotPayment}</td>
                            <td>
                                <ButtonGroup>
                                    <Link to={{
                                        pathname: "/estimate/" + estimate.id,
                                        estimateName: estimateName
                                    }}
                                          className="btn btn-sm btn-outline-primary">
                                        <FontAwesomeIcon icon={faEye}/>&nbsp;
                                    </Link>
                                    <Button size="sm" variant="outline-danger"
                                            onClick={() => onDeleteEstimate(estimate.id)}>
                                        <FontAwesomeIcon icon={faTrash}/>
                                    </Button>
                                </ButtonGroup>
                            </td>
                        </tr>
                    ))
                }
                </tbody>
            </Table>
        </Fragment>
    )
}
EstimatesTable.propTypes={
    estimateName: PropTypes.string.isRequired,
    projectId: PropTypes.number,
    estimates: PropTypes.array.isRequired,
    onDeleteEstimate: PropTypes.func.isRequired
}
EstimatesTable.defaultProps = {
    estimateName: 'Без названия'
};