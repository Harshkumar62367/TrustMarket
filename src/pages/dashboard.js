import React, { useContext, useEffect, useState } from "react";
import { useRouter } from "next/router";
import { AuthContext } from "@/context/auth-context";
import Meta from "@/components/Meta";
import Image from "next/image";
import { FiX } from "react-icons/fi";
import { HiPlus } from "react-icons/hi";
import { DataCard2, DataCard3 } from "@/components/DataCard";
import { ethers } from "ethers";
import {TrustMarketplaceAddress} from "../constants";
import TrustMarketABI from "../abi/trustMarketplace.json";

const Dashboard = () => {
  const router = useRouter();
  const [image, setImage] = useState();
  const [dataset, setDataset] = useState();
  const [title, setTitle] = useState();
  const [details, setDetails] = useState();
  const {authState, isUserAuthenticated } = useContext(AuthContext);
  const [showModal, setShowModal] = useState(false);
  const [showModal2, setShowModal2] = useState(false);


  const imageChange = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      setImage(e.target.files[0]);
    }
  };

  const fileChange = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      setDataset(e.target.files[0]);
    }
  };

  //Get the created Dataset by the authors
  async function getCreatedDataset(){
    
    //Initializing instances
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const TrustMarketContract = new ethers.Contract(TrustMarketplaceAddress,TrustMarketABI,provider);
    
    console.log("AuthState",authState);
    let tx =await TrustMarketContract.fetchTrustAuthorsCreations(authState.address);
    console.log("Data: ",tx);

  }

  useEffect(() => {
    // checks if the user is authenticated
    if (!isUserAuthenticated()) {
      router.push("/");
    }
    getCreatedDataset();
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(image);
    console.log(dataset);
    console.log(title);
    console.log(details);
  };

  const handleClaim = (e) => {
    setShowModal2(false);
    if(e.target.value === "grantAccess"){
      alert("Access Granted!")
    }

    if(e.target.value === "fileClaim"){
      alert("Claimed successfully!")
    }
  }

  const posts = [
    {
      title: "Sarwa Siksha Abhiyan Data",
      details:
        "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Adipisci in doloribus nesciunt velit vero obcaecati eius error rem nemo repudiandae!",
      size: "20 kB",
      format: "CSV",
      tags: "Education",
      image: "/images/trap.png",
      price: 0.2,
      id: "1",
      finalityTime: 20,
    },
    {
      title: "Sarwa Siksha Abhiyan Data",
      details:
        "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Adipisci in doloribus nesciunt velit vero obcaecati eius error rem nemo repudiandae!",
      size: "20 kB",
      format: "CSV",
      tags: "Education",
      image: "/images/trap.png",
      price: 0.1,
      id: "2",
      finalityTime: 20,
    },
    {
      title: "Sarwa Siksha Abhiyan Data",
      details:
        "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Adipisci in doloribus nesciunt velit vero obcaecati eius error rem nemo repudiandae!",
      size: "20 kB",
      format: "CSV",
      tags: "Education",
      image: "/images/trap.png",
      price: 0.3,
      id: "3",
      finalityTime: 10,
    },
  ];

  return (
    <div className="flex min-h-screen w-[100%]">
      <Meta title="TrustM(: | Dashboard" />
      <div className="flex min-h-full w-[100%]">
        {showModal && (
          <div className="fixed h-[100vh] w-[100%] top-0 z-50">
            <div className="h-[100vh] w-[100%] bg-gray-800 bg-opacity-25 backdrop-blur absolute">
              <div className="pt-[5rem]">
                <div>
                  <div className="flex relative">
                    <button
                      onClick={() => setShowModal(false)}
                      className="absolute right-7 top-[-3.3rem]"
                    >
                      <FiX fontSize="32px" />
                    </button>
                  </div>
                  <div className="flex flex-col items-center justify-center border dark:border-gray-600 m-auto w-[45rem] rounded-3xl dark:bg-[#110c13] bg-white shadow-md">
                    <div className="flex flex-col items-center justify-center border dark:border-gray-600 w-[100%] rounded-t-3xl p-3">
                      <h1 className="text-2xl font-semibold">Mint Dataset</h1>
                    </div>
                    <div className="pb-8">
                      <h1 className="pt-3 text-sm">
                        Select an image file for dataset
                      </h1>
                      <form>
                        <div className="flex py-4 items-center gap-2">
                          <Image
                            src={
                              image
                                ? URL.createObjectURL(image)
                                : "/images/fallback-img.png"
                            }
                            alt="image"
                            height={100}
                            width={100}
                            className="rounded-lg border border-gray-600"
                          />
                          <input
                            type="file"
                            accept="image/*"
                            id="nftimg"
                            name="nftimg"
                            onChange={imageChange}
                          />
                        </div>

                        <div className="flex flex-col pt-2 pb-5">
                          <h2 className="p-1 text-sm">Choose Dataset File</h2>
                          <input
                            type="file"
                            id="dataset"
                            name="nftimg"
                            onChange={fileChange}
                          />
                        </div>

                        <div>
                          <input
                            type="text"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            placeholder="Enter title"
                            className="py-1.5 px-3  rounded-lg w-[100%] border border-gray-300 focus:outline-none focus:ring-2 focus:ring-pink-300 dark:focus:ring-pink-600 focus:border-transparent"
                          />
                        </div>

                        <div>
                          <input
                            type="number"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            placeholder="Finality time (min)"
                            className="py-1.5 mt-2 px-3  rounded-lg w-[100%] border border-gray-300 focus:outline-none focus:ring-2 focus:ring-pink-300 dark:focus:ring-pink-600 focus:border-transparent"
                          />
                        </div>

                        <div>
                          <textarea
                            value={details}
                            onChange={(e) => setDetails(e.target.value)}
                            name="details"
                            id="detail"
                            cols="30"
                            rows="3"
                            className="py-2 px-3  rounded-lg w-[100%] mt-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-pink-300 dark:focus:ring-pink-600 focus:border-transparent"
                            placeholder="Details..."
                          ></textarea>
                          <button
                            onClick={handleSubmit}
                            className="py-2 bg-pink-600 rounded-lg w-[100%] mt-2"
                          >
                            Mint
                          </button>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {showModal2 && (
          <div className="fixed h-[100vh] w-[100%] top-0 z-50">
            <div className="h-[100vh] w-[100%] bg-gray-800 bg-opacity-25 backdrop-blur absolute">
              <div className="pt-[7rem]">
                <div>
                  <div className="flex relative">
                    <button
                      onClick={() => setShowModal2(false)}
                      className="absolute right-7 top-[-5rem]"
                    >
                      <FiX fontSize="32px" />
                    </button>
                  </div>
                  <div className="flex flex-col items-center justify-center border dark:border-gray-600 m-auto w-[45rem] rounded-3xl dark:bg-[#110c13] bg-white shadow-md py-12">
                    <h1 className="pb-6 text-lg font-semibold">
                      Give DAO access to Dataset
                    </h1>
                    <button value="grantAccess" onClick={handleClaim} className="text-white  bg-gradient-to-r  from-pink-500 to-purple-700 px-[2rem] font-semibold py-2 rounded-3xl mt-2  hover:from-purple-700 hover:to-pink-500 dark:hover:bg-[#0F1221]">
                      Grant Access
                    </button>
                    <h1 className="pt-10 pb-6 text-lg font-semibold">
                      File for Claim!
                    </h1>
                    <button value="fileClaim" onClick={handleClaim} className="bg-red-600 hover:bg-red-700 rounded-full py-2 px-7 text-white font-semibold">
                      File for Claim
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        <button className="fixed bottom-10 right-10 bg-pink-600 shadow-md rounded-full p-3.5">
          <HiPlus fontSize="32px" onClick={() => setShowModal(true)} />
        </button>

        <div className="w-[100%] pt-10">
          <section className="flex flex-col w-[80%] items-center justify-center m-auto mt-20">
            <div className="flex justify-between items-center m-auto w-[100%] ">
              <span>
                <h1 className="font-bold text-2xl md:text-3xl lg:text-3xl">
                  Created Datasets
                </h1>
              </span>
              {/* <button className="text-pink-500 text-sm">See all</button> */}
            </div>

            <div className="flex flex-col lg:flex-row md:flex-row  items-center justify-between mt-10 w-[100%] flex-wrap ">
              {posts.map((post, index) => (
                <DataCard2
                  key={index}
                  title={post.title}
                  details={post.details}
                  price={post.price}
                  image={post.image}
                  size={post.size}
                  id={post.id}
                  format={post.format}
                  finalityTime={post.finalityTime}
                />
              ))}
            </div>
          </section>

          <section className="flex flex-col w-[80%] items-center justify-center m-auto mt-12">
            <div className="flex justify-between items-center m-auto w-[100%] ">
              <span>
                <h1 className="font-bold text-2xl md:text-3xl lg:text-3xl">
                  Bought Datasets
                </h1>
              </span>
              {/* <button className="text-pink-500 text-sm">See all</button> */}
            </div>

            <div className="flex flex-col lg:flex-row md:flex-row  items-center justify-between mt-10 w-[100%] flex-wrap ">
              {posts.map((post, index) => (
                <DataCard3
                  key={index}
                  title={post.title}
                  details={post.details}
                  price={post.price}
                  image={post.image}
                  size={post.size}
                  id={post.id}
                  format={post.format}
                  setShowModal2={setShowModal2}
                />
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
