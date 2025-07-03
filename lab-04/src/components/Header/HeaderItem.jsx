import React from "react";

const HeaderItem = ({icon: Icon, text}) => {
    return (
    <div className="flex items-center gap-2">
      <Icon className="w-5 h-5 text-blue-500 text-white"/>
      <span className="font-semibold text-white">{text}</span>
    </div>
  );
};

export default HeaderItem;