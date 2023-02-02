import { explorerLink } from "@/constants/constants";
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
  const [txData, setTxData] = useState<{}>();
  const [txLink, setTxLink] = useState<string>();
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

    /// Also sending the value if the function is payable
    const tx = {
      to: contractAddress,
      data: encodedData,
      value: value ? ethers.utils.parseEther(value) : 0,
    };

    let txRes: any;

    try {
      if (data.stateMutability == "view") {
        // read tx
        txRes = await provider.call(tx);
        console.log(txRes);

        const decoded: any = abiInterface.decodeFunctionResult(
          `${data.name}`,
          txRes
        );

        /// Error handling not checked

        console.log(decoded);

        if (!decoded) {
          console.log("No Output recieved");
          return;
        }

        // output Formatting needs to be done
        let formattedOutput;

        if (Array.isArray(decoded)) {
          setArgOutputs(decoded);
          return;
        } else {
          //setting the inddividual
          /// for int
          formattedOutput = parseInt(decoded);
          console.log(formattedOutput);

          /// for Address , String
          // formattedOutput = decoded;

          // pushing the results
          let currOutput = argOutputs;
          currOutput?.push(formattedOutput);
          setArgOutputs(currOutput);
        }

        // results not showing up on the page on the first reload
      } else if (data.stateMutability != "view") {
        // send write transaction
        const txRes = await signer?.sendTransaction(tx);

        console.log(txRes);

        const txLink = `${explorerLink}/tx/${txRes?.hash}`;

        console.log(`Tx completed with the link ${txLink}`);
        //// show the tx data in the frontend
        setTxData(txRes);
      }
    } catch (error) {
      console.log(error);

      /// alert user with the error display on the page

      const decoded: any = abiInterface.decodeErrorResult(
        `${data.name}`,
        txRes
      );
      console.log(txRes);
    }
  }

  async function handleInput(inputvalue: any, key: number) {
    let currInput: any[] = argInputs;
    currInput[key] = inputvalue;
    setArgInputs(currInput);
  }

  async function handleOutputs() {
    console.log(argOutputs);
    let currOutput = argOutputs;
    outputs?.map((output, key) => {
      if (output.type == "uint256") {
        const formattedOuput = parseInt(currOutput[key]);
      }
    });
  }

  function handleOutput(output: argType, argValue: any) {
    if (argValue == undefined) return "Nan";
    if (output.type == "uint256") {
      return parseInt(argValue);
    } else if (output.type == "address") {
      return `${argValue.slice(0, 5)}..${argValue.slice(-5)}`;
    } else if (output.type == "bool") {
      if (argValue) {
        return "true";
      } else {
        return "false";
      }
    } else {
      return argValue;
    }
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

        {txLink && <h2>{txLink}</h2>}
      </div>
      {/* returned value */}
      <div className="py-3">
        {/* align the outputs with the name and value
         */}
        {outputs &&
          outputs.map((output, key) => {
            return (
              <>
                <h1>{output.name ? output.name : "output :"}</h1>
                <h2>
                  {/* {output.type == "uint256"
                    ? parseInt(argOutputs[key])
                    : argOutputs[key]} */}
                  {handleOutput(output, argOutputs[key])}
                </h2>
              </>
            );
          })}
        {/* <h2 className="break-all">
          0x7B4A8d0862F049E35078E49F2561630Fac079eB9
        </h2> */}
      </div>
    </div>
  );
};

export default ReturnedFunction;
