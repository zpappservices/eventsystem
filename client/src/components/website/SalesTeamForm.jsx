import React from "react";
import TextInput from "../ui/TextInput";
import TextAreaInput from "../ui/TextAreaInput";
import Button from "../widgets/Button";

const SalesTeamForm = () => {
  const [form, setForm] = React.useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    company: "",
    position: "",
    message: "",
  });

  const handleInput = (event) => {
    const { name, value } = event.target;

    setForm({ ...form, [name]: value });
  };
  return (
    <div className="space-y-10 bg-white rounded-[20px] py-[36px] px-5 sm:px-10">
      <div>
        <p className="text-[20px] sm:text-[24px] sm:leading-[29px] text-baseBlack font-bold">
          Connect with our sales team
        </p>
        <p className="text-neutrals500 text-[16px] leading-[21px]">
          We’ll help you maximize efficiency
        </p>
      </div>

      <div className="space-y-5">
        <div className="flex flex-col sm:flex-row gap-y-5 gap-x-[44px]">
          <TextInput
            container="flex-1"
            name="firstName"
            value={form?.firstName}
            label="First name*"
            placeholder="First name"
            onChange={handleInput}
          />

          <TextInput
            container="flex-1"
            name="lastName"
            value={form?.lastName}
            label="Last name*"
            placeholder="Last name"
            onChange={handleInput}
          />
        </div>

        <div className="flex flex-col sm:flex-row gap-y-5 gap-x-[44px]">
          <TextInput
            container="flex-1"
            name="phoneNumber"
            value={form?.phoneNumber}
            label="First name*"
            placeholder="First name"
            onChange={handleInput}
          />

          <TextInput
            container="flex-1"
            name="company"
            value={form?.company}
            label="Last name*"
            placeholder="Last name"
            onChange={handleInput}
          />
        </div>

        <TextInput
          name="email"
          value={form?.email}
          label="Email*"
          placeholder="Email"
          onChange={handleInput}
        />

        <TextAreaInput
          inputClass="!h-[150px]"
          name="message"
          value={form.message}
          placeholder="How can we help?"
          onChange={handleInput}
        />
      </div>

      <Button style="mx-auto">Contact sales</Button>
    </div>
  );
};

export default SalesTeamForm;
