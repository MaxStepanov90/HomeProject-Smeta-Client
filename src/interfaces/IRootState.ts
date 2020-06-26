import {IMarkUp} from "./IMarkUp";
import {IPayment} from "./IPayment";

export interface IRootState {
    app: {
        show: boolean,
        messageText: string,
        messageType: string
    },
    markUps: {
        markUps: IMarkUp[],
        markUp: {
            id: number,
            markUpName: string,
            markUpPercent: number
        },
    },
    payments: {
        payments: IPayment[],
    }
}