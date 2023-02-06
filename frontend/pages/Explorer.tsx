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
import { Registery_ABI, Registery_address } from "@/constants/constants";
import { useAccount, useContract, useProvider } from "wagmi";
import { Contract, Wallet } from "ethers";
import { storeContract } from "@/functionality/storeData";
import { explorerLink } from "@/constants/constants";
import { useToast } from "@chakra-ui/react";
import { useRouter } from "next/router";
import ReturnedSourceCode from "@/components/ReturnedSourceCode";

const private_key: any = process.env.NEXT_PUBLIC_PRIVATE_KEY;

const Explorer = () => {
  const router = useRouter();

  const [readFunctions, setReadFunctions] = useState<functionType[]>();
  const [writeFunctions, setWriteFunctions] = useState<functionType[]>();
  const [showType, setShowType] = useState<string>();
  const [constructors, setConstructors] = useState<functionType[]>();
  const [contractExists, setContractExists] = useState<boolean>();
  const [contractData, setContractData] = useState<contractDataType>();
  const [contractAddress, setContractAddress] = useState<string>();
  const [ipfsURI, setIpfsURI] = useState<string>();
  const [isReadActive, setIsReadActive] = useState<boolean>(false);
  const [isWriteActive, setIsWriteActive] = useState<boolean>(false);
  const [isSourceCodeActive, setIsSourceCodeActive] = useState<boolean>(false);

  const { address } = useAccount();
  const provider = useProvider();
  const Registery_Contract = useContract({
    address: Registery_address,
    abi: Registery_ABI,
    signerOrProvider: provider,
  });
  const toast = useToast();
  console.log(showType, "showtype here");
  useEffect(() => {
    const queryAddress: any = router.query.address;
    if (queryAddress) {
      setContractAddress(queryAddress);
    }
  }, [router.query]);

  async function searchContract() {
    if (!contractAddress) return;
    try {
      const response = await Registery_Contract?.getContractRecord(
        contractAddress
      );
      toast({
        title: "Address fetched!!!",
        status: "success",
        duration: 2000,
        isClosable: true,
      });
      // console.log(response);
      if (!response) {
        toast({
          title: "Contract does not exist",
          description: "This contract does not exist in our registry",
          status: "error",
          duration: 2000,
          isClosable: true,
        });
        // console.log("Contract does not exist");
        setContractExists(false);
        return;
        /// notify that Contract doesnot Exists
      }
      setIpfsURI(response);
      setContractExists(true);
      fetchContractData(response);
    } catch (error: any) {
      toast({
        title: `${error.reason}`,
        status: "error",
        duration: 2000,
        isClosable: true,
      });
      console.log(error);
    }
  }

  async function fetchContractData(ipfsURL: string) {
    const contractData = await (await fetch(ipfsURL)).json();
    // console.log(contractData);

    if (!contractData) {
      toast({
        title: "Contract Data not found",
        status: "error",
        duration: 2000,
        isClosable: true,
      });
      // console.log("Contract Data not found");
      return;
    }
    /// has bytecode , abi , code
    setContractData(contractData);
    setShowType("source");
    setIsSourceCodeActive(true);
    setIsReadActive(false);
    setIsWriteActive(false);
    getData(contractData.abi);
    //set default to the contract Tab and show all the data there
  }

  /// issue with the ABI type
  async function getData(abi: any[]) {
    const data = await analyzeABI(abi);
    // console.log(data);
    setReadFunctions(data?.read);
    setWriteFunctions(data?.write);

    console.log(data, "getData");
  }
  console.log(contractData);
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
              setIsSourceCodeActive(false);
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
              setIsSourceCodeActive(false);
            }}
          >
            Write Contract
          </button>
          <button
            className={`text-white text-lg focus:border-t-2 ${
              isSourceCodeActive ? "border-t-2" : "none"
            }`}
            onClick={() => {
              setShowType("source");
              setIsSourceCodeActive(true);
              setIsReadActive(false);
              setIsWriteActive(false);
            }}
          >
            Source Code
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
                  key={key}
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
                  key={key}
                  contractAddress={contractAddress}
                />
              );
            })}
        </div>
      )}
      {showType == "source" && (
        <div>
          {contractData && (
            <div>
              <ReturnedSourceCode sourceCode={contractData.code} />
            </div>
          )}
        </div>
      )}
      <Footer />
    </main>
  );
};

export default Explorer;
