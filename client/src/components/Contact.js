import { Checkbox, TextField } from "@mui/material";
import { useState } from "react";

const Contact = ({ form, setForm, errors }) => {
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prevData) => ({
      ...prevData,
      [name]: value,
    }));

  };

  const handleCheckboxChange = (e) => {
    setIsBuyingForSomeone(e.target.checked);
  };
  return (
    <form className="w-full flex flex-col gap-6">
      <div className="flex items-center gap-5 justify-between">
        <TextField
          label="First Name"
          name="firstName"
          value={form.firstName}
          error={!!errors?.firstName}
          helperText={errors.firstName}
          onChange={handleChange}
          variant="outlined"
          className="w-full focus:outline-[#FF7F50] border-[#FF7F50] ring-[#FF7F50]"
          sx={{
            "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline":
              {
                borderColor: "#FF7F50", // Outline color when focused
              },
            "& .MuiInputLabel-root.Mui-focused": {
              color: "#FF7F50", // Label color when focused
            },
          }}
        />
        <TextField
          label="Last Name"
          name="lastName"
          value={form.lastName}
          error={!!errors?.lastName}
          helperText={errors.lastName}
          onChange={handleChange}
          variant="outlined"
          className="w-full focus:outline-[#FF7F50] border-[#FF7F50] ring-[#FF7F50]"
          sx={{
            "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline":
              {
                borderColor: "#FF7F50", // Outline color when focused
              },
            "& .MuiInputLabel-root.Mui-focused": {
              color: "#FF7F50", // Label color when focused
            },
          }}
        />
      </div>
      <TextField
        label="Email"
        name="email"
        value={form.email}
        error={!!errors?.email}
        helperText={errors.email}
        onChange={handleChange}
        variant="outlined"
        className="focus:outline-[#FF7F50] border-[#FF7F50] ring-[#FF7F50]"
        sx={{
          "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline":
            {
              borderColor: "#FF7F50", // Outline color when focused
            },
          "& .MuiInputLabel-root.Mui-focused": {
            color: "#FF7F50", // Label color when focused
          },
        }}
      />
    </form>
  );
};

export default Contact;
