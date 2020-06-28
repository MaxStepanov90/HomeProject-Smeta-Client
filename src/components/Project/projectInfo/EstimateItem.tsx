import ButtonGroup from "react-bootstrap/ButtonGroup";
import {Link} from "react-router-dom";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faEye, faTrash} from "@fortawesome/free-solid-svg-icons";
import Button from "react-bootstrap/Button";
import {deleteEstimate} from "../../../service/actions/estimateActions";
import React, { Fragment } from "react";
import {IEstimate} from "../../../interfaces/IEstimate.";
import {useDispatch} from "react-redux";

type EstimateItemProps = {
    estimate: IEstimate
}
export const EstimateItem:React.FC<EstimateItemProps> = ({estimate}) => {

    const dispatch = useDispatch()

    return (
        <Fragment>
            <tr>
                <td>{estimate.name}</td>
                <td>{estimate.cost}</td>
                <td>{estimate.performance}</td>
                <td>{estimate.payment}</td>
                <td>{estimate.notPayment}</td>
                <td>
                    <ButtonGroup>
                        <Link to={{
                            pathname: "/estimate/" + estimate.id,
                            state: {estimateName: estimate.name}
                        }}
                              className="btn btn-sm btn-outline-primary">
                            <FontAwesomeIcon icon={faEye}/>&nbsp;
                        </Link>
                        <Button size="sm" variant="outline-danger"
                                onClick={() => dispatch(deleteEstimate(estimate.id))}>
                            <FontAwesomeIcon icon={faTrash}/>
                        </Button>
                    </ButtonGroup>
                </td>
            </tr>
        </Fragment>
    )
}