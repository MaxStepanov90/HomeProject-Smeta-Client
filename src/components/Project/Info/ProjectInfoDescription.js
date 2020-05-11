import React from "react";
import {Link} from "react-router-dom";
import ProjectInfoProgressBar from "./ProjectInfoProgressBar";
import * as PropTypes from "prop-types";
import DescriptionRaw from "../../Generic/DescrpirtionRaw";
import {Container} from "react-bootstrap";

export default function ProjectInfoDescription({
                                                   projectName, projectAddress, projectContract, projectDescription,
                                                   projectOwner, estimates, sumAllEstimateCost, buttonText,
                                                   visible, onChangeVisible, onPercentageEstimateDone
                                               }) {
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
                            <Link onClick={onChangeVisible}>{buttonText}</Link>
                        </div>
                        : null}
                    {visible ? estimates.map((estimate) => (
                        <ProjectInfoProgressBar key={estimate.id}
                                                name={estimate.estimateName}
                                                value={estimate.estimateCost}
                                                complete={onPercentageEstimateDone(estimate)}/>
                    )) : null}
                </Container>
            </div>
        </div>
    )
}
ProjectInfoDescription.propTypes = {
    projectName: PropTypes.string.isRequired,
    projectAddress: PropTypes.string.isRequired,
    projectContract: PropTypes.string.isRequired,
    projectDescription: PropTypes.string,
    projectOwner: PropTypes.string.isRequired,
    estimates: PropTypes.array.isRequired,
    sumAllEstimateCost: PropTypes.number.isRequired,
    buttonText: PropTypes.string.isRequired,
    visible: PropTypes.bool.isRequired,
    onChangeVisible: PropTypes.func.isRequired,
    onPercentageEstimateDone: PropTypes.func.isRequired,
}
ProjectInfoDescription.defaultProps = {
    projectName: 'Без названия',
    projectAddress: 'Адрес не указан',
    projectContract: 'Номер договора не указан',
    projectOwner: 'Заказчик не указан',
    sumAllEstimateCost: 0,
    visible: false,
};