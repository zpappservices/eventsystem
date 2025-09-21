import { useState } from "react";
import { PiEyeSlash, PiEye } from "react-icons/pi";
import { MdError } from "react-icons/md";

const TextField = ({
  name,
  label,
  value,
  icon,
  iconClass,
  placeholder,
  error,
  onChange,
  labelStyle,
  errorStyle,
  style,
  container,
  password = false,
  inputStyle,
  ...props
}) => {
  const [type, setType] = useState("password");

  const handleVisibility = () => {
    setType((prev) => (prev === "password" ? "text" : "password"));
  };

  const errorBorderClass = error
    ? "border-error400"
    : value
    ? "border-primary"
    : "border-neutrals300";
  const errorTextClass = error ? "text-error300" : "text-neutrals700";

  const inputClass = `!h-[48px] rounded-[8px] border border-neutral200 py-3 px-4 
      outline-none transition-colors focus:border-primary focus:transition-all duration-300 text-baseBlack
      text-[14px] sm:text-[16px] leading-[19.6px] placeholder:text-neutral600 placeholder:text-[14px]  ${style} ${errorBorderClass} ${
    password ? "pr-[50px]" : ""
  }`;

  return (
    <div className={`flex flex-col gap-1.5 relative ${container}`}>
      <label
        htmlFor={name}
        className={`text-[14px] sm:text-[16px] font-normal leading-[140%] ${
          error ? "text-error400" : "text-baseBlack"
        } ${labelStyle}`}
      >
        {label}
      </label>
      <input
        type={password ? type : "text"}
        name={name}
        id={name}
        className={inputClass}
        placeholder={placeholder}
        value={value || ""}
        onChange={onChange}
        style={inputStyle}
        {...props}
      />
      <div className="absolute right-[18.5px] top-[17px] cursor-pointer">
        {password &&
          (error ? (
            <MdError size={24} className="text-error400" />
          ) : type === "password" ? (
            <PiEyeSlash size={24} color="#5A5555" onClick={handleVisibility} />
          ) : (
            <PiEye size={24} color="#5A5555" onClick={handleVisibility} />
          ))}
      </div>
      <div className={`absolute right-[18.5px] top-3 ${iconClass}`}>
        {icon && icon}
      </div>
      <p
        className={`text-[12px] font-lato leading-[16.8px] text-error400 ${
          error ? "visible" : "hidden"
        } ${errorStyle}`}
      >
        {`${error}!` || "\u00A0"}
      </p>
    </div>
  );
};

export default TextField;
