import useApiRequest from "@/hooks/useApiRequest";
import { useEffect } from "react";
import Link from "next/link";
import Button from "./widgets/Button";
import EventCard from "./events/EventCard";
import EventCardSkeleton from "./events/EventCardSkeleton";

const TopEvents = ({ next, isTopEvent = true, loaderClass }) => {
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
      <div className="w-full max-w-[1323px] mx-auto px-5 grid grid-cols-1 gap-x-5 gap-y-10 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 py-6">
        {["", "", "", "", "", "", "", "", "", "", ""]?.map((item, index) => (
          <EventCardSkeleton key={index} />
        ))}
      </div>
    );
  }

  if (error || data?.length < 1) {
    return (
      <div className="max-w-[1323px] px-5 text-center mx-auto">
        Couldn't load data
      </div>
    );
  }
  const events = data?.data;
  return (
    <div className="w-full max-w-[1323px] px-5 mx-auto" id="topevents">
      <div className="py-3 flex items-center gap-3 justify-between">
        <p className="text-[20px] leading-normal  font-bold">Top Events</p>

        <Link href="/events">
          <Button
            background="bg-baseBlack"
            style="!font-normal"
            text="text-white text-[14px]"
            hover="hover:bg-baseBlack/90 hover:text-white">
            See more
          </Button>
        </Link>
      </div>
      <div className="w-full grid grid-cols-1 gap-x-5 gap-y-10 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 py-6">
        {events?.length > 0 &&
          events
            .filter(
              (item) => new Date() < new Date(item?.EndDate) && item?.active
            )
            .map((item) => <EventCard data={item} key={item?.id} />)}
      </div>
    </div>
  );
};

export default TopEvents;
