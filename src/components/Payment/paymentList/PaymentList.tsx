import React, {Component} from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faFolderOpen, faInfo} from "@fortawesome/free-solid-svg-icons";
import {Button, Card, Container} from "react-bootstrap";
import {IPayment} from "../../../interfaces/IPayment";
import {RouteComponentProps} from "react-router-dom";
import {PaymentListTable} from "./PaymentListTable";

type PaymentListProps = {}
type PaymentListState = {
    payments: IPayment[],
    projectId: number
}
export default class PaymentList extends Component<PaymentListProps & RouteComponentProps, PaymentListState> {
    constructor(props: PaymentListProps & RouteComponentProps) {
        super(props);
        this.state = {
            payments: [],
            projectId: (this.props.history.location.state as any).projectId
        };
    }

    componentDidMount() {
        const projectId = this.state.projectId;
        if (projectId) {
            this.findAllPaymentsByProjectId(projectId)
        }
    }

    findAllPaymentsByProjectId(projectId: number): void {
        console.log(projectId)
        fetch("http://localhost:8080/remsmet/payments/projectId/" + projectId)
            .then(response => response.json())
            .then((data) => {
                this.setState({
                    payments: data
                })
            });
    }

    paymentList = (projectId: number): void => {
        console.log(projectId)
        return this.props.history.push("/projectInfo/" + projectId)
    };


    render() {

        const {payments, projectId} = this.state;

        return (
            <Container>
                <Card className={"border border-dark"}>
                    <Card.Header>
                        <FontAwesomeIcon icon={faInfo}/>&nbsp;Платежи
                    </Card.Header>
                    <Card.Body>
                        <PaymentListTable payments={payments}/>
                    </Card.Body>
                    <Card.Footer style={{"textAlign": "right"}}>
                        <Button size="sm" variant="info" type="button"
                                onClick={() => this.paymentList(projectId)}>
                            <FontAwesomeIcon icon={faFolderOpen}/>&nbsp;Вернуться назад
                        </Button>
                    </Card.Footer>
                </Card>
            </Container>
        )
    }
}