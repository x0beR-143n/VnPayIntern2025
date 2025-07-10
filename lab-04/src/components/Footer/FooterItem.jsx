import React from "react";
import '../../style/footer/footer_item.css'
const FooterItems = ({title, values}) => {
    return (
        <div>
            <p className="title font-3">{title}</p>
            {values.map((value) => (
                <p>{value}</p>
            ))}
        </div>
    )
}

export default FooterItems;