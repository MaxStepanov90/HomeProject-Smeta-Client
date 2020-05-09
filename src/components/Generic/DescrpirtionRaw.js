import React from "react";
import * as PropTypes from "prop-types";

export default function DescriptionRaw({title, value}) {

    return (
        <div className="row m-1">
            {title} : {value}
        </div>
    )
}
DescriptionRaw.propTypes={
    title: PropTypes.string.isRequired,
    value: PropTypes.any.isRequired,
}
DescriptionRaw.defaultProps = {
    title: 'Без названия',
    value: 'Значение не указано',
};