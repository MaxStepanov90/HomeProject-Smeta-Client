import React, {useState} from "react";
import {ProjectInfoProgressBar} from "./ProjectInfoProgressBar";
import {Container} from "react-bootstrap";
import {DescriptionRaw} from "../../Generic/DescrpirtionRaw";
import {IEstimate} from "../../../interfaces/IEstimate.";
import {useSelector} from "react-redux";
import {IRootState} from "../../../interfaces/IRootState";

type ProjectInfoDescriptionProps = {
    estimates: IEstimate[],
}
export const ProjectInfoDescription: React.FC<ProjectInfoDescriptionProps> = ({estimates}) => {

    const project = useSelector((state: IRootState) => state.projects.project)
    const [visible, setVisible] = useState(false)
    const buttonText = visible ? "скрыть детали" : "подробнее...";

    const sumAllEstimateCost = (estimates: IEstimate[]): number => {
        let sum = 0;
        for (let i = 0; i < estimates.length; i++) {
            sum += estimates[i].cost;
        }
        return sum
    };

    return (
        <div className="row justify-content-between">
            <div className="col-5">
                <Container>
                    <div className="row">
                        <div className="col">
                            <h5>Информация о проектe</h5>
                        </div>
                    </div>
                    <DescriptionRaw title={"Название"} value={project.name}/>
                    <DescriptionRaw title={"Адрес"} value={project.address}/>
                    <DescriptionRaw title={"Договор"} value={project.contract}/>
                    <DescriptionRaw title={"Заказчик"} value={project.owner}/>
                    <DescriptionRaw title={"Описание"} value={project.description}/>
                </Container>
            </div>
            <div className="col-7">
                <Container>
                    {estimates.length !== 0 ?
                        <div>
                            <DescriptionRaw title={"Всего смет в работе"} value={estimates.length}/>
                            <DescriptionRaw title={"Общая сумма"} value={sumAllEstimateCost(estimates)}/>
                            <div onClick={() => setVisible(!visible)}>{buttonText}</div>
                        </div>
                        : null}
                    {visible ? estimates.map((estimate: IEstimate) => (
                        <ProjectInfoProgressBar
                            key={estimate.id}
                            estimate = {estimate}/>)) : null}
                </Container>
            </div>
        </div>
    )
}