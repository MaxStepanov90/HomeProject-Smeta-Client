import React, {Fragment} from "react";
import {GeneralTabTable} from "./GeneralTabTable";
import {GeneralTabDescription} from "./GeneralTabDescription";
import {IEstimateDetail} from "../../../../interfaces/IEstimateDetail";
import {Link} from "react-router-dom";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPlusSquare} from "@fortawesome/free-solid-svg-icons";
import {IEstimate} from "../../../../interfaces/IEstimate.";

type TabGeneralProps = {
    estimate: IEstimate,
    sumOfWorks: number,
    sumOfMaterials: number,
    sumOfMarkUpFromWorks: number,
    sumOfMarkUpFromMaterials: number,
    sumOfWorksWithMarkUp: number,
    sumOfMaterialsWithMarkUp: number,
    estimateDetails: IEstimateDetail[],
}
export const GeneralTab: React.FC<TabGeneralProps> = (
    {
        estimate, sumOfWorks, sumOfMaterials, sumOfMarkUpFromWorks,
        sumOfMarkUpFromMaterials, sumOfWorksWithMarkUp, sumOfMaterialsWithMarkUp,
        estimateDetails}) => {

    return (
        <Fragment>
            <div className="container-fluid my-4">
                <GeneralTabDescription estimateName={estimate.name}
                                       sumOfWorks={sumOfWorks}
                                       sumOfMaterials={sumOfMaterials}
                                       sumOfWorksWithMarkUp={sumOfWorksWithMarkUp}
                                       sumOfMaterialsWithMarkUp={sumOfMaterialsWithMarkUp}
                                       sumOfMarkUpFromWorks={sumOfMarkUpFromWorks}
                                       sumOfMarkUpFromMaterials={sumOfMarkUpFromMaterials}
                />
                <div className="container-fluid mb-2">
                    <Link to={{pathname: "/addEstimateDetail", state: {estimateId: estimate.id}}}
                          className="btn btn-sm btn-primary">
                        <FontAwesomeIcon icon={faPlusSquare}/>&nbsp;
                        Добавить позицию
                    </Link>
                </div>
                <div className="container-fluid">
                    <GeneralTabTable estimateDetails={estimateDetails}/>
                </div>
            </div>
        </Fragment>

    )
}