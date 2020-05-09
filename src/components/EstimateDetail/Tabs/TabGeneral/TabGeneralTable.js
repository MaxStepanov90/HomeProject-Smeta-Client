import React from "react";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import {Button} from "react-bootstrap";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faTrash} from "@fortawesome/free-solid-svg-icons";
import * as PropTypes from "prop-types";

export default function TabGeneralTable({estimateDetails, onDeleteEstimateDetail}) {

    return(
        <table className="table table-hover">
            <thead>
            <tr>
                <th>Категория</th>
                <th>Наименование позиции</th>
                <th>Ед.изм</th>
                <th>Кол-во</th>
                <th>Цена</th>
                <th>Стоимость</th>
                <th>Цена Клиента</th>
                <th>Стоим. Клиента</th>
                <th>Ред.</th>
            </tr>
            </thead>
            <tbody>
            {estimateDetails.length === 0 ?
                <tr align="center">
                    <td colSpan="6">Нет доступных позиций.</td>
                </tr> :
                estimateDetails.map((estimateDetail) => (
                    <tr key={estimateDetail.id}
                        style={estimateDetail.category === "материалы" ?
                            {background: "#FFFACD"} : {background: "#AFEEEE"}}
                    >
                        <td>{estimateDetail.category}</td>
                        <td>{estimateDetail.name}</td>
                        <td>{estimateDetail.unit}</td>
                        <td>{estimateDetail.quantity}</td>
                        <td>{estimateDetail.price}</td>
                        <td>{estimateDetail.cost}</td>
                        <td>{estimateDetail.priceClient}</td>
                        <td>{estimateDetail.costClient}</td>
                        <td>
                            <ButtonGroup>
                                <Button size="sm" variant="outline-danger"
                                        onClick={() => onDeleteEstimateDetail(estimateDetail.id)}>
                                    <FontAwesomeIcon icon={faTrash}/>
                                </Button>
                            </ButtonGroup>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    )
}
TabGeneralTable.propTypes={
    estimateDetails: PropTypes.array.isRequired,
    onDeleteEstimateDetail: PropTypes.func.isRequired,
}