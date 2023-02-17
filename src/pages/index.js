import { Inter } from "@next/font/google";
import { useRouter } from "next/router";
import { AuthContext } from "@/context/auth-context";
import Image from "next/image";
import { Heading } from "@/components/Heading";
import { useEffect, useContext, useState } from "react";
import { BsFillCheckSquareFill } from "react-icons/bs";
import { FaEthereum } from "react-icons/fa";
import { ethers } from "ethers";
// import styles from '@/styles/Home.module.css'

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const [currentAccount, setCurrentAccount] = useState("");
  const [correctNetwork, setCorrectNetwork] = useState(false);
  const [balance, setBalance] = useState(0);

  const router = useRouter();
  const { setAuthState, authState, isUserAuthenticated } =
    useContext(AuthContext);

  useEffect(() => {
    // checks if the user is authenticated
    isUserAuthenticated() ? router.push("/marketplace") : router.push("/");
  });

  const handleClick = async () => {
    await connectWallet();
    setAuthState({ address: currentAccount, balance: await getBalance() });
  };

  const getBalance = async () => {
    await connectWallet();
    try {
      const { ethereum } = window;
      if (ethereum) {
        if (currentAccount === "") await connectWallet();
        const provider = new ethers.providers.Web3Provider(ethereum);
        const balance = await provider.getBalance(currentAccount);
        setBalance(ethers.utils.formatEther(balance));
        return ethers.utils.formatEther(balance);
        // console.log("Balance:", balance.toString());
        // console.log(provider);
      }
    } catch (error) {
      console.log("Something went wrong!");
    }
  };

  const connectWallet = async () => {
    try {
      const { ethereum } = window;

      if (!ethereum) {
        alert("Metamask not detected! Install Metamask.");
        return;
      }

      let chainId = await ethereum.request?.({ method: "eth_chainId" });
      // console.log("Connected to chain:" + chainId);
      const georliChainId = "0x5";

      if (chainId !== georliChainId) {
        alert("You are not connected to the Georli Testnet!");
        setCurrentAccount(".");
        return;
      } else {
        setCorrectNetwork(true);
      }

      const accounts = await ethereum.request?.({
        method: "eth_requestAccounts",
      });

      // console.log("Found account", accounts[0]);
      setCurrentAccount(accounts[0]);
    } catch (error) {
      console.log("Error connecting to metamask", error);
    }
  };

  return (
    <div className="pt-20">
      <h1 className="font-bold lg:text-8xl md:text-7xl text-6xl text-center lg:my-20 md:my-16 my-16 mb-10 flex items-center justify-center flex-wrap gap-5 m-auto  max-w-[80%]">
        <div className="text-transparent bg-gradient-to-r bg-clip-text from-blue-600  to-pink-600  flex">
          Buy Trusted{" "}
        </div>
        <div className="text-transparent bg-gradient-to-r bg-clip-text from-pink-500 to-purple-700   flex">
          Datasets{" "}
        </div>
        <div className="text-transparent bg-gradient-to-r bg-clip-text from-yellow-500 to-red-600  flex">
          In Seconds
        </div>
      </h1>

      <p className="text-center font-light lg:text-2xl md:text-2xl text-xl  max-w-[80%] m-auto">
        Easy, one command deployments with free{" "}
        <span className="font-bold text-2xl md:text-3xl lg:text-3xl">
          depulso.site
        </span>{" "}
        subdomains.
      </p>
      <div className="flex">
        <p className="text-center font-light text-xl py-12 pb-5 flex items-center m-auto">
          <span>Built on </span>
          <FaEthereum className="text-gray-400 text-2xl" />
          <span className="text-gray-400 font-semibold">Ethereum</span>
        </p>
      </div>

      <div className="m-auto flex mt-3">
        <button
          className="text-white  bg-gradient-to-r  from-pink-500 to-purple-700 px-[4rem] font-semibold py-[0.7rem] rounded-3xl  hover:from-purple-700 hover:to-pink-500 dark:hover:bg-[#0F1221]  m-auto"
          onClick={() => handleClick()}
        >
          Get started
        </button>
      </div>

      {/*   Features */}
      <section id="about">
        <div
          data-aos="fade-up"
          className="flex bg-gray-100 dark:bg-[#0c0d1a] items-center justify-center w-[90%] lg:w-[80%] md:w-[90%] rounded-lg m-[auto] my-[5rem] flex-col md:flex-row lg:flex-row"
        >
          <div className="flex max-w-[20rem] md:max-w-[none] lg:max-w-[none]  items-center justify-center py-8 gap-20 flex-wrap">
            <div className="text-center">
              <h1 className="text-4xl font-bold">300+</h1>
              <p className="text-lg text-pink-600">Members</p>
            </div>
            <div className="text-center">
              <h1 className="text-4xl font-bold">10+</h1>
              <p className="text-lg text-pink-600">Projects</p>
            </div>
            <div className="text-center">
              <h1 className="text-4xl font-bold">15+</h1>
              <p className="text-lg text-pink-600">Sponsors</p>
            </div>
            <div className="text-center">
              <h1 className="text-4xl font-bold">300+</h1>
              <p className="text-lg text-pink-600">Assets</p>
            </div>
          </div>
        </div>
      </section>

      {/* ABOUT */}

      <section className="mb-[5rem]">
        <Heading text="About Us" />

        <div
          data-aos="fade-up"
          className="flex flex-col md:flex-row lg:flex-row items-center m-auto justify-center lg:justify-around md:justify-around mt-10 md:mx-3"
        >
          <div className="mt-10">
            <Image
              src="/images/hero-img2.png"
              alt="me"
              width="350"
              height="300"
            />
          </div>
          <div
            data-aos="fade-up"
            className="bg-gray-100 dark:bg-[#10111f]  rounded-3xl w-[85%] md:w-[26rem] lg:w-[30rem] mt-10"
          >
            <ul className="p-6 text-justify list-disc pl-10">
              <li>Lorem Ipsum is simply dummy text of the printing</li>
              <li>
                It was popularised in the 1960s with the release of Letraset
                sheets
              </li>
              <li>Lorem Ipsum is simply dummy text of the printing</li>
              <li>
                It was popularised in the 1960s with the release of Letraset
                sheets
              </li>
              <li>Lorem Ipsum is simply dummy text of the printing</li>
              <li id="technology">
                It was popularised in the 1960s with the release of Letraset
                sheets
              </li>
              <li>Lorem Ipsum is simply dummy text of the printing</li>
              <li>
                It was popularised in the 1960s with the release of Letraset
                sheets
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Features 2  */}

      <section className="bg-gray-100 dark:bg-[#10111f] py-[4rem] mt-[5rem]">
        <Heading src="/images/tech-head.png" />
        <div data-aos="fade-up" className="max-w-md text-center m-auto">
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut.
          </p>
        </div>

        <div className="flex flex-col md:flex-row lg:flex-row justify-evenly flex-wrap m-[auto] items-center py-10">
          <div
            data-aos="fade-up"
            className="bg-[#ffffff] dark:bg-[#141528] transition duration-150 ease-in-out hover:scale-[102%] max-w-xs flex justify-center flex-col items-center text-center mt-10 drop-shadow-lg"
          >
            <div className="my-10 h-[5rem] w-[5rem] border-pink-500 border-2 rounded-full">
              <div className="mt-[-1.2rem]">
                <Image
                  alt="feature-image"
                  src="/images/feature-img1.png"
                  width="80"
                  height="120"
                />
              </div>
            </div>
            <h1 className="text-2xl font-semibold text-pink-400 dark:text-pink-600">
              Dedicated network
            </h1>
            <p className="pt-3 pb-[3rem] max-w-[80%] text-[#888888] dark:text-[#BEBEBE] text-base font-normal ">
              There is no one who loves pain itself, who seeks after it and
              wants to have.{" "}
            </p>
          </div>

          <div
            data-aos="fade-up"
            className="bg-[#ffffff] dark:bg-[#141528] transition duration-150 ease-in-out hover:scale-[102%] max-w-xs flex justify-center flex-col items-center text-center mt-10 drop-shadow-lg"
          >
            <div className="my-10 h-[5rem] w-[5rem] border-pink-500 border-2 rounded-full">
              <div className="mt-[-1.2rem]">
                <Image
                  alt="feature-image"
                  src="/images/feature-img2.png"
                  width="70"
                  height="120"
                />
              </div>
            </div>
            <h1 className="text-2xl font-semibold text-pink-400 dark:text-pink-600">
              Dedicated network
            </h1>
            <p className="pt-3 pb-[3rem] max-w-[80%] text-[#888888] dark:text-[#BEBEBE] text-base font-normal ">
              There is no one who loves pain itself, who seeks after it and
              wants to have.{" "}
            </p>
          </div>

          <div
            data-aos="fade-up"
            className="bg-[#ffffff] dark:bg-[#141528] transition duration-150 ease-in-out hover:scale-[102%] max-w-xs flex justify-center flex-col items-center text-center mt-10 drop-shadow-lg"
          >
            <div className="my-10 h-[5rem] w-[5rem] border-pink-500 border-2 rounded-full">
              <div className="mt-[-1.2rem]">
                <Image
                  alt="feature-image"
                  src="/images/feature-img3.png"
                  width="60"
                  height="110"
                />
              </div>
            </div>
            <h1 className="text-2xl font-semibold text-pink-400 dark:text-pink-600">
              Dedicated network
            </h1>
            <p
              id="services"
              className="pt-3 pb-[3rem] max-w-[80%] text-[#888888] dark:text-[#BEBEBE] text-base font-normal "
            >
              There is no one who loves pain itself, who seeks after it and
              wants to have.{" "}
            </p>
          </div>
        </div>
      </section>

      {/* Tools */}

      <section className="mt-[5rem]">
        <Heading text="Services" />

        <div className="flex flex-col md:flex-row lg:flex-row m-auto justify-center lg:justify-evenly md:justify-evenly items-center mt-10">
          <div data-aos="fade-up" className="mt-10">
            <Image
              src="/images/hero-img4.png"
              alt="me"
              width="450"
              height="300"
            />
          </div>

          <div className="flex flex-col gap-3 w-[100%] md:w-[40%] lg:w-[40%] mt-10">
            <div
              data-aos="fade-up"
              className="flex items-center bg-gray-100 dark:bg-[#10111f] border-2 rounded-3xl w-[85%] md:w-[20rem] lg:w-[24rem] border-[#2F304E] m-[auto]"
            >
              <div className="p-2 px-4 pr-6">
                <Image
                  src="/images/Graph.png"
                  height="50"
                  width="50"
                  alt="gps"
                />
              </div>
              <div>
                <h1 className="text-2xl font-bold">Datasets</h1>
              </div>
            </div>

            <div
              data-aos="fade-up"
              className="flex items-center bg-gray-100 dark:bg-[#10111f] border-2 rounded-3xl w-[85%] md:w-[20rem] lg:w-[24rem] border-[#2F304E] m-[auto]"
            >
              <div className="p-2 px-4 pr-6">
                <Image src="/images/GPS.png" height="50" width="50" alt="gps" />
              </div>
              <div>
                <h1 className="text-2xl font-bold">DAO</h1>
              </div>
            </div>

            <div
              data-aos="fade-up"
              className="flex items-center bg-gray-100 dark:bg-[#10111f] border-2 rounded-3xl w-[85%] md:w-[20rem] lg:w-[24rem] border-[#2F304E] m-[auto]"
            >
              <div className="p-2 px-4 pr-6">
                <Image
                  src="/images/Math.png"
                  height="50"
                  width="50"
                  alt="gps"
                />
              </div>
              <div>
                <h1 className="text-2xl font-bold">Files</h1>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="flex flex-col items-center justify-center mt-20 text-center">
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-center mb-20 max-w-[85%]">
          Every dataset on <span className="text-pink-600">TrustM(:</span> comes
          with
        </h1>
        <h2 className="flex items-start justify-center gap-4 text-xl lg:text-2xl md:text-2xl pb-3">
          <BsFillCheckSquareFill className="text-green-400 text-xl lg:text-2xl md:text-2xl mt-1" />
          <p>Lorem ipsum dolor sit amet consectetur adipisicing.</p>
        </h2>

        <h2 className="flex items-start justify-center gap-4 text-xl lg:text-2xl md:text-2xl pb-3">
          <BsFillCheckSquareFill className="text-green-400 text-xl lg:text-2xl md:text-2xl mt-1" />
          <p>Lorem isit amet consectetur adipisicing.</p>
        </h2>

        <h2 className="flex items-start justify-center gap-4 text-xl lg:text-2xl md:text-2xl pb-3">
          <BsFillCheckSquareFill className="text-green-400 text-xl lg:text-2xl md:text-2xl mt-1" />
          <p>Lorem ipsum dolor consectetur adipisicing.</p>
        </h2>
      </section>

      <div className="m-auto flex mt-3 flex-col items-center justify-center">
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-center my-20 max-w-[85%]">
          Begin your <span className="text-pink-600">TrustM(:</span> Journey
        </h1>
        <button
          id="contact"
          className="text-white  bg-gradient-to-r  from-pink-500 to-purple-700 px-[4rem] font-semibold py-[0.7rem] rounded-3xl  hover:from-purple-700 hover:to-pink-500 dark:hover:bg-[#0F1221]  m-auto"
          onClick={() => handleClick()}
        >
          Connect Wallet
        </button>
      </div>
    </div>
  );
}
