import React from "react";
import {Link} from "react-router-dom";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faInfo, faPlusSquare} from "@fortawesome/free-solid-svg-icons";
import * as PropTypes from "prop-types";

export default function ProjectInfoButtonGroup({projectId}) {

    return (
        <div className="row justify-content-between mb-3">
            <Link to={{pathname: "/addEstimate", projectId: projectId}}
                  className="btn btn-sm btn-success">
                <FontAwesomeIcon icon={faPlusSquare}/>&nbsp;
                Новая смета
            </Link>
            <Link to={{pathname: "/paymentProject", projectId: projectId}}
                  className="btn btn-sm btn-info">
                <FontAwesomeIcon icon={faInfo}/>&nbsp;
                Платежи
            </Link>
        </div>
    )
}
ProjectInfoButtonGroup.propTypes={
    projectId: PropTypes.number.isRequired,
}