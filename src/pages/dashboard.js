import React, { useContext, useEffect } from "react";
import { useRouter } from "next/router";
import { AuthContext } from "@/context/auth-context";
import Meta from "@/components/Meta";
import Image from "next/image";

const Dashboard = () => {
  const router = useRouter();
  const { isUserAuthenticated } = useContext(AuthContext);

  useEffect(() => {
    // checks if the user is authenticated
    isUserAuthenticated() ? router.push("/dashboard") : router.push("/");
  });

  return (
    <>
      <Meta title="TrustM(: | Dashboard" />
      <div>
        <div>
          <div>
            <h1>Datasets</h1>
            <p>
              Explore, analyze, and share quality data. Learn more about data
              types, creating, and collaborating.
            </p>
          </div>
          <div>
            <Image
              src="https://www.kaggle.com/static/images/datasets/Datasets_landing_illo.png"
              alt="dataset"
              height={200}
              width={200}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
