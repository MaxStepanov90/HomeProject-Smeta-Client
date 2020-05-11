import React, {Component} from "react";
import {Button, Card, Col, Container, Form} from "react-bootstrap";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faFolderOpen, faPlus, faSave} from "@fortawesome/free-solid-svg-icons";
import MyToast from "../Generic/MyToast";

export default class PaymentForm extends Component {
    constructor(props) {
        super(props);
        this.state = this.initialState;
        this.state = {
            show: false,
            category: 'работы'
        };

        this.state.estimateId = this.props.location.estimateId;
        this.paymentChange = this.paymentChange.bind(this);
        this.submitPayment = this.submitPayment.bind(this);
    }

    initialState = {
        amount: '', category: '', comment: ''
    };

    submitPayment = (event) => {
        event.preventDefault();
        const payment = {
            amount: this.state.amount,
            comment: this.state.comment,
            category: this.state.category,
            estimateId: this.state.estimateId
        };
        console.log(payment);
        const headers = new Headers();
        headers.append('Content-Type', 'application/json');

        fetch("http://localhost:8080/remsmet/payments", {
            method: 'POST',
            body: JSON.stringify(payment),
            headers
        })
            .then(response => response.json())
            .then(payment => {
                if (payment) {
                    this.setState({"show": true});
                    setTimeout(() => this.setState({"show": false}), 1000);
                    setTimeout(() => this.estimateDetailList(this.state.estimateId), 1100);
                } else {
                    this.setState({"show": false})
                }
            });
        this.setState(this.initialState);
    };

    estimateDetailList = (estimateId) => {
        return this.props.history.push("/estimate/" + estimateId)
    };

    paymentChange = event => {
        this.setState({
            [event.target.name]: event.target.value
        })
    };

    render() {
        const {amount, category, comment, estimateId, show} = this.state;

        const amountInputField =
            <Form.Group as={Col} controlId="formGridAmount">
                <Form.Label>Сумма</Form.Label>
                <Form.Control required autoComplete="off"
                              type="test" name="amount"
                              value={amount} onChange={this.paymentChange}
                              placeholder="150000.0"/>
            </Form.Group>

        const сategoryInputField =
            <Form.Group as={Col} controlId="formGridCategory">
                <Form.Label>Категория</Form.Label>
                <Form.Control required as="select"
                              custom onChange={this.paymentChange}
                              name="category"
                              value={category}>
                    <option value="работы">работы</option>
                    <option value="материалы">материалы</option>
                </Form.Control>
            </Form.Group>

        const commentInputField =
            <Form.Group as={Col} controlId="formGridComment">
                <Form.Label>Комментарий к платежу</Form.Label>
                <Form.Control required autoComplete="off"
                              as="textarea" rows="3"
                              type="test" name="comment"
                              value={comment} onChange={this.paymentChange}
                              placeholder="аванс за черновые работы"/>
            </Form.Group>

        return (
            <Container>
                <MyToast show={show} message={"Платеж добавлен"} type={"success"}/>
                <Card className={"border border-dark"}>
                    <Card.Header>
                        <FontAwesomeIcon icon={faPlus}/>&nbsp;Новый платеж
                    </Card.Header>
                    <Form onSubmit={this.submitPayment} id="paymentFormId">
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
                                    onClick={this.estimateDetailList.bind(this, estimateId)}>
                                <FontAwesomeIcon icon={faFolderOpen}/>&nbsp;Вернуться назад
                            </Button>
                        </Card.Footer>
                    </Form>
                </Card>
            </Container>
        )
    }

}