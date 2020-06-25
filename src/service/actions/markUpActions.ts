import {IMarkUp} from "../../interfaces/IMarkUp";
import {showAppMessage} from "./appActions";
import {DELETE_MARK_UP, FIND_ALL_MARK_UPS, FIND_MARK_UP_BY_ID} from "../actionTypes/markUpActionTypes";
import {Dispatch} from "react";
import {Links} from "../../utils/Links";
import {MessageType} from "../../utils/MessageType";
import {MessageText} from "../../utils/MessageText";

const findAllMarkUpsSuccess = (markUps: IMarkUp[]) => {
    return {
        type: FIND_ALL_MARK_UPS,
        payload: markUps
    }
}
const findMarkUpByIdSuccess = (markUp: IMarkUp) => {
    return {
        type: FIND_MARK_UP_BY_ID,
        payload: markUp
    }
}

const deleteMarkUpSuccess = (markUpId: number) => {
    return {
        type: DELETE_MARK_UP,
        payload: markUpId
    }
}
export function findAllMarkUps(): (dispatch: Dispatch<any>) => void {
    return async (dispatch) => {
        try {
            await fetch(Links.FindAllMarkUps)
                .then(response => response.json())
                .then((markUps: IMarkUp[]) => {
                    dispatch(findAllMarkUpsSuccess(markUps))
                })
        } catch (e) {
            dispatch(showAppMessage(MessageText.ErrorRequestServer, MessageType.Error))
        }
    }
}

export function findMarkUpById(markUpId: number) {
    return async (dispatch: Dispatch<any>) => {
        try {
            await fetch(Links.FindMarkUpById + markUpId)
                .then(response => response.json())
                .then((markUp: IMarkUp) => {
                    dispatch(findMarkUpByIdSuccess(markUp))
                })
        } catch (e) {
            dispatch(showAppMessage(MessageText.SomeError, MessageType.Error))
        }
    }
}

export function updateMarkUp(markUp: IMarkUp) {
    return async (dispatch: Dispatch<any>) => {
        try {
            const headers = new Headers();
            headers.append('Content-Type', 'application/json');
            await fetch(Links.UpdateMarkUp, {
                method: 'PUT',
                body: JSON.stringify(markUp),
                headers
            })
                .then(response => response.json())
                .then(markUp => {
                    if (markUp) {
                        dispatch(findAllMarkUps())
                        dispatch(showAppMessage(MessageText.SuccessPut, MessageType.Success))
                    }
                })
        } catch (e) {
            dispatch(showAppMessage(MessageText.SomeError, MessageType.Error))
        }
    }
}

export function deleteMarkUp(markUpId: number) {
    return async (dispatch: Dispatch<any>) => {
        try {
            await fetch(Links.DeleteMarkUp + markUpId, {method: 'DELETE'})
                .then(() => {
                    dispatch(deleteMarkUpSuccess(markUpId))
                    dispatch(showAppMessage(MessageText.SuccessDelete, MessageType.Success))
                })

        } catch (e) {
            dispatch(showAppMessage(MessageText.SomeError, MessageType.Error))
        }
    }
}
