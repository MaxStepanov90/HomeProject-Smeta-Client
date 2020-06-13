import React, {Fragment} from "react";
import {Tab, Tabs} from "react-bootstrap";
import {GeneralTab} from "./generalTab/GeneralTab";
import {CategoryTab} from "./categoryTab/CategoryTab";
import {ClientTab} from "./clientTab/ClientTab";
import {MyToast} from "../../Generic/MyToast/MyToast";
import {IEstimateDetail} from "../../../interfaces/IEstimateDetail";
import {IPayment} from "../../../interfaces/IPayment";
import {RouteComponentProps} from "react-router-dom";

type EstimateDetailsTabsState = {
    estimateId: number,
    estimateName: string,
    estimateDetails: IEstimateDetail[],
    estimateDetailsWork: IEstimateDetail[],
    estimateDetailsMaterial: IEstimateDetail[],
    payments: IPayment[],
    paymentsWork: IPayment[],
    paymentsMaterial: IPayment[],
    activeTab: string,
    complete: boolean,
    show: boolean,
    response: Response | null,
    headers: Headers | null
}

export default class EstimateDetailsTabs
    extends React.Component<RouteComponentProps, EstimateDetailsTabsState> {
    constructor(props: RouteComponentProps) {
        super(props);
        this.state = {
            estimateId: (this.props.match.params as any).id,
            estimateName: '',
            estimateDetails: [],
            payments: [],
            estimateDetailsWork: [],
            estimateDetailsMaterial: [],
            paymentsWork: [],
            paymentsMaterial: [],
            activeTab: '1',
            complete: false,
            show: false,
            response: null,
            headers: null,
        };
    }

    componentDidMount() {
        const estimateId = this.state.estimateId;
        if (estimateId) {
            this.findEstimateById(estimateId);
            this.findAllEstimateDetails(estimateId);
            this.findAllPayments(estimateId);
        }
    }

    findEstimateById = (estimateId: number): void => {
        fetch("http://localhost:8080/remsmet/estimates/" + estimateId)
            .then(response => response.json())
            .then((estimate) => {
                if (estimate) {
                    this.setState({
                        estimateId: estimate.id,
                        estimateName: estimate.estimateName,
                    })
                }
            }).catch((error) => {
            console.error('Error' + error)
        });
    };

    findAllEstimateDetails(estimateId: number): void {
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

    findAllPayments(estimateId: number): void {
        fetch("http://localhost:8080/remsmet/payments/estimateId/" + estimateId)
            .then(response => response.json())
            .then((data) => {
                this.setState({
                    payments: data
                })
                this.setState({
                    paymentsWork: this.state.payments.filter(payment => payment.category === 'работы'),
                    paymentsMaterial: this.state.payments.filter(payment => payment.category === 'материалы')
                })
            });
    }

    deleteEstimateDetail = (estimateDetailId: number): void => {
        fetch("http://localhost:8080/remsmet/estimateDetails/" + estimateDetailId, {
            method: 'DELETE'
        })
            .then(response => response.json())
            .then(estimateDetail => {
                if (estimateDetail) {
                    this.setState({show: true});
                    setTimeout(() => this.setState({show: false}), 3000);
                    this.setState({
                        estimateDetails: this.state.estimateDetails.filter(estimateDetail =>
                            estimateDetail.id !== estimateDetailId)
                    })
                    this.setState({
                        estimateDetailsWork: this.filterToEstimateDetailsWork(this.state.estimateDetails),
                        estimateDetailsMaterial: this.filterToEstimateDetailsMaterial(this.state.estimateDetails)
                    })
                } else {
                    this.setState({show: false});
                }
            });
    };

    updateEstimateDetail = (estimateDetail: IEstimateDetail): void => {

        const headers = new Headers();
        headers.append('Content-Type', 'application/json');

        fetch("http://localhost:8080/remsmet/estimateDetails", {
            method: 'PUT',
            body: JSON.stringify(estimateDetail),
            headers
        })
            .then(response => response.json())
    };

    downloadExcelByCategory = (category: string): void => {
        fetch("http://localhost:8080/remsmet/download/excel/estimateId/"
            + this.state.estimateId + "/category/" + category, {
            method: 'GET'
        }).then(response => {
            if (response.headers.has('Content-Disposition') != null) {
                // @ts-ignore
                const filename: string = response.headers.get('Content-Disposition').split('filename=')[1];
                response.blob().then(blob => {
                    let url = window.URL.createObjectURL(blob);
                    let a = document.createElement('a');
                    a.href = url;
                    a.download = filename;
                    a.click();
                });
            }
        })
    };

    filterToEstimateDetailsWork = (estimateDetails: IEstimateDetail[]): IEstimateDetail[] => {
        return estimateDetails.filter(estimateDetail => estimateDetail.category === 'работы')
    }

    filterToEstimateDetailsMaterial = (estimateDetails: IEstimateDetail[]): IEstimateDetail[] => {
        return estimateDetails.filter(estimateDetail => estimateDetail.category === 'материалы')
    }

    calcPaymentsByCategory = (array: any[]) => {
        let sum = 0;
        for (let i = 0; i < array.length; i++) {
            sum += array[i].amount;
        }
        return sum
    }

    calcEstimateDetailsByCategory = (array: any[]) => {
        let sum = 0;
        for (let i = 0; i < array.length; i++) {
            sum += array[i].cost;
        }
        return sum
    }

    calcEstimateDetailsByCategoryWithMarkUp = (array: any[]) => {
        let sum = 0;
        for (let i = 0; i < array.length; i++) {
            sum += array[i].costClient;
        }
        return sum
    };

    calcEstimateDetailsByCategoryCompleteTrue = (array: any[]): number => {
        let sum = 0;
        for (let i = 0; i < array.length; i++) {
            if (array[i].complete) {
                sum += array[i].costClient;
            }
        }
        return sum
    }

    calcPercentOfEstimateDetailsByCategoryComplete = (sumOfAllComplete: number, sumOfAllWithMarkUp: number): number => {
        return Math.ceil(sumOfAllComplete / (sumOfAllWithMarkUp / 100))
    }

    handleSelect(activeTab: string): void {
        this.setState({
            activeTab: activeTab,
        });
        if (activeTab === '2') {
            this.setState({
                estimateDetailsWork: this.filterToEstimateDetailsWork(this.state.estimateDetails)
            })
        }
        if (activeTab === '3') {
            this.setState({
                estimateDetailsMaterial: this.filterToEstimateDetailsMaterial(this.state.estimateDetails)
            })
        }
    }

    toggleCompleteWork = (id: number): void => {
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

    toggleCompleteMaterial = (id: number): void => {
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
            activeTab, paymentsWork, paymentsMaterial
        } = this.state;

        const sumOfWorks = this.calcEstimateDetailsByCategory(estimateDetailsWork);
        const sumOfMaterials = this.calcEstimateDetailsByCategory(estimateDetailsMaterial);
        const sumOfWorksWithMarkUp = this.calcEstimateDetailsByCategoryWithMarkUp(estimateDetailsWork);
        const sumOfMaterialsWithMarkUp = this.calcEstimateDetailsByCategoryWithMarkUp(
            this.state.estimateDetailsMaterial);
        const sumOfWorksComplete = this.calcEstimateDetailsByCategoryCompleteTrue(estimateDetailsWork);
        const sumOfMaterialsComplete = this.calcEstimateDetailsByCategoryCompleteTrue(
            this.state.estimateDetailsMaterial)
        const sumOfMarkUpFromWorks = Math.round((sumOfWorksWithMarkUp - sumOfWorks) * 100) / 100;
        const sumOfMarkUpFromMaterials = Math.round((sumOfMaterialsWithMarkUp - sumOfMaterials) * 100) / 100;
        const percentOfWorksComplete = this.calcPercentOfEstimateDetailsByCategoryComplete(
            sumOfWorksComplete, sumOfWorksWithMarkUp);
        const percentOfMaterialsComplete = this.calcPercentOfEstimateDetailsByCategoryComplete(
            sumOfMaterialsComplete, sumOfMaterialsWithMarkUp);
        const sumOfPaymentsWork = this.calcPaymentsByCategory(paymentsWork)
        const sumOfPaymentsMaterial = this.calcPaymentsByCategory(paymentsMaterial)

        return (
            <Fragment>
                <MyToast show={show} message={"Позиция удалена."} type={"danger"}/>
                <div className="border border-dark bg-white m-3">
                    <Tabs id="estimateDetailTabs"
                          activeKey={activeTab}
                          onSelect={(activeTab: string) => this.handleSelect(activeTab)}>
                        <Tab eventKey={1} title="Общая смета">
                            <GeneralTab estimateName={estimateName}
                                        estimateDetails={estimateDetails}
                                        estimateId={estimateId}
                                        onDeleteEstimateDetail={this.deleteEstimateDetail}
                                        sumOfWorks={sumOfWorks}
                                        sumOfMaterials={sumOfMaterials}
                                        sumOfMarkUpFromWorks={sumOfMarkUpFromWorks}
                                        sumOfMarkUpFromMaterials={sumOfMarkUpFromMaterials}
                                        sumOfWorksWithMarkUp={sumOfWorksWithMarkUp}
                                        sumOfMaterialsWithMarkUp={sumOfMaterialsWithMarkUp}
                            />
                        </Tab>
                        <Tab eventKey={2} title="Смета работ">
                            <CategoryTab estimateName={estimateName}
                                         category={"работы"}
                                         categoryEstimateDetails={estimateDetailsWork}
                                         onChange={this.toggleCompleteWork}
                                         onDownloadExcel={this.downloadExcelByCategory}
                                         percent={percentOfWorksComplete}
                                         valueAll={sumOfWorksWithMarkUp}
                                         valueDone={sumOfWorksComplete}
                                         valuePay={sumOfPaymentsWork}
                            />
                        </Tab>
                        <Tab eventKey={3} title="Смета закупок">
                            <CategoryTab estimateName={estimateName}
                                         category={"материалы"}
                                         categoryEstimateDetails={estimateDetailsMaterial}
                                         onChange={this.toggleCompleteMaterial}
                                         onDownloadExcel={this.downloadExcelByCategory}
                                         percent={percentOfMaterialsComplete}
                                         valueAll={sumOfMaterialsWithMarkUp}
                                         valueDone={sumOfMaterialsComplete}
                                         valuePay={sumOfPaymentsMaterial}
                            />
                        </Tab>
                        <Tab eventKey={4} title="Смета клиента">
                            <ClientTab estimateName={estimateName}
                                       estimateDetails={estimateDetails}
                                       estimateId={estimateId}
                                       sumOfWorksWithMarkUp={sumOfWorksWithMarkUp}
                                       sumOfMaterialsWithMarkUp={sumOfMaterialsWithMarkUp}
                            />
                        </Tab>
                    </Tabs>
                </div>
            </Fragment>
        )
    }
}