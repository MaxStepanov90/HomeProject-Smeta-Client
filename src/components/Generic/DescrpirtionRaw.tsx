import React from "react";

type DescriptionRawProps = {
    title: string,
    value: string | number
}

export const DescriptionRaw: React.FC<DescriptionRawProps> = ({title, value}) => {

    return (
        <div className="row m-1">
            {title} : {value}
        </div>
    )
}