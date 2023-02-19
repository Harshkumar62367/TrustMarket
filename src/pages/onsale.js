import React from "react";
import SaleCard from "@/components/SaleCard";

const Sale = () => {
  const data = [
    {
      id: "1.",
      title: "Sarwa Siksha Abhiyan Data",
      details:
        "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Adipisci in doloribus nesciunt velit vero obcaecati eius error rem nemo repudiandae!",
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
        "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Adipisci in doloribus nesciunt velit vero obcaecati eius error rem nemo repudiandae!",
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
        "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Adipisci in doloribus nesciunt velit vero obcaecati eius error rem nemo repudiandae!",
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

  return (
    <div className="pt-24 min-h-[80vh]">
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
          />
        ))}
      </div>
    </div>
  );
};

export default Sale;
