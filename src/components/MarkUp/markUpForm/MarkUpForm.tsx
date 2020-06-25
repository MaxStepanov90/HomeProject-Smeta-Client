import React, {Dispatch, FormEvent} from "react";
import {Button, Card, Col, Container, Form} from "react-bootstrap";
import {MyToast} from "../../Generic/MyToast/MyToast";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faList, faPercent, faSave} from "@fortawesome/free-solid-svg-icons";
import Row from "react-bootstrap/Row";
import {RouteComponentProps} from "react-router-dom";
import {IMarkUp} from "../../../interfaces/IMarkUp";
import {findMarkUpById, updateMarkUp} from "../../../service/actions/markUpActions";
import {connect} from "react-redux";

type MarkUpFormProps = {
    show: any,
    id: any,
    markUpName: any,
    markUpPercent: any,
    messageText: any,
    messageType: any,
    findMarkUpById: (markUpId: number) => void,
    updateMarkUp: (markUp: IMarkUp) => void,
    onChange: (e: any) => void
}
type MarkUpFormState = {
    markUpName: string;
    markUpPercent: number ;
}

class MarkUpForm extends React.Component<MarkUpFormProps & RouteComponentProps,MarkUpFormState> {
    constructor(props: MarkUpFormProps & RouteComponentProps) {
        super(props);
        this.state = {
            markUpName: '',
            markUpPercent: 0,
        };
    }

    componentDidMount() {
        const markUpId = (this.props.match.params as any).id
        if (markUpId) {
            this.props.findMarkUpById(markUpId);
        }
    };

    updateMarkUp = (event: FormEvent<HTMLFormElement>): void => {
        event.preventDefault();
        const markUp: IMarkUp = {
            id: this.props.id,
            markUpName: this.props.markUpName,
            markUpPercent: this.props.markUpPercent,
        }
        this.props.updateMarkUp(markUp);
        setTimeout(() => this.markUpList(), 1600);
    };

    markUpList = (): void => {
        return this.props.history.push("/markUps")
    };

    markUpChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
        this.setState({
            [event.target.name]: event.target.value
        } as any)
    };

    render() {

        const markUpPercentInputField =
            <Form.Control required autoComplete="off"
                          type="text" name="markUpPercent"
                          value={this.props.markUpPercent} onChange={this.markUpChange}/>

        return (
            <Container className="text-center col-5">
                <MyToast show={this.props.show} message={this.props.messageText} type={this.props.messageType}/>
                <Card className={"border border-dark"}>
                    <Card.Header>
                        <FontAwesomeIcon icon={faPercent}/>&nbsp;Наценка
                    </Card.Header>
                    <Form onSubmit={this.updateMarkUp} id="markUpFormId">
                        <Card.Body>
                            <Form.Row>
                                <Form.Group as={Row} controlId="formPlaintextMarkUpName">
                                    <Form.Label column sm="9">
                                        {this.props.markUpName}
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

const mapDispatchToProps = (dispatch: Dispatch<any>) => {
    return {
        findMarkUpById: (markUpId: number) => dispatch(findMarkUpById(markUpId)),
        updateMarkUp: (markUp: IMarkUp) => dispatch(updateMarkUp(markUp))
    }
}
const mapStateToProps = (state: any) => {
    return {
        show: state.app.show,
        id: state.markUps.markUp.id,
        markUpName: state.markUps.markUp.markUpName,
        markUpPercent: state.markUps.markUp.markUpPercent,
        messageType: state.app.messageType,
        messageText: state.app.messageText
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(MarkUpForm)