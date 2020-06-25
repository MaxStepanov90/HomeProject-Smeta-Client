import {FIND_ALL_PAYMENTS_BY_ESTIMATE_ID, FIND_ALL_PAYMENTS_BY_PROJECT_ID} from "../actionTypes/paymentActionTypes";
import {IPayment} from "../../interfaces/IPayment";
import {Category} from "../../utils/Category";

const initialState = {
    payments: [],
    paymentsWork: [],
    paymentsMaterial: []
}
type PaymentState = {
    payments: IPayment[],
    paymentsWork: IPayment[],
    paymentsMaterial: IPayment[],
}
type PaymentAction = {
    type: "FIND_ALL_PAYMENTS_BY_PROJECT_ID" | "FIND_ALL_PAYMENTS_BY_ESTIMATE_ID",
    payload: IPayment[]
}
export const paymentReducer = (state: PaymentState = initialState, action: PaymentAction) => {
    switch (action.type) {
        case FIND_ALL_PAYMENTS_BY_PROJECT_ID:
            return {
                ...state,
                payments: action.payload
            }
        case FIND_ALL_PAYMENTS_BY_ESTIMATE_ID:
            return {
                ...state,
                payments: action.payload,
                paymentsWork: action.payload.filter(
                    payment => payment.category === Category.Works),
                paymentsMaterial: action.payload.filter(
                    payment => payment.category === Category.Materials),
            }
        default:
            return state
    }
}