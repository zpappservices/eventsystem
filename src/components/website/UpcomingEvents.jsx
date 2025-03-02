import React from "react";
import UpcomingEventsList from "./UpcomingEventsList";
import ProductAds from "./ProductAds";

const UpcomingEvents = () => {
  return (
    <div className="w-full max-w-[1323px] px-5 mx-auto">
      <div className="py-3 flex items-center gap-3 justify-between">
        <p className="text-[20px] leading-normal  font-bold">Upcoming Events</p>
      </div>

      <div className="w-full flex flex-col lg:flex-row gap-10 xl:gap-[140px]">
        <UpcomingEventsList />

        <ProductAds />
      </div>
    </div>
  );
};

export default UpcomingEvents;
