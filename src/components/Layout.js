import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import Nav from "./Nav";
import Nav2 from "./Nav2";
import Meta from "./Meta";
import Header from "./Header";
import Footer from "./Footer";
import Footer2 from "./Footer2";
import { AuthContext } from "@/context/auth-context";
import { useContext } from "react";

const Layout = ({ children }) => {
  const { isUserAuthenticated } = useContext(AuthContext);
  useEffect(() => {
    AOS.init();
    AOS.refresh();
  }, []);

  return (
    <>
      {!isUserAuthenticated() ? (
        <>
          <Meta />
          <Nav />
          <div>
            <main className="bg-[#ffffff] dark:bg-[#000000] antialiased">
              <Header />
              {children}
              <Footer2 />
            </main>
          </div>
        </>
      ) : (
        <>
          <Nav2 />
          <div>
            <main className="bg-[#ffffff] dark:bg-[#000000] antialiased">
              <Header />
              {children}
              <Footer2/>
            </main>
          </div>
        </>
      )}
    </>
  );
};

export default Layout;
