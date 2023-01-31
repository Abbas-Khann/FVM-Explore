import React, { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import Input from "@/components/Input";
import Footer from "@/components/Footer";
import ReturnedFunction from "@/components/ReturnedFunction";
import { analyzeABI, functionType } from "@/functionality/analyzeABI";
import { ABI } from "@/constants/constants";

const Explorer = () => {
  const [readFunctions, setReadFunctions] = useState<functionType[]>();
  const [writeFunctions, setWriteFunctions] = useState<functionType[]>();
  const [showType, setShowType] = useState<string>();
  const [constructors, setConstructors] = useState<functionType[]>();
  const [contractAddress, setContractAddress] = useState<string>("");

  async function getData() {
    const data = await analyzeABI(ABI);
    // console.log(data);
    setReadFunctions(data?.read);
    setWriteFunctions(data?.write);
  }

  useEffect(() => {
    getData();
  }, []);

  return (
    <main className="bg-black min-h-[100vh]">
      <Navbar />
      <h1 className="bg-black text-white text-center text-3xl sm:text-4xl pt-10 pb-14">
        Explore here
      </h1>
      <div className="mx-auto max-w-xl mb-10 px-4">
        <p className="pb-3 text-white text-xl">Paste Contract Address here</p>
        <Input />
        <div className="flex justify-evenly py-10">
          <button
            className="text-white text-lg"
            onClick={() => setShowType("read")}
          >
            Read Contract
          </button>
          <button
            className="text-white text-lg"
            onClick={() => setShowType("write")}
          >
            Write Contract
          </button>
        </div>
      </div>
      {showType == "read" && (
        <div className="flex items-center justify-evenly flex-wrap">
          {readFunctions &&
            readFunctions.map((readFunction, key) => {
              return (
                <ReturnedFunction
                  functionData={readFunction}
                  id={key}
                  contractAddress={contractAddress}
                />
              );
            })}
        </div>
      )}
      {showType == "write" && (
        <div className="flex items-center justify-evenly flex-wrap">
          {writeFunctions &&
            writeFunctions.map((writeFunction, key) => {
              return (
                <ReturnedFunction
                  functionData={writeFunction}
                  id={key}
                  contractAddress={contractAddress}
                />
              );
            })}
        </div>
      )}

      <Footer />
    </main>
  );
};

export default Explorer;
