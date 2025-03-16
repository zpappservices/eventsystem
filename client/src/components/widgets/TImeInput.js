import React from "react";

const TimeInput = ({
  name = "",
  label,
  value,
  onChange,
  placeholder = "Select time",
  labelClassName = "",
  containerClassName = "",
  inputClassName = "",
  disabled = false,
  errorMessage = "",
}) => {
  return (
    <div className={`space-y-1 ${containerClassName}`}>
      <label
        className={`!text-[16px] !leading-[22px] text-gray-700 ${labelClassName}`}>
        {label}
      </label>
      <div className="w-full">
        <input
          type="time"
          className={`w-full rounded-[5px] border py-2.5 px-4 outline-none
            transition-colors focus:border-primary focus:transition-all duration-300
            ${errorMessage ? "border-red-500" : "border-gray-300"}
            ${inputClassName}`}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          disabled={disabled}
        />
        {errorMessage && (
          <p className="text-red-500 text-sm mt-1">{errorMessage}</p>
        )}
      </div>
    </div>
  );
};

export default TimeInput;
