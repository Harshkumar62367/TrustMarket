import { useState } from "react";
import VotingCard from "@/components/VotingCard";
import { GoPrimitiveDot } from "react-icons/go";
import Image from "next/image";
import { FiX } from "react-icons/fi";
import { ToastContainer, toast } from "react-toastify";
import Meta from "@/components/Meta";

const Vote = () => {
  const [selected, setSelected] = useState(0);
  const [showPopup, setShowPopup] = useState(false);

  const data = [
    {
      id: "1.",
      title: "Sarwa Siksha Abhiyan Data",
      details:
        "Sarva Shiksha Abhiyan, or SSA, is an Indian Government programme aimed at the universalisation of Elementary education in a time bound manner, the 86th Amendment to the Constitution of India making free and compulsory education to children.",
      image: "/images/trap.png",
      format: "CSV",
      price: 0.2,
      seller: "0x23ab..32c",
      buyer: "0x23ab..32c",
      size: "20 kB",
      createdAt: "12 Feb, 2023 12:00:00",
    },
    {
      id: "2.",
      title: "Sarwa Siksha Abhiyan Data",
      details:
        "Sarva Shiksha Abhiyan, or SSA, is an Indian Government programme aimed at the universalisation of Elementary education in a time bound manner, the 86th Amendment to the Constitution of India making free and compulsory education to children.",
      image: "/images/trap.png",
      format: "CSV",
      price: 0.2,
      seller: "0x23ab..32c",
      buyer: "0x23ab..32c",
      size: "20 kB",
      createdAt: "12 Feb, 2023 12:00:00",
    },
    {
      id: "3.",
      title: "Sarwa Siksha Abhiyan Data",
      details:
        "Sarva Shiksha Abhiyan, or SSA, is an Indian Government programme aimed at the universalisation of Elementary education in a time bound manner, the 86th Amendment to the Constitution of India making free and compulsory education to children.",
      image: "/images/trap.png",
      format: "CSV",
      price: 0.2,
      seller: "0xf057...c496",
      buyer: "0x23ab..32c",
      size: "20 kB",
      createdAt: "12 Feb, 2023 12:00:00",
    },
  ];

  const downloadDataset = () => {
    toast.success("Dataset Downloaded");
  };

  const handleVote = (status) => {
    setShowPopup(false);
    if (status === "reject") {
      toast.error("Rejected");
    }
    if (status === "accept") {
      toast.success("Accepted");
    }
  };

  return (
    <div className="min-h-[90vh]">
      <Meta title="TrustM(: | Vote" />
      <ToastContainer />
      {showPopup && (
        <div className="fixed h-[100vh] w-[100%] top-0 z-50">
          <div className="h-[100vh] w-[100%] bg-gray-800 bg-opacity-25 backdrop-blur absolute">
            <div className="dark:border-gray-800 w-[42rem] rounded-3xl p-6 bg-white dark:bg-[#0f0d14] shadow-md  m-auto mt-20">
              <h1 className="pt-3 text-4xl font-semibold text-center">Vote</h1>
              <div className="flex relative">
                <button
                  onClick={() => setShowPopup(false)}
                  className="absolute right-1 top-[-3.3rem]"
                >
                  <FiX fontSize="27px" />
                </button>
              </div>
              <div className="flex justify-between mt-6">
                <div className="max-w-md">
                  <h2 className="font-semibold text-2xl">
                    {data[selected].id} {data[selected].title}
                  </h2>
                  <p className=" py-4">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Neque quidem ullam sunt velit facere mollitia eveniet saepe!
                    Facilis, dolores excepturi?
                  </p>
                  <div className="flex items-center gap-1 text-sm my-2">
                    <p className="text-pink-500 font-semibold text-lg">
                      {" "}
                      {0.2 + " ETH"}
                    </p>
                    <GoPrimitiveDot className="text-gray-400 dark:text-white text-[0.4rem]" />
                    <p className="text-gray-500">{data[selected].size} </p>
                    <GoPrimitiveDot className="text-gray-400 dark:text-white text-[0.4rem]" />
                    <p className="text-gray-500"> ({data[selected].format})</p>
                  </div>
                  <div className="text-sm my-2">
                    <span>Seller : </span>
                    <span className="dark:text-gray-300 text-gray-500">
                      {data[selected].seller}
                    </span>
                  </div>
                  <div className="text-sm my-2">
                    <span>Buyer : </span>
                    <span className="dark:text-gray-300 text-gray-500">
                      {data[selected].buyer}
                    </span>
                  </div>
                </div>

                <div className="flex flex-col items-center justify-center">
                  <Image
                    src={data[selected].image}
                    alt="image"
                    height={150}
                    width={150}
                    className="rounded-lg border dark:border-gray-600 border-gray-300"
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between px-5 pt-5">
                  <button
                    className="dark:bg-gray-800 dark:hover:bg-gray-900 dark:focus:bg-gray-700 bg-gray-700 hover:bg-gray-800 rounded-lg py-2 px-5 text-white"
                    onClick={downloadDataset}
                  >
                    Check Dataset
                  </button>
                  <div>
                    <span>Time Left : </span>
                    <span>25 sec</span>
                  </div>
                </div>
                <div className="flex items-center justify-between px-5 pt-10 py-5">
                  <button
                    className="bg-red-600 hover:bg-red-700 rounded-full py-2 px-7 text-white"
                    value="reject"
                    onClick={(e) => handleVote(e.target.value)}
                  >
                    Reject
                  </button>
                  <button
                    className="bg-green-600 hover:bg-green-700 rounded-full py-2 px-7 text-white"
                    value="accept"
                    onClick={(e) => handleVote(e.target.value)}
                  >
                    Approve
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <h1 className="pt-24 text-3xl font-semibold text-center">
        Latest Fraud Claims
      </h1>
      <div className="flex flex-col items-center justify-center mt-12">
        {data.map((item, index) => (
          <VotingCard
            key={index}
            title={item.title}
            id={item.id}
            details={item.details}
            size={item.size}
            format={item.format}
            seller={item.seller}
            buyer={item.buyer}
            image={item.image}
            setSelected={setSelected}
            setShowPopup={setShowPopup}
            createdAt={item.createdAt}
          />
        ))}
      </div>
    </div>
  );
};

export default Vote;
