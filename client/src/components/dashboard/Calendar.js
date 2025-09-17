"use client";

import { useState } from "react";
import dayjs from "dayjs";
import Button from "../widgets/Button";

const mockEvents = [
  {
    id: 1,
    title: "Evolution Cup 2025",
    status: "Upcoming",
    date: "2025-07-25",
  },
  {
    id: 2,
    title: "Tech Conference",
    status: "Upcoming",
    date: "2025-07-27",
  },
  {
    id: 3,
    title: "Music Festival",
    status: "Upcoming",
    date: "2025-07-29",
  },
];

const Calendar = () => {
  const today = dayjs();
  const startOfWeek = today.startOf("week");
  const days = Array.from({ length: 7 }).map((_, idx) =>
    startOfWeek.add(idx, "day")
  );

  const [selectedDay, setSelectedDay] = useState(today);

  return (
    <div className="w-full max-w-[413px] border rounded-xl p-4 space-y-4">
      <h2 className="font-semibold text-lg">Calendar</h2>

      <div className="flex justify-between">
        {days.map((day) => {
          const isToday = day.isSame(today, "day");
          const isSelected = day.isSame(selectedDay, "day");
          return (
            <button
              key={day.format("ddd")}
              onClick={() => setSelectedDay(day)}
              className={`flex flex-col items-center px-2 py-1 rounded-md text-sm ${
                isSelected
                  ? "border border-green-600 text-green-600"
                  : "text-gray-600"
              }`}
            >
              <span className={isSelected ? "font-semibold" : ""}>
                {day.format("ddd")}
              </span>
              <span
                className={`${
                  isSelected ? "text-green-600 font-medium" : "text-gray-600"
                }`}
              >
                {day.format("D")}
              </span>
            </button>
          );
        })}
      </div>

      <div className="space-y-3">
        {mockEvents.map((event) => (
          <div
            key={event.id}
            className="flex justify-between items-center border rounded-xl p-3"
          >
            <div>
              <p className="font-semibold">{event.title}</p>
              <p className="text-sm text-gray-500 flex items-center gap-2">
                {event.status} • {dayjs(event.date).format("MMMM D, YYYY")}
              </p>
            </div>
            <Button>View Event</Button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Calendar
