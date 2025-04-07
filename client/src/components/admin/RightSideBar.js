import React from "react";
import UpcomingEvents from "./UpcomingEvents";
import ActiveOrganizers from "./ActiveOrganizers";
import NotificationsList from "./NotificationsList";
import { IoCloseOutline } from "react-icons/io5";

const RightSideBar = ({ toggleRightSidebar }) => {
  return (
    <>
      <div
        className="fixed top-0 right-0 z-30 w-full h-full bg-black/10 backdrop-blur-sm md:hidden"
        onClick={toggleRightSidebar}
      />
      <div className="fixed top-24 right-0 z-40 w-[310px] h-[calc(100vh-64px)] bg-white border-l border-dashed px-5 overflow-hidden animate-slideInRight shadow-lg">
        <div className="flex justify-between items-center pt-3 pb-1">
          <h3 className="font-semibold text-xl">Notifications</h3>
          <button onClick={toggleRightSidebar} className="p-1 rounded-full hover:bg-neutrals100">
            <IoCloseOutline size={24} />
          </button>
        </div>
        <div className="h-[calc(100%-40px)] overflow-y-scroll pr-2 space-y-5 py-2 hide-scrollbar">
          <NotificationsList />

          <UpcomingEvents />

          <ActiveOrganizers />
        </div>
      </div>
    </>
  );
};

export default RightSideBar;
