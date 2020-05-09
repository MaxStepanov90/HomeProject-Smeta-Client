import React, {Fragment} from "react";
import {Link} from "react-router-dom";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPlusSquare} from "@fortawesome/free-solid-svg-icons";
import TabDescription from "../../Generic/TabDescription";
import TabCategoryTable from "../../Generic/TabCategoryTable";

export default function TabMaterials({
                                         estimateName, estimateId, estimateDetailsMaterial, onChange,
                                         valueAll, valueDone, valueTo, percent
                                     }) {
    return (
        <Fragment>
            <div className="container-fluid my-4">
                <TabDescription estimateName={estimateName}
                                valueAll={valueAll}
                                valueDone={valueDone}
                                valueTo={valueTo}
                                percent={percent}
                />
                <div className="container-fluid">
                    <TabCategoryTable array={estimateDetailsMaterial}
                                      onChange={onChange}
                    />
                </div>
            </div>
        </Fragment>

    )
}
