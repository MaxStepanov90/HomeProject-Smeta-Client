import {IPayment} from "../../interfaces/IPayment";
import {FIND_ALL_PAYMENTS_BY_ESTIMATE_ID, FIND_ALL_PAYMENTS_BY_PROJECT_ID} from "../actionTypes/paymentActionTypes";
import {Dispatch} from "react";
import {showAppMessage} from "./appActions";
import {Links} from "../../utils/Links";
import {MyToastMessageType} from "../../utils/MyToastMessageType";
import {MyToastMessageText} from "../../utils/MyToastMessageText";
import {INewEstimateDetail} from "../../interfaces/INewEstimateDetail";
import {INewPayment} from "../../interfaces/INewPayment";

const findAllPaymentsByProjectIdSuccess = (payments: IPayment[]) => {
    return {
        type: FIND_ALL_PAYMENTS_BY_PROJECT_ID,
        payload: payments
    }
}
const findAllPaymentsByEstimateIdSuccess = (payments: IPayment[]) => {
    return {
        type: FIND_ALL_PAYMENTS_BY_ESTIMATE_ID,
        payload: payments
    }
}

export function findAllPaymentsByProjectId(projectId: number) {
    return async (dispatch: Dispatch<any>) => {
        try {
            await fetch(Links.FindAllPaymentsByProjectId + projectId)
                .then(response => response.json())
                .then((payments: IPayment[]) => {
                    dispatch(findAllPaymentsByProjectIdSuccess(payments))
                })
        } catch (e) {
            dispatch(showAppMessage(MyToastMessageText.ErrorRequestServer, MyToastMessageType.Error))
        }
    }
}
export function findAllPaymentsByEstimateId(estimateId: number) {
    return async (dispatch: Dispatch<any>) => {
        try {
            await fetch(Links.FindAllPaymentsByEstimateId + estimateId)
                .then(response => response.json())
                .then((payments: IPayment[]) => {
                    dispatch(findAllPaymentsByEstimateIdSuccess(payments))
                })
        } catch (e) {
            dispatch(showAppMessage(MyToastMessageText.ErrorRequestServer, MyToastMessageType.Error))
        }
    }
}

export function saveNewPayment(payment: INewPayment) {
    return async (dispatch: Dispatch<any>) => {
        try {
            const headers = new Headers();
            headers.append('Content-Type', 'application/json');
            await fetch(Links.SavePayment, {
                method: 'POST',
                body: JSON.stringify(payment),
                headers
            })
                .then(response => response.json())
                .then(payment => {
                    if (payment) {
                        dispatch(showAppMessage(MyToastMessageText.SuccessSave, MyToastMessageType.Success))
                    }
                })
        } catch (e) {
            dispatch(showAppMessage(MyToastMessageText.SomeError, MyToastMessageType.Error))
        }
    }
}