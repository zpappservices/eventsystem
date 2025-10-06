import { getVendorEvents } from "@/apis/eventsServices";
import useAuthToken from "@/hooks/useAuthToken";
import { useEffect, useState } from "react";
import { FaCalendarAlt } from "react-icons/fa";
import { LiaExclamationCircleSolid } from "react-icons/lia";

export default function WeeklyStats() {
  const [data, setData] = useState();

  const { activeUser, startLoading, stopLoading } = useAuthToken();

  const getEvents = async () => {
    const { success, data, error } = await getVendorEvents(
      activeUser,
      startLoading,
      stopLoading
    );

    if (success) {
      setData(data);
    } else {
      toast.error("Something went wrong");
    }
  };

  useEffect(() => {
    getEvents();
  }, []);

  const events = data;

  const totalPublished = events?.filter((e) => e?.isPublished)?.length;
  const totalSoldTickets = events?.reduce(
    (acc, e) => acc + e?.EventTicket?.reduce((t, ticket) => t + ticket?.sold, 0),
    0
  );
  const activeEvents = events?.filter((e) => e?.active).length;

  const stats = [
    {
      label: "Total Event Published",
      value: totalPublished?.toString(),
      change: "+0%",
    },
    {
      label: "Total Sold Tickets",
      value: totalSoldTickets?.toString(),
      change: "+0%",
    },
    { label: "Active Events", value: activeEvents?.toString(), change: "+0%" },
  ];

  return (
    <div className="w-full flex flex-col md:flex-row items-center justify-between gap-6 p-5">
      {/* <div className="flex items-center gap-3 min-w-[150px]">
        <FaCalendarAlt className="text-primary text-xl" />
        <span className="text-lg font-medium text-primary">This Week</span>
      </div>

      <div className="hidden md:block w-px bg-black h-20" /> */}

      <div className="flex-1 grid lg:grid-cols-2 xl:grid-cols-3 gap-10 items-center justify-around w-full">
        {stats.map((item, index) => {
          const isBorder = index < 2;
          return (
            <div
              key={index}
              className={`${isBorder ? "2xl:border-r border-black" : ""}`}
            >
              <div className="w-full max-w-[242px] mx-auto flex flex-col items-center md:items-start gap-2.5 text-center md:text-left">
                <div className="w-full flex items-center gap-2 text-neutrals600 text-sm font-medium">
                  <span className="text-sm">{item.label}</span>
                  <LiaExclamationCircleSolid className="text-neutrals400 ms-auto text-lg" />
                </div>
                <div className="w-full flex gap-5 items-center">
                  <p className="text-2xl font-semibold text-black">
                    {item.value || 0}
                  </p>
                  <div className="text-right ms-auto">
                    <span className="text-xs text-primary bg-primary100 px-2 py-0.5 rounded-md">
                      ↑ {item.change}
                    </span>

                    <p className="text-right text-xs text-neutrals500">
                      from last week
                    </p>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
