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
import Footer from "../../components/Footer/Footer";
import { useTranslation } from 'react-i18next';

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

  const { t } = useTranslation();

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
            <h2 className="font-bold mb-5 xl:text-5xl lg:text-4xl md:text-2xl sm:text-xl">{t('h2')}</h2>
            <p className="font-medium mb-5 xl:text-md lg:text-sm sm:text-xs">{t('h2_description')}</p>
            <a href="https://lucide.dev/icons/search" className="underline text-yellow-500 flex items-center justify-center gap-x-1 font-semibold mb-5">{t('h2_description_2')}<ArrowRight /></a>
            
            <form action="" className="flex items-center justify-center">
              <input type="text" name="search" id="search" placeholder={t('home_input_placeholder')}
              className="w-1/2 py-3 pl-6 pr-12 rounded-l-full bg-white/1 placeholder:text-gray-300 backdrop-blur-md border-[2px] border-white border-r-[0] focus:outline-none"
              />
              <button name="submit" title="submit" className=" p-3 rounded-r-full border-[2px] border-white bg-yellow-700">
                <Search/>
              </button>
            </form>
          </div>
        </div>

        <div className=" bg-gradient-black-down w-full text-by-theme pt-40">
          <div className="">
            <p className="font-semibold text-center font-1 md:text-3xl lg:text-4xl sm:text-2xl ">{t('platform_title')}</p>
            <p className="font-light text-center mt-3 md:text-lg ">{t('platform_description')}</p> 
            <div className="home-social-media-intro">
              <HomeDescriptionItem img_URL={"/img/podcast.jpg"} name={"Podcast"}/>
              <HomeDescriptionItem img_URL={"/img/youtube.jpg"} name={"Youtube"}/>
              <HomeDescriptionItem img_URL={"/img/instagram.jpg"} name={"Instagram"}/>
              <HomeDescriptionItem img_URL={"/img/tiktok.jpg"} name={"Tiktok"}/>
            </div>
          </div>

          <div className="home-project-n-brand-container">
            <div className="home-project-introduction">
                <p className="font-semibold text-4xl mb-10 font-1 md:text-xl lg:text-4xl sm:text-md">{t('project_title')}</p>
                <p className="font-light sm:text-xss md:text-md">{t('project_description')}</p>
                <button className="primary-button mt-10">{t('button_license')}</button>
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
          
        </div>
        <HomeTrendingSection />
        <Footer />
    </>
  );
}
