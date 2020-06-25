import React, {Component, Dispatch} from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faFolderOpen, faInfo} from "@fortawesome/free-solid-svg-icons";
import {Button, Card, Container} from "react-bootstrap";
import {RouteComponentProps} from "react-router-dom";
import {PaymentListTable} from "./PaymentListTable";
import {connect} from "react-redux";
import {MyToast} from "../../Generic/MyToast/MyToast";
import {findAllPaymentsByProjectId} from "../../../service/actions/paymentActions";

type PaymentListProps = {
    show: boolean,
    messageText: string,
    messageType: string,
    payments: any,
    findAllPaymentsByProjectId: (projectId: number) => void
}
type PaymentListState = {
    projectId: number
}
class PaymentList extends Component<PaymentListProps & RouteComponentProps, PaymentListState> {
    constructor(props: PaymentListProps & RouteComponentProps) {
        super(props);
        this.state = {
            projectId: (this.props.history.location.state as any).projectId
        };
    }

    componentDidMount() {
        const projectId = this.state.projectId;
        if (projectId) {
            this.props.findAllPaymentsByProjectId(projectId)
        }
    }

    paymentList = (projectId: number): void => {
        console.log(projectId)
        return this.props.history.push("/projectInfo/" + projectId)
    };

    render() {
        const {projectId} = this.state;
        const {payments} = this.props.payments

        return (
            <Container>
                <MyToast show={this.props.show} message={this.props.messageText} type={this.props.messageType}/>
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
const mapStateToProps = (state: any) =>{
    return {
        show: state.app.show,
        messageText: state.app.messageText,
        messageType: state.app.messageType,
        payments: state.payments
    }
}
const mapDispatchToProps = (dispatch: Dispatch<any>) => {
    return {
        findAllPaymentsByProjectId: (projectId: number) => (dispatch(findAllPaymentsByProjectId(projectId)))
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(PaymentList)