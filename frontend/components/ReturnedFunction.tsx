import { argType, functionType } from "@/functionality/analyzeABI";
import { utils, ethers } from "ethers";
import React, { useEffect, useState } from "react";
import {
  useAccount,
  useContract,
  useContractRead,
  usePrepareSendTransaction,
  useProvider,
  useSendTransaction,
  useSigner,
  useWaitForTransaction,
} from "wagmi";

const ReturnedFunction = (props: any) => {
  const [inputs, setInputs] = useState<argType[]>();
  const [argInputs, setArgInputs] = useState<any[]>([]);
  const [value, setValue] = useState<string>("0");
  const [argOutputs, setArgOutputs] = useState<any[]>([]);
  const [outputs, setOutputs] = useState<argType[]>();
  const [ifPayable, setIfPayable] = useState<boolean>(false);
  const data = props.functionData;
  const contractAddress = props.contractAddress;

  const { address, isConnected } = useAccount();
  const provider = useProvider();
  const { data: signer } = useSigner();

  async function handle() {
    // console.log(data);
    setInputs(data.inputs);
    setOutputs(data.outputs);
    if (data.stateMutability) {
      const payable = data.stateMutability == "payable" ? true : false;
      setIfPayable(payable);
    }
  }

  async function handleSubmit() {
    const abiInterface = new ethers.utils.Interface([data]);

    const encodedData = abiInterface.encodeFunctionData(
      `${data.name}`,
      argInputs
    );

    const tx = {
      to: contractAddress,
      data: encodedData,
    };

    if (data.stateMutability == "view") {
      // read tx
      const txdata = await provider.call(tx);

      const decoded = abiInterface.decodeFunctionData(`${data.name}`, txdata);

      console.log(txdata, decoded);

      //   const {
      //     data: readData,
      //     isError,
      //     isLoading,
      //   } = useContractRead({
      //     address: "0xecb504d39723b0be0e3a9aa33d646642d1051ee1",
      //     abi: [data],
      //     functionName: `${data.name}`,
      //     args: argInputs,
      //   });
    } else if (data.stateMutability != "view") {
      //   const { config, error } = usePrepareSendTransaction({
      //     request: {
      //       to: contractAddress,
      //       data: encodedData,
      //       value: ethers.utils.parseEther(value),
      //     },
      //   });
      //   const { data: txData, sendTransaction } = useSendTransaction(config);
      //   sendTransaction?.();
      //   const { isLoading } = useWaitForTransaction({
      //     hash: data?.hash,
      //   });

      // send write transaction
      const txdata = await signer?.sendTransaction(tx);

      console.log(txdata);
    }
  }

  async function handleInput(inputvalue: any, key: number) {
    let currInput: any[] = argInputs;
    currInput[key] = inputvalue;
    setArgInputs(currInput);
  }

  useEffect(() => {
    handle();
  }, []);

  return (
    <div className="flex flex-col w-[318px] pb-5 bg-gray-300 px-8 border-t-8 border-orange-400 rounded-t-lg my-10 mx-10 bg-gray-800 text-white">
      <h4 className="text-white text-xl py-2">{data.name}</h4>
      {ifPayable && (
        <>
          <p className="text-green-500 text-m py-2">Payable</p>
          <input
            onChange={(e) => setValue(e.target.value)}
            placeholder="Value in ETH"
            className="px-1 py-1 mb-4 bg-[#D1D7D9] text-black outline-none rounded-sm"
          />
        </>
      )}
      {inputs &&
        inputs.map((input, key) => {
          return (
            <input
              onChange={(e) => handleInput(e.target.value, key)}
              placeholder={input.name}
              className="px-1 py-1 mb-4 bg-[#D1D7D9] text-black outline-none rounded-sm"
            />
          );
        })}
      {/* 
      <input
        placeholder="uint"
        className="px-1 py-1 mb-4 bg-[#D1D7D9] text-black outline-none rounded-sm"
      /> */}
      <div className="flex items-center justify-center">
        <button
          onClick={() => handleSubmit()}
          className="bg-gradient-to-t from-[#201CFF] to-[#C41CFF] py-2 px-10 hover:bg-gradient-to-b from-[#201CFF] to-[#C41CFF] mb-5"
        >
          Submit
        </button>
      </div>
      {/* returned value */}
      {/* <div className="py-3">
        <h2 className="break-all">
          0x7B4A8d0862F049E35078E49F2561630Fac079eB9
        </h2>
        <h2>123</h2>
      </div> */}
    </div>
  );
};

export default ReturnedFunction;
