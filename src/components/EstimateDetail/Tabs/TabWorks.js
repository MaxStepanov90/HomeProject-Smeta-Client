import React, {Fragment} from "react";
import TabDescription from "../../Generic/TabDescription";
import TabCategoryTable from "../../Generic/TabCategoryTable";

export default function TabWorks({
                                     estimateName, estimateDetailsWork, onChange, valueAll,
                                     valueDone, valueTo, percent
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
                    <TabCategoryTable array={estimateDetailsWork}
                                      onChange={onChange}
                    />
                </div>
            </div>
        </Fragment>

    )
}
