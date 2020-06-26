import React, {useEffect} from "react";
import {MyToast} from "../../Generic/MyToast/MyToast";
import {Card, Container} from "react-bootstrap";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPercent} from "@fortawesome/free-solid-svg-icons";
import {MarkUpListTable} from "./MarkUpListTable";
import {useDispatch, useSelector} from "react-redux";
import {findAllMarkUps} from "../../../service/actions/markUpActions";
import {IRootState} from "../../../interfaces/IRootState";

const MarkUpList: React.FC = () => {

    const markUps = useSelector((state: IRootState) => state.markUps.markUps)
    const show = useSelector((state: IRootState) => state.app.show)
    const messageText = useSelector((state: IRootState) => state.app.messageText)
    const messageType = useSelector((state: IRootState) => state.app.messageType)
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(findAllMarkUps())
    }, [dispatch])

    return (
        <Container className="text-center col-5">
            <MyToast show={show} message={messageText} type={messageType}/>
            <Card className={"border border-dark"}>
                <Card.Header>
                    <FontAwesomeIcon icon={faPercent}/>&nbsp;Наценки
                </Card.Header>
                <Card.Body>
                    <MarkUpListTable markUps={markUps}/>
                </Card.Body>
            </Card>
        </Container>
    )
}
export default MarkUpList