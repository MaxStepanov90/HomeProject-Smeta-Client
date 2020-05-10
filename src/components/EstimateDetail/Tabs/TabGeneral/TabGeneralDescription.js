import React from "react";
import DescriptionRow from "../../../Generic/DescrpirtionRaw";
import TabDescriptionColumn from "../../../Generic/TabDescriptionColumn";
import * as PropTypes from "prop-types";

export default function TabGeneralDescription({
                                                  estimateName, sumOfWorks, sumOfMaterials, sumOfMarkUpFromWorks,
                                                  sumOfMarkUpFromMaterials, sumOfWorksWithMarkUp,
                                                  sumOfMaterialsWithMarkUp,
                                              }) {

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
                    <TabDescriptionColumn title={"Себестоимость"}
                                          dataOfWorks={sumOfWorks}
                                          dataOfMaterials={sumOfMaterials}
                                          dataOfAll={Math.round((sumOfWorks + sumOfMaterials)*100)/100}
                    />
                    <TabDescriptionColumn title={"Наценка"}
                                          dataOfWorks={sumOfMarkUpFromWorks}
                                          dataOfMaterials={sumOfMarkUpFromMaterials}
                                          dataOfAll={Math.round(
                                              (sumOfMarkUpFromWorks + sumOfMarkUpFromMaterials)*100)/100}
                    />
                    <TabDescriptionColumn title={"для Клиента"}
                                          dataOfWorks={sumOfWorksWithMarkUp}
                                          dataOfMaterials={sumOfMaterialsWithMarkUp}
                                          dataOfAll={Math.round(
                                              (sumOfWorksWithMarkUp + sumOfMaterialsWithMarkUp)*100)/100}
                    />
                    <div className="col align-self-center">
                        <h1>{Math.round((sumOfWorksWithMarkUp + sumOfMaterialsWithMarkUp)*100)/100}</h1>
                    </div>
                </div>
            </div>
        </div>
    )
}
TabGeneralDescription.propTypes={
    estimateName: PropTypes.string.isRequired,
    sumOfWorks: PropTypes.number.isRequired,
    sumOfMaterials: PropTypes.number.isRequired,
    sumOfMarkUpFromWorks: PropTypes.number.isRequired,
    sumOfMarkUpFromMaterials: PropTypes.number.isRequired,
    sumOfWorksWithMarkUp: PropTypes.number.isRequired,
    sumOfMaterialsWithMarkUp: PropTypes.number.isRequired,
}
TabGeneralDescription.defaultProps = {
    estimateName: 'Без названия',
    sumOfWorks: 0,
    sumOfMaterials: 0,
    sumOfMarkUpFromWorks: 0,
    sumOfMarkUpFromMaterials: 0,
    sumOfWorksWithMarkUp: 0,
    sumOfMaterialsWithMarkUp: 0,
};