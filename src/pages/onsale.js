import React from "react";
import SaleCard from "@/components/SaleCard";
import Meta from "@/components/Meta";
import { ToastContainer, toast } from "react-toastify";

const Sale = () => {
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
      status: "ended",
      finalityTime: "0 min",
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
      status: "ended",
      finalityTime: "0 min",
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
      status: "ongoing",
      finalityTime: "20 min",
      createdAt: "12 Feb, 2023 12:00:00",
    },
  ];

  const withdrawFunds = () => {
    toast.success("Withdrawn Successfully");
  }

  return (
    <div className="pt-24 min-h-[80vh]">
      <Meta title="TrustM(: | Sale" />
      <ToastContainer />
      <h1 className='className="pt-24 text-3xl font-semibold text-center'>
        Your DataSets on sale
      </h1>

      <div className="flex flex-col items-center justify-center mt-12">
        {data.map((item, index) => (
          <SaleCard
            key={index}
            title={item.title}
            id={item.id}
            details={item.details}
            size={item.size}
            format={item.format}
            seller={item.seller}
            buyer={item.buyer}
            image={item.image}
            finalityTime={item.finalityTime}
            status={item.status}
            createdAt={item.createdAt}
            withdrawFunds={withdrawFunds}
          />
        ))}
      </div>
    </div>
  );
};

export default Sale;
