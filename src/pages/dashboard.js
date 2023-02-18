import React, { useContext, useEffect } from "react";
import { useRouter } from "next/router";
import { AuthContext } from "@/context/auth-context";
import Meta from "@/components/Meta";

const Dashboard = () => {
  const router = useRouter();
  const { isUserAuthenticated } = useContext(AuthContext);

  useEffect(() => {
    // checks if the user is authenticated
    if (!isUserAuthenticated()) {
      router.push("/");
    }
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
        </div>
      </div>
    </>
  );
};

export default Dashboard;
