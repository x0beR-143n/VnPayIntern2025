import React, { useState } from "react";
import '../../style/home/homeplaylistselection.css'
import { X } from "lucide-react";
import CollectionDisplay from "./CollectionDisplay";
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from "framer-motion";


export default function HomePlaylistSelection() {
    const [selectedButton, setSelectedButton] = useState(-1);
    const categories = ["Artist", "Genres", "Moods", "Projects", "Seasonal", "Staff Picks"];
    const artists = [{name:"Discover: Mood Craft",trackCount:18,description:"Create Fund Grant Winner",imgUrl:"/img/playlist_bg_1.jpg"},{name:"Discover: Tim Datailor",trackCount:16,description:"Create Fund Grant Winner",imgUrl:"/img/playlist_bg_2.jpg"},{name:"Discover: Sunset Fluid",trackCount:15,description:"Create Fund Grant Winner",imgUrl:"/img/playlist_bg_3.jpg"},{name:"Discover: Lowkeyd",trackCount:15,description:"Create Fund Grant Winner",imgUrl:"/img/playlist_bg_4.jpg"},{name:"Discover: Taizo Audio",trackCount:40,description:"Cinematic Orchestral Music",imgUrl:"/img/playlist_bg_5.jpg"},{name:"Discover: Grace Mesa",trackCount:40,description:"Gritty Indie Pop",imgUrl:"/img/playlist_bg_6.jpg"}];
    const genres = [{name:"Discover: Synth Rush",trackCount:22,description:"Futuristic Electro Vibes",imgUrl:"/img/playlist_bg_7.jpg"},{name:"Discover: Jazz Motion",trackCount:14,description:"Smooth Jazz Tracks",imgUrl:"/img/playlist_bg_8.jpg"},{name:"Discover: Dark Tension",trackCount:30,description:"Dark Ambient Soundscapes",imgUrl:"/img/playlist_bg_9.jpg"},{name:"Discover: Happy Beats",trackCount:19,description:"Uplifting Feel-Good Music",imgUrl:"/img/playlist_bg_10.jpg"},{name:"Discover: Latin Grooves",trackCount:25,description:"Energetic Latin Rhythms",imgUrl:"/img/playlist_bg_11.jpg"},{name:"Discover: Vintage Rock",trackCount:35,description:"Old School Rock Vibes",imgUrl:"/img/playlist_bg_12.jpg"}];
    const moods = [{name:"Discover: Chill Time",trackCount:20,description:"Relax & Unwind",imgUrl:"/img/playlist_bg_13.jpg"},{name:"Discover: Hype Energy",trackCount:28,description:"Boost Your Mood",imgUrl:"/img/playlist_bg_14.jpg"},{name:"Discover: Calm Piano",trackCount:17,description:"Peaceful Piano Tracks",imgUrl:"/img/playlist_bg_15.jpg"},{name:"Discover: Happy Vibes",trackCount:30,description:"Positive & Bright",imgUrl:"/img/playlist_bg_16.jpg"},{name:"Discover: Dramatic Pulse",trackCount:24,description:"Tension and Emotion",imgUrl:"/img/playlist_bg_1.jpg"},{name:"Discover: Night Drive",trackCount:27,description:"Synthwave and Retro",imgUrl:"/img/playlist_bg_2.jpg"}];
    const projects = [{name:"Discover: Startup Pulse",trackCount:19,description:"Perfect for Pitch Videos",imgUrl:"/img/playlist_bg_3.jpg"},{name:"Discover: Documentary Cut",trackCount:33,description:"Music for Storytelling",imgUrl:"/img/playlist_bg_4.jpg"},{name:"Discover: Tech Future",trackCount:21,description:"Innovative Backgrounds",imgUrl:"/img/playlist_bg_5.jpg"},{name:"Discover: Bold Action",trackCount:37,description:"For Cinematic Projects",imgUrl:"/img/playlist_bg_6.jpg"},{name:"Discover: Travel Diary",trackCount:26,description:"Perfect for Vlogs",imgUrl:"/img/playlist_bg_7.jpg"},{name:"Discover: Calm Explainer",trackCount:15,description:"Clean & Minimal",imgUrl:"/img/playlist_bg_8.jpg"}];
    const seasonal = [{name:"Discover: Summer Pop",trackCount:29,description:"Sunny & Energetic",imgUrl:"/img/playlist_bg_9.jpg"},{name:"Discover: Winter Chill",trackCount:16,description:"Cool Mellow Tones",imgUrl:"/img/playlist_bg_10.jpg"},{name:"Discover: Autumn Mood",trackCount:18,description:"Warm Acoustic Feel",imgUrl:"/img/playlist_bg_11.jpg"},{name:"Discover: Spring Bloom",trackCount:20,description:"Fresh and Light",imgUrl:"/img/playlist_bg_12.jpg"},{name:"Discover: Halloween Spooks",trackCount:31,description:"Creepy and Fun",imgUrl:"/img/playlist_bg_13.jpg"},{name:"Discover: Christmas Joy",trackCount:23,description:"Festive Cheer",imgUrl:"/img/playlist_bg_14.jpg"}];
    const staffPicks = [{name:"Discover: Editor's Choice",trackCount:40,description:"Handpicked by Team",imgUrl:"/img/playlist_bg_15.jpg"},{name:"Discover: Best of 2024",trackCount:45,description:"Top Tracks This Year",imgUrl:"/img/playlist_bg_16.jpg"},{name:"Discover: Hidden Gems",trackCount:34,description:"Underrated Tracks",imgUrl:"/img/playlist_bg_1.jpg"},{name:"Discover: Trending Now",trackCount:38,description:"Popular Right Now",imgUrl:"/img/playlist_bg_2.jpg"},{name:"Discover: Timeless Picks",trackCount:36,description:"Evergreen Tracks",imgUrl:"/img/playlist_bg_3.jpg"},{name:"Discover: Rising Stars",trackCount:25,description:"New Talents",imgUrl:"/img/playlist_bg_4.jpg"}];
    const [selectedPlaylist, setPlaylist] = useState(staffPicks);

    const cancelSelect = () => {
        setSelectedButton(-1);
        setPlaylist(staffPicks);
    }

    const selectPlaylist = (index) => {
        setSelectedButton(index);
        switch (index) {
            case 0:
                setPlaylist(artists);
                break;
            case 1:
                setPlaylist(genres);
                break;
            case 2:
                setPlaylist(moods);
                break;
            case 3:
                setPlaylist(projects);
                break;
            case 4:
                setPlaylist(seasonal);
                break;
            case 5:
                setPlaylist(staffPicks);
                break;
            default:
                setPlaylist(staffPicks);
        }
    }

    return (
        <div className="home-playlist-selection-container">
            <p className="font-1 text-4xl text-center">Curated playlist to fit any vibes</p>
            <p className="text-lg font-light text-center">Discover our customized collections to find the track for whatever you're working on.</p>
            <div className="playlist_options_button_container">
                {categories.map((cate, index) => (
                    (selectedButton === index ? 
                        <button onClick={() => cancelSelect()} className = "playlist_options_button_selected">
                            {cate} <X size={15}/>
                        </button>
                    :
                        <button onClick={() => selectPlaylist(index)} className = "playlist_options_button">
                            {cate}
                        </button>
                    ) 
                ))}
            </div>
            <div className="playlist-container">
                <AnimatePresence mode="wait">
                {selectedPlaylist.map((playlist) => (
                <motion.div
                    key={playlist.name}                 // luôn có key duy nhất
                    initial={{ opacity: 0, y: 10 }}     // trạng thái bắt đầu
                    animate={{ opacity: 1, y: 0 }}      // trạng thái khi render
                    exit={{ opacity: 0, y: -10 }}       // trạng thái khi biến mất
                    transition={{ duration: 0.3 }}     // thời gian chuyển động
                >
                    <CollectionDisplay
                        img_url={playlist.imgUrl}
                        total_track={playlist.trackCount}
                        name={playlist.name}
                        description={playlist.description}
                    />
                </motion.div>
                ))}
            </AnimatePresence>
            </div>
        </div>
    )
}
