import React from "react";
import '../../style/footer/footer_item.css'
import { useTranslation } from "react-i18next";

const FooterItems = ({title, values}) => {
    const { t } = useTranslation();
    return (
        <div>
            <p className="title font-3">{t(title)}</p>
            {values.map((value) => (
                <p>{value}</p>
            ))}
        </div>
    )
}

export default FooterItems;