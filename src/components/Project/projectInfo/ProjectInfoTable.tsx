import React, {Fragment} from "react";
import Table from "react-bootstrap/Table";
import {ProjectInfoButtonGroup} from "./ProjectInfoButtonGroup";
import {IEstimate} from "../../../interfaces/IEstimate.";
import {EstimateItem} from "./EstimateItem";

type EstimatesTableProps = {
    estimates: IEstimate[];
    projectId: number;
}

export const ProjectInfoTable: React.FC<EstimatesTableProps> = ({estimates, projectId}) => {

    return (
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
                    <tr>
                        <td align="center" colSpan={6}>Нет доступных смет.</td>
                    </tr> :
                    estimates.map((estimate: IEstimate) => (
                        <EstimateItem key={estimate.id}
                                      estimate={estimate}/>
                    ))
                }
                </tbody>
            </Table>
        </Fragment>
    )
}