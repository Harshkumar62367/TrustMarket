import React from "react";
import { GoPrimitiveDot } from "react-icons/go";

const DataCard = (props) => {
  return (
    <div className="bg-[#101010] rounded-xl p-4 mb-10">
      <div className="w-[18rem] h-[12rem] overflow-hidden  flex justify-center">
        <img src={props.image} alt="me" className="w-[18rem] rounded-xl mt-0" />
      </div>
      <div className="w-[15rem] m-2 mt-5">
        <h1 className="font-bold text-xl">{props.title}</h1>
        <h2 className="mt-2 text-sm text-gray-400">{props.details}</h2>
        <div className="flex justify-between items-center mt-3 w-[110%]">
          <div className="flex items-center gap-1 text-sm">
            <p className="text-pink-500 font-semibold text-base"> {props.price + " ETH"}</p>
            <GoPrimitiveDot className="text-white text-[0.4rem]" />
            <p>{props.size} </p>
            <GoPrimitiveDot className="text-white text-[0.4rem]" />
            <p> ({props.format})</p>
          </div>
          <button className="bg-pink-500 hover:bg-pink-600 px-5 py-1 rounded-xl">
            Buy
          </button>
        </div>
      </div>
    </div>
  );
};

export default DataCard;
