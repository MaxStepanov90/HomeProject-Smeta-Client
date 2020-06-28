import React from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faFolderOpen} from "@fortawesome/free-solid-svg-icons";

export const ProjectListHeader: React.FC = () => {
    return (
        <div>
            <div style={{"float": "left"}}>
                <FontAwesomeIcon icon={faFolderOpen}/>&nbsp;Список проектов
            </div>
        </div>
    )
}

