import React, { useEffect, useState } from "react";
import useApiRequest from "@/hooks/useApiRequest";
import UpcomingEventCard from "../events/UpcomingEventCard";
import UpcomingEventCardSkeleton from "../events/UpcomingEventSkeleton";
import Button from "../widgets/Button";

const UpcomingEventsList = () => {
  const { data, error, loading, request } = useApiRequest({
    method: "get",
    url: "event/getallevent",
  });

  const [displayedEvents, setDisplayedEvents] = useState([]);
  const [visibleCount, setVisibleCount] = useState(3);

  const getAllEvents = async () => {
    await request();
  };

  useEffect(() => {
    getAllEvents();
  }, []);

  useEffect(() => {
    if (data?.data) {
      const filteredEvents = data.data.filter(
        (item) => new Date() < new Date(item?.EndDate) && item?.active
      );
      setDisplayedEvents(filteredEvents.slice(0, visibleCount));
    }
  }, [data, visibleCount]);

  const loadMore = () => {
    setVisibleCount((prevCount) => prevCount + 3); 
  };

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
      <div className="w-full max-w-[722px] text-center">Couldn't load data</div>
    );
  }

  return (
    <div className="w-full max-w-[722px] space-y-10">
      <div className="w-full flex flex-col gap-[32px]">
        {displayedEvents?.length > 0 &&
          displayedEvents?.map((item) => (
            <UpcomingEventCard data={item} key={item?.id} />
          ))}
      </div>

      {displayedEvents?.length < data?.data?.length && (
        <Button style="mx-auto !px-5 !font-normal" onClick={loadMore}>
          Load more...
        </Button>
      )}
    </div>
  );
};

export default UpcomingEventsList;
