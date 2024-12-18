import React from "react";
import TextField from "@mui/material/TextField";

const StyledTextField = ({
  label,
  id,
  type = "text",
  name,
  value,
  onChange,
  required = false,
  error = false,
  helperText = "",
  color = "primary",
  ...props
}) => {
  return (
    <div>
      <label className="text-[14px] text-gray-500">{label}</label>
      <TextField
        id={id}
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        required={required}
        error={error}
        helperText={helperText}
        color={color}
        className="bg-gray-50/70 rounded-[10px]"
        {...props}
      />
    </div>
  );
};

export default StyledTextField;
