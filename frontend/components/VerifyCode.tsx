import React, { useEffect, useState } from "react";
import ConstructorArguments from "./ConstructorArgs";
import { deploy } from "../functionality/deployContract";
import { useAccount, useProvider, useTransaction } from "wagmi";
import { storeContract } from "@/functionality/storeData";
import { Contract, Wallet } from "ethers";
import { Registery_ABI, Registery_address } from "@/constants/constants";
import { explorerLink } from "@/constants/constants";
const private_key: any = process.env.NEXT_PUBLIC_PRIVATE_KEY;

// goal is to remove deployement for the user , just compile , and upload to web3.storage

const Code = () => {
  const { address } = useAccount();
  const provider = useProvider();

  const [contractName, setContractName] = useState<string>("");
  const [sourceCode, setSourceCode] = useState<string>();
  const [output, setOutput] = useState<{ abi: any[]; bytecode: string }>();

  const [contractAddress, setContractAddress] = useState<string>();
  const [error, setError] = useState<string>();

  const [compiled, setCompiled] = useState<Boolean>(false);
  const [ipfsLink, setIpfsLink] = useState<string>();

  /// add the ENV thing and enable
  const manager_wallet = new Wallet(private_key, provider);
  const registery_contract = new Contract(
    Registery_address,
    Registery_ABI,
    manager_wallet
  );

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
      setCompiled(true);
    } else {
      setError(formattedResponse);
    }
  }

  async function verifyContract() {
    /// store the contract info on the Web3.storage and add the data , CID to a Contract or Web2 Database
    if (!output && !contractAddress) {
      console.log("Compile & Deploy the Contract first");
      setError("Compile & Deploy  the Contract first");
      return;
    }

    const contractData = {
      name: contractName,
      address: contractAddress,
      deployer: address,
      abi: output?.abi,
      bytecode: output?.bytecode,
      code: sourceCode,
    };

    try {
      const CID = await storeContract(contractData);
      const IPFSURL = `https://w3s.link/ipfs/${CID}`;
      console.log(IPFSURL);
      setIpfsLink(IPFSURL);

      /// Store the IPFS link somewhere

      const tx = await registery_contract.addContractRecord(
        contractAddress,
        IPFSURL
      );

      await tx.wait();

      console.log(tx);

      console.log("Record Added in the registery");
    } catch (error) {
      console.log(error);

      // alert the user of the error
    }
  }

  return (
    <div className="flex items-center justify-center flex-col">
      // Style the input box first
      <input
        // placeholder="Enter Contract address"
        type="text"
        id=""
        onChange={(e) => {
          setContractAddress(e.target.value);
        }}
        className="rounded-md bg-gray-800 py-4 px-8 w-11/12 outline-none text-white "
      />
      {/* Add the ContractName input box */}
      <h1 className="text-white font-bold text-2xl text-skin-base my-4 leading-tight lg:text-5xl tracking-tighter mb-6 lg:tracking-normal">
        Submit Your Code Here
      </h1>
      <textarea
        onChange={(e) => setSourceCode(e.target.value)}
        className="w-8/12 sm:w-6/12 h-[70vh] mb-10 p-10 bg-gray-900 text-white text-xl rounded-2xl"
      />
      {error && <p className="text-white">{error}</p>}
      <button
        onClick={() => handleCompile()}
        className="bg-gradient-to-t from-[#201CFF] to-[#C41CFF] py-2 px-10 hover:bg-gradient-to-b from-[#201CFF] to-[#C41CFF] sm:mr-10 mb-5 text-white"
      >
        Compile
      </button>
      {compiled && (
        <button
          onClick={() => verifyContract()}
          className="bg-gradient-to-t from-[#201CFF] to-[#C41CFF] py-2 px-10 hover:bg-gradient-to-b from-[#201CFF] to-[#C41CFF] sm:mr-10 mb-5 text-white"
        >
          Verify
        </button>
      )}
    </div>
  );
};

export default Code;
