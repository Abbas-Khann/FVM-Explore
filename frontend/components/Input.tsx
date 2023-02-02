import React from "react";
import { RiSearchLine } from "react-icons/ri";

const Input = (props: any) => {
  return (
    <div className="rounded-md basis-1/4 flex items-center justify-center bg-[#D1D7D9]">
      <input
        value={props.input}
        // placeholder="Enter Contract address"
        type="text"
        id=""
        name="search"
        onChange={(e) => {
          props.setInput(e.target.value);
        }}
        className="rounded-md bg-gray-800 py-4 px-8 w-11/12 outline-none text-white "
      />
      <button className="px-3 " onClick={() => props.search()}>
        <RiSearchLine className="text-3xl text-black dark:text-black" />
      </button>
    </div>
  );
};

export default Input;
