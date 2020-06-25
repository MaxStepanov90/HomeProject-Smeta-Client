import {DELETE_ESTIMATE, FIND_ESTIMATE_BY_ID, FIND_ESTIMATES_BY_PROJECT_ID} from "../actionTypes/estimateActionTypes";
import {IEstimate} from "../../interfaces/IEstimate.";
import {Dispatch} from "react";
import {Links} from "../../utils/Links";
import {showAppMessage} from "./appActions";
import {MyToastMessageText} from "../../utils/MyToastMessageText";
import {MyToastMessageType} from "../../utils/MyToastMessageType";
import {INewEstimate} from "../../interfaces/INewEstimate";

const findAllEstimatesByProjectIdSuccess = (estimates: IEstimate[]) => {
    return {
        type: FIND_ESTIMATES_BY_PROJECT_ID,
        payload: estimates
    }
}
const findEstimateByIdSuccess = (estimate: IEstimate) => {
    return {
        type: FIND_ESTIMATE_BY_ID,
        payload: estimate
    }
}
const deleteEstimateSuccess = (estimateId: number) => {
    return {
        type: DELETE_ESTIMATE,
        payload: estimateId
    }
}
export function findAllEstimatesByProjectId(projectId: number): (dispatch: Dispatch<any>) => void {
    return async (dispatch) => {
        try {
            await fetch(Links.FindAllEstimatesByProjectId + projectId)
                .then(response => response.json())
                .then((estimates: IEstimate[]) => {
                    dispatch(findAllEstimatesByProjectIdSuccess(estimates))
                })
        } catch (e) {
            dispatch(showAppMessage(MyToastMessageText.ErrorRequestServer, MyToastMessageType.Error))
        }
    }
}
export function findEstimateById(estimateId: number){
    return async (dispatch: Dispatch<any>) => {
        try {
            await  fetch(Links.FindEstimateById + estimateId)
                .then(response => response.json())
                .then((estimate) => {
                if (estimate){
                    dispatch(findEstimateByIdSuccess(estimate))
                }
            })
        } catch (e) {
            dispatch(showAppMessage(MyToastMessageText.ErrorRequestServer,MyToastMessageType.Error))
        }
    }
}

export function deleteEstimate(estimateId: number) {
    return async (dispatch: Dispatch<any>) => {
        try {
            await fetch(Links.DeleteEstimate + estimateId, {method: 'DELETE'})
                .then(() => {
                    dispatch(deleteEstimateSuccess(estimateId))
                    dispatch(showAppMessage(MyToastMessageText.SuccessDelete, MyToastMessageType.Success))
                })
        } catch (e) {
            dispatch(showAppMessage(MyToastMessageText.SomeError, MyToastMessageType.Error))
        }
    }
}

export function saveNewEstimate(estimate: INewEstimate) {
    return async (dispatch: Dispatch<any>) => {
        try {
            const headers = new Headers();
            headers.append('Content-Type', 'application/json');
            await fetch(Links.SaveEstimate, {
                method: 'PUT',
                body: JSON.stringify(estimate),
                headers
            })
                .then(response => response.json())
                .then(estimate => {
                    if (estimate) {
                        dispatch(showAppMessage(MyToastMessageText.SuccessSave, MyToastMessageType.Success))
                    }
                })
        } catch (e) {
            dispatch(showAppMessage(MyToastMessageText.SomeError, MyToastMessageType.Error))
        }
    }
}
