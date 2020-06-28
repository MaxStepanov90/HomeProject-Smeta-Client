import React, {useEffect} from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faFolderOpen, faInfo} from "@fortawesome/free-solid-svg-icons";
import {Button, Card, Container} from "react-bootstrap";
import {PaymentListTable} from "./PaymentListTable";
import {MyToast} from "../../Generic/MyToast/MyToast";
import {findAllPaymentsByProjectId} from "../../../service/actions/paymentActions";
import {useDispatch, useSelector} from "react-redux";
import {IRootState} from "../../../interfaces/IRootState";

type PaymentListProps = {
    history: any,
}

const PaymentList: React.FC<PaymentListProps> = ({history}) => {

    const projectId = history.location.state.projectId
    const show = useSelector((state: IRootState) => state.app.show)
    const messageText = useSelector((state: IRootState) => state.app.messageText)
    const messageType = useSelector((state: IRootState) => state.app.messageType)
    const payments = useSelector((state: IRootState) => state.payments.payments)
    const dispatch = useDispatch()

    useEffect(() => {
        if (projectId) {
            dispatch(findAllPaymentsByProjectId(projectId))
        }
    }, [dispatch])

    const paymentList = (projectId: number): void => {
        return history.push("/projectInfo/" + projectId)
    };

    return (
        <Container>
            <MyToast show={show} message={messageText} type={messageType}/>
            <Card className={"border border-dark"}>
                <Card.Header>
                    <FontAwesomeIcon icon={faInfo}/>&nbsp;Платежи
                </Card.Header>
                <Card.Body>
                    <PaymentListTable payments={payments}/>
                </Card.Body>
                <Card.Footer style={{"textAlign": "right"}}>
                    <Button size="sm" variant="info" type="button"
                            onClick={() => paymentList(projectId)}>
                        <FontAwesomeIcon icon={faFolderOpen}/>&nbsp;Вернуться назад
                    </Button>
                </Card.Footer>
            </Card>
        </Container>
    )
}

export default PaymentList