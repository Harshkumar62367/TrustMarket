import Image from "next/image";
import { GoPrimitiveDot } from "react-icons/go";

const VotingCard = (props) => {
  return (
    <div className="dark:border-gray-800 w-[42rem] rounded-3xl p-6 flex justify-between dark:bg-[#0f0d14] shadow-md mb-6">
      <div className="max-w-md">
        <h2 className="font-semibold text-xl">
          {props.id} {props.title}
        </h2>
        <p className="text-sm py-2">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Neque quidem
          ullam sunt velit facere mollitia eveniet saepe! Facilis, dolores
          excepturi?
        </p>
        <div className="text-sm">
          <span>Seller : </span>
          <span className="dark:text-gray-300 text-gray-500">
            {props.seller}
          </span>
        </div>
        <div className="text-sm">
          <span>Buyer : </span>
          <span className="dark:text-gray-300 text-gray-500">
            {props.buyer}
          </span>
        </div>
        <div className="text-sm">
          <span> Fraud Claimed At: </span>
          <span className="dark:text-gray-300 text-gray-500">
            {props.createdAt}
          </span>
        </div>
        <div className="flex items-center gap-1 text-sm">
          <p className="text-pink-500 font-semibold text-lg"> {0.2 + " ETH"}</p>
          <GoPrimitiveDot className="text-gray-400 dark:text-white text-[0.4rem]" />
          <p className="text-gray-500">{props.size} </p>
          <GoPrimitiveDot className="text-gray-400 dark:text-white text-[0.4rem]" />
          <p className="text-gray-500"> ({props.format})</p>
        </div>
      </div>
      <div className="flex flex-col items-center justify-center">
        <Image
          src={props.image}
          alt="image"
          height={110}
          width={110}
          className="rounded-lg border dark:border-gray-600 border-gray-300"
        />
        <button
          onClick={() => {
            props.setShowPopup(true);
            props.setSelected(Number(props.id) - 1);
          }}
          className="text-white  bg-gradient-to-r  from-pink-500 to-purple-700 px-[2rem] font-semibold py-1.5 rounded-3xl mt-3  hover:from-purple-700 hover:to-pink-500 dark:hover:bg-[#0F1221] "
        >
          Vote
        </button>
      </div>
    </div>
  );
};

export default VotingCard;
