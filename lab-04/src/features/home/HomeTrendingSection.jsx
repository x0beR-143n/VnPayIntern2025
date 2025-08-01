import '../../style/home/hometrendingsection.css'
import React from 'react'
import { Play, EllipsisVertical, Download } from "lucide-react";
import { useTranslation } from 'react-i18next';

export default function HomeTrendingSection() {
    const {t} = useTranslation();
    const songs = [
        { title: "Fargone", url: "/songs/fargone", genre: "Ambient,Soundscape", artist: "Eli Morrison", mood: "Dreamy" , soundwave_url: '/img/soundwave/fargone.png'},
        { title: "Hypernova", url: "/songs/hypernova", genre: "Futuristic,Electronic", artist: "Nova Blaze", mood: "Energetic", soundwave_url: '/img/soundwave/hypernova.png' },
        { title: "Memory", url: "/songs/memory", genre: "Lo-fi, Chill, Beats", artist: "Chill Theory", mood: "Nostalgic" , soundwave_url: '/img/soundwave/memory.png'},
        { title: "Overjoyed", url: "/songs/overjoyed", genre: "Indie, Pop, Ballad", artist: "Sera Day", mood: "Uplifting", soundwave_url: '/img/soundwave/overjoyed.png' },
        { title: "Street", url: "/songs/street", genre: "Urban, Hip-Hop, Groove", artist: "DJ Nomad", mood: "Bold", soundwave_url: '/img/soundwave/street.png' }
    ];

    return (
        <div className='home-trending-container'>
            <p className='text-4xl font-1 '>{t('trending_title')}</p>
            <p className='text-lg mt-5'>{t('trending_description')}</p>
            <div className='mt-10'>
                { songs.map((song) => (
                    <div className='singular-song-container'>
                        <div className='flex gap-x-3'>
                            <button className="play_button"><Play/></button>
                            <div>
                                <p className='font-3 font-medium text-lg'>{song.title}</p>
                                <p className='text-sm artist-color'><span className='font-light'>by </span>{song.artist}</p>
                            </div>
                        </div>
                        <div className='soundwave-container'>
                            <img src={song.soundwave_url} alt="" />
                        </div>
                        <div>
                            <p className='font-3 mood'>{song.genre}</p>
                            <p className='font-3 mood'>{song.mood}</p>
                        </div>
                       <p><EllipsisVertical size={18}/></p>
                       <button className='download-button'>Download<Download size={20}/></button>
                    </div>
                ))}
            </div>
        </div>
    )
}   