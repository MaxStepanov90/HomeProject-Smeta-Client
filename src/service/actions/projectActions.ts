import {IProject} from "../../interfaces/IProject";
import {DELETE_PROJECT, FIND_ALL_PROJECTS, FIND_PROJECT_BY_ID} from "../actionTypes/projectActionTypes";
import {Dispatch} from "react";
import {showAppMessage} from "./appActions";
import {MyToastMessageText} from "../../utils/MyToastMessageText";
import {MyToastMessageType} from "../../utils/MyToastMessageType";
import {Links} from "../../utils/Links";

const findProjectByIdSuccess = (project: IProject) => {
    return {
        type: FIND_PROJECT_BY_ID,
        payload: project
    }
}

const findAllProjectsSuccess = (projects: IProject[]) => {
    return {
        type: FIND_ALL_PROJECTS,
        payload: projects
    }
}
const deleteProjectSuccess = (projectId: number) => {
    return {
        type: DELETE_PROJECT,
        payload: projectId
    }
}

export function findProjectById(projectId: number) {
    return async (dispatch: Dispatch<any>) => {
        try {
            await fetch(Links.FindProjectById + projectId)
                .then(response => response.json())
                .then((project) => {
                    if (project) {
                        dispatch(findProjectByIdSuccess(project))
                    }
                })
        } catch (e) {
            dispatch(showAppMessage(MyToastMessageText.ErrorRequestServer, MyToastMessageType.Error))
        }
    }
}

export function findAllProjects() {
    return async (dispatch: Dispatch<any>) => {
        try {
            await fetch(Links.FindAllProjects)
                .then(response => response.json())
                .then((projects) => {
                    dispatch(findAllProjectsSuccess(projects))
                })
        } catch (e) {
            dispatch(showAppMessage(MyToastMessageText.ErrorRequestServer, MyToastMessageType.Error))
        }
    }
}

export function deleteProject(projectId: number) {
    return async (dispatch: Dispatch<any>) => {
        try {
            await fetch(Links.DeleteProject + "/" + projectId, {method: 'DELETE'})
                .then(() => {
                    dispatch(deleteProjectSuccess(projectId))
                    dispatch(showAppMessage(MyToastMessageText.SuccessDelete, MyToastMessageType.Success))
                })
        } catch (e) {
            dispatch(showAppMessage(MyToastMessageText.SomeError, MyToastMessageType.Error))
        }
    }
}

export function saveNewProject(project: IProject) {
    return async (dispatch: Dispatch<any>) => {
        try {
            const headers = new Headers();
            headers.append('Content-Type', 'application/json');
            await fetch(Links.SaveProject, {
                method: 'PUT',
                body: JSON.stringify(project),
                headers
            })
                .then(response => response.json())
                .then(project => {
                    if (project) {
                        dispatch(findAllProjects())
                        dispatch(showAppMessage(MyToastMessageText.SuccessSave, MyToastMessageType.Success))
                    }
                })
        } catch (e) {
            dispatch(showAppMessage(MyToastMessageText.SomeError, MyToastMessageType.Error))
        }
    }
}