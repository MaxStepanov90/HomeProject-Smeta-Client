import React, {FormEvent} from 'react';

import {Button, Card, Col, Container, Form} from 'react-bootstrap';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faFolderPlus, faList, faSave} from '@fortawesome/free-solid-svg-icons';
import {MyToast} from "../../Generic/MyToast/MyToast";
import {RouteComponentProps} from "react-router-dom";

type ProjectFormState = {
    show: boolean,
    projectContract: string,
    projectName: string,
    projectAddress: string,
    projectCreationDate: string,
    projectDescription: string,
    projectOwner: string
}

export default class ProjectForm extends React.Component<RouteComponentProps, ProjectFormState> {
    constructor(props: RouteComponentProps) {
        super(props);
        this.state = {
            show: false,
            projectContract: '',
            projectName: '',
            projectAddress: '',
            projectCreationDate: '',
            projectDescription: '',
            projectOwner: ''
        }
    }

    submitProject = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const project = {
            projectContract: this.state.projectContract,
            projectName: this.state.projectName,
            projectAddress: this.state.projectAddress,
            projectCreationDate: this.state.projectCreationDate,
            projectDescription: this.state.projectDescription,
            projectOwner: this.state.projectOwner
        };
        const headers = new Headers();
        headers.append('Content-Type', 'application/json');

        fetch("http://localhost:8080/remsmet/projects", {
            method: 'POST',
            body: JSON.stringify(project),
            headers
        })
            .then(response => response.json())
            .then(project => {
                if (project) {
                    this.setState({show: true});
                    setTimeout(() => this.setState({show: false}), 1500);
                    setTimeout(() => this.projectList(), 1600);
                } else {
                    this.setState({show: false})
                }
            });
        this.setState({
            projectContract: '',
            projectName: '',
            projectAddress: '',
            projectCreationDate: '',
            projectDescription: '',
            projectOwner: ''
        });
    };

    projectChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({
            [event.target.name]: event.target.value
        } as any)
    };

    projectList = (): void => {
        return this.props.history.push("/projects")
    };

    render() {
        const {
            projectContract, projectName, projectAddress, projectCreationDate, projectDescription, projectOwner, show
        } = this.state;

        const projectContractInputField =
            <Form.Group as={Col} controlId="formGridProjectContract">
                <Form.Label>Договор</Form.Label>
                <Form.Control required autoComplete="off"
                              type="test" name="projectContract"
                              value={projectContract} onChange={this.projectChange}
                              placeholder="№7"/>
            </Form.Group>
        const projectNameInputField =
            <Form.Group as={Col} controlId="formGridProjectName">
                <Form.Label>Название проекта</Form.Label>
                <Form.Control required autoComplete="off"
                              type="test" name="projectName"
                              value={projectName} onChange={this.projectChange}
                              placeholder="ЖК Соколовский"/>
            </Form.Group>
        const projectAddressInputField =
            <Form.Group as={Col} controlId="formGridProjectAddress">
                <Form.Label>Адрес объекта</Form.Label>
                <Form.Control required autoComplete="off"
                              type="test" name="projectAddress"
                              value={projectAddress} onChange={this.projectChange}
                              placeholder="ул Славяновская д15 кв237"/>
            </Form.Group>
        const projectCreationDateInputField =
            <Form.Group as={Col} controlId="formGridProjectCreationDate">
                <Form.Label>Дата создания договора</Form.Label>
                <Form.Control required autoComplete="off"
                              type="test" name="projectCreationDate"
                              value={projectCreationDate} onChange={this.projectChange}
                              placeholder="2015-05-03"/>
            </Form.Group>
        const projectOwnerInputField =
            <Form.Group as={Col} controlId="formGridProjectOwner">
                <Form.Label>Заказчик</Form.Label>
                <Form.Control required autoComplete="off"
                              type="test" name="projectOwner"
                              value={projectOwner} onChange={this.projectChange}
                              placeholder="Сершов Владилен Дмитриевич"/>
            </Form.Group>
        const projectDescriptionInputField =
            <Form.Group as={Col} controlId="formGridProjectDescription">
                <Form.Label>Описание</Form.Label>
                <Form.Control required autoComplete="off"
                              as="textarea"
                              rows={3}
                              type="test" name="projectDescription"
                              value={projectDescription} onChange={this.projectChange}
                              placeholder="Ремонт квартиры под ключ 40м2"/>
            </Form.Group>

        return (
            <Container>
                <MyToast show={show} message={"Проект успешно сохранен."} type={"success"}/>
                <Card className={"border border-dark"}>
                    <Card.Header>
                        <FontAwesomeIcon icon={faFolderPlus}/>&nbsp;Новый проект
                    </Card.Header>
                    <Form onSubmit={this.submitProject} id="projectFormId">
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
                            <Button size="sm" variant="info" type="button" onClick={() => this.projectList()}>
                                <FontAwesomeIcon icon={faList}/>&nbsp;Список проектов
                            </Button>
                        </Card.Footer>
                    </Form>
                </Card>
            </Container>
        );
    }
}