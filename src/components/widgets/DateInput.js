import React from "react";

const DateInput = ({
  name = "",
  label,
  value,
  onChange,
  placeholder = "Select a date",
  labelClassName = "",
  containerClassName = "",
  inputClassName = "",
  disabled = false,
  errorMessage = "",
}) => {
  // Get today's date in YYYY-MM-DD format
  const today = new Date().toISOString().split("T")[0];

  return (
    <div className={`space-y-1 ${containerClassName}`}>
      <label
        className={`!text-[16px] !leading-[22px] text-gray-700 ${labelClassName}`}>
        {label}
      </label>
      <div className="w-full">
        <input
          type="date"
          className={`w-full h-[48px] rounded-[5px] border py-2.5 px-4 outline-none
            transition-colors focus:border-primary bg-gray-50/50 focus:transition-all duration-300 
            ${errorMessage ? "border-red-500" : "border-gray-300"}
            ${inputClassName}`}
          name={name}
          value={value ? new Date(value).toISOString().split("T")[0] : ""}
          onChange={onChange}
          placeholder={placeholder}
          disabled={disabled}
          min={today} // Restrict previous dates
        />
        {errorMessage && (
          <p className="text-red-500 text-sm mt-1">{errorMessage}</p>
        )}
      </div>
    </div>
  );
};

export default DateInput;
