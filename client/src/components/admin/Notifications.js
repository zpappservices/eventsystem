import React from "react";
import { IoNotifications } from "react-icons/io5";

const Notifications = () => {
  return (
    <div className="relative">
      <IoNotifications className="text-[26px] text-primary" />
      <div className="rounded-full bg-accent text-white w-4 h-4 flex items-center justify-center text-[10px] absolute -top-1 -right-0.5">
        4
      </div>
    </div>
  );
};

export default Notifications;
