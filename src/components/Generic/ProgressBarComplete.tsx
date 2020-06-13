import React from "react";
import ProgressBar from "react-bootstrap/ProgressBar";

type ProgressBarCompleteProps = {
    valueAll: number,
    valueDone: number,
    valuePay: number,
    percent: number
}
export const ProgressBarComplete: React.FC<ProgressBarCompleteProps> = (
    {valueAll, valueDone, valuePay, percent}
    ) => {

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
                        <div className="col my-2">Оплачено</div>
                        <div className="col my-2">{valuePay}</div>
                    </div>
                    <div className="col">
                        <div className="col my-2">К Оплате</div>
                        <div className="col my-2">{valueDone - valuePay}</div>
                    </div>
                </div>
            </div>
        </div>
    )
}