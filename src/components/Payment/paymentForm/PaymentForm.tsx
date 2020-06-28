import React, {FormEvent, useState} from "react";
import {Button, Card, Col, Container, Form} from "react-bootstrap";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faFolderOpen, faPlus, faSave} from "@fortawesome/free-solid-svg-icons";
import {MyToast} from "../../Generic/MyToast/MyToast";
import {useDispatch, useSelector} from "react-redux";
import {IRootState} from "../../../interfaces/IRootState";
import {Category} from "../../../utils/Category";
import {saveNewPayment} from "../../../service/actions/paymentActions";


interface RouterProps {
    estimateId: any;
}

interface PaymentFormProps extends RouterProps {
    history: any
}

const PaymentForm: React.FC<PaymentFormProps> = ({history}) => {

    const dispatch = useDispatch()

    const show = useSelector((state: IRootState) => state.app.show)
    const messageText = useSelector((state: IRootState) => state.app.messageText)
    const messageType = useSelector((state: IRootState) => state.app.messageType)

    const id = history.location.state.estimateId
    const [paymentAmount, setPaymentAmount] = useState(0)
    const [paymentComment, setPaymentComment] = useState('')
    const [paymentCategory, setPaymentCategory] = useState('')

    const submitPayment = (event: FormEvent<HTMLFormElement>): void => {
        event.preventDefault();
        const newPayment = {
            amount: paymentAmount,
            comment: paymentComment,
            category: paymentCategory,
            estimateId: id
        };
        dispatch(saveNewPayment(newPayment))
        setTimeout(() => estimateDetailList(id),1000)

        setPaymentAmount(0)
        setPaymentCategory('')
        setPaymentComment('')
    };

    const estimateDetailList = (estimateId: number): void => {
        return history.push("/estimate/" + estimateId)
    };

    const amountInputField =
        <Form.Group as={Col} controlId="formGridAmount">
            <Form.Label>Сумма</Form.Label>
            <Form.Control required autoComplete="off"
                          type="test" name="amount"
                          value={paymentAmount}
                          onChange={event => setPaymentAmount(parseInt(event.target.value))}
            />
        </Form.Group>

    const сategoryInputField =
        <Form.Group as={Col} controlId="formGridCategory">
            <Form.Label>Категория</Form.Label>
            <Form.Control required as="select"
                          custom onChange={event => setPaymentCategory(event.target.value)}
                          name="category"
                          value={paymentCategory}>
                <option value={Category.Works}>{Category.Works}</option>
                <option value={Category.Materials}>{Category.Materials}</option>
            </Form.Control>
        </Form.Group>

    const commentInputField =
        <Form.Group as={Col} controlId="formGridComment">
            <Form.Label>Комментарий к платежу</Form.Label>
            <Form.Control required autoComplete="off"
                          as="textarea"
                          rows={3}
                          type="test" name="comment"
                          value={paymentComment}
                          onChange={event => setPaymentComment(event.target.value)}
            />
        </Form.Group>

    return (
        <Container>
            <MyToast show={show} message={messageText} type={messageType}/>
            <Card className={"border border-dark"}>
                <Card.Header>
                    <FontAwesomeIcon icon={faPlus}/>&nbsp;Новый платеж
                </Card.Header>
                <Form onSubmit={submitPayment} id="paymentFormId">
                    <Card.Body>
                        <Form.Row>
                            {amountInputField}
                            {сategoryInputField}
                        </Form.Row>
                        <Form.Row>
                            {commentInputField}
                        </Form.Row>
                    </Card.Body>
                    <Card.Footer style={{"textAlign": "right"}}>
                        <Button size="sm" variant="success" type="submit">
                            <FontAwesomeIcon icon={faSave}/>&nbsp;Сохранить
                        </Button>{' '}
                        <Button size="sm" variant="info" type="button"
                                onClick={() => estimateDetailList(id)}>
                            <FontAwesomeIcon icon={faFolderOpen}/>&nbsp;Вернуться назад
                        </Button>
                    </Card.Footer>
                </Form>
            </Card>
        </Container>
    )
}

export default PaymentForm