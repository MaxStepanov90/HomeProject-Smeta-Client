import React, {Fragment} from "react";
import {GeneralTabTable} from "./GeneralTabTable";
import {GeneralTabDescription} from "./GeneralTabDescription";
import {IEstimateDetail} from "../../../../interfaces/IEstimateDetail";
import {Link} from "react-router-dom";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPlusSquare} from "@fortawesome/free-solid-svg-icons";

type TabGeneralProps = {
    estimateName: string,
    sumOfWorks: number,
    sumOfMaterials: number,
    sumOfMarkUpFromWorks: number,
    sumOfMarkUpFromMaterials: number,
    sumOfWorksWithMarkUp: number,
    sumOfMaterialsWithMarkUp: number,
    estimateDetails: IEstimateDetail[],
    estimateId: number,
    onDeleteEstimateDetail: (estimateDetailId: number) => void
}
export const GeneralTab: React.FC<TabGeneralProps> = (
    {
        estimateName, sumOfWorks, sumOfMaterials, sumOfMarkUpFromWorks,
        sumOfMarkUpFromMaterials, sumOfWorksWithMarkUp, sumOfMaterialsWithMarkUp,
        estimateDetails, estimateId, onDeleteEstimateDetail
    }) => {
    return (
        <Fragment>
            <div className="container-fluid my-4">
                <GeneralTabDescription estimateName={estimateName}
                                       sumOfWorks={sumOfWorks}
                                       sumOfMaterials={sumOfMaterials}
                                       sumOfWorksWithMarkUp={sumOfWorksWithMarkUp}
                                       sumOfMaterialsWithMarkUp={sumOfMaterialsWithMarkUp}
                                       sumOfMarkUpFromWorks={sumOfMarkUpFromWorks}
                                       sumOfMarkUpFromMaterials={sumOfMarkUpFromMaterials}
                />
                <div className="container-fluid mb-2">
                    <Link to={{pathname: "/addEstimateDetail", state: {estimateId: estimateId}}}
                          className="btn btn-sm btn-primary">
                        <FontAwesomeIcon icon={faPlusSquare}/>&nbsp;
                        Добавить позицию
                    </Link>
                </div>
                <div className="container-fluid">
                    <GeneralTabTable estimateDetails={estimateDetails}
                                     onDeleteEstimateDetail={onDeleteEstimateDetail}
                    />
                </div>
            </div>
        </Fragment>

    )
}