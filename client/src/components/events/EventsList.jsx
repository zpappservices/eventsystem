// EventsList.jsx
import { useEffect, useState } from "react";
import EventCardSkeleton from "./EventCardSkeleton";
import { getEvents } from "@/apis/eventsServices";
import useLoading from "@/hooks/useLoading";
import EventCard from "./EventCard";
import OptionsInput from "../widgets/OptionsInput";
import { getCategories } from "@/apis/categoriesServices";
import CheckboxGroup from "./CheckBoxGroup";
import moment from "moment";

const filterEvents = (events, category, ticketType, days) => {
  return events.filter((event) => {
    const eventDay = moment(event.StartDate).day();

    const isCategoryMatch =
      category.length === 0 || category.includes(event.category);

    const isTicketTypeMatch =
      ticketType.length === 0 ||
      (ticketType.includes("Free") && event.platformFee === false) ||
      (ticketType.includes("Paid") && event.platformFee === true);

    const isDayMatch =
      days.length === 0 ||
      (days.includes("Weekdays") && eventDay >= 1 && eventDay <= 5) ||
      (days.includes("Weekends") && (eventDay === 0 || eventDay === 6));

    return isCategoryMatch && isTicketTypeMatch && isDayMatch;
  });
};

const EventsList = ({ filters, setFilters }) => {
  const [events, setEvents] = useState([]);
  const [categories, setCategories] = useState([]);
  const { isLoading, startLoading, stopLoading } = useLoading(true);
  const [category, setCategory] = useState([]);
  const [ticketType, setTicketType] = useState([]);
  const [days, setDays] = useState([]);

  const fetchEvents = async () => {
    const { success, data } = await getEvents(startLoading, stopLoading);

    if (success) setEvents(data);
  };

  const fetchCategories = async () => {
    const { data, success } = await getCategories();

    if (success) {
      const options = data?.map((item) => item?.name);
      setCategories(options);
    }
  };

  useEffect(() => {
    fetchEvents();
    fetchCategories();
  }, []);

  const filteredEvents = filterEvents(events, category, ticketType, days);

  const sortedEvents = [...filteredEvents].sort((a, b) => {
    const sortBy = filters.sortBy?.toLowerCase();

    if (sortBy === "new") {
      return new Date(b.createdOn) - new Date(a.createdOn); 
    }

    if (sortBy === "popular") {
      return new Date(a.StartDate) - new Date(b.StartDate);
    }

    return 0;
  });


  const activeFilterCount = [
    category.length > 0,
    ticketType.length > 0,
    days.length > 0,
  ]?.filter(Boolean).length;

  const resetFilters = () => {
    setCategory([]);
    setTicketType([]);
    setDays([]);
  };

  if (isLoading) {
    return (
      <div className="w-full grid grid-cols-1 gap-x-5 gap-y-10 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 py-6">
        {[...Array(8)].map((_, index) => (
          <EventCardSkeleton key={index} />
        ))}
      </div>
    );
  }

  return (
    <div className="pt-10">
      <div className="flex flex-col md:flex-row items-start gap-5">
        <div className="max-w-[210px] w-full">
          <div className="flex flex-wrap items-center gap-5">
            <p className="text-baseBlack text-base font-bold">Filter</p>
            <p className="text-baseBlack text-sm">
              <span onClick={resetFilters} className="cursor-pointer">
                Reset filters{" "}
              </span>
              ({activeFilterCount})
            </p>
          </div>

          <CheckboxGroup
            title="All Categories"
            options={categories}
            selected={category}
            onChange={setCategory}
            single={false}
          />

          <CheckboxGroup
            title="Ticket Type"
            options={["Free", "Paid"]}
            selected={ticketType}
            onChange={setTicketType}
            single={true}
          />

          <CheckboxGroup
            title="Event Days"
            options={["Weekdays", "Weekends"]}
            selected={days}
            onChange={setDays}
            single={true}
          />
        </div>

        <div className="w-full">
          <div className="flex items-start gap-5 flex-wrap">
            <p className="text-baseBlack text-xl font-bold">
              Results: All events{" "}
              <span className="text-primary">({events?.length})</span>
            </p>
            <OptionsInput
              placeholder="Sort by"
              options={["new", "popular"]}
              onChange={(name, val) => setFilters({ ...filters, sortBy: val })}
              value={`Sort by:${filters.sortBy}`}
              style="!rounded-[10px] !py-2 !text-sm"
              container="ms-auto"
            />
          </div>

          {sortedEvents?.length > 0 ? (
            <div className="w-full flex-1 grid grid-cols-1 gap-x-5 md:gap-x-7 gap-y-10 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 pt-4">
              {filteredEvents.map((item) => (
                <EventCard data={item} key={item?.id} />
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
      </div>
    </div>
  );
};

export default EventsList;
