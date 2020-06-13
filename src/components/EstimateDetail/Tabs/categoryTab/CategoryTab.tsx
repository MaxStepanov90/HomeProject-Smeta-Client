import React, {Fragment} from "react";
import {TabDescription} from "../../../Generic/TabDescription";
import {TabCategoryTable} from "../../../Generic/TabCategoryTable";
import {IEstimateDetail} from "../../../../interfaces/IEstimateDetail";
import {Button} from "react-bootstrap";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faFileExcel} from "@fortawesome/free-solid-svg-icons";

type TabMaterialsProps = {
    estimateName: string,
    category: string,
    categoryEstimateDetails: IEstimateDetail[],
    onChange: (id: number) => void,
    onDownloadExcel: (category: string) => void,
    valueAll: number,
    valueDone: number,
    valuePay: number,
    percent: number
}
export const CategoryTab: React.FC<TabMaterialsProps> = (
    {
        estimateName,category, categoryEstimateDetails, onChange,
        valueAll, valueDone, valuePay, percent, onDownloadExcel
    }) => {
    return (
        <Fragment>
            <div className="container-fluid my-4">
                <TabDescription estimateName={estimateName}
                                valueAll={valueAll}
                                valueDone={valueDone}
                                valuePay={valuePay}
                                percent={percent}
                />
                <div className="container-fluid mb-2">
                    <Button size={"sm"} variant="primary"
                            onClick={() => onDownloadExcel(category)}>
                        <FontAwesomeIcon icon={faFileExcel}/>&nbsp;
                        Экспорт в Excel
                    </Button>
                </div>
                <div className="container-fluid">
                    <TabCategoryTable array={categoryEstimateDetails}
                                      onChange={onChange}
                    />
                </div>
            </div>
        </Fragment>

    )
}