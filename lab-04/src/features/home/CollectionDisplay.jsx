import React from "react";
import { Music, Play } from "lucide-react";
import '../../style/header.css'

const CollectionDisplay = ({img_url, total_track, name, description}) => {
    return (
        <div className="w-[300px] h-48 relative text-white ">
            <img src={img_url} alt="background" className="w-full h-full object-cover object-center rounded-lg"/>
            <p className="absolute top-[10px] left-[10px] flex font-bold items-center gap-x-1"><Music /> {total_track} Tracks</p>
            <p className="absolute top-[100px] left-[10px] font-semibold text-xl">{name}</p>
            <p className="absolute top-[130px] left-[10px] truncate w-9/10">{description}</p>
            <button className="absolute top-[10px] right-[20px] border-2 cursor-pointer border-white rounded-full p-2"><Play/></button>
        </div>
    )
}

export default CollectionDisplay;