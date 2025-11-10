import React, { useEffect } from "react";
import useAuthToken from "@/hooks/useAuthToken";
import useApiRequest from "@/hooks/useApiRequest";
import { convertTo12HourFormat, formatDate } from "@/utils/time";
import { useRouter } from "next/router";
import { MoreVertical } from "lucide-react";

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData("AY Live", "AY Live", 150000, 24, "11/06/2024"),
  createData("MC Pashun", "MC Pashun", 5000000, 7, "11/12/2024"),
];

const ActiveEvents = () => {
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

  if (activeEvents?.length < 1) {
    return (
      <div className="w-full max-w-[900px] 3xl:max-w-fit flex-1 flex flex-col border rounded-[10px] bg-neutrals100/10">
        <p className="text-[20px] !font-bold leading-[24px] py-5 px-2">
          Active Event Tickets
        </p>

        <div className="p-5 pb-10">
          <p className="text-neutrals600 mx-auto text-center">No events created</p>
        </div>
      </div>
    );
  }
  return (
    <div className="w-full max-w-[900px] 3xl:max-w-fit flex-1 flex flex-col border rounded-[10px] bg-neutrals100/10">
      <p className="text-[20px] !font-bold leading-[24px] py-5 px-2">
        Active Event Tickets
      </p>

      <div className="overflow-x-auto">
        <table className="w-[1150px]">
          <thead className="bg-neutrals100">
            <tr>
              <th className="py-3 px-2 text-left text-neutrals600 text-sm font-semibold">
                Event Name
              </th>
              <th className="py-3 px-2 text-left text-neutrals600 text-sm font-semibold">
                Category
              </th>
              <th className="py-3 px-2 text-left text-neutrals600 text-sm font-semibold">
                Date & Time
              </th>
              <th className="py-3 px-2 text-left text-neutrals600 text-sm font-semibold">
                Location
              </th>
              <th className="py-3 px-2 text-left text-neutrals600 text-sm font-semibold">
                <button className="inline-flex items-center justify-center text-neutrals600">
                  <MoreVertical size={18} />
                </button>
              </th>
            </tr>
          </thead>
          <tbody>
            {activeEvents?.map((event, index) => (
              <tr
                key={index}
                className="border-b border-gray-100 last:border-0 cursor-pointer"
                onClick={() => router.push(`/dashboard/event/${event?.id}`)}
              >
                <td className="py-4 px-2 text-xs">{event?.title}</td>
                <td className="py-4 px-2 text-xs">{event?.category}</td>
                <td className="py-4 px-2 text-xs">
                  {formatDate(event?.StartDate)}{" "}
                  {convertTo12HourFormat(event?.StartTime)}
                </td>
                <td className="py-4 px-2 text-xs">{event?.EventLocation?.[0]?.location}</td>
                <td
                  className="py-3 px-2 text-left text-neutrals600 text-sm font-semibold"
                  onClick={(e) => e.stopPropagation()}
                >
                  <button className="inline-flex items-center justify-center text-neutrals600">
                    <MoreVertical size={18} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ActiveEvents;
