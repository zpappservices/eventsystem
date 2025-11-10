import React, { useMemo, useState } from "react";
import { MoreVertical } from "lucide-react";
import TextInput from "../widgets/TextInput";
import TextField from "../widgets/TextField";
import { FiSearch } from "react-icons/fi";
import { IoFilterOutline } from "react-icons/io5";
import { LuListFilter } from "react-icons/lu";
import useSearch from "@/hooks/useSearch";

const OrderSummary = ({data}) => {
  const [search, setSearch] = useState("");

  const mapped = useMemo(() => {
    return data?.events?.map((e) => {
      const ticket = data?.tickets?.find((t) => t?.name === e?.ticket);
      return {
        id: `#${e?.id?.slice(0, 8)}`,
        date: new Date(e?.createdOn)?.toLocaleDateString("en-GB"),
        event: e?.event?.title || "Unknown Event",
        buyer: `${e?.firstName} ${e?.lastName}`,
        ticketType: e?.ticket || "N/A",
        soldTickets: 1,
        available: ticket?.quantity || 0,
        returns: "No",
        totalRevenue: `₦${ticket?.price ? Number(ticket?.price) * 1 : 0}`,
      };
    });
  }, [data]);

  const searchFunction = (item, term) => {
    const lowerTerm = term?.toLowerCase();
    return (
      item.event.toLowerCase().includes(lowerTerm) ||
      item.buyer.toLowerCase().includes(lowerTerm) ||
      item.id.toLowerCase().includes(lowerTerm)
    );
  };

  const searchedItems = useSearch(mapped, search, searchFunction);

  return (
    <div className="w-full space-y-5">
      <div className="flex items-center gap-5 flex-wrap">
        <div>
          <p className="text-xl font-medium text-black">Order Summary</p>
          <p className="text-sm text-neutrals600">
            Overview of total orders, revenue and returns
          </p>
        </div>

        <div className="ms-auto flex items-end gap-4">
          <div className="w-full flex relative">
            <FiSearch className="text-xl text-neutrals500 font-bold absolute bottom-3.5 z-10 left-2" />
            <TextField
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              style="!rounded-[10px] !ps-8 !w-full !h-[40px] border-neutrals600"
              container="!w-full"
              name="search"
              placeholder="Search id, events...."
            />
          </div>

          <div className="h-[40px] w-[40px] border border-neutrals600 rounded-[10px] flex items-center justify-center shrink-0">
            <LuListFilter className="text-neutrals600" />
          </div>
        </div>
      </div>
      <div className="overflow-x-auto rounded-lg shadow-sm">
        <table className="w-full min-w-[1000px]">
          <thead className="bg-neutrals100 text-neutrals700">
            <tr>
              <th className="py-3 px-4 text-left text-sm font-medium">
                Order ID
              </th>
              <th className="py-3 px-4 text-left text-sm font-medium">Date</th>
              <th className="py-3 px-4 text-left text-sm font-medium">
                Event Name
              </th>
              <th className="py-3 px-4 text-left text-sm font-medium">Buyer</th>
              <th className="py-3 px-4 text-left text-sm font-medium">
                Ticket type
              </th>
              <th className="py-3 px-4 text-center text-sm font-medium">
                Sold Tickets
              </th>
              <th className="py-3 px-4 text-center text-sm font-medium">
                Available
              </th>
              <th className="py-3 px-4 text-center text-sm font-medium">
                Returns
              </th>
              <th className="py-3 px-4 text-right text-sm font-medium">
                Total Revenue
              </th>
              <th className="py-3 px-2 w-12" />
            </tr>
          </thead>

          <tbody>
            {searchedItems?.map((order, idx) => (
              <tr
                key={`${order.id}-${idx}`}
                className="border-b last:border-0 hover:bg-gray-50"
              >
                <td className="py-4 px-4 text-sm text-gray-700">{order.id}</td>
                <td className="py-4 px-4 text-sm">{order.date}</td>
                <td className="py-4 px-4 text-sm">{order.event}</td>
                <td className="py-4 px-4 text-sm">{order.buyer}</td>
                <td className="py-4 px-4 text-sm">{order.ticketType}</td>
                <td className="py-4 px-4 text-center text-sm">
                  {order.soldTickets}
                </td>
                <td className="py-4 px-4 text-center text-sm">
                  {order.available}
                </td>
                <td className="py-4 px-4 text-center text-sm">
                  {order.returns}
                </td>
                <td className="py-4 px-4 text-right text-sm font-medium">
                  {order.totalRevenue}
                </td>
                <td className="py-4 px-2 text-center">
                  <button
                    aria-label="row actions"
                    className="inline-flex items-center justify-center text-gray-400 hover:text-gray-600"
                  >
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

export default OrderSummary;
