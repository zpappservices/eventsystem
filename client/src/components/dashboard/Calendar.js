"use client";

import { useEffect, useState } from "react";
import dayjs from "dayjs";
import Button from "../widgets/Button";
import { getVendorEvents } from "@/apis/eventsServices";
import useAuthToken from "@/hooks/useAuthToken";
import { toast } from "react-toastify";

const Calendar = () => {
  const today = dayjs();
  const startOfWeek = today.startOf("week");
  const days = Array.from({ length: 7 }).map((_, idx) =>
    startOfWeek.add(idx, "day")
  );

  const [selectedDay, setSelectedDay] = useState(today);
  const [events, setEvents] = useState([]);

  const { activeUser, startLoading, stopLoading } = useAuthToken();

  const getEvents = async () => {
    const { success, data, error } = await getVendorEvents(
      activeUser,
      startLoading,
      stopLoading
    );

    if (success) {
      setEvents(data); 
    } else {
      toast.error(error || "Something went wrong");
    }
  };

  useEffect(() => {
    getEvents();
  }, []);

  const eventsForDay = events.filter((event) =>
    dayjs(event.StartDate).isSame(selectedDay, "day")
  );

  return (
    <div className="w-full max-w-[413px] border rounded-xl p-4 space-y-4">
      <h2 className="font-semibold text-lg">Calendar</h2>

      {/* Week days */}
      <div className="flex justify-between">
        {days.map((day) => {
          const isSelected = day.isSame(selectedDay, "day");
          return (
            <button
              key={day.format("ddd")}
              onClick={() => setSelectedDay(day)}
              className={`flex flex-col items-center px-2 py-1 rounded-md text-sm ${
                isSelected
                  ? "border border-green-600 text-green-600"
                  : "text-neutrals600"
              }`}
            >
              <span className={isSelected ? "font-semibold" : ""}>
                {day.format("ddd")}
              </span>
              <span
                className={`${
                  isSelected ? "text-green-600 font-medium" : "text-neutrals600"
                }`}
              >
                {day.format("D")}
              </span>
            </button>
          );
        })}
      </div>

      <div className="space-y-3">
        {eventsForDay.length > 0 ? (
          eventsForDay.map((event) => (
            <div
              key={event.id}
              className="flex justify-between items-center border rounded-xl p-3 gap-2.5"
            >
              <div>
                <p className="font-semibold">{event.title}</p>
                <p className="text-sm text-neutrals500 flex items-center gap-2">
                  {dayjs(event.StartDate).isAfter(today) ? "Upcoming" : "Past"}{" "}
                  • {dayjs(event.StartDate).format("MMMM D, YYYY")}{" "}
                  {event.StartTime && `• ${event.StartTime}`}
                </p>
              </div>
              <Button>View Event</Button>
            </div>
          ))
        ) : (
          <p className="text-neutrals500 text-sm text-center">No events for this day</p>
        )}
      </div>
    </div>
  );
};

export default Calendar;
