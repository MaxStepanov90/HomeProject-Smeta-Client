import React from "react";
import * as PropTypes from "prop-types";

export default function TabDescriptionColumn({title, dataOfWorks, dataOfMaterials, dataOfAll}) {

    return (
        <div className="col">
            <div className="row">
                {title}
            </div>
            <div className="row">
                {dataOfWorks}
            </div>
            <div className="row">
                {dataOfMaterials}
            </div>
            <div className="row">
                {dataOfAll}
            </div>
        </div>
    )
}
TabDescriptionColumn.propTypes={
    title: PropTypes.string.isRequired,
    dataOfWorks: PropTypes.number.isRequired,
    dataOfMaterials: PropTypes.number.isRequired,
    dataOfAll: PropTypes.number.isRequired
}
TabDescriptionColumn.defaultProps = {
    title: 'Без названия',
    dataOfWorks: 0,
    dataOfMaterials: 0,
    dataOfAll: 0
};