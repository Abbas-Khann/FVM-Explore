import React from "react";
import Navbar from "@/components/Navbar";
import Input from "@/components/Input";
import Footer from "@/components/Footer";

const Explorer = () => {
  return (
    <main className="bg-black min-h-[100vh]">
      <Navbar />
      <h1 className="bg-black text-white text-center text-3xl sm:text-4xl py-10">
        Try Now
      </h1>
      <div className="mx-auto max-w-xl mb-10 px-4 ">
        <p className="pb-3 text-white text-xl">Paste Contract Address here</p>
        <Input />
        <div className="flex justify-evenly py-10">
          <button className="text-white text-lg">Read Contract</button>
          <button className="text-white text-lg">Write Contract</button>
        </div>
      </div>
      <Footer />
    </main>
  );
};

export default Explorer;
