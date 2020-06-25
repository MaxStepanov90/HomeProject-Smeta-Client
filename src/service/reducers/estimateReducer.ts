import {IEstimate} from "../../interfaces/IEstimate.";
import {DELETE_ESTIMATE, FIND_ESTIMATE_BY_ID, FIND_ESTIMATES_BY_PROJECT_ID} from "../actionTypes/estimateActionTypes";

const initialState = {
    estimates: [],
    estimate: {
        id: 0,
        name: '',
        cost: 0,
        performance: 0,
        payment: 0,
        notPayment: 0,
    }
}
type estimateReducerAction = {
    type: "FIND_ESTIMATES_BY_PROJECT_ID" | "FIND_ESTIMATE_BY_ID" | "DELETE_ESTIMATE",
    payload: IEstimate[] | IEstimate | number
}
type estimateReducerState = {
    estimates: IEstimate[],
    estimate: IEstimate
}
export const estimateReducer = (state: estimateReducerState = initialState, action: estimateReducerAction) => {
    switch (action.type) {
        case FIND_ESTIMATES_BY_PROJECT_ID:
            return {
                ...state,
                estimates: action.payload,
            }
        case FIND_ESTIMATE_BY_ID:
            return {
                ...state,
                estimate: action.payload
            }
        case DELETE_ESTIMATE:
            return {
                ...state,
                estimates: state.estimates.filter((estimate: IEstimate) => estimate.id !== action.payload)
            }
        default:
            return state;
    }
}