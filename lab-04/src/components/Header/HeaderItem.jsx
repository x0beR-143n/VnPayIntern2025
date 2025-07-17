import React from "react";
import CollectionDisplay from "../../features/home/CollectionDisplay";
import { useTranslation } from 'react-i18next';

// eslint-disable-next-line no-unused-vars
const HeaderItem = ({icon: Icon, text, show_hover_content, collections, list, type}) => {
  
  const { t } = useTranslation();

  return (
    <div className={show_hover_content ? "relative group" : "relative"}>
      <div className="flex items-center gap-2 p-[1px] hover:border-b-[2px] rounded cursor-pointer hover:text-yellow-900 group hover:text-lg">
        <Icon className="w-5 h-5"/>
        <span className="font-semibold">{t(text)}</span>
      </div>
      <div className="w-[1000px] h-110 absolute flex justify-between gap-x-5 bg-black p-5 left-1/2 -translate-x-1/2 invisible group-hover:visible rounded-xl mt-1 ">
        <div className="flex flex-wrap items-center gap-x-3 gap-y-3 w-2/3 h-full">
          {collections.map((collection, i) => (
            <CollectionDisplay key={i} img_url={collection.img_url} name={collection.name} description={collection.description} total_track={collection.total_track}/>
          ))}
        </div>
        <div className="w-1/3">
          <ul className="columns-2 list-none space-x-3">
            {list.map((item, index) => (
              <li key={index} className="font-extralight">{item}</li>
            ))}
          </ul>
          <div className="flex justify-center mt-5">
            <button className="primary-button ">See all {type}</button>
          </div>
        </div>
      </div>
    </div>
   
  );
};

export default HeaderItem;