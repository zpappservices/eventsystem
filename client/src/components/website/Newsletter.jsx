import React, { useState } from "react";
import useLoading from "@/hooks/useLoading";
import TextField from "../widgets/TextField";
import Button from "../widgets/Button";

const Newsletter = () => {
  const [email, setEmail] = useState("");

  const { isLoading, startLoading, stopLoading } = useLoading();

  const handleInputChange = (e) => {
    setEmail(e.target.value);
  };

  const handleSubmit = async () => {
    const payload = {
      email,
    };
    /* const { message, success, data, error } = await subscribeToNewsletter(
      payload,
      startLoading,
      stopLoading
    );

    if (success) {
      Toast.success(message);
    }

    if (error) {
      Toast.error(message);
    } */
  };

  return (
    <div className="w-full rounded-[10px] space-y-3">
      <p className="text-white text-sm sm:text-base font-medium leading-normal">
        Subscribe to our newsletter
      </p>

      <div className="relative w-full">
        <div className="w-full bg-white flex gap-2.5 justify-between px-[8px] py-[5px] items-center rounded-[8px] relative">
          <TextField
            name="email"
            value={email}
            onChange={handleInputChange}
            placeholder="Enter your email address"
            style="w-full shrink border-none placeholder:text-[16px] text-[16px] px-1 !py-1 my-1 !h-fit mb-1.5"
            container="w-full max-w-[365px] shrink"
          />
          <Button
            disabled={!email}
            style={`!rounded-[6px] !font-medium !py-3 ${
              isLoading && "!w-[121.65px]"
            }`}
            isLoading={isLoading}
            onClick={handleSubmit}
            background="bg-accent"
            hover="hover:bg-accent/90"
          >
            Subscribe
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Newsletter;
