import { useState } from "react";
import { MdCheckBoxOutlineBlank } from "react-icons/md";
import { IoMdCheckbox } from "react-icons/io";

const CheckboxGroup = ({
  options = [],
  selected = [],
  onChange,
  single = false,
  title = "",
}) => {
  const toggleOption = (option) => {
    let updatedValues;

    if (single) {
      updatedValues = selected.includes(option) ? [] : [option];
    } else {
      updatedValues = selected.includes(option)
        ? selected.filter((val) => val !== option)
        : [...selected, option];
    }

    onChange?.(updatedValues);
  };

  return (
    <div className="mb-4">
      {title && <h3 className="font-bold mb-2">{title}</h3>}
      {options.map((option) => (
        <div
          key={option}
          className="flex space-x-2 cursor-pointer mb-1"
          onClick={() => toggleOption(option)}
        >
          {selected.includes(option) ? (
            <IoMdCheckbox className="text-primary text-xl shrink-0 mt-0.5" />
          ) : (
            <MdCheckBoxOutlineBlank className="text-neutrals400 text-xl shrink-0 mt-0.5" />
          )}
          <span>{option}</span>
        </div>
      ))}
    </div>
  );
};

export default CheckboxGroup;
