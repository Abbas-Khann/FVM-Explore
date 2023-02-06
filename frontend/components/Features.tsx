import React from "react";
import Image from "next/image";
import FeaturesImg from "../public/img/Features.png";
import FeaturesTwo from "../public/img/Features2.png";
import FeaturesThree from "../public/img/Features3.png";

const Features = () => {
    return(
        <section className="bg-black">
        <h1 className="text-4xl text-white text-center md:text-5xl">Explore</h1>
        <div className="flex items-center justify-center py-14">
        <Image src={FeaturesImg} alt="Explore Feature Image" />
        </div>
        <h1 className="text-4xl text-white text-center md:text-5xl">Deploy</h1>
        <div className="flex items-center justify-center py-14">
        <Image src={FeaturesTwo} alt="Deploy Feature Image"/>
        </div>
        <h1 className="text-4xl text-white text-center md:text-5xl">Verify</h1>
        <div className="flex items-center justify-center py-14">
        <Image src={FeaturesThree} alt="Verify Feature Image"/>
        </div>
    </section>
    )
}

export default Features