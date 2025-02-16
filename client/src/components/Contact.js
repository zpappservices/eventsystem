import { Checkbox, TextField } from "@mui/material";
import { useState } from "react";
import TextInput from "./ui/TextInput";

const Contact = ({ form, setForm, errors }) => {
  const handleInput = (e) => {
    const { name, value } = e.target;

    if (name === "phone") {
      const numericValue = value.replace(/\D/g, "");

      const maxDigits = 11;
      const truncatedValue = numericValue.slice(0, maxDigits);

      setForm((prevData) => ({
        ...prevData,
        [name]: truncatedValue,
      }));
    } else {
      setForm((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  const handleCheckboxChange = (e) => {
    setIsBuyingForSomeone(e.target.checked);
  };
  return (
    <form className="w-full flex flex-col gap-6">
      <div className="flex items-center gap-5 justify-between">
        <TextInput
          container="flex-1"
          name="firstName"
          value={form?.firstName}
          label="First Name"
          placeholder="First name"
          onChange={handleInput}
        />

        <TextInput
          container="flex-1"
          name="lastName"
          value={form?.lastName}
          label="Last Name"
          placeholder="Last name"
          onChange={handleInput}
        />
      </div>
      <TextInput
        container="flex-1"
        name="phone"
        value={form?.phone}
        label="Phone Number"
        placeholder="Phone Number"
        onChange={handleInput}
      />

      <TextInput
        container="flex-1"
        name="email"
        value={form?.email}
        label="Email"
        placeholder="Email"
        onChange={handleInput}
      />
    </form>
  );
};

export default Contact;
