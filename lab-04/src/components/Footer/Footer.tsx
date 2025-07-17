import React, {useState} from "react";
import '../../style/footer/footer.css'
import FooterItems from "./FooterItem";
import { ArrowDown, PencilLine } from "lucide-react";
import { FaFacebookF, FaInstagram, FaTwitter, FaYoutube,  } from "react-icons/fa";
import { useTranslation } from 'react-i18next';

function Footer() {
    const generalLinks = ["Home", "Royalty-free Music", "Music Genres", "Music Moods", "Music Instruments", "SFX categories", "Artists", "Songs", "After Effects Templates", "Stock Video", "Stock Music", "Stock Photos"];

    const playlistLinks = ["Most Popular Music", "Most Recent Music", "Corporate / Business", "Jazz Music", "Classical Music", "Royalty Free Music for Projects", "Music Playlists", "Free Music"];

    const infoLinks = ["About Us", "Testimonials", "Privacy Policy", "License Information"];

    const composerLinks = ["Submit Music"];

    const supportLinks = ["Contact Us", "FAQ", "Cue Sheets", "Blog", "Affiliate Program", "Refer & get $25"];

    const [isOpenLanguageMenu, setOpenLanguageMenu] = useState(false);

    const { i18n } = useTranslation();
    const currentLang = i18n.language;

    const changeLanguage = (lang) => {
        i18n.changeLanguage(lang);
    };

    const languageNameMap = {
        en: "English",
        vi: "Tiếng Việt",
    };

    return (
        <footer className="">
            <div className="footer-item-container">
                <FooterItems title={"general"} values={generalLinks}/>
                <FooterItems title={"playlist"} values={playlistLinks}/>
                <FooterItems title={"info"} values={infoLinks}/>
                <FooterItems title={"composer"} values={composerLinks}/>
                <FooterItems title={"support"} values={supportLinks}/>
            </div>
            <div className="flex justify-center mt-24">
                <button
                    className="secondary-button flex items-center gap-2"
                    onClick={() =>
                    changeLanguage(currentLang === "en" ? "vi" : "en")
                    }
                >
                    {languageNameMap[currentLang] ?? currentLang} <PencilLine size={15} />
                </button>
            </div>
            <div className="footer-social-media-container">
                <FaFacebookF size={25}/>
                <FaInstagram size={25}/>
                <FaTwitter size={25}/>
                <FaYoutube size={25}/>
            </div>
            <p className="footer-description">PremiumBeat.com copyright © 2005–2025 Shutterstock Canada, ULC</p>
            <p  className="footer-description">All rights reserved.</p>
        </footer>
    );
}

export default Footer;