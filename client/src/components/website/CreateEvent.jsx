import React from "react";
import StyledImage from "../StyledImage";
import Button from "../widgets/Button";

const CreateEvent = () => {
  return (
    <div className="bg-baseBlack py-[35px] px-3.5 flex flex-col md:flex-row items-center justify-center gap-10">
      <div className="w-full max-w-[450px] sm:max-w-[500px] relative">
        <StyledImage
          src="/img/create-event.svg"
          className="w-full h-[150px] opacity-0"
        />
        <div className="!absolute md:w-[400px] lg:w-[495px] -top-[100px] left-0">
          <StyledImage src="/img/create-event.svg" className="w-full h-full" />
        </div>
      </div>

      <div className="w-full max-w-[612px] space-y-2.5 sm:space-y-5 mt-0 sm:mt-7 md:mt-0">
        <p className="text-[24px] leading-[28px] sm:text-[40px] sm:leading-[48px] text-white font-bold">
          Create an event with <span className="text-sec">Zarafiplus</span>
        </p>
        <p className="text-[16px] sm:text-[20px] text-white leading-[24px]">
          Got a show, event, activity or a great experience? Partner with us &
          get listed on Zarafiplus
        </p>

        <Button style="!px-10">Create Event</Button>
      </div>
    </div>
  );
};

export default CreateEvent;
