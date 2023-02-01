import React, { useEffect, useState } from "react";
import ConstructorArguments from "./ConstructorArgs";
import { deployContract } from "../functionality/deployContract";

const Code = () => {
  const [sourceCode, setSourceCode] = useState();

  async function handleCompile() {
    if (!sourceCode) {
      console.log("no Source code set");
      return;
    }

    fetch("./api/compile", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ sourceCode }),
    })
      .then(async (response) => {
        const formattedResponse = await response.json();
        console.log(formattedResponse.output);
      })
      .catch(async (error) => {
        console.log(error);
      });
  }

  return (
    <div className="flex items-center justify-center flex-col">
      <script
        type="text/javascript"
        src="https://binaries.soliditylang.org/bin/soljson-v0.8.16+commit.07a7930e.js"
      ></script>
      <h1 className="text-white font-bold text-2xl text-skin-base my-4 leading-tight lg:text-5xl tracking-tighter mb-6 lg:tracking-normal">
        Submit Your Code Here
      </h1>
      <textarea
        onChange={(e) => setSourceCode(e.target.value)}
        className="w-8/12 sm:w-6/12 h-[70vh] mb-10 p-10 bg-gray-900 text-white text-xl rounded-2xl"
      />
      <ConstructorArguments />
      <button
        onClick={() => handleCompile()}
        className="bg-gradient-to-t from-[#201CFF] to-[#C41CFF] py-2 px-10 hover:bg-gradient-to-b from-[#201CFF] to-[#C41CFF] sm:mr-10 mb-5 text-white"
      >
        Compile
      </button>
      <button className="bg-gradient-to-t from-[#201CFF] to-[#C41CFF] py-2 px-10 hover:bg-gradient-to-b from-[#201CFF] to-[#C41CFF] sm:mr-10 mb-5 text-white">
        Deploy
      </button>
    </div>
  );
};

export default Code;
