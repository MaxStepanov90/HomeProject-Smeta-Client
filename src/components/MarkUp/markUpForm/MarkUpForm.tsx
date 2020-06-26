import React, {FormEvent, useEffect, useState} from "react";
import {Button, Card, Col, Container, Form} from "react-bootstrap";
import {MyToast} from "../../Generic/MyToast/MyToast";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faList, faPercent, faSave} from "@fortawesome/free-solid-svg-icons";
import Row from "react-bootstrap/Row";
import {IMarkUp} from "../../../interfaces/IMarkUp";
import {findMarkUpById, updateMarkUp} from "../../../service/actions/markUpActions";
import {useDispatch, useSelector} from "react-redux";
import {IRootState} from "../../../interfaces/IRootState";

interface RouterProps {
    id: string;
}

interface MarkUpFormProps extends RouterProps {
    match: any,
    history: any
}

const MarkUpForm: React.FC<MarkUpFormProps> = ({history, match}) => {

    const show = useSelector((state: IRootState) => state.app.show)
    const messageText = useSelector((state: IRootState) => state.app.messageText)
    const messageType = useSelector((state: IRootState) => state.app.messageType)
    const markUpId = useSelector((state: IRootState) => state.markUps.markUp.id)
    const markUpName = useSelector((state: IRootState) => state.markUps.markUp.markUpName)
    const markUpPercent = useSelector((state: IRootState) => state.markUps.markUp.markUpPercent)
    const dispatch = useDispatch()

    useEffect(() => {
        const markUpId = parseInt(match.params.id)
        if (markUpId) {
            dispatch(findMarkUpById(markUpId));
        }
    }, [dispatch])

    const [percent, setPercent] = useState(0)

    const update = (event: FormEvent<HTMLFormElement>): void => {
        event.preventDefault();
        const markUp: IMarkUp = {
            id: markUpId,
            markUpName: markUpName,
            markUpPercent: percent,
        }
        dispatch(updateMarkUp(markUp));
        setTimeout(() => markUpList(), 1600);
    };

    const markUpList = (): void => {
        return history.push("/markUps")
    };

    // const markUpChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    //     setPercent(parseInt(event.target.value))
    // };

    return (
        <Container className="text-center col-5">
            <MyToast show={show} message={messageText} type={messageType}/>
            <Card className={"border border-dark"}>
                <Card.Header>
                    <FontAwesomeIcon icon={faPercent}/>&nbsp;Наценка
                </Card.Header>
                <Form onSubmit={update} id="markUpFormId">
                    <Card.Body>
                        <Form.Row>
                            <Form.Group as={Row} controlId="formPlaintextMarkUpName">
                                <Form.Label column sm="9">
                                    {markUpName}
                                </Form.Label>
                                <Col sm="3">
                                    <Form.Control required autoComplete="off"
                                                  type="text" name="percent"
                                                  value={markUpPercent}
                                                  onChange={event => setPercent(parseInt(event.target.value))}/>
                                </Col>
                            </Form.Group>
                        </Form.Row>
                    </Card.Body>
                    <Card.Footer style={{"textAlign": "right"}}>
                        <Button size="sm" variant="success" type="submit">
                            <FontAwesomeIcon icon={faSave}/>&nbsp;Сохранить
                        </Button>{' '}
                        <Button size="sm" variant="info" type="button" onClick={() => markUpList()}>
                            <FontAwesomeIcon icon={faList}/>&nbsp;Список наценок
                        </Button>
                    </Card.Footer>
                </Form>
            </Card>
        </Container>
    )
}

export default MarkUpForm