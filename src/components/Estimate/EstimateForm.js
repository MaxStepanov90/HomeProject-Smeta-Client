import React, {Component} from "react";
import {Button, Card, Col, Container, Form} from "react-bootstrap";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faFolderOpen, faPlus, faSave} from "@fortawesome/free-solid-svg-icons";
import MyToast from "../Generic/MyToast";

export default class EstimateForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            show: false,
            estimateName: ''
        };
        this.state.projectId = this.props.location.projectId;
        this.estimateChange = this.estimateChange.bind(this);
        this.submitEstimate = this.submitEstimate.bind(this);
    }

    submitEstimate = (event) => {
        event.preventDefault();
        const estimate = {
            estimateName: this.state.estimateName,
            projectId: this.state.projectId
        };
        console.log(estimate);
        const headers = new Headers();
        headers.append('Content-Type', 'application/json');

        fetch("http://localhost:8080/remsmet/estimates", {
            method: 'POST',
            body: JSON.stringify(estimate),
            headers
        })
            .then(response => response.json())
            .then(estimate => {
                if (estimate) {
                    this.setState({"show": true});
                    setTimeout(() => this.setState({"show": false}), 1000);
                    setTimeout(() => this.estimateList(this.state.projectId), 1100);
                } else {
                    this.setState({"show": false})
                }
            });
        this.setState(this.initialState);
    };

    estimateList = (projectId) => {
        return this.props.history.push("/projectInfo/" + projectId)
    };

    estimateChange = event => {
        this.setState({
            [event.target.name]: event.target.value
        })
    };

    render() {
        const {estimateName, projectId, show} = this.state;

        const estimateNameInputField =
            <Form.Group as={Col} controlId="formGridEstimateName">
                <Form.Label>Название сметы</Form.Label>
                <Form.Control required autoComplete="off"
                              type="test" name="estimateName"
                              value={estimateName} onChange={this.estimateChange}
                              placeholder="Черновые работы"/>
            </Form.Group>

        return (
            <Container>
                    <MyToast show={show} message={"Смета добавлена."} type={"success"}/>
                <Card className={"border border-dark"}>
                    <Card.Header>
                        <FontAwesomeIcon icon={faPlus}/>&nbsp;Новая смета
                    </Card.Header>
                    <Form onSubmit={this.submitEstimate} id="estimateFormId">
                        <Card.Body>
                            <Form.Row>
                                {estimateNameInputField}
                            </Form.Row>
                        </Card.Body>
                        <Card.Footer style={{"textAlign": "right"}}>
                            <Button size="sm" variant="success" type="submit">
                                <FontAwesomeIcon icon={faSave}/>&nbsp;Сохранить
                            </Button>{' '}
                            <Button size="sm" variant="info" type="button"
                                    onClick={this.estimateList.bind(this, projectId)}>
                                <FontAwesomeIcon icon={faFolderOpen}/>&nbsp;Вернуться назад
                            </Button>
                        </Card.Footer>
                    </Form>
                </Card>
            </Container>
        )
    }

}