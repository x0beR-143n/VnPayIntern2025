import React, {useEffect, useState} from "react";
import "../../style/header.css"
import HeaderItem from "./HeaderItem";
import {Music, LayoutPanelTop, Waves, ListMusic, Activity, ShoppingCart, User, Menu, ArrowRight, ArrowDown, ArrowUp} from 'lucide-react'
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useDispatch } from "react-redux";
import { logoutRequest } from "../../redux/slices/authSlice";
import LogoutLoading from '../../components/Layout/LoadingLogout';

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
    const [isOpenProfile, setOpenProfile] = useState(false);
    const dispatch = useDispatch();
    const authState = useSelector(state => state.auth);

    const isLoggedIn = authState.isLoggedIn

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

    const [isOpen, setOpen] = useState(false);

    const navigate = useNavigate();

    const handleLogin = () => {
        navigate('/login');
    };

    const toggleOpenProfile = () => {
        setOpenProfile(!isOpenProfile);
    }

    const handleLogout = () => {
        dispatch(logoutRequest()); // Đây là nơi bạn dispatch action logout
    };

    const handleTokenView = () => {
        navigate('/token_usage')
    }

    if(authState.isLoading) {
        return (
            <LogoutLoading />
        )
    }

    return (
        <header className= {`fixed top-0 w-full z-50 transition-colors text-by-theme duration-300 ${isScrolled ? "bg-header-scrolled " : "bg-heder-not-scroll"}`}>
            <div className="px-10 py-3 flex justify-between items-center">
                <div className="flex items-center gap-x-2 cursor-pointer">
                    <img src="/header/sound1.png" alt="Music Wave" className="h-14 w-14"/>
                    <div className="flex-col justify-center">
                        <h1 className="text-2xl">VibeNest</h1>
                        <p className="sub-title mt-[-8px] ml-8">by shutterSock</p>
                    </div>
                </div>
                <nav className="hidden lg:flex gap-x-5 items-center">
                    <HeaderItem icon={Music} text={"music"} show_hover_content={false} collections={collections} list={[]} type={""}/>
                    <HeaderItem icon={LayoutPanelTop} text={"genre"} show_hover_content={true} collections={genresCollection} list={genres} type={"Genres"}/>
                    <HeaderItem icon={Waves} text={"mood"} show_hover_content={true} collections={moodCollection} list={mood} type={"Moods"}/>
                    <HeaderItem icon={ListMusic} text={"playlist"} show_hover_content={true} collections={collections} list={playlist} type={"Playlist"}/>
                    <HeaderItem icon={Activity} text={"sfx"} show_hover_content={false} collections={collections} list={[]} type={""}/>
                </nav>
                <div className="flex gap-x-3 items-center ">
                     <div className="relative block lg:hidden">
                        <Menu
                            className={`block cursor-pointer ${
                                isOpen ? "text-yellow-800" : "text-zinc-400"
                            }`}
                            onClick={() => setOpen(!isOpen)}
                        />
                        {isOpen && (
                            <div className="absolute left-1/2 top-full mt-2 -translate-x-1/2 bg-zinc-900 flex flex-col gap-y-5 rounded-lg py-5 pr-10 pl-2">
                                <p className="flex items-center gap-x-2 cursor-pointer hover:text-yellow-500"><Music />Music <ArrowRight /></p>
                                <p className="flex items-center gap-x-2 cursor-pointer hover:text-yellow-500"><LayoutPanelTop />Genres <ArrowRight /></p>
                                <p className="flex items-center gap-x-2 cursor-pointer hover:text-yellow-500"><Waves />Mood <ArrowRight /></p>
                                <p className="flex items-center gap-x-2 cursor-pointer hover:text-yellow-500"><ListMusic />Playlist <ArrowRight /></p>
                                <p className="flex items-center gap-x-2 cursor-pointer hover:text-yellow-500"><Activity />SFX <ArrowRight /></p>
                            </div>
                        )}
                    </div>
                    {isLoggedIn ? ( 
                        <div className="relative">
                            {isOpenProfile ? (
                                <div className="cursor-pointer flex items-center text-yellow-600" onClick={toggleOpenProfile} > 
                                    <User />
                                    <ArrowUp />
                                </div>
                            ) : (
                                <div className="cursor-pointer flex items-center hover:text-yellow-600" onClick={toggleOpenProfile} > 
                                    <User />
                                    <ArrowDown />
                                </div>
                            )}
                            {isOpenProfile && (
                                <div className="mt-3 p-4 bg-zinc-800 rounded-xl absolute left-1/2 -translate-x-1/2 flex flex-col gap-y-5 w-max">
                                    <div className="flex gap-x-2">
                                        <img src="/img/avatar.png" alt=""  className="w-20 h-20"/>
                                        <div>
                                            <p className="font-1">{authState.username}</p>
                                            <p className="font-3 text-sm text-gray-400">{authState.email}</p>
                                        </div>
                                    </div>
                                    <button className="primary-button cursor-pointer" onClick={handleTokenView}>View your jwt token</button>
                                    <button className="primary-button cursor-pointer" onClick={handleLogout}>Logout</button>
                                </div>
                            )}
                        </div> 
                    ) : ( 
                        <User className="cursor-pointer" onClick={handleLogin} /> 
                    )}
                    <button className="primary-button">Subscribe</button>
                    <ShoppingCart className=""/>          
                </div>
            </div>
        </header>
    );
}

export default Header;