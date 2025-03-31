import React from "react";
import UpcomingEvents from "./UpcomingEvents";
import ActiveOrganizers from "./ActiveOrganizers";
import NotificationsList from "./NotificationsList";

const RightSideBar = () => {
  return (
    <div className="w-full max-w-[310px] px-5 xl:ms-auto xl:border-l border-dashed mt-10 min-h-[95.5vh] flex flex-wrap gap-5">
      <NotificationsList />

      <UpcomingEvents />

      <ActiveOrganizers />
    </div>
  );
};

export default RightSideBar;
