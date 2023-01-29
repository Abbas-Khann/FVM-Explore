import React from "react";
import Navbar from "@/components/Navbar";
import Input from "@/components/Input";
import Footer from "@/components/Footer";
import ReadFunction from "@/components/ReturnedFunction";

const Explorer = () => {
    return(
        <main className="bg-black min-h-[100vh]">
            <Navbar />
            <h1
            className="bg-black text-white text-center text-3xl sm:text-4xl pt-10 pb-14">
            Explore here
            </h1>
            <div className="mx-auto max-w-xl mb-10 px-4">
                <p className="pb-3 text-white text-xl">Paste Contract Address here</p>
                <Input />
                <div className="flex justify-evenly py-10">
                <button className="text-white text-lg">Read Contract</button>
                <button className="text-white text-lg">Write Contract</button>
                </div>
            </div>
            <div
            className="flex items-center justify-evenly flex-wrap"
            >
                <ReadFunction />
                <ReadFunction />
                <ReadFunction />
                <ReadFunction />
                <ReadFunction />
            </div>
            <Footer />
        </main>
    )
}

export default Explorer