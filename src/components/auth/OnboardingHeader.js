import React from "react";
import { FaCheck } from "react-icons/fa";

const Step = ({ step, value = 0, title = "Create Your Profile" }) => {
   return (
      <div className="w-fit flex flex-col gap-1 items-center transition-all shrink-0">
         <div
            className={`h-[20px] w-[20px] sm:w-[28px] sm:h-[28px] shrink-0 border rounded-full p-0.5 md:p-[1.6px] ${
               step === value || step > value
                  ? "border-[#FF7F50]"
                  : "border-gray-600"
            }`}
         >
            <div
               className={`w-full h-full rounded-full flex items-center justify-center ${
                  step === value || step > value
                     ? "bg-[#FF7F50]"
                     : "bg-gray-400"
               }`}
            >
               <p className="text-[#fff] text-center text-[11px] font-semibold leading-[18.3px]">
                  {step > value ? <FaCheck color="white" /> : value + 1}
               </p>
            </div>
         </div>
         <p className={`text-center text-[12px] sm:text-[14px] font-semibold leading-[136%] ${
                  step === value || step > value
                     ? "text-[#FF7F50]"
                     : "text-gray-700"
               }`}>
            {title}
         </p>
      </div>
   );
};

const OnboardingHeader = ({ step = 0 }) => {
   return (
      <div className="w-full px-5 sm:px-0 sm:max-w-none mx-auto flex flex-col items-center gap-[28px]">
         <div className="flex items-start gap-12 space-x-12">
            <div className="mr-[-10px] sm:mr-[-22px]">
               <Step step={step} />
            </div>
            <div className="mx-[-16px] sm:mx-[-27px]">
               <Step step={step} value={1} title="Create settlement account" />
            </div>
         </div>
      </div>
   );
};

export default OnboardingHeader;
