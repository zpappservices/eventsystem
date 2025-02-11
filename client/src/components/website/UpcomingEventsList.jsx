import React, { useEffect } from "react";
import useApiRequest from "@/hooks/useApiRequest";
import UpcomingEventCard from "../events/UpcomingEventCard";
import UpcomingEventCardSkeleton from "../events/UpcomingEventSkeleton";
import Button from "../widgets/Button";

const UpcomingEventsList = () => {
  const { data, error, loading, request } = useApiRequest({
    method: "get",
    url: "event/getallevent",
  });

  const getAllEvents = async () => {
    await request();
  };

  useEffect(() => {
    getAllEvents();
  }, []);

  if (loading) {
    return (
      <div className="w-full max-w-[722px] flex flex-col gap-[32px]">
        {["", "", "", "", "", "", ""]?.map((_, index) => (
          <UpcomingEventCardSkeleton key={index} />
        ))}
      </div>
    );
  }

  if (error || data?.length < 1) {
    return (
      <div className="w-full max-w-[722px] text-center">
        Couldn't load data
      </div>
    );
  }
  const events = data?.data;
  return (
    <div className="w-full max-w-[722px] space-y-10">
      <div className="w-full flex flex-col gap-[32px]">
        {events?.length > 0 &&
          events
            .filter(
              (item) => new Date() < new Date(item?.EndDate) && item?.active
            )
            .map((item) => <UpcomingEventCard data={item} key={item?.id} />)}
      </div>

      <Button style="mx-auto !px-5 !font-normal">Load more...</Button>
    </div>
  );
};

export default UpcomingEventsList;
