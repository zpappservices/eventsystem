import React, { useState } from "react";
import { MoreVertical } from "lucide-react";
import Button from "../widgets/Button";
import { BsFillTicketFill } from "react-icons/bs";
import StyledImage from "../StyledImage";
import { formatCurrencyWithoutDecimal } from "@/utils/conversions";
import OptionsInput from "../widgets/OptionsInput";
import { FaSortDown } from "react-icons/fa";

const TicketStats = ({
  image = "/img/total-sales.svg",
  title = "Total sales value",
  value = 182154.58,
  isPrice = false,
}) => {
  return (
    <div className="flex gap-2">
      <div className="">
        <StyledImage src={image} />
      </div>
      <div>
        <p className="text-xs text-black">{title}</p>
        <p className="text-base sm:text-xl font-bold text-black">
          {isPrice ? formatCurrencyWithoutDecimal(value) : value}
        </p>
      </div>
    </div>
  );
};

const TicketReport = () => {
  const [period, setPeriod] = useState("This Month");
  const orders = [
    {
      ticket_id: "25-0001-es-00001",
      date: "13/03/2025",
      event: "Evolution of Washington",
      user: "Ejiro Ejiro",
      location: "Lagos",
      category: "VIP",
      quantity_left: 527,
      payment_status: "Paid",
      approval_status: "Approved",
    },
    {
      ticket_id: "25-0001-es-00001",
      date: "13/03/2025",
      event: "Evolution of Washington",
      user: "Ejiro Ejiro",
      location: "Lagos",
      category: "VIP",
      quantity_left: 527,
      payment_status: "Paid",
      approval_status: "Approved",
    },
    {
      ticket_id: "25-0001-es-00001",
      date: "13/03/2025",
      event: "Evolution of Washington",
      user: "Ejiro Ejiro",
      location: "Lagos",
      category: "VIP",
      quantity_left: 527,
      payment_status: "Failed",
      approval_status: "Rejected",
    },
    {
      ticket_id: "25-0001-es-00001",
      date: "13/03/2025",
      event: "Evolution of Washington",
      user: "Ejiro Ejiro",
      location: "Lagos",
      category: "VIP",
      quantity_left: 527,
      payment_status: "Paid",
      approval_status: "Approved",
    },
    {
      ticket_id: "25-0001-es-00001",
      date: "13/03/2025",
      event: "Evolution of Washington",
      user: "Ejiro Ejiro",
      location: "Lagos",
      category: "VIP",
      quantity_left: 527,
      payment_status: "Failed",
      approval_status: "Rejected",
    },
    {
      ticket_id: "25-0001-es-00001",
      date: "13/03/2025",
      event: "Evolution of Washington",
      user: "Ejiro Ejiro",
      location: "Lagos",
      category: "VIP",
      quantity_left: 527,
      payment_status: "Paid",
      approval_status: "Approved",
    },
    {
      ticket_id: "25-0001-es-00001",
      date: "13/03/2025",
      event: "Evolution of Washington",
      user: "Ejiro Ejiro",
      location: "Lagos",
      category: "VIP",
      quantity_left: 527,
      payment_status: "Paid",
      approval_status: "Approved",
    },
    {
      ticket_id: "25-0001-es-00001",
      date: "13/03/2025",
      event: "Evolution of Washington",
      user: "Ejiro Ejiro",
      location: "Lagos",
      category: "VIP",
      quantity_left: 527,
      payment_status: "Failed",
      approval_status: "Rejected",
    },
    {
      ticket_id: "25-0001-es-00001",
      date: "13/03/2025",
      event: "Evolution of Washington",
      user: "Ejiro Ejiro",
      location: "Lagos",
      category: "VIP",
      quantity_left: 527,
      payment_status: "Paid",
      approval_status: "Approved",
    },
    {
      ticket_id: "25-0001-es-00001",
      date: "13/03/2025",
      event: "Evolution of Washington",
      user: "Ejiro Ejiro",
      location: "Lagos",
      category: "VIP",
      quantity_left: 527,
      payment_status: "Paid",
      approval_status: "Approved",
    },
  ];
  
  return (
    <div className="rounded-xl w-full space-y-8">
      <div className="xl:flex flex-wrap items-center gap-4">
        <Button
          background="bg-primary100"
          text="text-primary"
          hover="hover:primary100/90"
          startIcon={<StyledImage src="/img/ticket-report.svg" />}
        >
          Generate report
        </Button>

        <div className="flex-1 flex flex-wrap items-center gap-10 sm:shadow sm:py-1.5 rounded-[12px] sm:px-5 max-w-[876px] ms-auto">
          <TicketStats isPrice />
          <TicketStats
            title="Number of Events"
            value={182}
            image="/img/no-of-events.svg"
          />
          <TicketStats
            title="Number of purchases"
            value={17475}
            image="/img/analysis.svg"
          />

          <OptionsInput
            value={period}
            options={[
              { label: "This Month", value: "This Month" },
              { label: "This Year", value: "This Year" },
              { label: "Last Year", value: "Last Year" },
              { label: "2 Years ago", value: "2 Years ago" },
              { label: "3 Years ago", value: "3 Years ago" },
            ]}
            openIcon={
              <FaSortDown className="text-[18px] text-baseblack -mt-2" />
            }
            container="ms-auto"
            style="rounded-[8px] !py-2.5 !px-2.5 !border-none bg-primary100/50 !font-bold"
            selectedStyle="!text-sm !font-medium text-primary"
            onChange={(_, value) => {
              setPeriod(value);
            }}
          />
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-[1150px]">
          <thead className="bg-neutrals100">
            <tr>
              <th className="py-3 px-2 text-left text-neutrals600 text-sm font-semibold">
                Ticket ID
              </th>
              <th className="py-3 px-2 text-left text-neutrals600 text-sm font-semibold">
                Date
              </th>
              <th className="py-3 px-2 text-left text-neutrals600 text-sm font-semibold">
                Event Name
              </th>
              <th className="py-3 px-2 text-left text-neutrals600 text-sm font-semibold">
                User’s Name
              </th>
              <th className="py-3 px-2 text-left text-neutrals600 text-sm font-semibold">
                Location
              </th>
              <th className="py-3 px-2 text-left text-neutrals600 text-sm font-semibold">
                Ticket Type
              </th>
              <th className="py-3 px-2 text-left text-neutrals600 text-sm font-semibold">
                Available
              </th>
              <th className="py-3 px-2 text-left text-neutrals600 text-sm font-semibold">
                Status
              </th>
              <th className="py-3 px-2 text-left text-neutrals600 text-sm font-semibold">
                Total Revenue
              </th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order, index) => (
              <tr
                key={index}
                className="border-b border-gray-100 last:border-0"
              >
                <td className="py-4 px-2 text-xs">{order.ticket_id}</td>
                <td className="py-4 px-2 text-xs">{order.date}</td>
                <td className="py-4 px-2 text-xs">{order.event}</td>
                <td className="py-4 px-2 text-xs">{order.user}</td>
                <td className="py-4 px-2 text-xs">{order.location}</td>
                <td className="py-4 px-2 text-xs">{order.category}</td>
                <td className="py-4 px-2 text-xs">{order.quantity_left}</td>
                <td className="py-4 px-2 text-xs">
                  <span
                    className={`flex items-center ${
                      order.payment_status === "Paid"
                        ? "text-success"
                        : "text-error"
                    }`}
                  >
                    <span
                      className={`w-2 h-2 rounded-full mr-2 ${
                        order.payment_status === "Paid"
                          ? "bg-success"
                          : "bg-error"
                      }`}
                    ></span>
                    {order.payment_status}
                  </span>
                </td>
                <td className="py-4 px-2 text-xs flex items-center justify-center">
                  <span
                    className={`p-2.5 rounded-md !mx-auto ${
                      order.approval_status === "Approved"
                        ? "bg-success100 text-success"
                        : "bg-error100 text-error px-3"
                    }`}
                  >
                    {order.approval_status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TicketReport;
