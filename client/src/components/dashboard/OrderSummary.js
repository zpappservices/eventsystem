import React, { useState } from "react";
import { MoreVertical } from "lucide-react";
import TextInput from "../widgets/TextInput";
import TextField from "../widgets/TextField";
import { FiSearch } from "react-icons/fi";
import { IoFilterOutline } from "react-icons/io5";
import { LuListFilter } from "react-icons/lu";
import useSearch from "@/hooks/useSearch";

const OrderSummary = () => {
  const [data, setData] = useState([
    {
      id: "#4134675",
      date: "07/08/2025",
      event: "Evolution Cup 2025",
      buyer: "Austin Wade",
      ticketType: "Free",
      soldTickets: 2,
      available: 100,
      returns: "No",
      totalRevenue: "₦0",
    },
    {
      id: "#4134676",
      date: "07/08/2025",
      event: "Evolution Cup 2025",
      buyer: "Sarah Johnson",
      ticketType: "Free",
      soldTickets: 2,
      available: 98,
      returns: "No",
      totalRevenue: "₦0",
    },
    {
      id: "#4134677",
      date: "07/08/2025",
      event: "Evolution Cup 2025",
      buyer: "Michael Lee",
      ticketType: "VIP",
      soldTickets: 1,
      available: 49,
      returns: "No",
      totalRevenue: "₦15,000",
    },
    {
      id: "#4134678",
      date: "07/08/2025",
      event: "Evolution Cup 2025",
      buyer: "Jane Doe",
      ticketType: "Free",
      soldTickets: 2,
      available: 96,
      returns: "No",
      totalRevenue: "₦0",
    },
    {
      id: "#4134679",
      date: "07/08/2025",
      event: "Evolution Cup 2025",
      buyer: "David Green",
      ticketType: "Free",
      soldTickets: 2,
      available: 94,
      returns: "No",
      totalRevenue: "₦0",
    },
    {
      id: "#4134680",
      date: "07/08/2025",
      event: "Evolution Cup 2025",
      buyer: "Aisha Bello",
      ticketType: "Standard",
      soldTickets: 3,
      available: 47,
      returns: "Yes",
      totalRevenue: "₦4,500",
    },
    {
      id: "#4134681",
      date: "07/08/2025",
      event: "Evolution Cup 2025",
      buyer: "Samuel King",
      ticketType: "Free",
      soldTickets: 2,
      available: 95,
      returns: "No",
      totalRevenue: "₦0",
    },
    {
      id: "#4134682",
      date: "07/08/2025",
      event: "Evolution Cup 2025",
      buyer: "Chinwe Nnaji",
      ticketType: "Free",
      soldTickets: 2,
      available: 93,
      returns: "No",
      totalRevenue: "₦0",
    },
    {
      id: "#4134683",
      date: "07/08/2025",
      event: "Evolution Cup 2025",
      buyer: "Peter Obi",
      ticketType: "Standard",
      soldTickets: 1,
      available: 46,
      returns: "No",
      totalRevenue: "₦1,500",
    },
    {
      id: "#4134684",
      date: "07/08/2025",
      event: "Evolution Cup 2025",
      buyer: "Lola Martins",
      ticketType: "Free",
      soldTickets: 2,
      available: 91,
      returns: "No",
      totalRevenue: "₦0",
    },
  ]);
  const [search, setSearch] = useState("");

  const searchFunction = (item, term) => {
    const lowerTerm = term.toLowerCase();
    return (
      item.event.toLowerCase().includes(lowerTerm) ||
      item.buyer.toLowerCase().includes(lowerTerm) ||
      item.id.toLowerCase().includes(lowerTerm)
    );
  };

  const searchedItems = useSearch(data, search, searchFunction);

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
            <FiSearch className="text-xl text-neutrals500 font-bold absolute bottom-2.5 z-10 left-2" />
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
