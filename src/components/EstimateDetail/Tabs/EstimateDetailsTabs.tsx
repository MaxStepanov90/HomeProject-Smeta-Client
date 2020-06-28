import React, {Fragment, useEffect, useState} from "react";
import {Tab, Tabs} from "react-bootstrap";
import {GeneralTab} from "./generalTab/GeneralTab";
import {CategoryTab} from "./categoryTab/CategoryTab";
import {ClientTab} from "./clientTab/ClientTab";
import {MyToast} from "../../Generic/MyToast/MyToast";
import {IEstimateDetail} from "../../../interfaces/IEstimateDetail";
import {useDispatch, useSelector} from "react-redux";
import {findAllEstimateDetails, updateEstimateDetail} from "../../../service/actions/estimateDetailActions";
import {findEstimateById} from "../../../service/actions/estimateActions";
import {findAllPaymentsByEstimateId} from "../../../service/actions/paymentActions";
import {Category} from "../../../utils/Category";
import {IRootState} from "../../../interfaces/IRootState";

interface RouterProps {
    estimateId: any;
}

interface EstimateDetailsTabsProps extends RouterProps {
    match: any
}

const EstimateDetailsTabs: React.FC<EstimateDetailsTabsProps> = ({match}) => {

    const id = match.params.id
    const dispatch = useDispatch()

    const show = useSelector((state: IRootState) => state.app.show)
    const messageText = useSelector((state: IRootState) => state.app.messageText)
    const messageType = useSelector((state: IRootState) => state.app.messageType)

    const estimate = useSelector((state: IRootState) => state.estimates.estimate)
    const estimateDetails = useSelector((state: IRootState) => state.estimateDetails.estimateDetails)
    const estimateDetailsWork = useSelector((state: IRootState) => state.estimateDetails.estimateDetailsWork)
    const estimateDetailsMaterial = useSelector((state: IRootState) => state.estimateDetails.estimateDetailsMaterial)
    const paymentsWork = useSelector((state: IRootState) => state.payments.paymentsWork)
    const paymentsMaterial = useSelector((state: IRootState) => state.payments.paymentsMaterial)
    const [activeTab, setActiveTab] = useState('1')
    const [stateEstimateDetailsWork, setStateEstimateDetailsWork] = useState(estimateDetailsWork)
    const [stateEstimateDetailsMaterial, setStateEstimateDetailsMaterial] = useState(estimateDetailsMaterial)

    useEffect(() => {
        dispatch(findEstimateById(id))
        dispatch(findAllEstimateDetails(id))
        dispatch(findAllPaymentsByEstimateId(id))
    }, [dispatch])

    const downloadExcelByCategory = (category: string): void => {
        fetch("http://localhost:8080/remsmet/download/excel/estimateId/"
            + id + "/category/" + category, {
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

    const filterToEstimateDetailsWork = (estimateDetails: IEstimateDetail[]): IEstimateDetail[] => {
        return estimateDetails.filter(estimateDetail => estimateDetail.category === Category.Works)
    }

    const filterToEstimateDetailsMaterial = (estimateDetails: IEstimateDetail[]): IEstimateDetail[] => {
        return estimateDetails.filter(estimateDetail => estimateDetail.category === Category.Materials)
    }

    const calcPaymentsByCategory = (array: any[]): number => {
        let sum = 0;
        for (let i = 0; i < array.length; i++) {
            sum += array[i].amount;
        }
        return sum
    }

    const calcEstimateDetailsByCategory = (array: any[]) => {
        let sum = 0;
        for (let i = 0; i < array.length; i++) {
            sum += array[i].cost;
        }
        return sum
    }

    const calcEstimateDetailsByCategoryWithMarkUp = (array: any[]) => {
        let sum = 0;
        for (let i = 0; i < array.length; i++) {
            sum += array[i].costClient;
        }
        return sum
    };

    const calcEstimateDetailsByCategoryCompleteTrue = (array: any[]): number => {
        let sum = 0;
        for (let i = 0; i < array.length; i++) {
            if (array[i].complete) {
                sum += array[i].costClient;
            }
        }
        return sum
    }

    const calcPercentOfEstimateDetailsByCategoryComplete = (sumOfAllComplete: number, sumOfAllWithMarkUp: number): number => {
        return Math.ceil(sumOfAllComplete / (sumOfAllWithMarkUp / 100))
    }

    const handleSelect = (activeTab: string): void => {
        setActiveTab(activeTab)
        if (activeTab === '2') {
            setStateEstimateDetailsWork(filterToEstimateDetailsWork(estimateDetails))
        }
        if (activeTab === '3') {
           setStateEstimateDetailsMaterial(filterToEstimateDetailsMaterial(estimateDetails))
        }
    }

    const toggleCompleteWork = (id: number): void => {
        setStateEstimateDetailsWork(estimateDetailsWork.map(estimateDetail => {
                if (estimateDetail.id === id) {
                    estimateDetail.complete = !estimateDetail.complete;
                    dispatch(updateEstimateDetail(estimateDetail));
                }
                return estimateDetail;
            }
        ))
    }

    const toggleCompleteMaterial = (id: number): void => {
        setStateEstimateDetailsMaterial(estimateDetailsMaterial.map(estimateDetail => {
                if (estimateDetail.id === id) {
                    estimateDetail.complete = !estimateDetail.complete;
                    dispatch(updateEstimateDetail(estimateDetail));
                }
                return estimateDetail;
            }
        ))
    };

    const sumOfWorks = calcEstimateDetailsByCategory(estimateDetailsWork);
    const sumOfMaterials = calcEstimateDetailsByCategory(estimateDetailsMaterial);
    const sumOfWorksWithMarkUp = calcEstimateDetailsByCategoryWithMarkUp(estimateDetailsWork);
    const sumOfMaterialsWithMarkUp = calcEstimateDetailsByCategoryWithMarkUp(estimateDetailsMaterial);
    const sumOfWorksComplete = calcEstimateDetailsByCategoryCompleteTrue(estimateDetailsWork);
    const sumOfMaterialsComplete = calcEstimateDetailsByCategoryCompleteTrue(estimateDetailsMaterial)
    const sumOfMarkUpFromWorks = Math.round((sumOfWorksWithMarkUp - sumOfWorks) * 100) / 100;
    const sumOfMarkUpFromMaterials = Math.round((sumOfMaterialsWithMarkUp - sumOfMaterials) * 100) / 100;
    const percentOfWorksComplete = calcPercentOfEstimateDetailsByCategoryComplete(
        sumOfWorksComplete, sumOfWorksWithMarkUp);
    const percentOfMaterialsComplete = calcPercentOfEstimateDetailsByCategoryComplete(
        sumOfMaterialsComplete, sumOfMaterialsWithMarkUp);
    const sumOfPaymentsWork = calcPaymentsByCategory(paymentsWork)
    const sumOfPaymentsMaterial = calcPaymentsByCategory(paymentsMaterial)

    return (
        <Fragment>
            <MyToast show={show} message={messageText} type={messageType}/>
            <div className="border border-dark bg-white m-3">
                <Tabs id="estimateDetailTabs"
                      activeKey={activeTab}
                      onSelect={(activeTab: string) => handleSelect(activeTab)}>
                    <Tab eventKey={1} title="Общая смета">
                        <GeneralTab estimate={estimate}
                                    estimateDetails={estimateDetails}
                                    sumOfWorks={sumOfWorks}
                                    sumOfMaterials={sumOfMaterials}
                                    sumOfMarkUpFromWorks={sumOfMarkUpFromWorks}
                                    sumOfMarkUpFromMaterials={sumOfMarkUpFromMaterials}
                                    sumOfWorksWithMarkUp={sumOfWorksWithMarkUp}
                                    sumOfMaterialsWithMarkUp={sumOfMaterialsWithMarkUp}
                        />
                    </Tab>
                    <Tab eventKey={2} title="Смета работ">
                        <CategoryTab estimateName={estimate.name}
                                     category={Category.Works}
                                     categoryEstimateDetails={estimateDetailsWork}
                                     onChange={toggleCompleteWork}
                                     onDownloadExcel={downloadExcelByCategory}
                                     percent={percentOfWorksComplete}
                                     valueAll={sumOfWorksWithMarkUp}
                                     valueDone={sumOfWorksComplete}
                                     valuePay={sumOfPaymentsWork}
                        />
                    </Tab>
                    <Tab eventKey={3} title="Смета закупок">
                        <CategoryTab estimateName={estimate.name}
                                     category={Category.Materials}
                                     categoryEstimateDetails={estimateDetailsMaterial}
                                     onChange={toggleCompleteMaterial}
                                     onDownloadExcel={downloadExcelByCategory}
                                     percent={percentOfMaterialsComplete}
                                     valueAll={sumOfMaterialsWithMarkUp}
                                     valueDone={sumOfMaterialsComplete}
                                     valuePay={sumOfPaymentsMaterial}
                        />
                    </Tab>
                    <Tab eventKey={4} title="Смета клиента">
                        <ClientTab estimate={estimate}
                                   estimateDetails={estimateDetails}
                                   sumOfWorksWithMarkUp={sumOfWorksWithMarkUp}
                                   sumOfMaterialsWithMarkUp={sumOfMaterialsWithMarkUp}
                        />
                    </Tab>
                </Tabs>
            </div>
        </Fragment>
    )
}

export default EstimateDetailsTabs