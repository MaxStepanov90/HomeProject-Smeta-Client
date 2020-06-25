import * as types from "../actionTypes/appActionTypes";
import {Dispatch} from "react";

export function showAppMessage(messageText: string, messageType: string) {
    console.log("text", messageText)
    console.log("type", messageType)
    return (dispatch: Dispatch<any>) => {
        dispatch({
            type: types.SHOW_APP_MESSAGE,
            payload: {
                messageText,
                messageType
            }
        })
        setTimeout(() => {
            dispatch(hideAppMessage())
        }, 2000)
    }
}
export function hideAppMessage() {
    return {
        type: types.HIDE_APP_MESSAGE
    }
}
