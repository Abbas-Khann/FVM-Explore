import React from "react";
import ConstructorArguments from "./ConstructorArgs";

const Code = () => {
    return(
        <div className="flex items-center justify-center flex-col">
            <h1
            className="text-white font-bold text-2xl text-skin-base my-4 leading-tight lg:text-5xl tracking-tighter mb-6 lg:tracking-normal"
            >Submit Your Code Here</h1>
            <textarea 
            className="w-8/12 sm:w-6/12 h-[70vh] mb-10 p-10 bg-gray-900 text-white text-xl rounded-2xl"
            />
            <ConstructorArguments />
            <button
            className="bg-gradient-to-t from-[#201CFF] to-[#C41CFF] py-2 px-10 hover:bg-gradient-to-b from-[#201CFF] to-[#C41CFF] sm:mr-10 mb-5 text-white"
            >
                Submit
            </button>
        </div>
    )
}

export default Code