import React, {Dispatch, FormEvent} from "react";
import {Button, Card, Col, Container, Form} from "react-bootstrap";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faFolderOpen, faPlus, faSave} from "@fortawesome/free-solid-svg-icons";
import {MyToast} from "../Generic/MyToast/MyToast";
import {RouteComponentProps} from "react-router-dom";
import {connect} from "react-redux";
import {saveNewEstimate} from "../../service/actions/estimateActions";
import {INewEstimate} from "../../interfaces/INewEstimate";

type EstimateFormProps = {
    show: any,
    messageText: any,
    messageType: any,
    saveNewEstimate: (estimate: INewEstimate) => void
}

type EstimateFormState = {
    show: boolean,
    estimateName: string,
    projectId: number
}

class EstimateForm extends React.Component<EstimateFormProps&RouteComponentProps, EstimateFormState> {
    constructor(props: EstimateFormProps&RouteComponentProps) {
        super(props);
        this.state = {
            show: false,
            estimateName: '',
            projectId: (this.props.history.location.state as any).projectId,
        };
    }

    submitEstimate = (event: FormEvent<HTMLFormElement>): void => {
        event.preventDefault();
        const estimate = {
            name: this.state.estimateName,
            projectId: this.state.projectId
        };
        this.props.saveNewEstimate(estimate);
        setTimeout(() => this.estimateList(this.state.projectId), 1600)
    }

    estimateList = (projectId: number): void => {
        return this.props.history.push("/projectInfo/" + projectId)
    };

    estimateChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
        this.setState({
            [event.target.name]: event.target.value
        } as any)
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
                                    onClick={() => this.estimateList(projectId)}>
                                <FontAwesomeIcon icon={faFolderOpen}/>&nbsp;Вернуться назад
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
        saveNewEstimate: (estimate: INewEstimate) => dispatch(saveNewEstimate(estimate))
    }
}
const mapStateToProps = (state: any) => {
    return {
        show: state.app.show,
        messageType: state.app.messageType,
        messageText: state.app.messageText,
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(EstimateForm)