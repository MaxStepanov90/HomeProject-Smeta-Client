import React, {Component, Fragment} from "react";
import {Tab, Tabs} from "react-bootstrap";
import TabGeneral from "./TabGeneral/TabGeneral";
import TabWorks from "./TabWorks";
import TabMaterials from "./TabMaterials";
import TabClient from "./TabClient/TabClient";
import MyToast from "../../Generic/MyToast";

export default class EstimateDetailsTabs extends Component {
    constructor(props) {
        super(props);
        this.state = {
            estimateId: this.props.match.params.id,
            estimateDetails: [],
            estimateDetailsWork: [],
            estimateDetailsMaterial: [],
            activeTab: 1,
            complete: false,
        };
        this.handleSelect = this.handleSelect.bind(this);
    }

    componentDidMount() {
        const estimateId = this.state.estimateId;
        if (estimateId) {
            this.findEstimateById(estimateId);
            this.findAllEstimateDetails(estimateId);
        }
    }

    findEstimateById = (estimateId) => {
        fetch("http://localhost:8080/remsmet/estimates/" + estimateId)
            .then(response => response.json())
            .then((estimate) => {
                if (estimate) {
                    this.setState({
                        estimateId: estimate.id,
                        estimateName: estimate.estimateName
                    })
                }
            }).catch((error) => {
            console.error('Error' + error)
        });
    };

    findAllEstimateDetails(estimateId) {
        fetch("http://localhost:8080/remsmet/estimateDetails/estimateId/" + estimateId)
            .then(response => response.json())
            .then((data) => {
                this.setState({
                    estimateDetails: data
                })
                this.setState({
                    estimateDetailsWork: this.filterToEstimateDetailsWork(this.state.estimateDetails),
                    estimateDetailsMaterial: this.filterToEstimateDetailsMaterial(this.state.estimateDetails)
                })
            });
    }

    deleteEstimateDetail = (estimateDetailId) => {
        fetch("http://localhost:8080/remsmet/estimateDetails/" + estimateDetailId, {
            method: 'DELETE'
        })
            .then(response => response.json())
            .then(estimateDetail => {
                if (estimateDetail) {
                    this.setState({"show": true});
                    setTimeout(() => this.setState({"show": false}), 3000);
                    this.setState({
                        estimateDetails: this.state.estimateDetails.filter(estimateDetail =>
                            estimateDetail.id !== estimateDetailId)
                    })
                    this.setState({
                        estimateDetailsWork: this.filterToEstimateDetailsWork(this.state.estimateDetails),
                        estimateDetailsMaterial: this.filterToEstimateDetailsMaterial(this.state.estimateDetails)
                    })
                } else {
                    this.setState({"show": false});
                }
            });
    };

    updateEstimateDetail = (estimateDetail) => {

        const headers = new Headers();
        headers.append('Content-Type', 'application/json');

        fetch("http://localhost:8080/remsmet/estimateDetails", {
            method: 'PUT',
            body: JSON.stringify(estimateDetail),
            headers
        })
            .then(response => response.json())
    };

    filterToEstimateDetailsWork = (estimateDetails) => {
        return estimateDetails.filter(estimateDetail => estimateDetail.category === 'работы')
    }

    filterToEstimateDetailsMaterial = (estimateDetails) => {
        return estimateDetails.filter(estimateDetail => estimateDetail.category === 'материалы')
    }

    calcEstimateDetailsByCategory = (array) => {
        let sum = 0;
        for (let i = 0; i < array.length; i++) {
            sum += array[i].cost;
        }
        return sum
    };

    calcEstimateDetailsByCategoryWithMarkUp = (array) => {
        let sum = 0;
        for (let i = 0; i < array.length; i++) {
            sum += array[i].costClient;
        }
        return sum
    };

    calcEstimateDetailsWithMarkUp = (estimateDetails) => {
        let sum = 0;
        for (let i = 0; i < estimateDetails.length; i++) {
            sum += estimateDetails[i].costClient;
        }
        return sum
    };

    calcEstimateDetailsByCategoryCompleteTrue = (array) => {
        let sum = 0;
        for (let i = 0; i < array.length; i++) {
            if (array[i].complete === true) {
                sum += array[i].costClient;
            }
        }
        return sum
    }

    calcPercentOfEstimateDetailsByCategoryComplete = (sumOfAllComplete, sumOfAllWithMarkUp) => {
        return Math.ceil(sumOfAllComplete / (sumOfAllWithMarkUp / 100))
    }

    handleSelect(selectedTab) {
        this.setState({
            activeTab: selectedTab,
        });
        if (selectedTab === '2') {
            this.setState({
                estimateDetailsWork: this.filterToEstimateDetailsWork(this.state.estimateDetails)
            })
        }
        if (selectedTab === '3') {
            this.setState({
                estimateDetailsMaterial: this.filterToEstimateDetailsMaterial(this.state.estimateDetails)
            })
        }
    }

