import React, { useState, useRef } from "react";

const OtpForm = ({ onOtpChange, error }) => {
   const [otpDigits, setOtpDigits] = useState(["", "", "", "", "", ""]);
   const [isError, setIsError] = useState(error);
   const inputRefs = useRef([]);

   const handleOtpChange = (index, value) => {
      const updatedOtpDigits = [...otpDigits];
      updatedOtpDigits[index] = value;
      setOtpDigits(updatedOtpDigits);

      if (value) {
         const nextIndex = Math.min(index + 1, otpDigits.length - 1);
         setTimeout(() => {
            inputRefs.current[nextIndex].focus();
         }, 0);
      }

      const formattedOtp = updatedOtpDigits.join("");
      onOtpChange(formattedOtp);

      if (updatedOtpDigits.every((digit) => digit === "")) {
         setIsError("");
      }
   };

   const handleKeyDown = (e, index) => {
      if (e.key === "Backspace") {
         if (!otpDigits[index]) {
            e.preventDefault();
            const prevIndex = Math.max(index - 1, 0);
            setTimeout(() => {
               inputRefs.current[prevIndex].focus();
            }, 0);
         }
      }
   };

   const handleBlur = (index) => {
      if (!otpDigits[index]) {
         const prevIndex = Math.max(index - 1, 0);
         setTimeout(() => {
            inputRefs.current[prevIndex].focus();
         }, 0);
      }
   };

   return (
      <div className="flex max-w-[397px] gap-[13.6px] mt-[35px] mb-2.5">
         {otpDigits.map((digit, index) => (
            <input
               key={index}
               type="text"
               maxLength="1"
               value={digit}
               onChange={(e) => handleOtpChange(index, e.target.value)}
               onKeyDown={(e) => handleKeyDown(e, index)}
               onBlur={() => handleBlur(index)}
               placeholder="_"
               ref={(el) => (inputRefs.current[index] = el)}
               className={`w-full max-w-[55.999px] h-[55.999px] ${
                  isError
                     ? "border-error"
                     : digit
                     ? "border-primary"
                     : "border-outlineGrey"
               } bg-[#F7F7F7] rounded-[3px] border-[1.5px] transition-all duration-300 text-center outline-none placeholder:text-primary text-primary text-[18px] font-bold placeholder:text-[18px]`}
            />
         ))}
      </div>
   );
};

export default OtpForm;
