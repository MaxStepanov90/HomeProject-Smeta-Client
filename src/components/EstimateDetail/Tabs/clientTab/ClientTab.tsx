import React, {Fragment} from "react";
import {ClientTabDescription} from "./ClientTabDescription";
import {ClientTabTable} from "./ClientTabTable";
import {IEstimateDetail} from "../../../../interfaces/IEstimateDetail";
import {Link} from "react-router-dom";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPlusSquare} from "@fortawesome/free-solid-svg-icons";
import {IEstimate} from "../../../../interfaces/IEstimate.";

type TabClientProps = {
    estimate: IEstimate,
    sumOfWorksWithMarkUp: number,
    sumOfMaterialsWithMarkUp: number,
    estimateDetails: IEstimateDetail [],
}
export const ClientTab: React.FC<TabClientProps> = (
    {
        estimate, sumOfWorksWithMarkUp, sumOfMaterialsWithMarkUp,
        estimateDetails
    }) => {
    return (
        <Fragment>
            <div className="container-fluid my-4">
                <ClientTabDescription estimateName={estimate.name}
                                      sumOfWorksWithMarkUp={sumOfWorksWithMarkUp}
                                      sumOfMaterialsWithMarkUp={sumOfMaterialsWithMarkUp}
                />
                <div className="container-fluid mb-2">
                    <Link to={{pathname: "/addPayment", state: {estimateId: estimate.id}}}
                          className="btn btn-sm btn-primary">
                        <FontAwesomeIcon icon={faPlusSquare}/>&nbsp;
                        Оплатить
                    </Link>
                </div>
                <div className="container-fluid">
                    <ClientTabTable estimateDetails={estimateDetails}/>
                </div>
            </div>
        </Fragment>

    )
}