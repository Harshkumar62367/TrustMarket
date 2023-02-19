import Link from "next/link";
import { useTheme } from "next-themes";
import React, { useEffect, useState, useContext } from "react";
import { HiMenuAlt3 } from "react-icons/hi";
import { MdDarkMode, MdLightMode } from "react-icons/md";
import { FiX } from "react-icons/fi";
import { AuthContext } from "@/context/auth-context";
import { useRouter } from "next/router";

export const useLoaded = () => {
  const [loaded, setLoaded] = useState(false);
  const router = useRouter();
  useEffect(() => setLoaded(true), []);
  return loaded;
};

const Nav2 = () => {
  const { authState } = useContext(AuthContext);
  const [menu, setMenu] = useState(false);
  const [focus, setFocus] = useState(0);
  const { theme, setTheme } = useTheme();
  const loaded = useLoaded();
  const router = useRouter();

  return (
    <div className="bg-opacity-5 backdrop-blur-md drop-shadow-md z-50 font-mono flex flex-row fixed bg-pink-400 dark:bg-gray-800 dark:bg-opacity-5 dark:backdrop-blur-md dark:drop-shadow-md  w-[100vw] items-center justify-center text-gray-800 dark:text-white border-b-[1px] border-gray-200 dark:border-[#2F304E]">
      <div className="flex items-center justify-between  lg:justify-evenly w-[100%] md:w-[75rem] px-4 md:px-3 py-3">
        <div className="flex items-center">
          <Link href="/marketplace">
            <p
              className="font-sans text-2xl font-extrabold ml-2 md:ml-5 lg:ml-0 text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-pink-600 cursor-pointer"
              onClick={() => {
                setFocus(0);
                setMenu(false);
              }}
            >
              TrustM(:
            </p>
          </Link>
        </div>
        <div className="flex items-center">
          <ul className="md:flex hidden">
            <li
              className={
                focus === 2
                  ? "hover:underline mx-3 border-pink-300  border-[3px]  bg-pink-50 dark:bg-[#7b2c5d] px-2 py-1"
                  : "hover:underline px-2 py-1 mx-3 border-[3px] border-none dark:border-gray-800"
              }
              onClick={() => setFocus(2)}
            >
              <Link href="/dashboard">Dashboard</Link>
            </li>
            <li
              className={
                focus === 3
                  ? "hover:underline mx-3 border-pink-300  border-[3px]  bg-pink-50 dark:bg-[#7b2c5d] px-2 py-1"
                  : "hover:underline px-2 py-1 mx-3 border-[3px] border-none dark:border-gray-800"
              }
              onClick={() => setFocus(3)}
            >
              <Link href="/vote">Vote</Link>
            </li>
            <li
              className={
                focus === 1
                  ? "hover:underline mx-3 border-pink-300  border-[3px]  bg-pink-50 dark:bg-[#7b2c5d] px-2 py-1"
                  : "hover:underline px-2 py-1 mx-3 border-[3px] border-none dark:border-gray-800"
              }
              onClick={() => setFocus(1)}
            >
              <Link href="/onsale">Sale</Link>
            </li>
          </ul>
        </div>

        <div className="flex items-center">
          <div className="hidden md:hidden lg:flex bg-yellow-600 bg-opacity-20 max-w-fit text-center rounded-xl px-4 py-1.5 text-yellow-600 font-semibold">
            <span>Hyperspace Testnet</span>
          </div>
          <div className="hidden md:flex ml-2 bg-opacity-50 dark:bg-gray-800 lg:flex bg-gray-300 items-center pl-3 pr-1 rounded-xl py-1">
            <h2 className="text-pink-600">
              {authState.balance.substring(0, 4)} TFIL
            </h2>
            <div className="bg-opacity-50 dark:bg-gray-700 bg-gray-400 px-2 py-1 ml-2 rounded-xl flex items-center">
              <h2>
                {authState.address.substring(0, 6) +
                  "..." +
                  authState.address.substring(38)}
              </h2>
              <button
                className="ml-2 h-4 w-4 rounded bg-sky-700 hover:bg-sky-800 focus:bg-sky-600"
                onClick={() => {
                  navigator.clipboard.writeText(authState.address);
                }}
              ></button>
            </div>
          </div>
          <div className="hidden md:hidden lg:flex bg-pink-600 max-w-fit text-center rounded-xl px-4 py-1.5 ml-2 font-semibold">
            <button onClick={() => router.push("/dashboard")}>Mint Dataset</button>
          </div>
          <button
            type="button"
            onClick={() => {
              if (theme === "dark") {
                setTheme("light");
              } else {
                setTheme("dark");
              }
            }}
            className="text-white dark:text-gray-800 bg-[#00126c] hover:bg-[#000f5c] focus:ring-[2.5px] focus:outline-none focus:ring-violet-300 dark:focus:ring-pink-400 font-medium rounded-lg text-lg p-2.5 text-center inline-flex items-center mr-2 dark:bg-pink-600 dark:hover:1CD0EA dark:focus:bg-pink-600 ml-4"
          >
            {loaded && (theme === "light" ? <MdDarkMode /> : <MdLightMode />)}
            <span className="sr-only">Icon description</span>
          </button>

          <button
            type="button"
            onClick={() => {
              if (menu == false) {
                setMenu(true);
              } else {
                setMenu(false);
              }
            }}
            className="animate-pulse md:hidden text-gray-900 bg-orange-50 hover:bg-pink-50 border border-gray-200 focus:ring-[2.5px] focus:outline-none focus:ring-pink-200 font-medium rounded-lg text-lg px-2.5 py-2.5 text-center items-center dark:focus:ring-gray-600 dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:hover:bg-gray-700 mr-2"
          >
            {!menu ? <HiMenuAlt3 /> : <FiX />}
          </button>
        </div>
      </div>
      {menu && (
        <div className="md:hidden fixed mt-[24rem] right-0 bg-white rounded-xl w-[17rem] py-2 mr-5 shadow-md text-gray-800 dark:text-white dark:bg-gray-700 border-gray-200 dark:border-gray-500 border">
          <ul>
            <li>
              <Link href="/">
                <button
                  onClick={() => {
                    setMenu(false);
                    // setFocus(0);
                  }}
                  className="hover:underline hover:border-pink-300 dark:hover:border-pink-300  border-4 border-white dark:border-gray-700 py-1.5 w-[100%] pl-4 cursor-pointer hover:bg-pink-50 dark:hover:bg-gray-600 text-left"
                >
                  Home
                </button>
              </Link>
            </li>
            <li>
              <Link href="/dashboard">
                <button
                  onClick={() => {
                    setMenu(false);
                    setFocus(2);
                  }}
                  className="hover:underline hover:border-pink-300 dark:hover:border-pink-300  border-4 border-white dark:border-gray-700 py-1.5 w-[100%] pl-4 cursor-pointer hover:bg-pink-50 dark:hover:bg-gray-600 text-left"
                >
                  Dashboard
                </button>
              </Link>
            </li>
            <li>
              <Link href="/vote">
                <button
                  onClick={() => {
                    setMenu(false);
                    setFocus(1);
                  }}
                  className="hover:underline hover:border-pink-300 dark:hover:border-pink-300  border-4 border-white dark:border-gray-700 py-1.5 w-[100%] pl-4 cursor-pointer hover:bg-pink-50 dark:hover:bg-gray-600 text-left"
                >
                  Vote
                </button>
              </Link>
            </li>
            <li>
              <Link href="/onsale">
                <button
                  onClick={() => {
                    setMenu(false);
                    setFocus(1);
                  }}
                  className="hover:underline hover:border-pink-300 dark:hover:border-pink-300  border-4 border-white dark:border-gray-700 py-1.5 w-[100%] pl-4 cursor-pointer hover:bg-pink-50 dark:hover:bg-gray-600 text-left"
                >
                  Sale
                </button>
              </Link>
            </li>
            <li>
              <div className="ml-4 mt-4 bg-yellow-600 bg-opacity-20 max-w-fit text-center rounded-xl px-3 py-1 text-yellow-600 font-semibold">
                <span>Hyperspace Testnet</span>
              </div>
            </li>
            <li>
              <div className="ml-4 my-4 bg-opacity-50 dark:bg-gray-800 flex text-sm bg-gray-300 items-center pl-2 pr-2 rounded-xl py-1  max-w-fit">
                <h2 className="text-pink-600">
                  {authState.balance.substring(0, 4)} TFIL
                </h2>
                <div className="bg-opacity-50 dark:bg-gray-700 bg-gray-400 px-2 py-1 ml-2 rounded-xl flex items-center">
                  <h2>
                    {authState.address.substring(0, 6) +
                      "..." +
                      authState.address.substring(38)}
                  </h2>
                  <button
                    className="ml-2 h-4 w-4 rounded bg-sky-700 hover:bg-sky-800 focus:bg-sky-600"
                    onClick={() => {
                      navigator.clipboard.writeText(authState.address);
                    }}
                  ></button>
                </div>
              </div>
            </li>
            <li>
              <div className="hidden md:hidden lg:flex bg-pink-600 max-w-fit text-center rounded-xl px-4 py-1.5 ml-4 my-4 font-semibold">
                <button onClick={() => router.push("/dashboard")}>Mint Dataset</button>
              </div>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default Nav2;
