import React, { useState } from "react";
import General from "./General";
import BuyingTickets from "./BuyingTickets";
import EventInformation from "./EventInformation";
import RefundsCancellation from "./RefundsCancellation";
import SellingTickets from "./SellingTickets";
import TechnicalAccountSupport from "./TechnicalAccountSupport";

const Faqs = () => {
  const [isSelected, setIsSelected] = useState("General");

  const components = [
    "General",
    "Buying Tickets",
    "Event Information",
    "Refunds & Cancellation",
    "Selling Tickets",
    "Technical & Account support",
  ];

  return (
    <div className="w-full max-w-[1319px] h-[831px] flex flex-col justify-center items-center gap-[43px] shadow-[4px_4px_50px_3px_rgba(123,123,123,0.25)] rounded-[10px] px-[120px]">
      {/* Title & Subtitle */}
      <div className="flex flex-col gap-5 max-w-[651px] justify-center items-center">
        <h3 className="text-center xl:text-[48px] lg:text-[40px] md:text-[32px] text-[24px] font-bold leading-[120%] text-black">
          Frequently Asked Questions
        </h3>
        <p className="text-center font-normal lg:text-[20px] text-[13px] leading-[1.2] text-black">
          Answers to frequently asked questions.
        </p>
      </div>

      {/* Tabs & Content */}
      <div className="flex justify-center items-start lg:gap-10 gap-4 py-5">
        {/* Tabs */}
        <div className="flex flex-col items-start">
          {components.map((item) => (
            <div
              key={item}
              className={`flex items-center gap-3 px-3 py-[12px] cursor-pointer self-stretch rounded-[10px] ${
                isSelected === item ? "" : "hover:bg-[#A9B7B0]"
              }`}
              onClick={() => setIsSelected(item)}
              aria-selected={isSelected === item}
            >
              <span
                className={`sm:w-4 w-3 h-[2px] ${
                  isSelected === item ? "bg-[#068A4F]" : "bg-transparent"
                }`}
              ></span>
              <p
                className={`${
                  isSelected === item ? "text-[#068A4F]" : "text-[#586A61]"
                } sm:text-[16px] text-[14px] leading-[120%]`}
              >
                {item}
              </p>
            </div>
          ))}
        </div>

        {/* Vertical Divider */}
        <div className="w-[1px] h-[521px] bg-[#C5CEC9]"></div>

        {/* Content Display */}
        <div className="flex-1 text-black text-lg">
          {isSelected === "General" && <General />}
          {isSelected === "Buying Tickets" && <BuyingTickets />}
          {isSelected === "Event Information" && <EventInformation />}
          {isSelected === "Refunds & Cancellation" && <RefundsCancellation />}
          {isSelected === "Selling Tickets" && <SellingTickets />}
          {isSelected === "Technical & Account support" && <TechnicalAccountSupport />}
        </div>
      </div>
    </div>
  );
};

export default Faqs;