    toggleCompleteWork = (id) => {
        this.setState({
            estimateDetailsWork: this.state.estimateDetailsWork.map(estimateDetail => {
                    if (estimateDetail.id === id) {
                        estimateDetail.complete = !estimateDetail.complete;
                        this.updateEstimateDetail(estimateDetail);
                    }
                    return estimateDetail;
                }
            )
        })
    }

    toggleCompleteMaterial = (id) => {
        this.setState({
            estimateDetailsMaterial: this.state.estimateDetailsMaterial.map(estimateDetail => {
                    if (estimateDetail.id === id) {
                        estimateDetail.complete = !estimateDetail.complete;
                        this.updateEstimateDetail(estimateDetail);
                    }
                    return estimateDetail;
                }
            )
        })
    };

    render() {
        const {
            estimateDetails, estimateName, estimateId, estimateDetailsMaterial, estimateDetailsWork, show,
            activeTab
        } = this.state;

        const sumOfWorks = this.calcEstimateDetailsByCategory(estimateDetailsWork);
        const sumOfMaterials = this.calcEstimateDetailsByCategory(estimateDetailsMaterial);
        const sumOfWorksWithMarkUp = this.calcEstimateDetailsByCategoryWithMarkUp(this.state.estimateDetailsWork);
        const sumOfMaterialsWithMarkUp = this.calcEstimateDetailsByCategoryWithMarkUp(
            this.state.estimateDetailsMaterial);
        const sumOfWorksComplete = this.calcEstimateDetailsByCategoryCompleteTrue(this.state.estimateDetailsWork);
        const sumOfMaterialsComplete = this.calcEstimateDetailsByCategoryCompleteTrue(
            this.state.estimateDetailsMaterial)
        const sumOfMarkUpFromWorks = Math.round((sumOfWorksWithMarkUp - sumOfWorks) * 100) / 100;
        const sumOfMarkUpFromMaterials = Math.round((sumOfMaterialsWithMarkUp - sumOfMaterials) * 100) / 100;
        const sumOfAllEstimateDetails = this.calcEstimateDetailsWithMarkUp(estimateDetails);
        const percentOfWorksComplete = this.calcPercentOfEstimateDetailsByCategoryComplete(
            sumOfWorksComplete, sumOfWorksWithMarkUp);
        const percentOfMaterialsComplete = this.calcPercentOfEstimateDetailsByCategoryComplete(
            sumOfMaterialsComplete, sumOfMaterialsWithMarkUp);

        return (
            <Fragment>
                    <MyToast show={show} message={"Позиция удалена."} type={"danger"}/>
                <div className="border border-dark bg-white m-3">
                    <Tabs activeKey={activeTab} defaultActiveKey={0} onSelect={this.handleSelect}>
                        <Tab eventKey={1} title="Общая смета">
                            <TabGeneral estimateName={estimateName}
                                        estimateDetails={estimateDetails}
                                        estimateId={estimateId}
                                        onDeleteEstimateDetail={this.deleteEstimateDetail}
                                        sumOfWorks={sumOfWorks}
                                        sumOfMaterials={sumOfMaterials}
                                        sumOfMarkUpFromWorks={sumOfMarkUpFromWorks}
                                        sumOfMarkUpFromMaterials={sumOfMarkUpFromMaterials}
                                        sumOfWorksWithMarkUp={sumOfWorksWithMarkUp}
                                        sumOfMaterialsWithMarkUp={sumOfMaterialsWithMarkUp}
                                        sumOfAllEstimateDetails={sumOfAllEstimateDetails}
                            />
                        </Tab>
                        <Tab eventKey={2} title="Смета работ">
                            <TabWorks estimateName={estimateName}
                                      estimateDetailsWork={estimateDetailsWork}
                                      onChange={this.toggleCompleteWork}
                                      percent={percentOfWorksComplete}
                                      valueAll={sumOfWorksWithMarkUp}
                                      valueDone={sumOfWorksComplete}
                                      valueTo={sumOfWorksWithMarkUp - sumOfWorksComplete}
                            />
                        </Tab>
                        <Tab eventKey={3} title="Смета закупок">
                            <TabMaterials estimateName={estimateName}
                                          estimateDetailsMaterial={estimateDetailsMaterial}
                                          onChange={this.toggleCompleteMaterial}
                                          percent={percentOfMaterialsComplete}
                                          valueAll={sumOfMaterialsWithMarkUp}
                                          valueDone={sumOfMaterialsComplete}
                                          valueTo={sumOfMaterialsWithMarkUp - sumOfMaterialsComplete}
                            />
                        </Tab>
                        <Tab eventKey={4} title="Смета клиента">
                            <TabClient estimateName={estimateName}
                                       estimateDetails={estimateDetails}
                                       estimateId={estimateId}
                                       sumOfWorksWithMarkUp={sumOfWorksWithMarkUp}
                                       sumOfMaterialsWithMarkUp={sumOfMaterialsWithMarkUp}
                                       sumOfAllEstimateDetails={sumOfAllEstimateDetails}
                            />
                        </Tab>
                    </Tabs>
                </div>
            </Fragment>
        )
    }
}