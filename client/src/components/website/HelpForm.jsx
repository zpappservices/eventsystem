import React from "react";
import Button from "../widgets/Button";
import TextAreaInput from "../ui/TextAreaInput";
import TextInput from "../ui/TextInput";

const HelpForm = () => {
  const [form, setForm] = React.useState({
    fullName: "",
    email: "",
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
          Contact Help & Support team
        </p>
        <p className="text-neutrals500 text-[16px] leading-[21px]">
          If you’re experincing any issues or have feedback, kindly fill out the
          form and we’ll be in touch shortly
        </p>
      </div>

      <div className="space-y-5">
        <TextInput
          container="flex-1"
          name="fullName"
          value={form?.fullName}
          label="Full name"
          placeholder="Full name"
          onChange={handleInput}
        />

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

      <Button style="mx-auto">Get in touch</Button>
    </div>
  );
};

export default HelpForm;
