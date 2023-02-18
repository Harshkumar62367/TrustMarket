import React, { useContext, useEffect, useState } from "react";
import { useRouter } from "next/router";
import { AuthContext } from "@/context/auth-context";
import Meta from "@/components/Meta";
import Image from "next/image";

const Dashboard = () => {
  const router = useRouter();
  const [image, setImage] = useState();
  const [dataset, setDataset] = useState();
  const [title, setTitle] = useState();
  const [details, setDetails] = useState();
  const { isUserAuthenticated } = useContext(AuthContext);

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

  useEffect(() => {
    // checks if the user is authenticated
    if (!isUserAuthenticated()) {
      router.push("/");
    }
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(image);
    console.log(dataset);
    console.log(title);
    console.log(details);
  }

  return (
    <>
      <Meta title="TrustM(: | Dashboard" />
      <div>
        <div className="pt-[7rem]">
          <div>
            <div className="flex flex-col items-center justify-center border dark:border-gray-600 m-auto w-[45rem] rounded-3xl">
              <div className="flex flex-col items-center justify-center border dark:border-gray-600 w-[100%] rounded-t-3xl p-3">
                <h1 className="text-2xl font-semibold">NFT Minter</h1>
              </div>
              <div className="pb-8">
                <h1 className="pt-3 text-sm">Select an image file for dataset</h1>
                <form>
                  <div className="flex py-4 items-center gap-2">
                     <Image src={image ? URL.createObjectURL(image) : "/images/fallback-img.png"} alt="image" height={100} width={100} className="rounded-lg border border-gray-600"/>
                    <input type="file" accept="image/*" id="nftimg" name="nftimg" onChange={imageChange}/>
                  </div>

                  <div className="flex flex-col pt-2 pb-5">
                    <h2 className="p-1 text-sm">Choose Dataset File</h2>
                    <input type="file" id="dataset" name="nftimg" onChange={fileChange}/>
                  </div>

                  <div>
                    <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Enter title" className="py-2 px-3  rounded-lg w-[100%] border border-gray-300 focus:outline-none focus:ring-2 focus:ring-pink-300 dark:focus:ring-pink-600 focus:border-transparent"/>
                  </div>

                  <div>
                    <textarea  value={details} onChange={(e) => setDetails(e.target.value)} name="details" id="detail" cols="30" rows="3" className="py-2 px-3  rounded-lg w-[100%] mt-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-pink-300 dark:focus:ring-pink-600 focus:border-transparent" placeholder="Details..."></textarea>
                    <button onClick={handleSubmit} className="py-2 bg-pink-600 rounded-lg w-[100%] mt-2">Mint</button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
