import React from "react";
import {ProjectInfoProgressBar} from "./ProjectInfoProgressBar";
import {Container} from "react-bootstrap";
import {DescriptionRaw} from "../../Generic/DescrpirtionRaw";
import {IEstimate} from "../../../interfaces/IEstimate.";

type ProjectInfoDescriptionProps = {
    projectName: string,
    projectAddress: string,
    projectContract: string,
    projectDescription: string,
    projectOwner: string,
    estimates: IEstimate[],
    sumAllEstimateCost: number,
    buttonText: string,
    visible: boolean,
    onChangeVisible: () => void,
    onPercentageEstimateDone: (estimate: IEstimate) => number
}
export const ProjectInfoDescription: React.FC<ProjectInfoDescriptionProps> = (
    {
        projectName, projectAddress, projectContract, projectDescription, projectOwner,
        estimates, sumAllEstimateCost, buttonText, visible, onChangeVisible,
        onPercentageEstimateDone
    }
) => {
    return (
        <div className="row justify-content-between">
            <div className="col-5">
                <Container>
                    <div className="row">
                        <div className="col">
                            <h5>Информация о проектe</h5>
                        </div>
                    </div>
                    <DescriptionRaw title={"Название"} value={projectName}/>
                    <DescriptionRaw title={"Адрес"} value={projectAddress}/>
                    <DescriptionRaw title={"Договор"} value={projectContract}/>
                    <DescriptionRaw title={"Заказчик"} value={projectOwner}/>
                    <DescriptionRaw title={"Описание"} value={projectDescription}/>
                </Container>
            </div>
            <div className="col-7">
                <Container>
                    {estimates.length !== 0 ?
                        <div>
                            <DescriptionRaw title={"Всего смет в работе"} value={estimates.length}/>
                            <DescriptionRaw title={"Общая сумма"} value={sumAllEstimateCost}/>
                            <div onClick={onChangeVisible}>{buttonText}</div>
                        </div>
                        : null}
                    {visible ? estimates.map((estimate: IEstimate) => (
                        <ProjectInfoProgressBar key={estimate.id}
                                                name={estimate.name}
                                                value={estimate.cost}
                                                complete={onPercentageEstimateDone(estimate)}/>
                    )) : null}
                </Container>
            </div>
        </div>
    )
}