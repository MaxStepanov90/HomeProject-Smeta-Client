import React, {Component} from "react";
import MyToast from "../../Generic/MyToast";
import {Card, Container, Form} from "react-bootstrap";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPercent} from "@fortawesome/free-solid-svg-icons";
import MarkUpListTable from "./MarkUpListTable";

export default class MarkUpList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            markUps: [],
            show: false
        }
    }

    componentDidMount() {
        this.findAllMarkUps()
    }

    findAllMarkUps() {
        fetch("http://localhost:8080/remsmet/markUps")
            .then(response => response.json())
            .then((data) => {
                this.setState({
                    markUps: data
                })
            });
    }

    deleteMarkUp = (markUpId) => {
        fetch("http://localhost:8080/remsmet/markUps/" + markUpId, {
            method: 'DELETE'
        })
            .then(response => response.json())
            .then(markUp => {
                if (markUp) {
                    this.setState({"show": true});
                    setTimeout(() => this.setState({"show": false}), 1500);
                    this.setState({
                        markUps: this.state.markUps.filter(markUp => markUp.id !== markUpId)
                    });
                } else {
                    this.setState({"show": false});
                }
            })
    };


    render() {
        const {markUps,show} = this.state;
        return (

            <Container className="text-center col-5">
                    <MyToast show={show} message={"Наценка удалена."} type={"danger"}/>
                <Card className={"border border-dark"}>
                    <Card.Header>
                        <FontAwesomeIcon icon={faPercent}/>&nbsp;Наценки
                    </Card.Header>
                    <Form onSubmit={this.updateMarkUp} id="markUpId">
                        <Card.Body>
                           <MarkUpListTable markUps={markUps}
                                            onDeleteMarkUp={this.deleteMarkUp}
                           />
                        </Card.Body>
                    </Form>
                </Card>
            </Container>
        )
    }
}