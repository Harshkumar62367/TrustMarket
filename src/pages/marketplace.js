import Meta from "@/components/Meta";
import React from "react";
import Image from "next/image";
import DataCard from "@/components/DataCard";

const Marketplace = () => {
  const datatags = [
    "All",
    "Education",
    "Water",
    "Health",
    "Energy",
    "Agriculture",
    "Transport",
    "Finance",
    "Environment",
    "Blockchain",
    "Social",
    "Economy",
    "Government",
    "Other",
  ];

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
    },
  ];

  return (
    <>
      <Meta title="TrustM(: | Datasets" />

      <div className="w-[100%]">
        <div className="pt-[6rem] flex justify-between items-center w-[90%] md:w-[80%] lg:w-[80%] m-auto">
          <div className="">
            <h1 className="text-4xl lg:text-5xl font-bold">Datasets</h1>
            <p className="pt-2 max-w-sm text-sm md:text-base lg:text-base">
              Explore, analyze, and share quality data. Learn more about data
              types, creating, and collaborating.
            </p>
          </div>
          <div className="">
            <Image
              src="/images/hero-img2.png"
              alt="me"
              width="220"
              height="220"
            />
          </div>
        </div>
      </div>

      <section className="flex mt-20">
        <div className="w-[100%] flex justify-center items-center m-auto">
          <div className="flex w-[90%] md:w-[80%] lg:w-[80%] items-center justify-center gap-5">
            <input
              type="text"
              id="search"
              placeholder="Search Datasets"
              className="w-[90%] md:w-[80%] lg:w-[80%] py-2 md:py-3 lg:py-3 px-5  rounded-3xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-pink-300 dark:focus:ring-pink-600 focus:border-transparent"
            />
            <button className="text-white  bg-gradient-to-r  from-pink-500 to-purple-700 px-[2rem] font-semibold py-2.5 md:py-3.5 lg:py-3.5 rounded-3xl  hover:from-purple-700 hover:to-pink-500 dark:hover:bg-[#0F1221] ">
              Search
            </button>
          </div>
        </div>
      </section>

      <section className="flex m-auto items-center justify-center">
        <div className="flex gap-3 flex-wrap max-w-[80%] md:max-w-[70%] lg:max-w-[60%] justify-center items-center mt-6">
          {datatags.map((tag, index) => (
            <button
              key={index} className="border transition-colors border-pink-600 text-pink-600 hover:text-white hover:bg-pink-600 px-4 py-1 rounded-full text-sm"
              id={index}
            >
              {tag}
            </button>
          ))}
        </div>
      </section>

      <div>
        <section className="flex flex-col w-[80%] items-center justify-center m-auto mt-16">
          <div className="flex justify-between items-center m-auto w-[100%]">
            <span>
              <h1 className="font-bold text-2xl md:text-3xl lg:text-3xl">Education</h1>
            </span>
            <button className="text-pink-500 text-sm">See all</button>
          </div>

          <div className="flex flex-col lg:flex-row md:flex-row  items-center justify-between mt-20 w-[100%] flex-wrap ">
            {posts.map((post, index) => (
              <DataCard
                key={index}
                title={post.title}
                details={post.details}
                price={post.price}
                image={post.image}
                size={post.size}
                id={post.id}
                format={post.format}
              />
            ))}
          </div>
        </section>
      </div>

      <div>
        <section className="flex flex-col w-[80%] items-center justify-center m-auto mt-16">
          <div className="flex justify-between items-center m-auto w-[100%]">
            <span>
              <h1 className="font-bold text-2xl md:text-3xl lg:text-3xl">Agriculture</h1>
            </span>
            <button className="text-pink-500 text-sm">See all</button>
          </div>

          <div className="flex flex-col lg:flex-row md:flex-row  items-center justify-between mt-20 w-[100%] flex-wrap ">
            {posts.map((post, index) => (
              <DataCard
                key={index}
                title={post.title}
                details={post.details}
                price={post.price}
                image={post.image}
                size={post.size}
                id={post.id}
                format={post.format}
              />
            ))}
          </div>
        </section>
      </div>
    </>
  );
};

export default Marketplace;
