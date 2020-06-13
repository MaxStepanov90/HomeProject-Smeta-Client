import React from "react";
import {DescriptionRaw} from "../../../Generic/DescrpirtionRaw";
import {TabDescriptionColumn} from "../../../Generic/TabDescriptionColumn";

type TabClientDescriptionProps = {
    estimateName: string,
    sumOfWorksWithMarkUp: number,
    sumOfMaterialsWithMarkUp: number
}

export const ClientTabDescription: React.FC<TabClientDescriptionProps> = (
    {estimateName, sumOfWorksWithMarkUp, sumOfMaterialsWithMarkUp}
) => {

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
