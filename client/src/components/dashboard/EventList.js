import React, { useEffect, useMemo, useState } from "react";
import OptionsInput from "../widgets/OptionsInput";
import { FaFileAlt, FaSortDown } from "react-icons/fa";
import Button from "../widgets/Button";
import StyledImage from "../StyledImage";
import { LuChevronRight } from "react-icons/lu";
import { BsCalendarDate } from "react-icons/bs";
import { useRouter } from "next/router";
import { getVendorEvents } from "@/apis/eventsServices";
import useAuthToken from "@/hooks/useAuthToken";
import { toast } from "react-toastify";
import usePagination from "@/hooks/usePagination";
import useFilter from "@/hooks/useFilter";
import CustomPagination from "../widgets/Pagination";

const EventCard = ({ data }) => {
  const router = useRouter();
  const tickets = data?.EventTicket;
  const totalTickets = tickets?.reduce((sum, t) => sum + t?.quantity, 0);
  const availableTickets = tickets?.reduce(
    (sum, t) => sum + (t?.quantity - t?.sold),
    0
  );
  return (
    <div className="w-full max-w-[278px] mx-auto space-y-2.5 p-3.5 py-4 border border-neutrals300 rounded-[10px]">
      <div className="flex gap-5 items-start justify-between">
        <StyledImage
          className="w-full max-w-[118px] h-[90px] rounded-[8px]"
          src={data?.image_banner?.[0]}
        />
        <p className="flex text-xs items-center gap-0.5 text-primary" onClick={() => router.push(`/dashboard/events/${data?.id}`)}>
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
              {data?.EventLocation?.[0]?.location}
            </p>
          </div>
        </div>
        <div className="flex items-center justify-between">
          <p className="text-sm text-black">
            Ticket: {totalTickets?.toLocaleString()}
          </p>
          <p className="text-xs text-sec700">
            {availableTickets?.toLocaleString()} tickets available
          </p>
        </div>
      </div>
    </div>
  );
};

const EventList = () => {
  const [data, setData] = useState()
  const [type, setType] = useState("");
  const [status, setStatus] = useState("Active");

  const { activeUser, startLoading, stopLoading } = useAuthToken();
  const router = useRouter()

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

  const filteredItems = useMemo(() => {
    if (!Array.isArray(data)) return [];
    return data.filter((item) => {
      const matchesType = type ? item?.eventType === type : true;
      const matchesStatus =
        status === "Active"
          ? item?.active === true
          : status === "Inactive"
          ? item?.active === false
          : true;
      return matchesType && matchesStatus;
    });
  }, [data, type, status]);


  const {
    currentPage,
    totalPaginationPages,
    paginatedData,
    handlePageChange,
    startIndex,
    endIndex,
  } = usePagination(filteredItems, 10);

  useEffect(() => {
    getEvents();
  }, []);

  return (
    <div className="space-y-5">
      <div className="flex flex-wrap gap-5">
        <OptionsInput
          value={type}
          options={[
            { label: "Single", value: "SINGLE" },
            { label: "Multiple", value: "MULTIPLE" },
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

        {/* <OptionsInput
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
        /> */}

        <Button
          className="sm:ms-auto"
          startIcon={
            <StyledImage className="!shrink-0" src="/img/create.svg" />
          }
          onClick={() => router.push("/dashboard/createevent")}
        >
          Create Event
        </Button>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
        {paginatedData?.length > 0 ? (
          paginatedData?.map((item, index) => (
            <EventCard key={index} data={item} />
          ))
        ) : (
          <div className="flex items-center justify-center w-full col-span-full py-20">
            <p className="text-neutrals500 text-center text-sm sm:text-base">No events created</p>
          </div>
        )}
      </div>

      {filteredItems?.length > 10 && (
        <div className="mt-12 flex flex-wrap gapx-2 py-3.5.5 gap-y-5 items-center justify-between">
          <div className="text-[14px] sm:text-[16px] text-baseBlack font-medium leading-normal">
            Showing {startIndex} - {endIndex} of {filteredItems?.length}
          </div>
          <CustomPagination
            count={totalPaginationPages}
            handlePageChange={handlePageChange}
          />
        </div>
      )}
    </div>
  );
};

export default EventList;
