import {combineReducers} from "redux";
import {markUpReducer} from "./markUpReducer";
import {paymentReducer} from "./paymentReducer";
import {appReducer} from "./appReducer";
import {projectReducer} from "./projectReducer";
import {estimateReducer} from "./estimateReducer";
import {estimateDetailReducer} from "./estimateDetailReducer";

export const rootReducer = combineReducers({
    app: appReducer,
    projects: projectReducer,
    estimates: estimateReducer,
    estimateDetails: estimateDetailReducer,
    markUps: markUpReducer,
    payments: paymentReducer
});
