import React from "react";
import InputGroup from "react-bootstrap/InputGroup";
import Button from "react-bootstrap/Button";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faFastBackward, faFastForward, faStepBackward, faStepForward} from "@fortawesome/free-solid-svg-icons";
import FormControl from "react-bootstrap/FormControl";
import * as PropTypes from "prop-types";

export default function ProjectListFooter({
                                              currentPage, totalPages, onFirstPage, onPrevPage, onChangePage,
                                              onNextPage, onLastPage
                                          }) {

    return (

        <div>
            <div style={{"float": "left"}}>
                Страница {currentPage} из {totalPages}
            </div>

            <div style={{"float": "right"}}>
                <InputGroup size="sm">
                    <InputGroup.Prepend>
                        <Button type="button" variant="outline-info" disabled={currentPage === 1}
                                onClick={onFirstPage}>
                            <FontAwesomeIcon icon={faFastBackward}/>
                        </Button>
                        <Button type="button" variant="outline-info" disabled={currentPage === 1}
                                onClick={onPrevPage}>
                            <FontAwesomeIcon icon={faStepBackward}/>
                        </Button>
                    </InputGroup.Prepend>
                    <FormControl className={"page-num"} name="currentPage"
                                 value={currentPage}
                                 onChange={onChangePage}/>
                    <InputGroup.Append>
                        <Button type="button" variant="outline-info"
                                disabled={currentPage === totalPages}
                                onClick={onNextPage}>
                            <FontAwesomeIcon icon={faStepForward}/>
                        </Button>
                        <Button type="button" variant="outline-info"
                                disabled={currentPage === totalPages}
                                onClick={onLastPage}>
                            <FontAwesomeIcon icon={faFastForward}/>
                        </Button>
                    </InputGroup.Append>
                </InputGroup>
            </div>
        </div>
    )
}
ProjectListFooter.propTypes={
    currentPage: PropTypes.number.isRequired,
    totalPages: PropTypes.number.isRequired,
    onFirstPage: PropTypes.func.isRequired,
    onPrevPage: PropTypes.func.isRequired,
    onChangePage: PropTypes.func.isRequired,
    onNextPage: PropTypes.func.isRequired,
    onLastPage: PropTypes.func.isRequired,
}
ProjectListFooter.defaultProps = {
    currentPage: 1,
    totalPages: 1,
};
