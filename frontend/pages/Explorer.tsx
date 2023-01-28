import React from "react";
import Navbar from "@/components/Navbar";
import Input from "@/components/Input";

const Explorer = () => {
    return(
        <main className="bg-black">
            <Navbar />
            <h1
            className="bg-black text-white text-center text-3xl sm:text-4xl py-10">
            Try Now
            </h1>
            <div className="mx-auto max-w-xl mb-10 px-4 ">
                <p className="pb-3 text-white text-xl">Paste Contract Address here</p>
                <Input />
                <div className="flex justify-evenly py-10">
            <h2 className="text-white text-lg">Read Contract</h2>
            <h2 className="text-white text-lg">Write Contract</h2>
                </div>
            </div>
        </main>
    )
}

export default Explorer