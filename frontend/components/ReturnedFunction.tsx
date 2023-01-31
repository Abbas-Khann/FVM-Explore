import { argType, functionType } from "@/functionality/analyzeABI";
import React, { useEffect, useState } from "react";

const ReturnedFunction = (props: any) => {
  const [inputs, setInputs] = useState<argType[]>();
  const [outputs, setOutputs] = useState<argType[]>();
  const [ifPayable, setIfPayable] = useState<boolean>(false);
  const data = props.functionData;

  async function handle() {
    setInputs(data.inputs);
    setOutputs(data.outputs);
    if (data.stateMutability) {
      const payable = data.stateMutability == "payable" ? true : false;
      setIfPayable(payable);
    }
  }

  useEffect(() => {
    handle();
  }, []);

  return (
    <div className="flex flex-col w-[318px] pb-5 bg-gray-300 px-8 border-t-8 border-orange-400 rounded-t-lg my-10 mx-10 bg-gray-800 text-white">
      <h4 className="text-white text-xl py-2">{data.name}</h4>
      {ifPayable && <p className="text-green-500 text-m py-2">Payable</p>}
      {inputs &&
        inputs.map((input, key) => {
          return (
            <input
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
        <button className="bg-gradient-to-t from-[#201CFF] to-[#C41CFF] py-2 px-10 hover:bg-gradient-to-b from-[#201CFF] to-[#C41CFF] mb-5">
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
