import {HIDE_APP_MESSAGE, SHOW_APP_MESSAGE} from "../actionTypes/appActionTypes";

type appReducerAction = {
    type: 'SHOW_APP_MESSAGE'|'HIDE_APP_MESSAGE',
    payload: {
        messageText: string,
        messageType: string
    }
}
type appReducerState = {
    show: boolean,
    messageText: string,
    messageType: string
}
const initialState = {
    show: false,
    messageText: "",
    messageType: ""
}

export const appReducer = (state: appReducerState = initialState, action: appReducerAction) => {

    switch (action.type) {
        case SHOW_APP_MESSAGE:
            return {
                ...state,
                show: true,
                messageText: action.payload.messageText,
                messageType: action.payload.messageType
            }
        case HIDE_APP_MESSAGE:
            return {
                ...state,
                show: false,
                messageText: "",
                messageType: ""
            }
        default:
            return state
    }
}