import React from "react";

export default function HomeDescriptionItem({img_URL, name}) {
    return (
            <div className="relative w-72 h-64 ">
                <img src={img_URL} alt="" className="full-background object-bottom "/>
                <p className=" pl-5 absolute w-full h-24 bottom-0 text-lg font-semibold bg-black-transparent text-center-column">{name}</p>
            </div>   
    )
}