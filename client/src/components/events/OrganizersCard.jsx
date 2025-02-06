import React from "react";
import StyledImage from "../StyledImage";
import { FaInstagram, FaRegCheckCircle, FaWhatsapp } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { BsFillCalendar2CheckFill } from "react-icons/bs";
import Button from "../widgets/Button";

const OrganizersCard = ({ data }) => {
  return (
    <div className="w-full flex flex-col items-center gap-3 p-4">
      <div className="w-[142px] h-[142px]">
        <StyledImage src={data.profileImage} />
      </div>
      <div>
        <p className="text-[18px] sm:text-[20px] font-bold">{data.name}</p>
        <div className="flex gap-5 items-center justify-center">
          <a
            href={data.socialLinks.whatsapp}
            target="_blank"
            rel="noopener noreferrer">
            <FaWhatsapp className="text-white bg-success500 text-[28px] p-1 cursor-pointer rounded-sm" />
          </a>
          <a
            href={data.socialLinks.twitter}
            target="_blank"
            rel="noopener noreferrer">
            <FaXTwitter className="text-white bg-baseBlack text-[28px] p-1 cursor-pointer rounded-sm" />
          </a>
          <a
            href={data.socialLinks.instagram}
            target="_blank"
            rel="noopener noreferrer">
            <FaInstagram className="text-white text-[28px] p-1 cursor-pointer rounded-sm bg-gradient-to-r from-[#FF442C] to-[#FF1ED2]" />
          </a>
        </div>
      </div>

      <div className="space-y-3">
        <div className="flex items-center gap-2.5">
          <BsFillCalendar2CheckFill className="text-[24px] text-primary" />
          <p className="text-[18px] text-baseBlack sm:leading-[24px]">
            {data.stats.eventsHosted} Events
          </p>
        </div>
        <div className="flex items-center gap-2.5">
          <FaRegCheckCircle className="text-[24px] text-primary" />
          <p className="text-[18px] text-baseBlack sm:leading-[24px]">
            {data.stats.ticketsSold} Tickets sold
          </p>
        </div>
      </div>

      <Button
        background="bg-sec"
        hover="hover:bg-sec/90"
        text="text-baseBlack"
        style="w-full max-w-[182px] mx-auto">
        View Profile
      </Button>
    </div>
  );
};

export default OrganizersCard;
