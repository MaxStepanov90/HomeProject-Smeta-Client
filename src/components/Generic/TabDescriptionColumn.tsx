import React from "react";

type TabDescriptionColumnProps = {
    title: string,
    dataOfWorks: number | string,
    dataOfMaterials: number | string,
    dataOfAll: number | string
}
export const TabDescriptionColumn: React.FC<TabDescriptionColumnProps> = (
    {title, dataOfWorks, dataOfMaterials, dataOfAll}
) => {

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