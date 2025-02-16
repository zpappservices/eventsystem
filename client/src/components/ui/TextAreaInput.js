import React, { useRef, useEffect } from "react";

const TextAreaInput = ({
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
  const textAreaRef = useRef(null);

  useEffect(() => {
    if (textAreaRef.current) {
      textAreaRef.current.style.height = "auto";
      textAreaRef.current.style.height = `${textAreaRef.current.scrollHeight}px`;
    }
  }, [value]);

  return (
    <div className={`relative ${container}`}>
      <p className="absolute z-10 -top-2 bg-white px-1 left-3 text-[14px] leading-[16px] text-neutrals700">
        {label}
      </p>
      {unitType}
      <textarea
        ref={textAreaRef}
        name={name}
        value={value}
        placeholder={placeholder}
        onChange={onChange}
        disabled={disabled}
        rows={1}
        className={`w-full border outline-none p-4 py-3.5 disabled:bg-inherit rounded-[4px] text-[14px] placeholder:text-[14px] placeholder:text-neutrals500 text-baseBlack resize-none overflow-hidden ${inputClass}`}
      />
      <p className="text-red-500 absolute text-[12px] left-1 -bottom-5">
        {error}
      </p>
    </div>
  );
};

export default TextAreaInput;
