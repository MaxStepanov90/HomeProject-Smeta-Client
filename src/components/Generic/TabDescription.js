import React from "react";
import DescriptionRaw from "./DescrpirtionRaw";
import ProgressBarComplete from "./ProgressBarComplete";
import * as PropTypes from "prop-types";

export default function TabDescription({estimateName, valueAll, valueDone, valueTo, percent}) {

    return(
        <div className="row justify-content-between my-4">
            <div className="col-5">
                <DescriptionRaw title={"Смета"} value={estimateName}/>
            </div>
            <div className="col-6">
                <ProgressBarComplete
                    valueAll={valueAll}
                    valueDone={valueDone}
                    valueTo={valueTo}
                    percent={percent}
                />
            </div>
        </div>
    )
}
TabDescription.propTypes={
    estimateName: PropTypes.string.isRequired,
    valueAll: PropTypes.number.isRequired,
    valueDone: PropTypes.number.isRequired,
    valueTo: PropTypes.number,
    percent: PropTypes.number.isRequired
}
TabDescription.defaultProps = {
    estimateName: 'Без названия',
    valueAll: 0,
    valueDone: 0,
    valueTo: 0,
    percent: 0
};