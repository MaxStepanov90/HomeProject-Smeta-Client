import React, {Fragment} from "react";
import {ClientTabDescription} from "./ClientTabDescription";
import {ClientTabTable} from "./ClientTabTable";
import {IEstimateDetail} from "../../../../interfaces/IEstimateDetail";
import {Link} from "react-router-dom";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPlusSquare} from "@fortawesome/free-solid-svg-icons";

type TabClientProps = {
    estimateName: string,
    sumOfWorksWithMarkUp: number,
    sumOfMaterialsWithMarkUp: number,
    estimateDetails: IEstimateDetail [],
    estimateId: number
}
export const ClientTab: React.FC<TabClientProps> = (
    {
        estimateName, sumOfWorksWithMarkUp, sumOfMaterialsWithMarkUp,
        estimateDetails, estimateId
    }) => {
    return (
        <Fragment>
            <div className="container-fluid my-4">
                <ClientTabDescription estimateName={estimateName}
                                      sumOfWorksWithMarkUp={sumOfWorksWithMarkUp}
                                      sumOfMaterialsWithMarkUp={sumOfMaterialsWithMarkUp}
                />
                <div className="container-fluid mb-2">
                    <Link to={{pathname: "/addPayment", state: {estimateId: estimateId}}}
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