import React from "react";
import QRCode from "react-qr-code";
import StyledImage from "../StyledImage";
import { convertTo12HourFormat, formatDate } from "@/utils/time";

const TicketDetails = ({ data, event }) => {
    console.log(data)
    console.log(event);
  return (
    <div className="w-full max-h-[95vh] overflow-y-auto max-w-[744px] mx-auto rounded-md bg-white">
      <div className="py-[33px] px-5">
        <div className="h-[345px] max-w-[484px] mx-auto shadow-[0px_7px_13px_-3px_rgba(0,_0,_0,_0.1)] rounded-[10px] overflow-hidden">
          <StyledImage
            src={
              event?.image_banner ||
              "https://placehold.co/600x400?text=Image unavailable"
            }
            className="!h-full !w-full object-cover"
          />
        </div>
      </div>

      <div className="border-b-2 border-dashed border-baseBlack"></div>

      <div className="space-y-2.5">
        <div className="px-5 sm:px-10 py-[33px] mx-auto flex gap-10 justify-between">
          <div className="flex-1">
            <p className="text-[14px]">Location:</p>
            <p className="font-bold text-[16px]">{event?.location}</p>
          </div>
          <div className="flex-1">
            <p className="text-[14px]">Seat:</p>
            <p className="font-bold text-[16px]">N/A</p>
          </div>
        </div>
        <div className="px-5 sm:px-10 py-[33px] mx-auto flex gap-10 justify-between">
          <div className="flex-1">
            <p className="text-[14px]">Name:</p>
            <p className="font-bold text-[16px]">Ejiro Daniel</p>
          </div>
          <div className="flex-1">
            <p className="text-[14px]">Category:</p>
            <p className="font-bold text-[16px]">{data?.ticket}</p>
          </div>
        </div>
        <div className="px-5 sm:px-10 py-[33px] mx-auto flex gap-10 justify-between">
          <div className="flex-1">
            <p className="text-[14px]">Time:</p>
            <p className="font-bold text-[16px]">
              {convertTo12HourFormat(event?.StartTime)} - {""}
              {convertTo12HourFormat(event?.EndTime)}
            </p>
          </div>
          <div className="flex-1">
            <p className="text-[14px]">Date:</p>
            <p className="font-bold text-[16px]">
              {formatDate(event?.StartDate)} - {formatDate(event?.EndDate)}
            </p>
          </div>
        </div>
      </div>

      <div className="border-b-2 border-dashed border-baseBlack"></div>

      <div className="px-5 sm:px-10 py-[33px]">
        <QRCode
          title="title"
          value={data?.ticketId || "23123"}
          bgColor="#FFFFFF"
          fgColor="#000000"
          level="L"
          className="mx-auto w-full bg-white "
        />
      </div>
    </div>
  );
};

export default TicketDetails;
