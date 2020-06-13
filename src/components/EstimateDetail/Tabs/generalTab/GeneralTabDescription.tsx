import React from "react";
import {TabDescriptionColumn} from "../../../Generic/TabDescriptionColumn";
import {DescriptionRaw} from "../../../Generic/DescrpirtionRaw";

type TabGeneralDescriptionProps = {
    estimateName: string,
    sumOfWorks: number,
    sumOfMaterials: number,
    sumOfMarkUpFromWorks: number,
    sumOfMarkUpFromMaterials: number,
    sumOfWorksWithMarkUp: number,
    sumOfMaterialsWithMarkUp: number,
}
export const GeneralTabDescription: React.FC<TabGeneralDescriptionProps> = (
    {
        estimateName, sumOfWorks, sumOfMaterials, sumOfMarkUpFromWorks,
        sumOfMarkUpFromMaterials, sumOfWorksWithMarkUp,
        sumOfMaterialsWithMarkUp,
    }) => {

    const dataOfAll = Math.round((sumOfWorks + sumOfMaterials) * 100) / 100;
    const dataOfAllMarkUps = Math.round((sumOfMarkUpFromWorks + sumOfMarkUpFromMaterials) * 100) / 100;
    const dataOfAllWithMarkUps = Math.round((sumOfWorksWithMarkUp + sumOfMaterialsWithMarkUp) * 100) / 100;
    const sumOfAll = Math.round((sumOfWorksWithMarkUp + sumOfMaterialsWithMarkUp) * 100) / 100;

    return (
        <div className="row justify-content-between">
            <div className="col-5">
                <DescriptionRaw title={"Смета"} value={estimateName}/>
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
                                          dataOfAll={dataOfAll}
                    />
                    <TabDescriptionColumn title={"Наценка"}
                                          dataOfWorks={sumOfMarkUpFromWorks}
                                          dataOfMaterials={sumOfMarkUpFromMaterials}
                                          dataOfAll={dataOfAllMarkUps}
                    />
                    <TabDescriptionColumn title={"для Клиента"}
                                          dataOfWorks={sumOfWorksWithMarkUp}
                                          dataOfMaterials={sumOfMaterialsWithMarkUp}
                                          dataOfAll={dataOfAllWithMarkUps}
                    />
                    <div className="col align-self-center">
                        <h1>{sumOfAll}</h1>
                    </div>
                </div>
            </div>
        </div>
    )
}