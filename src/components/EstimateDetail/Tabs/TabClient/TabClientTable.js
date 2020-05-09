import React from "react";
import * as PropTypes from "prop-types";

export default function TabClientTable({estimateDetails}) {

    return(
        <table className="table table-hover">
            <thead>
            <tr>
                <th>Наименование позиции</th>
                <th>Ед.изм</th>
                <th>Кол-во</th>
                <th>Цена</th>
                <th>Стоимость</th>
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
                        <td>{estimateDetail.name}</td>
                        <td>{estimateDetail.unit}</td>
                        <td>{estimateDetail.quantity}</td>
                        <td>{estimateDetail.priceClient}</td>
                        <td>{estimateDetail.costClient}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    )
}
TabClientTable.propTypes={
    estimateDetails: PropTypes.array.isRequired
}