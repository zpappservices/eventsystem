import React from "react";

const TextArea = ({
  name = "",
  label,
  value,
  onChange,
  placeholder = "Enter text",
  labelClassName = "",
  containerClassName = "",
  textAreaClassName = "",
  disabled = false,
  errorMessage = "",
  rows = 4,
}) => {
  return (
    <div className={`space-y-1 ${containerClassName}`}>
      <label
        className={`!text-[16px] !leading-[22px] !text-gray-700 ${labelClassName}`}>
        {label}
      </label>
      <div className="w-full">
        <textarea
          className={`w-full rounded-[5px] border py-2.5 bg-gray-50/50 px-4 outline-none
            transition-colors focus:border-primary focus:transition-all duration-300
            ${errorMessage ? "border-red-500" : "border-gray-300"}
            ${textAreaClassName}`}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          rows={rows}
          disabled={disabled}
        />
        {errorMessage && (
          <p className="text-red-500 text-sm mt-1">{errorMessage}</p>
        )}
      </div>
    </div>
  );
};

export default TextArea;
