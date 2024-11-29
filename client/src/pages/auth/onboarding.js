import Onboarding from "@/components/auth/Onboarding";
import React from "react";

const onboarding = () => {
  return (
    <div className="w-full flex flex-col gap-10 py-20">

      <div className="max-w-[370px] mx-auto text-black">
        <p className="text-center text-[22px] font-medium leading-[30px]">Let’s create something spectacular</p>
        <p className="text-center text-[22px] font-medium leading-[30px]">Start your event journey today!</p>
      </div>

      <Onboarding />
    </div>
  );
};

export default onboarding;
