import React from "react";

const Select = ({
  name = "",
  label,
  options,
  selectedOption,
  onChange,
  labelClassName = "",
  containerClassName = "",
  optionClassName = "",
  selectClassName = "",
  disabled = false,
  placeholder = "Select an option",
  placeholderColor = "text-neutrals400",
}) => {
  return (
    <div className={`space-y-1 ${containerClassName}`}>
      <label
        className={`!text-[16px] !leading-[22px] !text-white ${labelClassName}`}>
        {label}
      </label>
      <div className="w-full">
        <select
          className={`w-full h-[48px] rounded-[5px] border py-2.5 px-4 pr-12 outline-none
            transition-colors font-medium cursor-pointer focus:border-primary focus:transition-all duration-300 
            ${
              selectedOption ? "text-baseBlack" : "text-neutrals400"
            } ${selectClassName}`}
          style={{
            appearance: "none",
            backgroundImage: 'url("/img/select-dropdown.svg")',
            backgroundRepeat: "no-repeat",
            backgroundPosition: "94% center",
          }}
          name={name}
          value={selectedOption}
          onChange={onChange}
          disabled={disabled}>
          <option disabled value="" className={` ${placeholderColor}`}>
            {placeholder}
          </option>
          {options?.map((option, index) => (
            <option
              key={index}
              value={option}
              className={`!p-5 ${optionClassName}`}>
              {option}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default Select;
