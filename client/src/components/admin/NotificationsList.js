import React from "react";
import {
  FaCalendarPlus,
  FaTicketAlt,
  FaRegBell,
} from "react-icons/fa";
import { PiCalendarCheckLight, PiUserLight } from "react-icons/pi";

const NotifyCard = ({ type, message, time, isRead }) => {
  // Determine icon and color based on notification type
  let icon;
  let iconColor = "";

  switch (type) {
    case "registration":
      icon = <PiUserLight className="text-primary text-[28px]" />;
      iconColor = "bg-primary100/50";
      break;
    case "event-created":
      icon = <PiCalendarCheckLight className="text-primary text-[28px]" />;
      iconColor = "bg-primary100/50";
      break;
    case "ticket-sold":
      icon = <FaTicketAlt className="text-primary text-[28px]" />;
      iconColor = "bg-primary100/50";
      break;
    default:
      icon = <FaRegBell className="text-primary text-[28px]" />;
      iconColor = "bg-primary100/50";
  }

  return (
    <div className={`flex items-center gap-3 rounded-lg ${!isRead ? "" : ""}`}>
      <div className={`p-2 rounded-[10px] ${iconColor}`}>{icon}</div>
      <div className="flex-1 min-w-0">
        <p className="text-sm text-baseBlack font-medium overflow-hidden text-ellipsis whitespace-nowrap max-w-md">
          {message}
        </p>
        <p className="text-[10px] text-neutrals600">{time}</p>
      </div>
    </div>
  );
};

const NotificationsList = () => {
  const notifications = [
    {
      id: 1,
      type: "registration",
      message: "New user Registered",
      time: "12 hours ago",
      isRead: false,
    },
    {
      id: 2,
      type: "event-created",
      message: "New event successfully created",
      time: "12 hours ago",
      isRead: false,
    },
    {
      id: 3,
      type: "event-created",
      message: "New event successfully created",
      time: "12 hours ago",
      isRead: true,
    },
    {
      id: 5,
      type: "ticket-sold",
      message: "Basketball VIP(2) tickets sold to customer",
      time: "12 hours ago",
      isRead: false,
    },
  ];

  return (
    <div className="w-full space-y-3">
      <p className="text-xl">Notifications</p>

      <div className="space-y-2">
        {notifications.map((notification) => (
          <NotifyCard
            key={notification.id}
            type={notification.type}
            message={notification.message}
            time={notification.time}
            isRead={notification.isRead}
          />
        ))}
      </div>
    </div>
  );
};

export default NotificationsList;
