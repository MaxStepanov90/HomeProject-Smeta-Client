import React from "react";
import DescriptionRow from "../../../Generic/DescrpirtionRaw";
import TabDescriptionColumn from "../../../Generic/TabDescriptionColumn";
import * as PropTypes from "prop-types";

export default function TabClientDescription({estimateName, sumOfWorksWithMarkUp, sumOfMaterialsWithMarkUp}) {

    return (
        <div className="row justify-content-between">
            <div className="col-5">
                <DescriptionRow title={"Смета"} value={estimateName}/>
            </div>
            <div className="col-6">
                <div className="row">
                    <TabDescriptionColumn title={"Категория:"}
                                          dataOfWorks={"Работы:"}
                                          dataOfMaterials={"Материалы:"}
                                          dataOfAll={"Итого:"}
                    />
                    <TabDescriptionColumn title={"Стоимость"}
                                          dataOfWorks={sumOfWorksWithMarkUp}
                                          dataOfMaterials={sumOfMaterialsWithMarkUp}
                                          dataOfAll={sumOfWorksWithMarkUp + sumOfMaterialsWithMarkUp}
                    />
                    <div className="col align-self-center">
                        <h1>{sumOfWorksWithMarkUp + sumOfMaterialsWithMarkUp}</h1>
                    </div>
                </div>
            </div>
        </div>
    )
}
TabClientDescription.propTypes={
    estimateName: PropTypes.string.isRequired,
    sumOfWorksWithMarkUp: PropTypes.number.isRequired,
    sumOfMaterialsWithMarkUp: PropTypes.number.isRequired,
}
TabClientDescription.defaultProps = {
    estimateName: 'Без названия',
    sumOfWorksWithMarkUp: 0,
    sumOfMaterialsWithMarkUp: 0,
};