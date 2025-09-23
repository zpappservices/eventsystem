import React, { useState } from "react";
import OptionsInput from "../widgets/OptionsInput";
import { FaFileAlt, FaSortDown } from "react-icons/fa";
import Button from "../widgets/Button";
import StyledImage from "../StyledImage";
import { LuChevronRight } from "react-icons/lu";
import { BsCalendarDate } from "react-icons/bs";

const EventCard = ({ data }) => {
  return (
    <div className="w-full max-w-[278px] mx-auto space-y-2.5 p-3.5 py-4 border border-neutrals300 rounded-[10px]">
      <div className="flex gap-5 items-start justify-between">
        <StyledImage className="w-full max-w-[118px]" src={data?.event_image} />
        <p className="flex text-xs items-center gap-1 text-primary">
          More details <LuChevronRight className="text-lg" />
        </p>
      </div>

      <div className="space-y-2.5">
        <div>
          <p className="text-xl font-bold text-ellipsis truncate text-black">
            {data?.event_name}
          </p>
          <p className="text-xs text-ellipsis truncate text-neutrals500">
            {data?.description}
          </p>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 shrink-0">
            <BsCalendarDate className="text-neutrals500 text-[17px]" />
            <p className="text-xs text-neutrals500">{data?.date}</p>
          </div>

          <div className="flex items-center gap-1.5 w-full">
            <StyledImage
              src="/img/location-grey.svg"
              className="text-neutrals500 text-[17px]"
            />
            <p className="text-xs text-neutrals500 truncate text-ellipsis flex-1 w-full max-w-[160px]">
              {data?.location}
            </p>
          </div>
        </div>
        <div className="flex items-center justify-between">
          <p className="text-sm text-black">
            Ticket: {data?.total_tickets?.toLocaleString()}
          </p>
          <p className="text-xs text-sec700">
            {data?.available_tickets?.toLocaleString()}{" "}
            tickets available
          </p>
        </div>
      </div>
    </div>
  );
};

const EventList = () => {
  const [type, setType] = useState("");
  const [status, setStatus] = useState("Active");
  const [date, setDate] = useState("Active");

  const mockEvents = [
    {
      event_name: "Tech Innovators Conference",
      event_image: "/img/soccer.svg",
      description:
        "A gathering of the brightest minds in technology to discuss the future of AI, blockchain, and more.",
      date: "29 Jan",
      location: "Lagos, Nigeria",
      total_tickets: 500,
      available_tickets: 120,
    },
    {
      event_name: "Afrobeats Music Festival",
      event_image: "/img/soccer.svg",
      description:
        "Experience the best Afrobeats artists live on stage with food, dance, and cultural showcases.",
      date: "1 Oct",
      location: "Accra, Ghana",
      total_tickets: 2000,
      available_tickets: 450,
    },
    {
      event_name: "Startup Pitch Night",
      event_image: "/img/soccer.svg",
      description:
        "Watch innovative startups pitch their ideas to top investors and industry experts.",
      date: "12 Dec",
      location: "Nairobi, Kenya",
      total_tickets: 300,
      available_tickets: 50,
    },
    {
      event_name: "Startup Pitch Night",
      event_image: "/img/soccer.svg",
      description:
        "Watch innovative startups pitch their ideas to top investors and industry experts.",
      date: "12 Dec",
      location: "Nairobi, Kenya",
      total_tickets: 300,
      available_tickets: 50,
    },
  ];

  return (
    <div className="space-y-5">
      <div className="flex flex-wrap gap-5">
        <OptionsInput
          value={type}
          options={[
            { label: "Music", value: "Music" },
            { label: "Event", value: "Event" },
          ]}
          openIcon={<FaSortDown className="text-[18px] text-baseBlack -mt-2" />}
          style="rounded-[8px] !py-2.5 !px-3 !border-neutrals400"
          placeholder={"Event type"}
          placeholderStyle="!text-black"
          onChange={(name, value) => {
            setType(value);
          }}
        />

        <OptionsInput
          value={status}
          options={[
            { label: "Active", value: "Active" },
            { label: "Inactive", value: "Inactive" },
          ]}
          openIcon={<FaSortDown className="text-[18px] text-baseBlack -mt-2" />}
          style="rounded-[8px] !py-2.5 !px-3 !border-neutrals400"
          placeholder={"Event type"}
          placeholderStyle="!text-black"
          selectedStyle="!text-black"
          onChange={(name, value) => {
            setStatus(value);
          }}
        />

        <OptionsInput
          value={date}
          options={[
            { label: "2025", value: "2025" },
            { label: "2024", value: "2024" },
            { label: "Last Year", value: "Last Year" },
            { label: "2 Years ago", value: "2 Years ago" },
            { label: "3 Years ago", value: "3 Years ago" },
          ]}
          openIcon={<FaSortDown className="text-[18px] text-baseBlack -mt-2" />}
          style="rounded-[8px] !py-2.5 !px-3 !border-neutrals400"
          placeholder={"Event type"}
          placeholderStyle="!text-black"
          onChange={(name, value) => {
            setDate(value);
          }}
        />

        <Button
          className="sm:ms-auto"
          startIcon={
            <StyledImage className="!shrink-0" src="/img/create.svg" />
          }
        >
          Create Event
        </Button>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
        {mockEvents?.map((item, index) => (
          <EventCard key={index} data={item} />
        ))}
      </div>
    </div>
  );
};

export default EventList;
