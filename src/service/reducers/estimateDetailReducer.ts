import {IEstimateDetail} from "../../interfaces/IEstimateDetail";
import {DELETE_ESTIMATE_DETAIL, FIND_ALL_ESTIMATE_DETAILS} from "../actionTypes/estimateDetailActionTypes";
import {Category} from "../../utils/Category";

const initialState = {
    estimateDetails: [],
    estimateDetailsWork: [],
    estimateDetailsMaterial: [],
}
type EstimateDetailAction = {
    type: "FIND_ALL_ESTIMATE_DETAILS" | "DELETE_ESTIMATE_DETAIL",
    payload: IEstimateDetail[] | number | any
}
type EstimateDetailState = {
    estimateDetails: IEstimateDetail[],
    estimateDetailsWork: IEstimateDetail[],
    estimateDetailsMaterial: IEstimateDetail[],
}

export const estimateDetailReducer = (state: EstimateDetailState = initialState, action: EstimateDetailAction) => {
    switch (action.type) {
        case FIND_ALL_ESTIMATE_DETAILS:
            return {
                ...state,
                estimateDetails: action.payload,
                estimateDetailsWork: action.payload.filter((estimateDetail: { category: Category; }) =>
                    estimateDetail.category === Category.Works),
                estimateDetailsMaterial: action.payload.filter((estimateDetail: { category: Category; }) =>
                    estimateDetail.category === Category.Materials),
            }
        case DELETE_ESTIMATE_DETAIL:
            return {
                ...state,
                estimateDetails: state.estimateDetails.filter(estimateDetail =>
                    estimateDetail.id !== action.payload),
                estimateDetailsWork: state.estimateDetailsWork.filter(estimateDetail =>
                    estimateDetail.id !== action.payload),
                estimateDetailsMaterial: state.estimateDetailsMaterial.filter(estimateDetail =>
                    estimateDetail.id !== action.payload),
            }
        default:
            return state
    }
}