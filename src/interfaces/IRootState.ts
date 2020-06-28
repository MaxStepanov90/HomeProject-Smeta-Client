import {IMarkUp} from "./IMarkUp";
import {IPayment} from "./IPayment";
import {IProject} from "./IProject";
import {IEstimate} from "./IEstimate.";
import {IEstimateDetail} from "./IEstimateDetail";

export interface IRootState {
    app: {
        show: boolean,
        messageText: string,
        messageType: string
    },
    projects: {
        projects: IProject[],
        project: IProject
    }
    estimates: {
        estimates: IEstimate[]
        estimate: IEstimate
    }
    estimateDetails: {
        estimateDetails: IEstimateDetail[]
        estimateDetailsWork: IEstimateDetail[]
        estimateDetailsMaterial: IEstimateDetail[]
    }
    payments: {
        payments: IPayment[]
        paymentsWork: IPayment[]
        paymentsMaterial: IPayment[]
    }
    markUps: {
        markUps: IMarkUp[],
        markUp: {
            id: number,
            markUpName: string,
            markUpPercent: number
        },
    },
}