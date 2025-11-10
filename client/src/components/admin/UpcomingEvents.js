import React from "react";
import StyledImage from "../StyledImage";

const UpcomingCard = ({ data }) => {
  return (
    <div className="flex items-center gap-3 border p-2 border-neutrals100 rounded-[10px]">
      <div className="h-[50px] w-[50px] overflow-hidden rounded-[10px] shrink-0">
        <StyledImage
          src={
            data?.image_banner || "/img/event1.svg" ||
            "https://placehold.co/600x400?text=Image not available"
          }
          className="w-full h-full object-cover"
        />
      </div>
      <div className="">
        <p className="text-sm text-baseBlack font-medium overflow-hidden text-ellipsis">
          Evolution of Washington D comedian
        </p>
        <p className="text-[10px] text-neutrals600">
          March 11 Tuesday | 4pm - 6pm
        </p>
      </div>
    </div>
  );
};

const UpcomingEvents = () => {
  return (
    <div className="w-full space-y-3">
      <p className="text-xl">Upcoming Events</p>

      {["", "", ""]?.map((item, index) => (
        <UpcomingCard key={index} data={item} />
      ))}
    </div>
  );
};

export default UpcomingEvents;
