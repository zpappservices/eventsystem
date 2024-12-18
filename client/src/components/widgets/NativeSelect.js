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
        className={`!text-[16px] !leading-[22px] !text-gray-700 ${labelClassName}`}>
        {label}
      </label>
      <div className="w-full">
        <select
          className={`w-full h-[48px] rounded-[5px] bg-gray-50/50 border py-2.5 px-4 pr-12 outline-none
            transition-colors cursor-pointer focus:border-primary focus:transition-all duration-300 
            ${
              selectedOption
                ? "text-black border-gray-300"
                : "text-neutrals400 border-gray-300"
            } ${selectClassName}`}
          style={{
            appearance: "none",
            backgroundImage: 'url("/img/select-dropdown.svg")',
            backgroundRepeat: "no-repeat",
            backgroundPosition: "96% center",
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
              value={option?.value || option}
              className={`!p-5 ${optionClassName}`}>
              {option?.label || option}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default Select;
