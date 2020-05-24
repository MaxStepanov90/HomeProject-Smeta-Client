import React, {Fragment} from "react";
import {Link} from "react-router-dom";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPlusSquare} from "@fortawesome/free-solid-svg-icons";
import TabGeneralTable from "./TabGeneralTable";
import TabGeneralDescription from "./TabGeneralDescription";
import * as PropTypes from "prop-types";

export default function TabGeneral({
                                       estimateName, sumOfWorks, sumOfMaterials, sumOfMarkUpFromWorks,
                                       sumOfMarkUpFromMaterials, sumOfWorksWithMarkUp, sumOfMaterialsWithMarkUp,
                                       estimateDetails, estimateId, onDeleteEstimateDetail
                                   }) {
    return (
        <Fragment>
            <div className="container-fluid my-4">
                <TabGeneralDescription estimateName={estimateName}
                                       sumOfWorks={sumOfWorks}
                                       sumOfMaterials={sumOfMaterials}
                                       sumOfWorksWithMarkUp={sumOfWorksWithMarkUp}
                                       sumOfMaterialsWithMarkUp={sumOfMaterialsWithMarkUp}
                                       sumOfMarkUpFromWorks={sumOfMarkUpFromWorks}
                                       sumOfMarkUpFromMaterials={sumOfMarkUpFromMaterials}
                />
                <div className="container-fluid mb-2">
                    <Link to={{pathname: "/addEstimateDetail", estimateId: estimateId}}
                          className="btn btn-sm btn-primary">
                        <FontAwesomeIcon icon={faPlusSquare}/>&nbsp;
                        Добавить позицию
                    </Link>
                </div>
                <div className="container-fluid">
                 <TabGeneralTable estimateDetails={estimateDetails}
                                  onDeleteEstimateDetail={onDeleteEstimateDetail}
                 />
                </div>
            </div>
        </Fragment>

    )
}
TabGeneral.propTypes={
    estimateName: PropTypes.string.isRequired,
    estimateDetails: PropTypes.array.isRequired,
    sumOfWorks: PropTypes.number.isRequired,
    sumOfMaterials: PropTypes.number.isRequired,
    sumOfMarkUpFromMaterials: PropTypes.number.isRequired,
    sumOfMarkUpFromWorks: PropTypes.number.isRequired,
    sumOfWorksWithMarkUp: PropTypes.number.isRequired,
    sumOfMaterialsWithMarkUp: PropTypes.number.isRequired,
    estimateId: PropTypes.any.isRequired,
    onDeleteEstimateDetail: PropTypes.func.isRequired
}
TabGeneral.defaultProps = {
    estimateName: 'Без названия',
    sumOfWorks: 0,
    sumOfMaterials: 0,
    sumOfMarkUpFromMaterials: 0,
    sumOfMarkUpFromWorks: 0,
    sumOfWorksWithMarkUp: 0,
    sumOfMaterialsWithMarkUp: 0,
    estimateId: 0
}