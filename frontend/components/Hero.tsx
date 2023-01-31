import Image from "next/image";
import Link from "next/link";
import heroImage from "../public/img/hero.png";

const Hero = () => {
  return (
    <section className="px-2 py-20 bg-black text-white">
      <div className="md:flex items-center justify-around">
        <div className=" md:w-3/5 px-5">
          <h2 className="font-bold text-4xl text-skin-base my-4 leading-tight lg:text-7xl tracking-tighter mb-6 lg:tracking-normal">
            Interact With Your<br />
            Smart Contracts using <br /> <span className="text-4xl text-skin-base my-4 leading-tight lg:text-7xl tracking-tighter mb-6 
            bg-gradient-to-r bg-clip-text text-transparent
            from-[#C41CFF] via-[#201CFF] to-purple-500
            animate-text">FVM-Explore</span>
          </h2>
          <p className="sm:mt-10 text-base text-skin-muted dark:text-skin-darkMuted lg:text-2xl sm:mb-14 mb-10">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Eligendi eum sint tenetur beatae magni maxime accusamus ipsum rerum deserunt saepe.
          </p>
          <div
          className="flex flex-col sm:flex-row"
          >
            <Link href="/Explorer">
              <button className="bg-gradient-to-t from-[#201CFF] to-[#C41CFF] py-2 px-6 hover:bg-gradient-to-b from-[#201CFF] to-[#C41CFF] sm:mr-10 mb-5">
                Explorer
              </button>
            </Link>
            <Link href="/Deployer">
              <button className="bg-gradient-to-t from-[#201CFF] to-[#C41CFF] py-2 px-6 hover:bg-gradient-to-b from-[#201CFF] to-[#C41CFF]">
                Deployer
              </button>
            </Link>
          </div>
        </div>
        <div className="w-10/12 md:w-2/4 mx-auto md:mx-0 my-8 order-2 ">
          <Image src={heroImage} alt="Hero" />
        </div>
      </div>
    </section>
  );
};

export default Hero;