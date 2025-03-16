import React, { useState } from "react";

const TextInput = ({
  name = "",
  value,
  onChange,
  label = "",
  placeholder = "",
  container = "",
  unitType,
  inputClass,
  disabled,
  error,
}) => {
  const [isFocused, setIsFocused] = useState(false);

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    if (!value) {
      setIsFocused(false);
    }
  };

  return (
    <div className={`relative ${container}`}>
      <label
        className={`absolute z-10 transition-all duration-200 ${
          isFocused || value
            ? "-top-2 bg-white px-1 left-3 text-[14px] leading-[16px] text-neutrals700"
            : "top-4 left-4 text-[14px] leading-[16px] text-neutrals500"
        }`} onClick={handleFocus}>
        {label}
      </label>
      {unitType}
      <input
        name={name}
        value={value}
        onChange={onChange}
        onFocus={handleFocus}
        onBlur={handleBlur}
        disabled={disabled}
        className={`w-full border outline-none p-4 py-3.5 disabled:bg-inherit rounded-[4px] text-[14px] placeholder:text-[14px] placeholder:text-neutrals500 text-baseBlack ${inputClass}`}
      />
      <p className="text-red-500 absolute text-[12px] left-1 -bottom-4">
        {error}
      </p>
    </div>
  );
};

export default TextInput;
