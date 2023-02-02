import React, { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import Input from "@/components/Input";
import Footer from "@/components/Footer";
import ReturnedFunction from "@/components/ReturnedFunction";
import {
  analyzeABI,
  contractDataType,
  functionType,
} from "@/functionality/analyzeABI";
import { ABI, Registery_ABI, Registery_address } from "@/constants/constants";
import { useAccount, useContract, useProvider } from "wagmi";
import { Contract, Wallet } from "ethers";
import { storeContract } from "@/functionality/storeData";
import { explorerLink } from "@/constants/constants";

const private_key: any = process.env.NEXT_PUBLIC_PRIVATE_KEY;

const Explorer = () => {
  const [readFunctions, setReadFunctions] = useState<functionType[]>();
  const [writeFunctions, setWriteFunctions] = useState<functionType[]>();
  const [showType, setShowType] = useState<string>();
  const [constructors, setConstructors] = useState<functionType[]>();
  const [contractExists, setContractExists] = useState<boolean>();
  const [contractData, setContractData] = useState<contractDataType>();
  const [contractAddress, setContractAddress] = useState<string>();
  const [ipfsURI, setIpfsURI] = useState<string>();
  const [isReadActive, setIsReadActive] = useState(false);
  const [isWriteActive, setIsWriteActive] = useState(false);

  const { address } = useAccount();
  const provider = useProvider();
  const Registery_Contract = useContract({
    address: Registery_address,
    abi: Registery_ABI,
    signerOrProvider: provider,
  });

  async function searchContract() {
    if (!contractAddress) return;
    try {
      const response = await Registery_Contract?.getContractRecord(
        contractAddress
      );
      // console.log(response);
      if (!response) {
        console.log("Contract does not exist");
        setContractExists(false);
        return;
        /// notify that Contract doesnot Exists
      }
      setIpfsURI(response);
      setContractExists(true);
      fetchContractData(response);
    } catch (error) {
      console.log(error);
    }
  }

  async function fetchContractData(ipfsURL: string) {
    const contractData = await (await fetch(ipfsURL)).json();
    // console.log(contractData);

    if (!contractData) {
      console.log("Contract Data not found");
      return;
    }

    /// has bytecode , abi , code
    setContractData(contractData);
    getData(contractData.abi);
  }

  /// issue with the ABI type
  async function getData(abi: any[]) {
    const data = await analyzeABI(abi);
    // console.log(data);
    setReadFunctions(data?.read);
    setWriteFunctions(data?.write);
  }

  // now handle for the contract that does not exists
  // send the user to deploy page but with a contractAddress , so that it will not deploy the contract again and verify the contract

  return (
    <main className="bg-black min-h-[100vh]">
      <Navbar />
      <h1 className="bg-black text-white text-center text-3xl sm:text-4xl pt-10 pb-14">
        Explore here
      </h1>
      <div className="mx-auto max-w-xl mb-10 px-4">
        <p className="pb-3 text-white text-xl">Paste Contract Address here</p>
        <Input
          input={contractAddress}
          setInput={setContractAddress}
          search={searchContract}
        />
        <div className="flex justify-evenly py-10">
          <button
            className={`text-white text-lg focus:border-t-2 ${
              isReadActive ? "border-t-2" : "none"
            }`}
            onClick={() => {
              setShowType("read");
              setIsReadActive(true);
              setIsWriteActive(false);
            }}
          >
            Read Contract
          </button>
          <button
            className={`text-white text-lg focus:border-t-2 ${
              isWriteActive ? "border-t-2" : "none"
            }`}
            onClick={() => {
              setShowType("write");
              setIsWriteActive(true);
              setIsReadActive(false);
            }}
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
