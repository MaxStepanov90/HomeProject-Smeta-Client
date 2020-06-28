import React, {useEffect} from "react";
import {MyToast} from "../../Generic/MyToast/MyToast";
import {ProjectInfoTable} from "./ProjectInfoTable";
import {ProjectInfoDescription} from "./ProjectInfoDescription";
import {findProjectById} from "../../../service/actions/projectActions";
import {useDispatch, useSelector} from "react-redux";
import {findAllEstimatesByProjectId} from "../../../service/actions/estimateActions";
import {IRootState} from "../../../interfaces/IRootState";

interface RouteProps {
    id: string
}

interface ProjectInfoProps extends RouteProps {
    match: any
}

const ProjectInfo: React.FC<ProjectInfoProps> = ({match}) => {

    const projectId = match.params.id
    const dispatch = useDispatch()
    const show = useSelector((state: IRootState) => state.app.show)
    const messageText = useSelector((state: IRootState) => state.app.messageText)
    const messageType = useSelector((state: IRootState) => state.app.messageType)
    const estimates = useSelector((state: IRootState) => state.estimates.estimates)

    useEffect(() => {
        if (projectId) {
            dispatch(findProjectById(projectId))
            dispatch(findAllEstimatesByProjectId(projectId))
        }
    }, [dispatch])

    return (
        <div className="border border-dark bg-white m-3">
            <MyToast show={show} message={messageText} type={messageType}/>
            <div className="container-fluid my-4">
                <ProjectInfoDescription estimates={estimates}/>
                <div className="container my-5">
                    <ProjectInfoTable estimates={estimates}
                                      projectId={projectId}
                    />
                </div>
            </div>
        </div>
    )
}
export default ProjectInfo