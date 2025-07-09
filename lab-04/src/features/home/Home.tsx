import React from "react";
import Header from "../../components/Header/Header";
import '../../style/home/home.css'
import {ArrowRight, Search} from 'lucide-react';
import { FaTiktok } from "react-icons/fa";
import { FaVimeoV, FaY } from "react-icons/fa6";
import { FaYoutube } from "react-icons/fa";
import { FaTwitch } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { FaFacebook } from "react-icons/fa";
import HomeDescriptionItem from "./HomeDescriptionItem";
import { FaCheck } from "react-icons/fa6";
import HomePlaylistSelection from "./HomePlaylistSelection";
import HomeTrendingSection from "./HomeTrendingSection";

export default function Home() {
  const categories = [
    "Podcasts",
    "Broadcast/OTT",
    "Film & TV",
    "Commercials",
    "Online Ads",
    "Websites",
  ];
  const categories1 = [
    "Weddings",
    "Games",
    "Marketing",
    "Non-Profits",
    "Blogs",
    "Presentations"
  ];

  return (
    <>  
        <Header />
        <div className="relative w-full h-[500px] overflow-hidden">
          <video
            src="/videos/bg-vid-1.mp4"  
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover object-bottom"
          ></video>
          <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-black to-transparent z-10" />
          
          <div className="absolute-center text-center w-full flex-col">
            <h2 className="font-bold text-5xl mb-5">Premium Tracks and Sound Effects, Simple Licenses</h2>
            <p className="font-medium mb-5">Unlimited downloads from our library of studio-quality audio for your videos, podcasts, games, and apps for one simple low price.</p>
            <a href="https://lucide.dev/icons/search" className="underline text-yellow-500 flex items-center justify-center gap-x-1 font-semibold mb-5">Get Unlimited Access <ArrowRight /></a>
            
            <form action="" className="flex items-center justify-center">
              <input type="text" name="search" id="search" placeholder="Find my track by searching genre, mood, instrument..."
              className="w-1/2 py-3 pl-6 pr-12 rounded-l-full bg-white/1 placeholder:text-gray-300 backdrop-blur-md border-[2px] border-white border-r-[0] focus:outline-none"
              />
              <button name="submit" title="submit" className="p-3 rounded-r-full border-[2px] border-white border-l-[0]"
              ><Search/></button>
            </form>
          </div>
        </div>

        <div className=" bg-gradient-black-down w-full h-49 pt-40">
          <div className="">
            <p className="text-by-theme text-4xl font-semibold text-center font-1">Music and sound effects for any platform</p>
            <p className="font-light text-center mt-3 text-lg">Providing royalty-free music for over 4.2M creative projects since 2015.</p>
            <div className="home-social-media-intro">
              <HomeDescriptionItem img_URL={"/img/podcast.jpg"} name={"Podcast"}/>
              <HomeDescriptionItem img_URL={"/img/youtube.jpg"} name={"Youtube"}/>
              <HomeDescriptionItem img_URL={"/img/instagram.jpg"} name={"Instagram"}/>
              <HomeDescriptionItem img_URL={"/img/tiktok.jpg"} name={"Tiktok"}/>
            </div>
          </div>

          <div className="home-project-n-brand-container">
            <div className="home-project-introduction">
                <p className="font-semibold text-4xl mb-10 font-1">Easy listening for every project</p>
                <p className="font-light text-md">Simple, substantial licenses with all rights included for every type of project</p>
                <button className="primary-button mt-10">See our licenses</button>
            </div>
            <div className="home-brand-project-container">
              <div className="home-project-brand-list">
                <p><FaYoutube />Youtube</p>
                <p><FaVimeoV />Vimeo</p>
                <p><FaTwitch />Twitch</p>
                <p><FaTiktok />TikTok</p>
                <p><FaInstagram />Instagram</p>
                <p><FaFacebook />Facebook</p>
              </div>
              <div className="home-project-brand-list">
                {categories.map((cate, index) => (
                  <p><FaCheck/>{cate}</p>
                ))}
              </div>
              <div className="home-project-brand-list">
                {categories1.map((cate, index) => (
                  <p><FaCheck/>{cate}</p>
                ))}
              </div>
            </div>
          </div>
          
          <HomePlaylistSelection />
          <HomeTrendingSection />

        </div>
    </>
  );
}
