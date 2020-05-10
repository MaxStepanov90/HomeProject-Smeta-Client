import React, {Fragment} from "react";
import {Link} from "react-router-dom";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPlusSquare} from "@fortawesome/free-solid-svg-icons";
import TabClientDescription from "./TabClientDescription";
import TabClientTable from "./TabClientTable";
import * as PropTypes from "prop-types";

export default function TabClient({
                                      estimateName, sumOfWorksWithMarkUp, sumOfMaterialsWithMarkUp,
                                      estimateDetails, estimateId
                                  }) {
    return (
        <Fragment>
            <div className="container-fluid my-4">
                <TabClientDescription estimateName={estimateName}
                                      sumOfWorksWithMarkUp={sumOfWorksWithMarkUp}
                                      sumOfMaterialsWithMarkUp={sumOfMaterialsWithMarkUp}
                />
                <div className="container-fluid mb-2">
                    <Link to={{pathname: "/addEstimateDetail", estimateId: estimateId}}
                          className="btn btn-sm btn-success">
                        <FontAwesomeIcon icon={faPlusSquare}/>&nbsp;
                        Добавить позицию
                    </Link>
                </div>
                <div className="container-fluid">
                   <TabClientTable estimateDetails={estimateDetails}/>
                </div>
            </div>
        </Fragment>

    )
}
TabClient.propTypes={
    estimateName: PropTypes.string.isRequired,
    estimateDetails: PropTypes.array.isRequired,
    sumOfWorksWithMarkUp: PropTypes.number.isRequired,
    sumOfMaterialsWithMarkUp: PropTypes.number.isRequired,
    estimateId: PropTypes.any.isRequired
}
TabClient.defaultProps = {
    estimateName: 'Без названия',
    sumOfWorksWithMarkUp: 0,
    sumOfMaterialsWithMarkUp: 0,
    estimateId: 0
}
