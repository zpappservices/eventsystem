import React from "react";
import { BsCheckSquareFill } from "react-icons/bs";
import { RxBox } from "react-icons/rx";

const Checkbox = ({
  label,
  isChecked,
  onToggle,
  size = 24,
  checkedColor = "text-primary",
  uncheckedColor = "text-gray-400",
  className,
}) => {
  return (
    <label
      className={`flex items-center gap-2 cursor-pointer text-[16px] leading-snug ${className}`}
      onClick={onToggle}
    >
      {isChecked ? (
        <BsCheckSquareFill className={`${checkedColor}`} size={size} />
      ) : (
        <RxBox className={`${uncheckedColor}`} size={size} />
      )}
      {label && <span>{label}</span>}
    </label>
  );
};

export default Checkbox;
