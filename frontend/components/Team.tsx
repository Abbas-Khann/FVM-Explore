import React from "react";
import teamImg from "../public/img/Team.png";
import Image from "next/image";
import teamOne from "../public/img/Team1.png";

const Team = (): JSX.Element => {
    return(
        <section className="bg-black">
            <h1 className="text-4xl text-white text-center md:text-5xl pt-10 pb-24">Our Team</h1>
            <div className="flex items-center justify-evenly flex-wrap pb-40">
            <div className="cursor-pointer">
            <Image src={teamImg} width={350} height={180} alt="TeamImg" />
            </div>
            <div className="cursor-pointer">
            <Image src={teamOne} width={350} height={180} alt="TeamImg" />
            </div>
            </div>
        </section>
    )
}

export default Team