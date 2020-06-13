import React from "react";
import ProgressBar from "react-bootstrap/ProgressBar";

type ProjectInfoProgressBarProps = {
    name: string,
    value: number,
    complete: number
}

export const ProjectInfoProgressBar: React.FC<ProjectInfoProgressBarProps> = (
    {name, value , complete }
) => {

    return (
        <div className="row">
            <div className="col my-2">
                <div className="row justify-content-between">
                    <div className="col my-2">{name}</div>
                    <div className="col-1 my-2">{value}</div>
                </div>
                <div>
                    <ProgressBar variant="success"
                                 now={complete}
                                 label={complete + "%"}/>
                </div>
            </div>
        </div>
    )
}