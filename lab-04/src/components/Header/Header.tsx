import React, {useEffect, useState} from "react";
import "../../style/header.css"
import HeaderItem from "./HeaderItem";
import {Music, LayoutPanelTop, Waves, ListMusic, Activity, ShoppingCart, User} from 'lucide-react'

function Header() {
    const collections = [
        { img_url: '/img/bg1.jpg', total_track: 15, name: 'Midnight Chill', description: 'A smooth blend of lo-fi and ambient beats to wind down your night.' },
        { img_url: '/img/bg2.jpg', total_track: 22, name: 'Morning Boost', description: 'Energetic pop and electronic tracks to kickstart your day with motivation.' },
        { img_url: '/img/bg3.jpg', total_track: 18, name: 'Focus Flow', description: 'Instrumental and mellow tracks crafted to help you concentrate deeply.' },
        { img_url: '/img/bg4.jpg', total_track: 12, name: 'Sunset Vibes', description: 'Relaxing acoustic and indie tunes perfect for golden hour moments.' }
    ];

    const genresCollection = [
        { img_url: '/img/bg5.jpg', total_track: 20, name: 'Indie Spirit', description: 'Authentic and raw tracks with a modern indie feel.' },
        { img_url: '/img/bg6.jpg', total_track: 17, name: 'Urban Beats', description: 'Modern hip hop and trap sounds from the city streets.' },
        { img_url: '/img/bg7.jpg', total_track: 25, name: 'Epic Trailer', description: 'Cinematic orchestral tracks perfect for movie trailers.' },
        { img_url: '/img/bg8.jpg', total_track: 14, name: 'Jazz Lounge', description: 'Smooth and classy jazz vibes for relaxed settings.' }
    ];

    const moodCollection = [
        { img_url: '/img/bg9.jpg', total_track: 16, name: 'Feel Good', description: 'Uplifting melodies to boost your mood and spirit.' },
        { img_url: '/img/bg10.jpg', total_track: 19, name: 'Melancholy Moments', description: 'Emotional and introspective tracks for quiet times.' },
        { img_url: '/img/bg11.jpg', total_track: 21, name: 'High Energy', description: 'Fast-paced tracks to fuel action and movement.' },
        { img_url: '/img/bg12.jpg', total_track: 13, name: 'Peaceful Sleep', description: 'Gentle ambient music designed to help you relax and sleep.' }
    ];

    const genres = [
    "Cinematic", "Corporate", "Hip Hop", "Electronic", "Rock", "Ambient", "Pop", "Jazz", "Folk", "Acoustic", "Orchestral",
    "Indie", "Trap", "House", "Dubstep", "R&B", "Classical", "Blues", "Funk", "Country", "Latin", "World", "Reggae",
    "Lo-fi", "Synthwave", "Techno"
    ];

    const mood = [
    "Uplifting", "Inspiring", "Happy", "Serious", "Dark", "Epic", "Hopeful", "Energetic", "Calm", "Romantic", "Dramatic",
    "Sad", "Dreamy", "Peaceful", "Tense", "Mysterious", "Fun", "Confident", "Playful", "Aggressive", "Heroic", "Chill",
    "Suspenseful", "Optimistic"
    ];

    const playlist = [
    "Ad & Commercial", "Documentary", "Travel Vlog", "Slow Motion", "Time-Lapse", "Tech & Innovation", "Sports & Action",
    "Fashion", "Wedding", "Podcast Intro", "Cinematic Trailer", "Drone Footage", "Behind the Scenes", "Tutorials",
    "Corporate Presentation", "Product Review", "Cooking Show", "Gaming Video", "Workout Routine", "Nature & Wildlife",
    "Emotional Moments"
    ];

    const [isScrolled, setScroll] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScroll(window.scrollY > 0);
        };

        window.addEventListener("scroll", handleScroll);

        // Dọn dẹp khi component bị unmount
        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, [])

    return (
        <header className= {`fixed top-0 w-full z-50 transition-colors duration-300 ${isScrolled ? "bg-zinc-900 shadow-md" : "bg-transparent"}`}>
            <div className="px-10 py-3 flex justify-between items-center">
                <div className="flex items-center gap-x-2 cursor-pointer">
                    <img src="/header/sound1.png" alt="Music Wave" className="h-14 w-14"/>
                    <div className="flex-col justify-center">
                        <h1 className="text-2xl">VibeNest</h1>
                        <p className="sub-title mt-[-8px] ml-8">by shutterSock</p>
                    </div>
                </div>
                <nav className="flex gap-x-5 items-center">
                    <HeaderItem icon={Music} text={"Music"} show_hover_content={false} collections={collections} list={[]} type={""}/>
                    <HeaderItem icon={LayoutPanelTop} text={"Genres"} show_hover_content={true} collections={genresCollection} list={genres} type={"Genres"}/>
                    <HeaderItem icon={Waves} text={"Mood"} show_hover_content={true} collections={moodCollection} list={mood} type={"Moods"}/>
                    <HeaderItem icon={ListMusic} text={"Playlist"} show_hover_content={true} collections={collections} list={playlist} type={"Playlist"}/>
                    <HeaderItem icon={Activity} text={"SFX"} show_hover_content={false} collections={collections} list={[]} type={""}/>
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