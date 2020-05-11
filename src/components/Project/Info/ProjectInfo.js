import React, {Component} from "react";
import MyToast from "../../Generic/MyToast";
import EstimatesTable from "./EstimatesTable";
import ProjectInfoDescription from "./ProjectInfoDescription";

export default class ProjectInfo extends Component {

    constructor(props) {
        super(props);
        this.state = {
            estimates: [],
            visible: false
        }
    }

    componentDidMount() {
        const projectId = this.props.match.params.id;
        if (projectId) {
            this.findProjectById(projectId);
            this.findAllEstimatesByProjectId(projectId);
        }
    }

    findProjectById = (projectId) => {
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

    findAllEstimatesByProjectId(projectId) {
        fetch("http://localhost:8080/remsmet/estimates/projectId/" + projectId)
            .then(response => response.json())
            .then((data) => {
                this.setState({
                    estimates: data
                })
            });
    }

    deleteEstimate = (estimateId) => {
        fetch("http://localhost:8080/remsmet/estimates/" + estimateId, {
            method: 'DELETE'
        })
            .then(response => response.json())
            .then(estimate => {
                if (estimate) {
                    this.setState({"show": true});
                    setTimeout(() => this.setState({"show": false}), 3000);
                    this.setState({
                        estimates: this.state.estimates.filter(estimate => estimate.id !== estimateId)
                    });
                } else {
                    this.setState({"show": false});
                }
            })
    };


    sumAllEstimateCost = (estimates) => {
        let sum = 0;
        for (let i = 0; i < estimates.length; i++) {
            sum += estimates[i].estimateCost;
        }
        return sum
    };

    percentageEstimateDone = (estimate) => {
        return Math.ceil(estimate.estimatePerformance / (estimate.estimateCost / 100));
    };

    onChangeVisible = () => {
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
                        <EstimatesTable estimates={estimates}
                                        estimateName={estimateName}
                                        projectId={projectId}
                                        onDeleteEstimate={this.deleteEstimate}
                        />
                    </div>
                </div>
            </div>
        )
    }
};