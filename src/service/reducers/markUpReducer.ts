import {DELETE_MARK_UP, FIND_ALL_MARK_UPS, FIND_MARK_UP_BY_ID} from "../actionTypes/markUpActionTypes";
import {IMarkUp} from "../../interfaces/IMarkUp";

const initialState = {
    markUps: [],
    markUp: {
        id: 0,
        markUpName: '',
        markUpPercent: 0
    }
}
type markUpReducerAction = {
    type: 'FIND_ALL_MARK_UPS'|'FIND_MARK_UP_BY_ID'|'DELETE_MARK_UP',
    payload: IMarkUp[] | IMarkUp | number
}
type markUpReducerState = {
    markUps: IMarkUp[],
    markUp: IMarkUp
}
export const markUpReducer = (state: markUpReducerState = initialState, action: markUpReducerAction) => {
    switch (action.type) {
        case FIND_ALL_MARK_UPS:
            return {
                ...state,
                markUps: action.payload,
            }
        case FIND_MARK_UP_BY_ID:
            return {
                ...state,
                markUp: action.payload
            }
        case DELETE_MARK_UP:
            return {
                ...state,
                markUps: state.markUps.filter((markUp: IMarkUp) => markUp.id !== action.payload)
            }
        default:
            return state;
    }
}