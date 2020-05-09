import React from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faMarker} from "@fortawesome/free-solid-svg-icons";
import {FormCheck} from "react-bootstrap";
import * as PropTypes from "prop-types";

export default function TabCategoryTable({array, onChange}) {

    return(
        <table className="table table-hover">
            <thead>
            <tr>
                <th><FontAwesomeIcon icon={faMarker}/></th>
                <th>Наименование позиции</th>
                <th>Ед.изм</th>
                <th>Кол-во</th>
                <th>Цена</th>
                <th>Стоимость</th>
            </tr>
            </thead>
            <tbody>
            {array.length === 0 ?
                <tr align="center">
                    <td colSpan="6">Нет доступных позиций.</td>
                </tr> :
                array.map((arrayItem) => (
                    <tr key={arrayItem.id}
                        style={arrayItem.complete ?
                            {textDecorationLine: "line-through"} : null}>
                        <td>
                            <FormCheck
                                type="checkbox"
                                id="selected"
                                checked={arrayItem.complete}
                                value={arrayItem.complete}
                                onChange={() => onChange(arrayItem.id)}
                            />
                        </td>
                        <td>{arrayItem.name}</td>
                        <td>{arrayItem.unit}</td>
                        <td>{arrayItem.quantity}</td>
                        <td>{arrayItem.priceClient}</td>
                        <td>{arrayItem.costClient}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    )
}
TabCategoryTable.propTypes={
    array: PropTypes.array.isRequired,
    onChange: PropTypes.func.isRequired
}
