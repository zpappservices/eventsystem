import React, { useState } from "react";
import { TextField, Button, MenuItem } from "@mui/material";
import { ButtonLoading } from "../widgets/ButtonLoading";
import { useRouter } from "next/router";

const Onboarding = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    phoneNumber: "",
    address: "",
    email: "",
    eventType: "",
  });

  const router = useRouter();

  const eventTypes = [
    { value: "wedding", label: "Wedding" },
    { value: "birthday", label: "Birthday" },
    { value: "conference", label: "Conference" },
    { value: "other", label: "Other" },
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Data Submitted:", formData);
    // You can add your API request or additional logic here.

    router.push("/dashboard")
  };

  return (
    <form
      onSubmit={handleSubmit}
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "20px",
        maxWidth: "400px",
        margin: "0 auto",
      }}
      className="w-full max-w-[440px] flex flex-col gap-5"
    >
      {[
        { id: "firstName", label: "First Name", type: "text" },
        { id: "lastName", label: "Last Name", type: "text" },
        { id: "phoneNumber", label: "Phone Number (International)", type: "text" },
        { id: "address", label: "Address", type: "text" },
        { id: "email", label: "Email", type: "email" },
      ].map((field) => (
        <TextField
          key={field.id}
          id={field.id}
          label={field.label}
          variant="outlined"
          name={field.id}
          value={formData[field.id]}
          onChange={handleChange}
          required
          sx={{
            "& .MuiOutlinedInput-root": {
              "& fieldset": {
                borderColor: "#000000",
              },
              "&:hover fieldset": {
                borderColor: "#FF7F50",
              },
              "&.Mui-focused fieldset": {
                borderColor: "#FF7F50",
              },
            },
            "& .MuiInputLabel-root": {
              color: "#000000",
            },
            "& .MuiInputLabel-root.Mui-focused": {
              color: "#FF7F50",
            },
          }}
        />
      ))}
      <TextField
        id="eventType"
        select
        label="Event Type"
        variant="outlined"
        name="eventType"
        value={formData.eventType}
        onChange={handleChange}
        required
        sx={{
          "& .MuiOutlinedInput-root": {
            "& fieldset": {
              borderColor: "#000000",
            },
            "&:hover fieldset": {
              borderColor: "#FF7F50",
            },
            "&.Mui-focused fieldset": {
              borderColor: "#FF7F50",
            },
          },
          "& .MuiInputLabel-root": {
            color: "#000000",
          },
          "& .MuiInputLabel-root.Mui-focused": {
            color: "#FF7F50",
          },
        }}
      >
        {eventTypes.map((option) => (
          <MenuItem key={option.value} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </TextField>
      <ButtonLoading className="py-3.5 w-full" onClick={handleSubmit}>
        Proceed
      </ButtonLoading>
    </form>
  );
};

export default Onboarding;
