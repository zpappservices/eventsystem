import { formatDate } from "@/utils/time";
import React from "react";
import StyledImage from "../StyledImage";
import Button from "../widgets/Button";
import { useRouter } from "next/router";

const EventCard = ({ data }) => {
  const router = useRouter();
  return (
    <div className="w-full max-w-[297px] hover:scale-[1.02] duration-300 cursor-pointer p-5 border border-baseBlack shadow-[0_10px_15px_-3px_rgba(0,0,0,0.1)] rounded-[10px] overflow-hidden">
      <div className="h-[164px] relative">
        <StyledImage
          src={
            data?.image_banner || "https://via.placeholder.com/300x200?text="
          }
          className="w-full h-full object-cover"
        />

        <p className="absolute top-0 left-0 p-1 bg-sec w-fit rounded-br-[8px] text-[10px] font-medium px-1.5 text-baseBlack">
          {data?.category}
        </p>
      </div>

      <div className="py-2 space-y-2.5">
        <p className="text-[14px] capitalize sm:text-[16px] text-baseBlack font-semibold overflow-hidden text-ellipsis whitespace-nowrap">
          {data?.title}
        </p>
        <div className="flex items-center gap-2">
          <p className="text-[12px] border-r border-baseBlack pr-2 font-medium text-baseBlack overflow-hidden text-ellipsis whitespace-nowrap">
            <span className="mr-0.5">🗓️</span>
            {formatDate(data?.StartDate)}
          </p>
          <p className="text-[12px] capitalize font-medium text-baseBlack overflow-hidden text-ellipsis whitespace-nowrap">
            {data?.location}
          </p>
        </div>

        <Button
          style="!font-normal w-full"
          onClick={() => router.push(`/events/${data?.id}`)}>
          Get Ticket
        </Button>
      </div>
    </div>
  );
};

export default EventCard;
