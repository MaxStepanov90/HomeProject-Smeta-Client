import React, {Fragment} from "react";
import TabDescription from "../../Generic/TabDescription";
import TabCategoryTable from "../../Generic/TabCategoryTable";
import * as PropTypes from "prop-types";

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
TabMaterials.propTypes={
    estimateName: PropTypes.string.isRequired,
    estimateDetailsMaterial: PropTypes.array.isRequired,
    valueAll: PropTypes.number.isRequired,
    valueDone: PropTypes.number.isRequired,
    valueTo: PropTypes.number.isRequired,
    percent: PropTypes.number.isRequired,
    onChange: PropTypes.func.isRequired
}
TabMaterials.defaultProps = {
    estimateName: 'Без названия',
    valueAll: 0,
    valueDone: 0,
    valueTo: 0,
    percent: 0,
};
