import React, {Dispatch, Fragment} from "react";
import {Tab, Tabs} from "react-bootstrap";
import {GeneralTab} from "./generalTab/GeneralTab";
import {CategoryTab} from "./categoryTab/CategoryTab";
import {ClientTab} from "./clientTab/ClientTab";
import {MyToast} from "../../Generic/MyToast/MyToast";
import {IEstimateDetail} from "../../../interfaces/IEstimateDetail";
import {IPayment} from "../../../interfaces/IPayment";
import {RouteComponentProps} from "react-router-dom";
import {connect} from "react-redux";
import {
    deleteEstimateDetail,
    findAllEstimateDetails,
    updateEstimateDetail
} from "../../../service/actions/estimateDetailActions";
import {findEstimateById} from "../../../service/actions/estimateActions";
import {IEstimate} from "../../../interfaces/IEstimate.";
import {findAllPaymentsByEstimateId} from "../../../service/actions/paymentActions";
import {Category} from "../../../utils/Category";

type EstimateDetailsTabsProps = {
    show: boolean,
    messageText: string,
    messageType: string,
    estimate: IEstimate,
    estimateDetails: IEstimateDetail[],
    estimateDetailsWork: IEstimateDetail[],
    estimateDetailsMaterial: IEstimateDetail[],
    payments: IPayment[],
    paymentsWork: IPayment[],
    paymentsMaterial: IPayment[],
    findAllEstimateDetails: (estimateId: number) => void,
    findEstimateById: (estimateId: number) => void,
    findAllPaymentsByEstimateId: (estimateId: number) => void,
    deleteEstimateDetail: (estimateDetailId: number) => void,
    updateEstimateDetail: (estimateDetail: IEstimateDetail) => void
}
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
    response: Response | null,
    headers: Headers | null
}

class EstimateDetailsTabs extends React.Component<EstimateDetailsTabsProps & RouteComponentProps, EstimateDetailsTabsState> {
    constructor(props: EstimateDetailsTabsProps & RouteComponentProps) {
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
            response: null,
            headers: null,
        };
    }

    componentDidMount() {
        const estimateId = this.state.estimateId;
        if (estimateId) {
            this.props.findEstimateById(estimateId);
            this.props.findAllEstimateDetails(estimateId);
            this.props.findAllPaymentsByEstimateId(estimateId);
        }
    }

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
        return estimateDetails.filter(estimateDetail => estimateDetail.category === Category.Works)
    }

    filterToEstimateDetailsMaterial = (estimateDetails: IEstimateDetail[]): IEstimateDetail[] => {
        return estimateDetails.filter(estimateDetail => estimateDetail.category === Category.Materials)
    }

    calcPaymentsByCategory = (array: any[]): number => {
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
            estimateDetailsWork: this.props.estimateDetailsWork.map(estimateDetail => {
                    if (estimateDetail.id === id) {
                        estimateDetail.complete = !estimateDetail.complete;
                        this.props.updateEstimateDetail(estimateDetail);
                    }
                    return estimateDetail;
                }
            )
        })
    }

    toggleCompleteMaterial = (id: number): void => {
        this.setState({
            estimateDetailsMaterial: this.props.estimateDetailsMaterial.map(estimateDetail => {
                    if (estimateDetail.id === id) {
                        estimateDetail.complete = !estimateDetail.complete;
                        this.props.updateEstimateDetail(estimateDetail);
                    }
                    return estimateDetail;
                }
            )
        })
    };

    render() {
        const {activeTab} = this.state;
        const estimateId = this.props.estimate.id
        const estimateName = this.props.estimate.name
        const estimateDetails = this.props.estimateDetails
        const estimateDetailsWork = this.props.estimateDetailsWork
        const estimateDetailsMaterial = this.props.estimateDetailsMaterial
        const paymentsWork = this.props.paymentsWork
        const paymentsMaterial = this.props.paymentsMaterial

        const sumOfWorks = this.calcEstimateDetailsByCategory(estimateDetailsWork);
        const sumOfMaterials = this.calcEstimateDetailsByCategory(estimateDetailsMaterial);
        const sumOfWorksWithMarkUp = this.calcEstimateDetailsByCategoryWithMarkUp(estimateDetailsWork);
        const sumOfMaterialsWithMarkUp = this.calcEstimateDetailsByCategoryWithMarkUp(estimateDetailsMaterial);
        const sumOfWorksComplete = this.calcEstimateDetailsByCategoryCompleteTrue(estimateDetailsWork);
        const sumOfMaterialsComplete = this.calcEstimateDetailsByCategoryCompleteTrue(estimateDetailsMaterial)
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
                <MyToast show={this.props.show} message={this.props.messageText} type={this.props.messageType}/>
                <div className="border border-dark bg-white m-3">
                    <Tabs id="estimateDetailTabs"
                          activeKey={activeTab}
                          onSelect={(activeTab: string) => this.handleSelect(activeTab)}>
                        <Tab eventKey={1} title="Общая смета">
                            <GeneralTab estimateName={estimateName}
                                        estimateDetails={estimateDetails}
                                        estimateId={estimateId}
                                        onDeleteEstimateDetail={this.props.deleteEstimateDetail}
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
                                         category={Category.Works}
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
                                         category={Category.Materials}
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

const mapStateToProps = (state: any) => {
    return {
        show: state.app.show,
        messageText: state.app.messageText,
        messageType: state.app.messageType,
        estimate: state.estimates.estimate,
        estimateDetails: state.estimateDetails.estimateDetails,
        estimateDetailsWork: state.estimateDetails.estimateDetailsWork,
        estimateDetailsMaterial: state.estimateDetails.estimateDetailsMaterial,
        payments: state.payments.payments,
        paymentsWork: state.payments.paymentsWork,
        paymentsMaterial: state.payments.paymentsMaterial,
    }
}
const mapDispatchToProps = (dispatch: Dispatch<any>) => {
    return {
        findAllEstimateDetails: (estimateId: number) => (dispatch(findAllEstimateDetails(estimateId))),
        findEstimateById: (estimateId: number) => (dispatch(findEstimateById(estimateId))),
        findAllPaymentsByEstimateId: (estimateId: number) => (dispatch(findAllPaymentsByEstimateId(estimateId))),
        deleteEstimateDetail: (estimateDetailId: number) => (dispatch(deleteEstimateDetail(estimateDetailId))),
        updateEstimateDetail: (estimateDetail: IEstimateDetail) => (dispatch(updateEstimateDetail(estimateDetail)))
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(EstimateDetailsTabs)