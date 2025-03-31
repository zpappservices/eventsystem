import React from "react";
import { FiSearch } from "react-icons/fi";

const Search = () => {
  return (
    <div className="w-full max-w-[311px] flex items-center gap-4 px-4 py-2.5 border rounded-[10px]">
      <FiSearch className="text-[16px] text-neutrals700" />
      <input
        type="text"
        className="border-none outline-none bg-inherit placeholder:text-neutrals600 text-sm"
        placeholder="Search"
      />
    </div>
  );
};

export default Search;
