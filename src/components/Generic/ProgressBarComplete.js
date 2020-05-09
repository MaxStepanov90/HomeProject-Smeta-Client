import React from "react";
import ProgressBar from "react-bootstrap/ProgressBar";
import * as PropTypes from "prop-types";

export default function ProgressBarComplete({valueAll, valueDone, valueTo, percent}) {

    return (
        <div className="row">
            <div className="col my-2">
                <div>
                    <ProgressBar variant="success"
                                 now={percent}
                                 label={percent + "%"}
                    />
                </div>
                <div className="row justify-content-around">
                    <div className="col">
                        <div className="col my-2">Всего</div>
                        <div className="col my-2">{valueAll}</div>
                    </div>
                    <div className="col">
                        <div className="col my-2">Выполнено</div>
                        <div className="col my-2">{valueDone}</div>
                    </div>
                    <div className="col">
                        <div className="col my-2">Осталось</div>
                        <div className="col my-2">{valueTo}</div>
                    </div>
                </div>
            </div>
        </div>
    )
}
ProgressBarComplete.propTypes={
    valueAll: PropTypes.number.isRequired,
    valueDone: PropTypes.number.isRequired,
    valueTo: PropTypes.number,
    percent: PropTypes.number.isRequired
}
ProgressBarComplete.defaultProps = {
    valueAll: 0,
    valueDone: 0,
    valueTo: 0,
    percent: 0
};