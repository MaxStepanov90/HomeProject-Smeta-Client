import React from "react";
import ProgressBar from "react-bootstrap/ProgressBar";
import {IEstimate} from "../../../interfaces/IEstimate.";

type ProjectInfoProgressBarProps = {
    estimate: IEstimate
}

export const ProjectInfoProgressBar: React.FC<ProjectInfoProgressBarProps> = ({estimate}) => {

    const percentageEstimateDone = (estimate: IEstimate): number => {
        const result = Math.ceil(estimate.performance / (estimate.cost / 100));
        if (isNaN(result)) {
            return 0
        }
        return result;
    };

    return (
        <div className="row">
            <div className="col my-2">
                <div className="row justify-content-between">
                    <div className="col my-2">{estimate.name}</div>
                    <div className="col-1 my-2">{estimate.cost}</div>
                </div>
                <div>
                    <ProgressBar variant="success"
                                 now={percentageEstimateDone(estimate)}
                                 label={percentageEstimateDone(estimate) + "%"}/>
                </div>
            </div>
        </div>
    )
}