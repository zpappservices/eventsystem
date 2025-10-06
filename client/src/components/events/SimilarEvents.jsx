import React, { useEffect, useState } from "react";
import StyledImage from "../StyledImage";
import Button from "../widgets/Button";
import { getEventsByCategory } from "@/apis/eventsServices";
import useLoading from "@/hooks/useLoading";
import EventCard from "./EventCard";

const SimilarEvents = ({ id }) => {
  const [events, setEvents] = useState();
  const { isLoading, startLoading, stopLoading } = useLoading(true);

  const fetchEvent = async () => {
    const { message, success, data } = await getEventsByCategory(
      id,
      startLoading,
      stopLoading
    );

    if (success) {
      setEvents(data);
    }
  };
  useEffect(() => {
    if (id) {
      fetchEvent();
    }
  }, [id]);

  return (
    <div className="space-y-3 !mt-10">
      <p className="text-base sm:text-xl font-bold"> Similar Events</p>

      {events?.length > 0 ? (
        <div className="w-full flex items-center gap-5 overflow-x-auto py-4">
          {events?.map((item) => (
            <EventCard data={item} key={item?.id} container="shrink-0" />
          ))}
        </div>
      ) : (
        <div className="w-full flex-1 flex items-center justify-center h-[200px] pt-4">
          <p className="text-center mx-auto text-neutrals500">
            No events available
          </p>
        </div>
      )}
    </div>
  );
};

export default SimilarEvents;
