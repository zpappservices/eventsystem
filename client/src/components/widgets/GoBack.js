import React from "react";
import { BsChevronLeft } from "react-icons/bs";

const GoBack = ({ onPrev, className }) => {
  return (
    <BsChevronLeft
      size={32}
      className={`cursor-pointer w-[23px] ${className}`}
      onClick={onPrev}
    />
  );
};

export default GoBack;
