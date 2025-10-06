import React, { useEffect } from "react";
import useAuthToken from "@/hooks/useAuthToken";
import useApiRequest from "@/hooks/useApiRequest";
import { convertTo12HourFormat, formatDate } from "@/utils/time";
import { useRouter } from "next/router";
import { MoreVertical } from "lucide-react";
import StyledImage from "../StyledImage";

const SalesEvents = ({ next, setId }) => {
  const { activeUser } = useAuthToken();
  const router = useRouter();

  const { data, request } = useApiRequest({
    method: "get",
    url: `event/getallVendorEvents/${activeUser}`,
    data: null,
    headers: {},
    useToken: true,
  });

  const getUser = async () => {
    await request();
  };

  useEffect(() => {
    getUser();
  }, []);

  const { data: events } = data || {};

  const activeEvents = events?.filter((event) => event.active === true);

  const handleClick = (id) => {
    setId(id);
    next();
  };

  if (activeEvents?.length < 1) {
    return (
      <div className="w-full max-w-[900px] 3xl:max-w-fit flex-1 flex flex-col gap-10">
        <div className="">
          <p className="text-[20px] !font-bold leading-[24px] px-2">
            Active Event Tickets
          </p>
          <p className="text-neutrals700 leading-[24px] px-2">
            Select an event to see ticket sales
          </p>
        </div>

        <div className="p-5 pb-10 h-[40vh] border rounded-[8px] flex justify-center items-center">
          <p className="text-neutrals500 mx-auto text-center">
            No events created
          </p>
        </div>
      </div>
    );
  }
  return (
    <div className="w-full max-w-[1190px] 3xl:max-w-fit flex-1 flex flex-col gap-10">
      <div className="">
        <p className="text-[20px] !font-bold leading-[24px] px-2">
          Active Event Tickets
        </p>
        <p className="text-neutrals700 leading-[24px] px-2">
          Select an event to see ticket sales
        </p>
      </div>

      <div className="overflow-x-auto">
        <table className="w-[1150px]">
          <thead className="bg-neutrals100">
            <tr>
              <th className="py-3 px-2 text-left text-neutrals600 text-sm font-semibold">
                Event Name
              </th>
              <th className="py-3 px-2 text-left text-neutrals600 text-sm font-semibold">
                Event Type
              </th>
              <th className="py-3 px-2 text-left text-neutrals600 text-sm font-semibold">
                Date & Time
              </th>
              <th className="py-3 px-2 text-left text-neutrals600 text-sm font-semibold">
                Location
              </th>
            </tr>
          </thead>
          <tbody>
            {activeEvents?.map((event, index) => (
              <tr
                key={index}
                className="border-b border-gray-100 last:border-0 cursor-pointer"
                onClick={() => handleClick(event?.id)}
              >
                <td className="py-4 px-2 text-xs flex items-center gap-2.5">
                  <StyledImage
                    src={event?.image_banner?.[0]}
                    className="!w-[40px] h-[40px] rounded-[10px]"
                  />{" "}
                  {event?.title}
                </td>
                <td className="py-4 px-2 text-xs">{event?.eventType}</td>
                <td className="py-4 px-2 text-xs">
                  {formatDate(event?.StartDate)}{" "}
                  {convertTo12HourFormat(event?.StartTime)}
                </td>
                <td className="py-4 px-2 text-xs">
                  {event?.EventLocation?.[0]?.location}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SalesEvents;
