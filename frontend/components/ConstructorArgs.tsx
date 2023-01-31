import React from "react";

const ConstructorArguments = () => {
    return(
        <div
        className="flex flex-col w-[398px] pb-5 bg-gray-300 px-8 bg-gray-900 text-white text-xl rounded-2xl my-10 mx-10 pb-8"
        >
            <h4 className="text-white text-2xl py-5 text-center">Constructor Arguments</h4>
            <input
            placeholder="address"
            className="px-1 py-1 mb-2 text-black rounded-md"
            />
            <input
            placeholder="uint"
            className="px-1 py-1 mb-2 text-black rounded-md"
            />
            <div className="flex items-center justify-center">
            </div>
        </div>
    )
}

export default ConstructorArguments