import React from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faMarker} from "@fortawesome/free-solid-svg-icons";
import {FormCheck} from "react-bootstrap";
import {IEstimateDetail} from "../../interfaces/IEstimateDetail";

interface TabCategoryTableProps {
    array: IEstimateDetail[],
    onChange: (id: number) => void
}

export const TabCategoryTable: React.FC<TabCategoryTableProps> = ({array, onChange}) => {

    const completeCss: React.CSSProperties = {
        textDecorationLine: "line-through"
    }

    return (
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
                <tr>
                    <td align="center" colSpan={6}>Нет доступных позиций.</td>
                </tr> :
                array.map((arrayItem: IEstimateDetail) => (
                    <tr key={arrayItem.id}
                        style={arrayItem.complete ? completeCss : undefined}>
                        <td>
                            <FormCheck
                                type="checkbox"
                                id="selected"
                                checked={arrayItem.complete}
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
