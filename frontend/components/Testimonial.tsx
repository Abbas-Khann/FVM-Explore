import React from "react";
import TestimonialImage from "../public/img/Testimonial.png";
import Image from "next/image";

const Testimonial = (): JSX.Element => {
    return(
        <section className="bg-black">
            <h1 className="text-4xl text-white text-center md:text-5xl">Loved By Builders</h1>
            <div className="flex items-center justify-center py-14">
            <Image src={TestimonialImage} alt="TestimonialImage" />
            </div>
        </section>
    )
}

export default Testimonial