import React from "react";
import {DescriptionRaw} from "./DescrpirtionRaw";
import {ProgressBarComplete} from "./ProgressBarComplete";

type TabDescriptionProps = {
    estimateName: string,
    valueAll: number,
    valueDone: number,
    valuePay: number,
    percent: number
}
export const TabDescription: React.FC<TabDescriptionProps> = (
    {estimateName, valueAll, valueDone, valuePay, percent}
) => {

    return (
        <div className="row justify-content-between">
            <div className="col-5">
                <DescriptionRaw title={"Смета"} value={estimateName}/>
            </div>
            <div className="col-6">
                <ProgressBarComplete
                    valueAll={valueAll}
                    valueDone={valueDone}
                    valuePay={valuePay}
                    percent={percent}
                />
            </div>
        </div>
    )
}