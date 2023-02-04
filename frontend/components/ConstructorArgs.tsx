import { argType, functionType } from "@/functionality/analyzeABI";
import React, { useEffect, useState } from "react";

const ConstructorArguments = (props: any) => {
  const [cInputs, setCInputs] = useState<argType[]>();
  const [constructorData, setConstructorData] = useState<functionType>();
  /// handle the value send thing

  async function handle() {
    const args = props.args;
    // console.log(args);
    setCInputs(args[0].inputs);
    setConstructorData(args[0]);
  }

  useEffect(() => {
    handle();
  }, []);

  async function handleInput(inputvalue: any, key: number) {
    let currInput: any[] = props.inputs;
    currInput[key] = inputvalue;
    props.setInputs(currInput);
  }

  return (
    <div className="flex flex-col w-[328px] pb-5 bg-gray-300 px-8 bg-gray-900 text-white text-xl rounded-2xl my-10 mx-10 pb-8">
      <h4 className="text-white text-2xl py-5 text-center">
        Constructor Arguments
      </h4>
      {constructorData?.stateMutability == "payable" && (
        <>
          <p className="text-green-500 text-m">Payable</p>
          <input
            placeholder="Value in ETH"
            className="px-1 py-1 mb-2 text-black rounded-md"
            onChange={(e) => props.setEth(e.target.value)}
          />
        </>
      )}
      {cInputs &&
        cInputs.map((input, key) => {
          return (
            <input
              key={key}
              placeholder={input.name}
              className="px-1 py-1 mb-2 text-black rounded-md"
              onChange={(e) => handleInput(e.target.value, key)}
            />
          );
        })}

      <div className="flex items-center justify-center"></div>
    </div>
  );
};

export default ConstructorArguments;
