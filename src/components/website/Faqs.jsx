import React from "react";

const Faqs = () => {
  return (
    <div className="flex flex-col justify-center items-center w-full gap-[43px]  shadow-[4px_4px_30px_1px_rgba(0,0,0,0.25)] rounded-[10px] py-[60px] ">
      <div className="flex flex-col gap-5">
        <h3 className="text-center text-[48px] font-bold leading-[120%]">
          Frequently asked questions
        </h3>
        <p className="text-center font-normal text-[20px] leading-[1.2]">
          Answer to frequently asked questions.
        </p>
      </div>

      <div className="flex justify-center items-start py-5 gap-10">
        <div className="flex flex-col justify-center">
          <div className="flex flex-row w-[290px] items-center gap-3 px-3 self-stretch hover:bg-[#A9B7B0] rounded-[10px] ">
            <span className="w-4 h-[2px] bg-[#068A4F]"></span>
            <p className="flex h-10 justify-center items-center py-[12px] px-[10px] text-[#586A61]">
              General
            </p>
          </div>
          <p>adddd</p>
          <p>adddd</p>
          <p>adddd</p>
        </div>

        <div className="w-[1px] h-[521px] bg-[#C5CEC9]"></div>
      </div>
    </div>
  );
};

export default Faqs;
