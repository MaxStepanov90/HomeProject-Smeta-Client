import React, {Component} from "react";
import {Button, Card, Col, Container, Form} from "react-bootstrap";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faFolderOpen, faPlus, faSave} from "@fortawesome/free-solid-svg-icons";
import MyToast from "../Generic/MyToast";

export default class EstimateDetailForm extends Component {
    constructor(props) {
        super(props);
        this.state = this.initialState;
        this.state = {
            show: false,
            category: 'работы'
        };
        this.state.estimateId = this.props.location.estimateId;
        this.estimateDetailChange = this.estimateDetailChange.bind(this);
        this.submitEstimateDetail = this.submitEstimateDetail.bind(this);
    }

    initialState = {
        name: '', unit: '', quantity: '', price: ''
    };

    submitEstimateDetail = (event) => {
        event.preventDefault();
        const estimateDetail = {
            name: this.state.name,
            unit: this.state.unit,
            quantity: this.state.quantity,
            price: this.state.price,
            category: this.state.category,
            estimateId: this.state.estimateId
        };
        console.log(estimateDetail);
        const headers = new Headers();
        headers.append('Content-Type', 'application/json');

        fetch("http://localhost:8080/remsmet/estimateDetails", {
            method: 'POST',
            body: JSON.stringify(estimateDetail),
            headers
        })
            .then(response => response.json())
            .then(estimateDetail => {
                if (estimateDetail) {
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

    estimateDetailChange = event => {
        this.setState({
            [event.target.name]: event.target.value
        })
    };

    render() {
        const {name, unit, quantity, price, estimateId, category, show} = this.state;

        const estimateDetailNameInputField =
            <Form.Group as={Col} controlId="formGridName">
                <Form.Label>Наименование позиции</Form.Label>
                <Form.Control required autoComplete="off"
                              type="test" name="name"
                              value={name} onChange={this.estimateDetailChange}
                              placeholder="Введите наименование позиции"/>
            </Form.Group>

        const estimateDetailUnitInputField =
            <Form.Group as={Col} controlId="formGridUnit">
                <Form.Label>Ед.изм.</Form.Label>
                <Form.Control required autoComplete="off"
                              type="test" name="unit"
                              value={unit} onChange={this.estimateDetailChange}
                              placeholder="Введите ед.изм."/>
            </Form.Group>

        const estimateDetailQuantityInputField =
            <Form.Group as={Col} controlId="formGridQuantity">
                <Form.Label>Количество</Form.Label>
                <Form.Control required autoComplete="off"
                              type="test" name="quantity"
                              value={quantity} onChange={this.estimateDetailChange}
                              placeholder="Введите количество"/>
            </Form.Group>

        const estimateDetailPriceInputField =
            <Form.Group as={Col} controlId="formGridPrice">
                <Form.Label>Цена</Form.Label>
                <Form.Control required autoComplete="off"
                              type="test" name="price"
                              value={price} onChange={this.estimateDetailChange}
                              placeholder="Введите цену"/>
            </Form.Group>

        const estimateDetailCategoryInputField =
            <Form.Group as={Col} controlId="formGridCategory">
                <Form.Label>Категория</Form.Label>
                <Form.Control required as="select"
                              custom onChange={this.estimateDetailChange}
                              name="category"
                              value={category}>
                    <option value="работы">работы</option>
                    <option value="материалы">материалы</option>
                </Form.Control>
            </Form.Group>

        return (
            <Container>
                <MyToast show={show} message={"Позиция добавлена."} type={"success"}/>
                <Card className={"border border-dark"}>
                    <Card.Header>
                        <FontAwesomeIcon icon={faPlus}/>&nbsp;Новая позиция
                    </Card.Header>
                    <Form onSubmit={this.submitEstimateDetail} id="estimateDetailFormId">
                        <Card.Body>
                            <Form.Row>
                                {estimateDetailNameInputField}
                            </Form.Row>
                            <Form.Row>
                                {estimateDetailUnitInputField}
                                {estimateDetailQuantityInputField}
                                {estimateDetailPriceInputField}
                                {estimateDetailCategoryInputField}
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