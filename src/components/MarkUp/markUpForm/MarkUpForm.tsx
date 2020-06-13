import React, {FormEvent} from "react";
import {Button, Card, Col, Container, Form} from "react-bootstrap";
import {MyToast} from "../../Generic/MyToast/MyToast";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faList, faPercent, faSave} from "@fortawesome/free-solid-svg-icons";
import Row from "react-bootstrap/Row";
import {RouteComponentProps} from "react-router-dom";
import {IMarkUp} from "../../../interfaces/IMarkUp";

type MarkUpFormState = {
    id: number;
    markUpName: string;
    markUpPercent: number ;
    show: boolean;
}

export default class MarkUpForm extends React.Component<RouteComponentProps, MarkUpFormState> {
    constructor(props: RouteComponentProps) {
        super(props);
        this.state = {
            id: 0,
            markUpName: '',
            markUpPercent: 0,
            show: false,
        };
    }

    componentDidMount() {
        const markUpId = (this.props.match.params as any).id
        if (markUpId) {
            this.findMarkUpById(markUpId);
        }
    };

    findMarkUpById = (markUpId: number): void => {
        fetch("http://localhost:8080/remsmet/markUps/" + markUpId)
            .then(response => response.json())
            .then((markUp: IMarkUp) => {
                if (markUp) {
                    this.setState({
                        id: markUp.id,
                        markUpName: markUp.markUpName,
                        markUpPercent: markUp.markUpPercent
                    })
                }
            }).catch((error) => {
            console.error('Error' + error)
        });
    };

    updateMarkUp = (event: FormEvent<HTMLFormElement>): void => {
        event.preventDefault();
        const markUp: IMarkUp = {
            id: this.state.id,
            markUpName: this.state.markUpName,
            markUpPercent: this.state.markUpPercent,
        };
        const headers = new Headers();
        headers.append('Content-Type', 'application/json');

        fetch("http://localhost:8080/remsmet/markUps", {
            method: 'PUT',
            body: JSON.stringify(markUp),
            headers
        })
            .then(response => response.json())
            .then(markUp => {
                if (markUp) {
                    this.setState({show: true});
                    setTimeout(() => this.setState({show: false}), 1500);
                    setTimeout(() => this.markUpList(), 1600);
                } else {
                    this.setState({show: false});
                }
            });
    };

    markUpList = (): void => {
        return this.props.history.push("/markUps")
    };

    markUpChange= (event: React.ChangeEvent<HTMLInputElement>): void => {
        this.setState({
            [event.target.name]: event.target.value
        } as any)
    };

    render() {
        const {show, markUpName, markUpPercent} = this.state;

        const markUpPercentInputField =
            <Form.Control required autoComplete="off"
                          type="text" name="markUpPercent"
                          value={markUpPercent} onChange={this.markUpChange}/>

        return (
            <Container className="text-center col-5">
                <MyToast show={show} message={"наценка успешно изменена."} type={"success"}/>
                <Card className={"border border-dark"}>
                    <Card.Header>
                        <FontAwesomeIcon icon={faPercent}/>&nbsp;Наценка
                    </Card.Header>
                    <Form onSubmit={this.updateMarkUp} id="markUpFormId">
                        <Card.Body>
                            <Form.Row>
                                <Form.Group as={Row} controlId="formPlaintextMarkUpName">
                                    <Form.Label column sm="9">
                                        {markUpName}
                                    </Form.Label>
                                    <Col sm="3">
                                        {markUpPercentInputField}
                                    </Col>
                                </Form.Group>
                            </Form.Row>
                        </Card.Body>
                        <Card.Footer style={{"textAlign": "right"}}>
                            <Button size="sm" variant="success" type="submit">
                                <FontAwesomeIcon icon={faSave}/>&nbsp;Сохранить
                            </Button>{' '}
                            <Button size="sm" variant="info" type="button" onClick={() => this.markUpList()}>
                                <FontAwesomeIcon icon={faList}/>&nbsp;Список наценок
                            </Button>
                        </Card.Footer>
                    </Form>
                </Card>
            </Container>
        )
    }
}