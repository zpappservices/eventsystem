import React from "react";
import { FaUser } from "react-icons/fa";
import Button from "../widgets/Button";
import { FaAddressCard } from "react-icons/fa6";
import { BsCalendarCheckFill } from "react-icons/bs";

const OverviewCard = ({ icon, role, value }) => {
  return (
    <div className="w-full sm:w-[200px] max-w-[200px] px-4 py-3 shadow-md rounded-[16px]">
      <div className="flex items-center justify-between gap-5 pb-3 border-b border-neutrals300">
        {icon}{" "}
        <p className="text-baseBlack text-[28px] font-bold">
          {value.toLocaleString()}
        </p>
      </div>

      <div className="mt-3 flex items-center justify-between">
        <div>
          <p className="text-baseBlack">{role}</p>
          <p className="text-[10px] text-neutrals600 -mt-1">All time</p>
        </div>
        <Button background="bg-primary100/50" text="text-baseBlack text-xs" hover="hover:text-baseBlack">
          View all
        </Button>
      </div>
    </div>
  );
};

const Overview = () => {
  return (
    <div className="flex flex-wrap gap-7">
      <OverviewCard
        role="Users"
        value={1200}
        icon={
          <FaUser className="text-[40px] rounded-[10px] p-2 bg-primary100/50 text-primary" />
        }
      />

      <OverviewCard
        role="Organizers"
        value={200}
        icon={
          <FaAddressCard className="text-[40px] rounded-[10px] p-2 bg-primary100/50 text-primary" />
        }
      />

      <OverviewCard
        role="Events"
        value={1200}
        icon={
          <BsCalendarCheckFill className="text-[40px] rounded-[10px] p-2 bg-primary100/50 text-primary" />
        }
      />

      <OverviewCard
        role="Sold Ticket"
        value={1200}
        icon={
          <BsCalendarCheckFill className="text-[40px] rounded-[10px] p-2 bg-primary100/50 text-primary" />
        }
      />
    </div>
  );
};

export default Overview;
