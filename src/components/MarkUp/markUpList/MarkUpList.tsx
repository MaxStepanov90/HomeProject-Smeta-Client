import React, {Dispatch} from "react";
import {MyToast} from "../../Generic/MyToast/MyToast";
import {Card, Container} from "react-bootstrap";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPercent} from "@fortawesome/free-solid-svg-icons";
import {MarkUpListTable} from "./MarkUpListTable";
import {deleteMarkUp, findAllMarkUps} from "../../../service/actions/markUpActions";
import {connect} from "react-redux";

type MarkUpListProps = {
    show: any,
    markUps: any,
    messageText: any,
    messageType: any,
    deleteMarkUp: (markUpId: number) => void,
    findAllMarkUps: () => any
}

class MarkUpList extends React.Component<MarkUpListProps> {
    componentDidMount() {
        this.props.findAllMarkUps()
    }
    deleteMarkUp = (markUpId: number) => {
        this.props.deleteMarkUp(markUpId);
    }
    render() {
        return (
            <Container className="text-center col-5">
                <MyToast show={this.props.show} message={this.props.messageText} type={this.props.messageType}/>
                <Card className={"border border-dark"}>
                    <Card.Header>
                        <FontAwesomeIcon icon={faPercent}/>&nbsp;Наценки
                    </Card.Header>
                    <Card.Body>
                        <MarkUpListTable markUps={this.props.markUps}
                                         onDeleteMarkUp={this.deleteMarkUp}
                        />
                    </Card.Body>
                </Card>
            </Container>
        )
    }
}
const mapDispatchToProps = (dispatch: Dispatch<any>) => {
    return {
        deleteMarkUp: (markUpId: number) => dispatch(deleteMarkUp(markUpId)),
        findAllMarkUps: () => dispatch(findAllMarkUps())
    }
}
const mapStateToProps = (state: any) => {
    return {
        show: state.app.show,
        messageText: state.app.messageText,
        messageType: state.app.messageType,
        markUps: state.markUps.markUps
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(MarkUpList)