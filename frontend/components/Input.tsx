import React from "react";
import { RiSearchLine } from "react-icons/ri";

const Input = () => {
  return (
    <div className="rounded-md basis-1/4 flex items-center justify-center bg-[#D1D7D9]">
      <input
        type="text"
        id=""
        name="search"
        className="rounded-md bg-[#4F4F4F] py-4 px-8 w-11/12 outline-none text-white "
      />
      <button className="px-3 ">
        <RiSearchLine className="text-3xl text-black dark:text-black" />
      </button>
    </div>
  );
};

export default Input;