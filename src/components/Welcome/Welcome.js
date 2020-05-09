import React, {Component} from "react";
import Jumbotron from "react-bootstrap/Jumbotron";
import {Container} from "react-bootstrap";

export default class Welcome extends Component{
    render() {
        return(
            <Container>
                <Jumbotron className=" text-center">
                    <h1>РемСмет</h1>
                    <blockquote className="blockquote">
                        <p>
                            Помощник в мире строительства и ремонта
                        </p>
                    </blockquote>
                </Jumbotron>
            </Container>

        )
    }
}