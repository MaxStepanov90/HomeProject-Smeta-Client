import React, {Dispatch} from "react";
import {MyToast} from "../../Generic/MyToast/MyToast";
import {ProjectInfoTable} from "./ProjectInfoTable";
import {RouteComponentProps} from "react-router-dom";
import {IEstimate} from "../../../interfaces/IEstimate.";
import {ProjectInfoDescription} from "./ProjectInfoDescription";
import {findProjectById} from "../../../service/actions/projectActions";
import {connect} from "react-redux";
import {deleteEstimate, findAllEstimatesByProjectId} from "../../../service/actions/estimateActions";

type ProjectInfoProps = {
    show: any,
    messageText: any,
    messageType: any,
    project: any,
    estimates: any [],
    findProjectById: (projectId: number) => void,
    findAllEstimatesByProjectId: (projectId: number) => void,
    deleteEstimate: (estimateId: number) => void,
}

type ProjectInfoState = {
    estimates: IEstimate[],
    estimateName: string,
    visible: boolean,
    projectId: number,
    show: boolean
}
class ProjectInfo extends React.Component<ProjectInfoProps&RouteComponentProps, ProjectInfoState> {
    constructor(props: ProjectInfoProps&RouteComponentProps) {
        super(props);
        this.state = {
            estimates: [],
            estimateName: '',
            visible: false,
            projectId: (this.props.match.params as any).id,
            show: false
        }
    }

    componentDidMount() {
        const projectId = this.state.projectId;
        if (projectId) {
            this.props.findProjectById(projectId);
            this.props.findAllEstimatesByProjectId(projectId);
        }
    }

    sumAllEstimateCost = (estimates: IEstimate[]): number => {
        let sum = 0;
        for (let i = 0; i < estimates.length; i++) {
            sum += estimates[i].cost;
        }
        return sum
    };

    percentageEstimateDone = (estimate: IEstimate): number => {
        const result = Math.ceil(estimate.performance / (estimate.cost / 100));
        if (isNaN(result)) {
            return 0
        }
        return result;
    };

    onChangeVisible = (): void => {
        this.setState({visible: !this.state.visible});
    };

    render() {

        const {estimateName, visible} = this.state;
        const project = this.props.project;
        const estimates = this.props.estimates;
        const sumAllEstimatesCost = this.sumAllEstimateCost(estimates)
        const buttonText = this.state.visible ? "скрыть детали" : "подробнее...";

        return (
            <div className="border border-dark bg-white m-3">
                <MyToast show={this.props.show} message={this.props.messageText} type={this.props.messageType}/>
                <div className="container-fluid my-4">
                    <ProjectInfoDescription projectName={project.name}
                                            projectAddress={project.address}
                                            projectContract={project.contract}
                                            projectDescription={project.description}
                                            projectOwner={project.owner}
                                            estimates={estimates}
                                            sumAllEstimateCost={sumAllEstimatesCost}
                                            buttonText={buttonText}
                                            visible={visible}
                                            onChangeVisible={this.onChangeVisible}
                                            onPercentageEstimateDone={this.percentageEstimateDone}
                    />
                    <div className="container my-5">
                        <ProjectInfoTable estimates={estimates}
                                          estimateName={estimateName}
                                          projectId={project.id}
                                          onDeleteEstimate={this.props.deleteEstimate}
                        />
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state: any) => {
    return {
        show: state.app.show,
        messageText: state.app.messageText,
        messageType: state.app.messageType,
        project: state.projects.project,
        estimates: state.estimates.estimates,
    }
}
const mapDispatchToProps = (dispatch: Dispatch<any>) => {
    return {
        findProjectById: (projectId: number) => (dispatch(findProjectById(projectId))),
        findAllEstimatesByProjectId: (projectId: number) => (dispatch(findAllEstimatesByProjectId(projectId))),
        deleteEstimate: (estimateId: number) => (dispatch(deleteEstimate(estimateId))),

    }
}
export default connect(mapStateToProps, mapDispatchToProps)(ProjectInfo)