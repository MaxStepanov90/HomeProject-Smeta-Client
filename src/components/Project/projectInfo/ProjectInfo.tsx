import React from "react";
import {MyToast} from "../../Generic/MyToast/MyToast";
import {ProjectInfoTable} from "./ProjectInfoTable";
import {RouteComponentProps} from "react-router-dom";
import {IEstimate} from "../../../interfaces/IEstimate.";
import {ProjectInfoDescription} from "./ProjectInfoDescription";

type ProjectInfoState = {
    estimates: IEstimate[],
    estimateName: string,
    visible: boolean,
    projectId: number,
    show: boolean,
    projectName: string,
    projectAddress: string,
    projectContract: string,
    projectDescription: string,
    projectCreationDate: string,
    projectOwner: string
}
export default class ProjectInfo extends React.Component<RouteComponentProps, ProjectInfoState> {
    constructor(props: RouteComponentProps) {
        super(props);
        this.state = {
            estimates: [],
            estimateName: '',
            visible: false,
            projectId: (this.props.match.params as any).id,
            show: false,
            projectName: '',
            projectAddress: '',
            projectContract: '',
            projectCreationDate: '',
            projectDescription: '',
            projectOwner: ''
        }
    }

    componentDidMount() {
        const projectId = this.state.projectId;
        if (projectId) {
            this.findProjectById(projectId);
            this.findAllEstimatesByProjectId(projectId);
        }
    }

    findProjectById = (projectId: number): void => {
        fetch("http://localhost:8080/remsmet/projects/" + projectId)
            .then(response => response.json())
            .then((project) => {
                if (project) {
                    this.setState({
                        projectId: project.id,
                        projectName: project.projectName,
                        projectAddress: project.projectAddress,
                        projectContract: project.projectContract,
                        projectCreationDate: project.projectCreationDate,
                        projectDescription: project.projectDescription,
                        projectOwner: project.projectOwner
                    })
                }
            }).catch((error) => {
            console.error('Error' + error)
        });

    };

    findAllEstimatesByProjectId(projectId: number): void {
        fetch("http://localhost:8080/remsmet/estimates/projectId/" + projectId)
            .then(response => response.json())
            .then((data) => {
                this.setState({
                    estimates: data
                })
            });
    }

    deleteEstimate = (estimateId: number): void => {
        fetch("http://localhost:8080/remsmet/estimates/" + estimateId, {
            method: 'DELETE'
        })
            .then(response => response.json())
            .then(estimate => {
                if (estimate) {
                    this.setState({show: true});
                    setTimeout(() => this.setState({show: false}), 3000);
                    this.setState({
                        estimates: this.state.estimates.filter(estimate => estimate.id !== estimateId)
                    });
                } else {
                    this.setState({show: false});
                }
            })
    };


    sumAllEstimateCost = (estimates: IEstimate[]): number => {
        let sum = 0;
        for (let i = 0; i < estimates.length; i++) {
            sum += estimates[i].estimateCost;
        }
        return sum
    };

    percentageEstimateDone = (estimate: IEstimate): number => {
        const result = Math.ceil(estimate.estimatePerformance / (estimate.estimateCost / 100));
        if (isNaN(result)){
            return 0
        }
        return result;
    };

    onChangeVisible = (): void => {
        this.setState({visible: !this.state.visible});
    };

    render() {

        const {
            estimates, projectContract, projectName, projectAddress, projectDescription, projectOwner,
            show, estimateName, projectId, visible
        } = this.state;
        const sumAllEstimatesCost = this.sumAllEstimateCost(estimates)
        const buttonText = this.state.visible ? "скрыть детали" : "подробнее...";

        return (
            <div className="border border-dark bg-white m-3">
                <MyToast show={show} message={"Смета удалена"} type={"danger"}/>
                <div className="container-fluid my-4">
                    <ProjectInfoDescription projectName={projectName}
                                            projectAddress={projectAddress}
                                            projectContract={projectContract}
                                            projectDescription={projectDescription}
                                            projectOwner={projectOwner}
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
                                          projectId={projectId}
                                          onDeleteEstimate={this.deleteEstimate}
                        />
                    </div>
                </div>
            </div>
        )
    }
}