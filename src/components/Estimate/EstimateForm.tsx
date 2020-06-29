import React, {FormEvent, useState} from "react";
import {Button, Card, Col, Container, Form} from "react-bootstrap";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faFolderOpen, faPlus, faSave} from "@fortawesome/free-solid-svg-icons";
import {MyToast} from "../Generic/MyToast/MyToast";
import {useDispatch, useSelector} from "react-redux";
import {IRootState} from "../../interfaces/IRootState";
import {saveNewEstimate} from "../../service/actions/estimateActions";

interface RouterProps {
    id: any;
}

interface EstimateFormProps extends RouterProps {
    history: any
}

const EstimateForm: React.FC<EstimateFormProps> = ({history}) => {

    const id = history.location.state.projectId
    const dispatch = useDispatch()
    const show = useSelector((state: IRootState) => state.app.show)
    const messageText = useSelector((state: IRootState) => state.app.messageText)
    const messageType = useSelector((state: IRootState) => state.app.messageType)
    const [estimateName, setEstimateName] = useState('')

    const submitEstimate = (event: FormEvent<HTMLFormElement>): void => {
        event.preventDefault();
        const newEstimate = {
            name: estimateName,
            projectId: id
        };
        dispatch(saveNewEstimate(newEstimate));
        setTimeout(() => estimateList(id), 1600)
    }

    const estimateList = (projectId: number): void => {
        return history.push("/projectInfo/" + projectId)
    };

    const estimateNameInputField =
        <Form.Group as={Col} controlId="formGridEstimateName">
            <Form.Label>Название сметы</Form.Label>
            <Form.Control required autoComplete="off"
                          type="test" name="estimateName"
                          value={estimateName} onChange={event => setEstimateName(event.target.value)}
                          placeholder="Черновые работы"/>
        </Form.Group>

    return (
        <Container>
            <MyToast show={show} message={messageText} type={messageType}/>
            <Card className={"border border-dark"}>
                <Card.Header>
                    <FontAwesomeIcon icon={faPlus}/>&nbsp;Новая смета
                </Card.Header>
                <Form onSubmit={submitEstimate} id="estimateFormId">
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
                                onClick={() => estimateList(id)}>
                            <FontAwesomeIcon icon={faFolderOpen}/>&nbsp;Вернуться назад
                        </Button>
                    </Card.Footer>
                </Form>
            </Card>
        </Container>
    )
}

export default EstimateForm