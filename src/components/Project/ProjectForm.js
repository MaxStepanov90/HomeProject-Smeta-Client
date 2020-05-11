import React, {Component} from 'react';

import {Button, Card, Col, Container, Form} from 'react-bootstrap';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faFolderPlus, faList, faSave} from '@fortawesome/free-solid-svg-icons';
import MyToast from "../Generic/MyToast";

export default class ProjectForm extends Component {
    constructor(props) {
        super(props);
        this.state = this.initialState;
        this.state.show = false;
        this.projectChange = this.projectChange.bind(this);
        this.submitProject = this.submitProject.bind(this);
    }

    initialState = {
        projectContract: '', projectName: '', projectAddress: '', projectCreationDate: '', projectDescription: '',
        projectOwner: ''
    };

    componentDidMount() {
        const projectId = this.props.match.params.id;
        if (projectId) {
            this.findProjectById(projectId);
        }
    };

    findProjectById = (projectId) => {
        fetch("http://localhost:8080/remsmet/projects/" + projectId)
            .then(response => response.json())
            .then((project) => {
                if (project) {
                    this.setState({
                        projectContract: project.projectContract,
                        projectName: project.projectName,
                        projectAddress: project.projectAddress,
                        projectCreationDate: project.projectCreationDate,
                        projectDescription: project.projectDescription,
                        projectOwner: project.projectOwner
                    })
                }
            }).catch((error) => {
            console.error('Error' + error)
        });
    };

    submitProject = event => {
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
                    this.setState({"show": true});
                    setTimeout(() => this.setState({"show": false}), 1500);
                    setTimeout(() => this.projectList(), 1600);
                } else {
                    this.setState({"show": false})
                }
            });
        this.setState(this.initialState);
    };

    projectChange = event => {
        this.setState({
            [event.target.name]: event.target.value
        })
    };

    projectList = () => {
        return this.props.history.push("/projects")
    };

    render() {
        const {
            projectContract, projectName, projectAddress, projectCreationDate, projectDescription,
            projectOwner, show
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
                              as="textarea" rows="3"
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
                            <Button size="sm" variant="info" type="button" onClick={this.projectList.bind()}>
                                <FontAwesomeIcon icon={faList}/>&nbsp;Список проектов
                            </Button>
                        </Card.Footer>
                    </Form>
                </Card>
            </Container>
        );
    }
}