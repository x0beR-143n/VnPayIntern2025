import React from "react";
import Header from "../components/Header/Header";
import {ArrowRight, Search} from 'lucide-react';

export default function Home() {
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
          <div className="absolute-center text-center w-full flex-col text-white">
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
    </>
  );
}
