import React from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faFolderOpen} from "@fortawesome/free-solid-svg-icons";

type ProjectListHeaderProps = {
    currentPage: number,
}

export const ProjectListHeader: React.FC<ProjectListHeaderProps> = ({currentPage}) => {
    return (
        <div>
            <div style={{"float": "left"}}>
                <FontAwesomeIcon icon={faFolderOpen}/>&nbsp;Список проектов
            </div>
        </div>
    )
}

