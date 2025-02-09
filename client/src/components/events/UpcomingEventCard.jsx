import React, { useEffect, useState } from "react";
import { TfiLocationPin } from "react-icons/tfi";
import Button from "../widgets/Button";
import moment from "moment";
import { RiSendPlaneFill } from "react-icons/ri";
import DynamicModal from "../widgets/DynamicModal";
import { useModal } from "@/hooks/useModal";
import Share from "../website/Share";
import { useRouter } from "next/router";

const UpcomingEventCard = ({ data }) => {
  const [date, setDate] = useState(null);

  const { openModal, closeModal, isOpen } = useModal();
  const router = useRouter();

  const getMonthAndDay = (date) => {
    if (!date || !moment(date, moment.ISO_8601, true).isValid()) {
      return { month: "Invalid", day: "date" };
    }

    return {
      month: moment(date).format("MMM"),
      day: moment(date).format("D"),
    };
  };

  useEffect(() => {
    setDate(getMonthAndDay(data?.StartDate));
  }, [data]);

  const getEventUrl = (id) => `https://ticket.zafariplus.com/events/${id}`;

  const eventUrl = getEventUrl(data?.id);

  return (
    <div className="flex gap-5 md:gap-[38px]">
      <div className="py-3 px-5 flex flex-col justify-center rounded-[10px] bg-baseBlack">
        <p className="text-[14px] sm:text-[16px] leading-normal text-primary font-bold text-center">
          {date?.month}
        </p>
        <p className="text-[14px] sm:text-[20px] leading-normal text-white font-bold text-center">
          {date?.day}
        </p>
      </div>

      <div className="py-3 px-5 rounded-[10px] bg-baseBlack flex-1 flex flex-col sm:flex-row gap-5 justify-between sm:items-center">
        <div>
          <p className="text-[14px] capitalize sm:text-[16px] leading-normal text-white font-bold">
            {data?.title}

            <RiSendPlaneFill
              onClick={openModal}
              className="bg-primary text-white p-0.5 cursor-pointer inline-block ms-2.5 text-[22px] rounded-[5px]"
            />
          </p>
          <div className="flex items-center gap-1">
            <TfiLocationPin className="text-white text-[14px] sm:text-[16px] -ms-0.5" />
            <p className="text-[14px] capitalize sm:text-[16px] leading-normal text-white font-medium">
              {data?.location}
            </p>
          </div>

          {/* <p className="text-[14px] sm:text-[16px] leading-normal text-white">
            ${data?.price}
          </p> */}
        </div>

        <div className="w-full sm:w-auto space-y-1">
          <Button
            size="small"
            style="w-full py-2 px-5 flex-1 !font-normal"
            background="!bg-inherit"
            hover="hover:!bg-primary"
            border="border-1 border-primary"
            outline={true}
            onClick={() => router.push(`/events/${data?.id}`)}>
            View details
          </Button>
          <Button
            size="small"
            style="w-full py-2 px-5 flex-1 !font-normal"
            onClick={() => router.push(`/events/${data?.id}`)}>
            Book Now
          </Button>
        </div>
      </div>

      <DynamicModal open={isOpen} onClose={closeModal}>
        <Share
          url={eventUrl}
          text={data?.description}
          closeModal={closeModal}
        />
      </DynamicModal>
    </div>
  );
};

export default UpcomingEventCard;
