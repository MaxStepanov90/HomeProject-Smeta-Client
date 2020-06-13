import React from "react";
import InputGroup from "react-bootstrap/InputGroup";
import Button from "react-bootstrap/Button";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faFastBackward, faFastForward, faStepBackward, faStepForward} from "@fortawesome/free-solid-svg-icons";
import FormControl from "react-bootstrap/FormControl";

type ProjectListFooterProps = {
    currentPage: number,
    totalPages: number,
    onFirstPage: () => void,
    onPrevPage: () => void,
    onChangePage: (event: React.ChangeEvent<HTMLInputElement>) => void,
    onNextPage: () => void,
    onLastPage: () => void
}

export const ProjectListFooter: React.FC<ProjectListFooterProps> = (
    {
        currentPage, totalPages, onFirstPage, onPrevPage, onChangePage, onNextPage, onLastPage
    }
) => {

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