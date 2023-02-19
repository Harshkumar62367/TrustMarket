import React from "react";
import Image from "next/image";
import { GoPrimitiveDot } from "react-icons/go";

const DataCard = (props) => {
  return (
    <div className="dark:bg-[#101010] bg-white shadow-md rounded-xl p-4 mb-10">
      <div className="w-[18rem] h-[12rem] overflow-hidden  flex justify-center">
        <Image
          src={props.image}
          alt="me"
          className="w-[18rem] rounded-xl mt-0"
          width={288}
          height={200}
        />
      </div>
      <div className="w-[15rem] m-2 mt-5">
        <h1 className="font-bold text-xl">{props.title}</h1>
        <h2 className="mt-2 text-sm text-gray-400">{props.details}</h2>
        <div className="flex justify-between items-center mt-3 w-[110%]">
          <div className="flex items-center gap-1 text-sm">
            <p className="text-pink-500 font-semibold text-base">
              {" "}
              {props.price + " ETH"}
            </p>
            <GoPrimitiveDot className="text-gray-400 dark:text-white text-[0.4rem]" />
            <p className="text-gray-600">{props.size} </p>
            <GoPrimitiveDot className="text-gray-400 dark:text-white text-[0.4rem]" />
            <p className="text-gray-600"> ({props.format})</p>
          </div>
          <button onClick={props.buyDataset} className="bg-pink-500 hover:bg-pink-600 px-5 py-1 rounded-xl">
            Buy
          </button>
        </div>
      </div>
    </div>
  );
};

const DataCard2 = (props) => {
  return (
    <div className="dark:bg-[#101010] bg-white shadow-md rounded-xl mb-10 w-[20rem]">
      <div className="h-[12rem] overflow-hidden  flex justify-center p-3 pt-4">
        <Image
          src={props.image}
          alt="me"
          className="w-[18rem] rounded-xl mt-0"
          width={288}
          height={200}
        />
      </div>
      <div className="w-[100%] mt-0 p-4 pt-0">
        <h1 className="font-bold text-xl">{props.title}</h1>
        <h2 className="mt-2 text-sm text-gray-400">{props.details}</h2>
        <div className="flex justify-between items-center mt-3 w-[110%]">
          <div className="flex items-center gap-1 text-sm">
            <p className="text-pink-500 font-semibold text-base">
              {" "}
              {props.price + " ETH"}
            </p>
            <GoPrimitiveDot className="text-gray-400 dark:text-white text-[0.4rem]" />
            <p className="text-gray-500">{props.size} </p>
            <GoPrimitiveDot className="text-gray-400 dark:text-white text-[0.4rem]" />
            <p className="text-gray-500"> ({props.format})</p>
          </div>
        </div>
        <div className="flex items-center gap-1 text-sm">
          <p className="text-base">
            <span>Finality Time : </span>
            <span className="text-gray-400">{props.finalityTime} min</span>{" "}
          </p>
        </div>
        <div className="flex items-center justify-center flex-col">
          <button className="bg-pink-600 hover:bg-pink-700 px-5 py-1.5 rounded-lg w-[100%] m-2 mt-4">
            List For Sale
          </button>
        </div>
      </div>
    </div>
  );
};

const DataCard3 = (props) => {
  return (
    <div className="dark:bg-[#101010] bg-white shadow-md rounded-xl mb-10 w-[20rem]">
      <div className="h-[12rem] overflow-hidden  flex justify-center p-3 pt-4">
        <Image
          src={props.image}
          alt="me"
          className="w-[18rem] rounded-xl mt-0"
          width={288}
          height={200}
        />
      </div>
      <div className="w-[100%] mt-0 p-4 pt-0">
        <h1 className="font-bold text-xl">{props.title}</h1>
        <h2 className="mt-2 text-sm text-gray-400">{props.details}</h2>
        <div className="flex justify-between items-center mt-3 w-[110%]">
          <div className="flex items-center gap-1 text-sm">
            <p className="text-pink-500 font-semibold text-base">
              {" "}
              {props.price + " ETH"}
            </p>
            <GoPrimitiveDot className="text-gray-400 dark:text-white text-[0.4rem]" />
            <p className="text-gray-500">{props.size} </p>
            <GoPrimitiveDot className="text-gray-400 dark:text-white text-[0.4rem]" />
            <p className="text-gray-500"> ({props.format})</p>
          </div>
        </div>
        <div className="flex items-center justify-centers gap-1 text-sm pt-3 text-center">
          <p className="text-base text-center">
            <span>Found dataset not upto the claim?</span>
          </p>
        </div>
        <div className="flex items-center justify-center flex-col">
          <button
            onClick={() => props.setShowModal2(true)}
            className="bg-pink-600 hover:bg-pink-700 px-5 py-1.5 rounded-lg w-[100%] m-2 mt-4"
          >
            File for Fraud
          </button>
        </div>
      </div>
    </div>
  );
};

export { DataCard, DataCard2, DataCard3 };
