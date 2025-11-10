import React from "react";
import { FiSearch } from "react-icons/fi";

const Search = ({ setState, state }) => {
  return (
    <div className="w-full max-w-[311px] flex items-center gap-4 px-4 py-2.5 border rounded-[10px]">
      <FiSearch className="text-[16px] text-neutrals700 flex-shrink-0" />
      <input
        type="text"
        className="w-full border-none outline-none bg-inherit placeholder:text-neutrals600 text-sm"
        placeholder="Search"
        value={state}
        onChange={(e) => setState(e.target.value)}
      />
    </div>
  );
};

export default Search;
