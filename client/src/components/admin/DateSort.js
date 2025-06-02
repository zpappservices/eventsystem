import React from "react";
import { BsFilterLeft } from "react-icons/bs";
import { FiSearch } from "react-icons/fi";

const DateSort = ({ setState, state }) => {
  return (
    <div className="w-full flex items-center gap-4 px-4 py-2.5 border rounded-[10px] cursor-pointer">
      <BsFilterLeft className="text-[20px] text-neutrals700 flex-shrink-0" />
      <input
        type="text"
        className="w-full border-none outline-none bg-inherit placeholder:text-neutrals600 text-sm"
        placeholder="Sort by date"
        value={state}
        onChange={(e) => setState(e.target.value)}
        disabled
      />
    </div>
  );
};

export default DateSort;
