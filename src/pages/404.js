import { LgHeading } from "../components/Heading";
import Image from "next/image";
import { EmptyButton } from "../components/Button";

const Error = () => {
  return (
    <div className="min-h-[60vh]">
      <div className="w-[90%] m-auto mt-5">
        <LgHeading title="404" />
      </div>

      <div data-aos="fade-up">
        <div className="m-auto flex items-center flex-col mt-10 lg:mt-0 md:mt-0">
          <Image src="/images/404.png" alt="me" width="550" height="400" />
          <p className="text-lg mt-[-1rem]">This page doesn&apos;t exist!</p>
        </div>

        <div className="flex justify-center mt-10">
          <EmptyButton href="/" title="Return to Home" />
        </div>
      </div>
    </div>
  );
};

export default Error;
