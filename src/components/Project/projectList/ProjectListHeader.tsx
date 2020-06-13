import React from "react";
import InputGroup from "react-bootstrap/InputGroup";
import FormControl from "react-bootstrap/FormControl";
import Button from "react-bootstrap/Button";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faFolderOpen, faSearch, faTimes} from "@fortawesome/free-solid-svg-icons";

type ProjectListHeaderProps = {
    search: string,
    currentPage: number,
    onSearchChange:(event: React.ChangeEvent<HTMLInputElement>) => void,
    onSearchData:(currentPage: number) => void,
    onCancelSearch:() => void
}

export const ProjectListHeader: React.FC<ProjectListHeaderProps> = (
    {search, currentPage, onSearchChange, onSearchData, onCancelSearch}
    ) => {

    return (
        <div>
            <div style={{"float": "left"}}>
                <FontAwesomeIcon icon={faFolderOpen}/>&nbsp;Список проектов
            </div>
            <div style={{"float": "right"}}>
                <InputGroup size="sm">
                    <FormControl placeholder="Поиск" name="search" value={search}
                                 onChange={onSearchChange}/>
                    <InputGroup.Append>
                        <Button size="sm" variant="outline-info" type="button"
                                onClick={() => onSearchData(currentPage)}>
                            <FontAwesomeIcon icon={faSearch}/>
                        </Button>
                        <Button size="sm" variant="outline-danger" type="button"
                                onClick={onCancelSearch}>
                            <FontAwesomeIcon icon={faTimes}/>
                        </Button>
                    </InputGroup.Append>
                </InputGroup>
            </div>
        </div>
    )
}

