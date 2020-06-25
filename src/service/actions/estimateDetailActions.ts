import {Dispatch} from "react";
import {Links} from "../../utils/Links";
import {showAppMessage} from "./appActions";
import {MyToastMessageText} from "../../utils/MyToastMessageText";
import {MyToastMessageType} from "../../utils/MyToastMessageType";
import {IEstimateDetail} from "../../interfaces/IEstimateDetail";
import {DELETE_ESTIMATE_DETAIL, FIND_ALL_ESTIMATE_DETAILS} from "../actionTypes/estimateDetailActionTypes";


const findAllEstimateDetailsSuccess = (estimateDetails: IEstimateDetail[]) => {
    return {
        type: FIND_ALL_ESTIMATE_DETAILS,
        payload: estimateDetails
    }
}
const deleteEstimateDetailSuccess = (estimateDetailId: number) => {
    return {
        type: DELETE_ESTIMATE_DETAIL,
        payload: estimateDetailId
    }
}

export function findAllEstimateDetails(estimateId: number) {
    return async (dispatch: Dispatch<any>) => {
        try {
            await fetch(Links.FindAllEstimateDetails + estimateId)
                .then(response => response.json())
                .then((estimateDetails: IEstimateDetail[]) => {
                    dispatch(findAllEstimateDetailsSuccess(estimateDetails))
                })
        } catch (e) {
            dispatch(showAppMessage(MyToastMessageText.ErrorRequestServer, MyToastMessageType.Error))
        }
    }
}
export function deleteEstimateDetail(estimateDetailId: number) {
    return async (dispatch: Dispatch<any>) => {
        try {
            await fetch(Links.DeleteEstimateDetail + estimateDetailId, {method: 'DELETE'})
                .then(() => {
                    dispatch(deleteEstimateDetailSuccess(estimateDetailId))
                    dispatch(showAppMessage(MyToastMessageText.SuccessDelete, MyToastMessageType.Success))
                })
        } catch (e) {
            dispatch(showAppMessage(MyToastMessageText.SomeError, MyToastMessageType.Error))
        }
    }
}

export function updateEstimateDetail(estimateDetail: IEstimateDetail) {
    return async (dispatch: Dispatch<any>) => {
        try {
            const headers = new Headers();
            headers.append('Content-Type', 'application/json');
            await fetch(Links.UpdateEstimateDetail, {
                method: 'PUT',
                body: JSON.stringify(estimateDetail),
                headers
            })
                .then(response => response.json())
                .then(estimateDetail => {
                    if (estimateDetail) {
                        dispatch(findAllEstimateDetails(estimateDetail.estimateId))
                    }
                })
        } catch (e) {
            dispatch(showAppMessage(MyToastMessageText.SomeError, MyToastMessageType.Error))
        }
    }
}
