import React, {FormEvent, useState} from 'react';

import {Button, Card, Col, Container, Form} from 'react-bootstrap';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faFolderPlus, faList, faSave} from '@fortawesome/free-solid-svg-icons';
import {MyToast} from "../../Generic/MyToast/MyToast";
import {useDispatch, useSelector} from "react-redux";
import {saveNewProject} from "../../../service/actions/projectActions";
import {IRootState} from "../../../interfaces/IRootState";

interface RouterProps {
    id: string;
}

interface ProjectFormProps extends RouterProps {
    history: any
}

const ProjectForm: React.FC<ProjectFormProps> = ({history}) => {

    const dispatch = useDispatch()
    const show = useSelector((state: IRootState) => state.app.show)
    const messageText = useSelector((state: IRootState) => state.app.messageText)
    const messageType = useSelector((state: IRootState) => state.app.messageType)
    const [projectContract,setProjectContract] = useState('')
    const [projectName,setProjectName] = useState('')
    const [projectAddress,setProjectAddress] = useState('')
    const [projectCreationDate,setProjectCreationDate] = useState('')
    const [projectDescription,setProjectDescription] = useState('')
    const [projectOwner,setProjectOwner] = useState('')

    const submitProject = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const newProject = {
            contract: projectContract,
            name: projectName,
            address: projectAddress,
            creationDate: projectCreationDate,
            description: projectDescription,
            owner: projectOwner
        };
        console.log(newProject)
        dispatch(saveNewProject(newProject));
        setTimeout(() => projectList(), 1600);
    }

    const projectList = (): void => {
        return history.push("/projects")
    };

    const projectContractInputField =
        <Form.Group as={Col} controlId="formGridProjectContract">
            <Form.Label>Договор</Form.Label>
            <Form.Control required autoComplete="off"
                          type="test" name="projectContract"
                          value={projectContract} onChange={e => setProjectContract(e.target.value)}
            />
        </Form.Group>
    const projectNameInputField =
        <Form.Group as={Col} controlId="formGridProjectName">
            <Form.Label>Название проекта</Form.Label>
            <Form.Control required autoComplete="off"
                          type="test" name="projectName"
                          value={projectName} onChange={e => setProjectName(e.target.value)}
            />
        </Form.Group>
    const projectAddressInputField =
        <Form.Group as={Col} controlId="formGridProjectAddress">
            <Form.Label>Адрес объекта</Form.Label>
            <Form.Control required autoComplete="off"
                          type="test" name="projectAddress"
                          value={projectAddress} onChange={e => setProjectAddress(e.target.value)}
            />
        </Form.Group>
    const projectCreationDateInputField =
        <Form.Group as={Col} controlId="formGridProjectCreationDate">
            <Form.Label>Дата создания договора</Form.Label>
            <Form.Control required autoComplete="off"
                          type="test" name="projectCreationDate"
                          value={projectCreationDate} onChange={e => setProjectCreationDate(e.target.value)}
            />
        </Form.Group>
    const projectOwnerInputField =
        <Form.Group as={Col} controlId="formGridProjectOwner">
            <Form.Label>Заказчик</Form.Label>
            <Form.Control required autoComplete="off"
                          type="test" name="projectOwner"
                          value={projectOwner} onChange={e => setProjectOwner(e.target.value)}
            />
        </Form.Group>
    const projectDescriptionInputField =
        <Form.Group as={Col} controlId="formGridProjectDescription">
            <Form.Label>Описание</Form.Label>
            <Form.Control required autoComplete="off"
                          as="textarea"
                          rows={3}
                          type="test" name="projectDescription"
                          value={projectDescription} onChange={e => setProjectDescription(e.target.value)}
            />
        </Form.Group>

    return (
        <Container>
            <MyToast show={show} message={messageText} type={messageType}/>
            <Card className={"border border-dark"}>
                <Card.Header>
                    <FontAwesomeIcon icon={faFolderPlus}/>&nbsp;Новый проект
                </Card.Header>
                <Form onSubmit={submitProject} id="projectFormId">
                    <Card.Body>
                        <Form.Row>
                            {projectContractInputField}
                            {projectNameInputField}
                        </Form.Row>
                        <Form.Row>
                            {projectAddressInputField}
                            {projectCreationDateInputField}
                        </Form.Row>
                        <Form.Row>
                            {projectOwnerInputField}
                        </Form.Row>
                        <Form.Row>
                            {projectDescriptionInputField}
                        </Form.Row>
                    </Card.Body>
                    <Card.Footer style={{"textAlign": "right"}}>
                        <Button size="sm" variant="success" type="submit">
                            <FontAwesomeIcon icon={faSave}/>&nbsp;Сохранить
                        </Button>{' '}
                        <Button size="sm" variant="info" type="button" onClick={() => projectList()}>
                            <FontAwesomeIcon icon={faList}/>&nbsp;Список проектов
                        </Button>
                    </Card.Footer>
                </Form>
            </Card>
        </Container>
    );
}
export default ProjectForm