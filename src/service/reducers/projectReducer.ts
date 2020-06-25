import {IProject} from "../../interfaces/IProject";
import {DELETE_PROJECT, FIND_ALL_PROJECTS, FIND_PROJECT_BY_ID} from "../actionTypes/projectActionTypes";

const initialState = {
    projects: [],
    project: {
        id: 0,
        name: '',
        address: '',
        contract: '',
        creationDate: '',
        description: '',
        owner: ''
    }
}
type ProjectState = {
    projects: IProject[],
    project: IProject
}
type ProjectAction = {
    type: "FIND_PROJECT_BY_ID"|"FIND_ALL_PROJECTS"|"DELETE_PROJECT",
    payload: IProject[] | number
}
export const projectReducer = (state: ProjectState = initialState, action: ProjectAction) => {
    switch (action.type) {
        case FIND_PROJECT_BY_ID:
            return {
                ...state,
                project: action.payload
            }
        case FIND_ALL_PROJECTS:
            return {
                ...state,
                projects: action.payload
            }
        case DELETE_PROJECT:
            return {
                ...state,
                projects: state.projects.filter((project: IProject) => project.id !== action.payload)
            }
        default:
            return state
    }
}