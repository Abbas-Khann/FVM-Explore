import React, { useEffect, useState } from "react";
import ConstructorArguments from "./ConstructorArgs";
import { deploy } from "../functionality/deployContract";
import { useAccount, useProvider, useTransaction } from "wagmi";
import { analyzeABI, functionType } from "@/functionality/analyzeABI";

const explorerLink = "";

const Code = () => {
  const { address } = useAccount();
  const provider = useProvider();
  const [sourceCode, setSourceCode] = useState<string>();
  const [output, setOutput] = useState<{ abi: any[]; bytecode: string }>();
  const [constructorArg, setConstructorArg] = useState<functionType[]>();
  const [argInputs, setArgInputs] = useState<any[]>([]);
  const [contractAddress, setContractAddress] = useState<string>();
  const [error, setError] = useState<string>();
  const [txLink, setTxLink] = useState<string>("");
  const [compiled, setCompiled] = useState<Boolean>(false);

  /// contract with imports have to be managed , not yet handled
  async function handleCompile() {
    if (!sourceCode) {
      console.log("no Source code set");
      return;
    }

    /// For proper handling we can change the API call format
    const response = await fetch("./api/compile", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ sourceCode }),
    });

    console.log(response);
    const formattedResponse = (await response.json()).output;
    console.log(formattedResponse);

    if (response.status == 200) {
      setOutput(formattedResponse);
      console.log("Successfully Compiled");
      setError("Successfully Compiled");
      /// analyze the ABI and show const
      handleABI(formattedResponse.abi);

      setCompiled(true);
    } else {
      setError(formattedResponse);
    }
  }

  async function handleABI(abi: any[]) {
    /// analyze the ABI and show constructors
    const data = await analyzeABI(abi);
    console.log(data?.constructor);
    setConstructorArg(data?.constructor);
  }

  async function handleDeploy() {
    /// checking if the contract is compiled
    if (!output?.bytecode) {
      console.log("Compile the Contract first");
      setError("Compile the Contract first");
      return;
    }

    /// checking if the contructor has arg
    if (constructorArg?.length) {
      if (!argInputs) {
        console.log("Add the Constructor Arguements");
        setError("Add the Constructor Arguements");
        return;
      }
    }

    console.log("deploying...");
    const txHash = await deploy(output.bytecode, address);
    const txLink = `${explorerLink}/tx/${txHash}`;
    console.log(txLink);
    setTxLink(txLink);
    fetchTransaction(txHash);
  }

  async function fetchTransaction(txhash: any) {
    const data: any = await provider.getTransaction(`${txhash}`);
    const contractAddr = data.creates;
    const contractLink = `${explorerLink}/contract/${contractAddr}`;
    console.log(`Contract Created with the address${contractLink}`);
    setContractAddress(contractAddr);
  }

  async function verifyContract() {
    /// store the contract info on the Web3.storage and add the data , CID to a Contract or Web2 Database
  }

  return (
    <div className="flex items-center justify-center flex-col">
      <script
        type="text/javascript"
        src="https://binaries.soliditylang.org/bin/soljson-latest.js"
      ></script>
      <h1 className="text-white font-bold text-2xl text-skin-base my-4 leading-tight lg:text-5xl tracking-tighter mb-6 lg:tracking-normal">
        Submit Your Code Here
      </h1>
      <textarea
        onChange={(e) => setSourceCode(e.target.value)}
        className="w-8/12 sm:w-6/12 h-[70vh] mb-10 p-10 bg-gray-900 text-white text-xl rounded-2xl"
      />
      {constructorArg?.length && (
        <ConstructorArguments
          args={constructorArg}
          inputs={argInputs}
          setInputs={setArgInputs}
        />
      )}
      {error && <p className="text-white">{error}</p>}
      <button
        onClick={() => handleCompile()}
        className="bg-gradient-to-t from-[#201CFF] to-[#C41CFF] py-2 px-10 hover:bg-gradient-to-b from-[#201CFF] to-[#C41CFF] sm:mr-10 mb-5 text-white"
      >
        Compile
      </button>
      {compiled && (
        <button
          onClick={() => handleDeploy()}
          className="bg-gradient-to-t from-[#201CFF] to-[#C41CFF] py-2 px-10 hover:bg-gradient-to-b from-[#201CFF] to-[#C41CFF] sm:mr-10 mb-5 text-white"
        >
          Deploy
        </button>
      )}
    </div>
  );
};

export default Code;
