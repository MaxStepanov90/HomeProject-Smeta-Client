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
    dataOfWorks: PropTypes.any.isRequired,
    dataOfMaterials: PropTypes.any.isRequired,
    dataOfAll: PropTypes.any.isRequired
}
TabDescriptionColumn.defaultProps = {
    title: 'Без названия',
    dataOfWorks: '-',
    dataOfMaterials: '-',
    dataOfAll: '-'
};