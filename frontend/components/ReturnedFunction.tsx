import React from "react";

const ReturnedFunction = () => {
    return(
        <div
        className="flex flex-col w-[318px] pb-5 bg-gray-300 px-8 border-t-8 border-orange-400 rounded-t-lg my-10 mx-10"
        >
            <h4 className="text-black text-xl py-2">Auction Drop Interval </h4>
            <input
            placeholder="address"
            className="px-1 py-1 mb-2"
            />
            <input
            placeholder="uint"
            className="px-1 py-1 mb-2"
            />
            <div className="flex items-center justify-center">
            <button
            className="text-white text-lg bg-[#C41CFFC2] px-10 py-2 rounded-sm"
            >
            Submit
            </button>
            </div>
            {/* returned value */}
            <div>
            <h2 className="break-all">
            0x7B4A8d0862F049E35078E49F2561630Fac079eB9
            </h2>
            <h2>123</h2>
            </div>
        </div>
    )
}

export default ReturnedFunction