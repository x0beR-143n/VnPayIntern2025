import React from "react";
import "../../style/header.css"
import HeaderItem from "./HeaderItem";
import {Music, LayoutPanelTop, Waves, ListMusic, Activity, ShoppingCart, User} from 'lucide-react'

function Header() {
    return (
        <header className="fixed top-0 w-full z-50">
            <div className="px-10 py-3 flex justify-between items-center">
                <div className="flex items-center gap-x-2">
                    <img src="/header/sound1.png" alt="Music Wave" className="h-14 w-14"/>
                    <div className="flex-col justify-center">
                        <h1 className="text-2xl">VibeNest</h1>
                        <p className="sub-title mt-[-8px] ml-8">by shutterSock</p>
                    </div>
                </div>
                <nav className="flex gap-x-5 items-center">
                    <HeaderItem icon={Music} text={"Music"}/>
                    <HeaderItem icon={LayoutPanelTop} text={"Genres"}/>
                    <HeaderItem icon={Waves} text={"Mood"}/>
                    <HeaderItem icon={ListMusic} text={"Playlist"}/>
                    <HeaderItem icon={Activity} text={"SFX"}/>
                </nav>
                <div className="flex gap-x-3 items-center">
                    <p className="text-zinc-400 font-medium text-sm">Pricing</p>
                    <button className="primary-button">Subscribe</button>
                    <ShoppingCart className="text-zinc-400"/>
                    <User className="text-zinc-400"/>
                </div>
            </div>
        </header>
    );
}

export default Header;