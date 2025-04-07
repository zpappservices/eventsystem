import React from "react";
import { FaArrowDown, FaArrowUp } from "react-icons/fa";
import { IoEllipsisVerticalSharp } from "react-icons/io5";

const StatCard = ({ title, value, percentage, percentageType, trend }) => {
  return (
    <div className="w-full flex flex-col sm:w-[212px] max-w-[212px] px-4 py-3 shadow-md rounded-[16px] gap-[12.5px] relative">
      <div className="absolute top-3 right-3 cursor-pointer">
        <IoEllipsisVerticalSharp />
      </div>
      <p className="text-neutrals500 text-xs font-normal">{title}</p>

      <div className="flex flex-col gap-[6px]">
        <p className="text-baseBlack text-sm font-bold">{value}</p>
        <p className="flex items-center gap-2 text-[10px] font-normal text-neutrals500">
          <span className={`text-${trend === "down" ? "red" : "green"}-500 font-bold inline-flex`}>
            {trend === "down" ? (
              <FaArrowDown className="self-center" />
            ) : (
              <FaArrowUp className="self-center" />
            )}
            {percentage}
          </span>
          <span>{percentageType}</span>
        </p>
      </div>
    </div>
  );
};

export default StatCard;
