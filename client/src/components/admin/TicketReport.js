import React from "react";
import { MoreVertical } from "lucide-react";
import Button from "../widgets/Button";
import { BsFillTicketFill } from "react-icons/bs";
import StyledImage from "../StyledImage";

const TicketReport = () => {
  // Sample data for the recent orders table
  const orders = [
    {
      name: "Ejiro Ejiro",
      event: "Evolution of Washington",
      total: "$120.00",
      status: "Paid",
    },
    {
      name: "Austin",
      event: "Basket ball",
      total: "$200.49",
      status: "Failed",
    },
    {
      name: "Ejiro Ejiro",
      event: "Evolution of Washington",
      total: "$120.00",
      status: "Paid",
    },
    {
      name: "Ejiro Ejiro",
      event: "Evolution of Washington",
      total: "$120.00",
      status: "Paid",
    },
    {
      name: "Ejiro Ejiro",
      event: "Evolution of Washington",
      total: "$120.00",
      status: "Paid",
    },
    {
      name: "Ejiro Ejiro",
      event: "Evolution of Washington",
      total: "$120.00",
      status: "Paid",
    },
    {
      name: "Ejiro Ejiro",
      event: "Evolution of Washington",
      total: "$120.00",
      status: "Paid",
    },
  ];

  return (
    <div className="rounded-xl shadow max-w-[527px] w-full space-y-5">
      <div className="p-4">
        <h2 className="text-xl font-bold">Recent Orders</h2>
      </div>

      <div>
        <Button
          background="bg-primary100"
          text="text-primary"
          startIcon={<StyledImage src="/img/ticket-report.svg" />}
        >
          Generate report
        </Button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-100">
            <tr>
              <th className="py-3 px-2 text-left text-gray-500 font-medium">
                Name
              </th>
              <th className="py-3 px-2 text-left text-gray-500 font-medium">
                Event
              </th>
              <th className="py-3 px-2 text-left text-gray-500 font-medium">
                Total
              </th>
              <th className="py-3 px-2 text-left text-gray-500 font-medium">
                Status
              </th>
              <th className="py-3 px-2 w-10"></th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order, index) => (
              <tr
                key={index}
                className="border-b border-gray-100 last:border-0"
              >
                <td className="py-4 px-2">{order.name}</td>
                <td className="py-4 px-2">{order.event}</td>
                <td className="py-4 px-2">{order.total}</td>
                <td className="py-4 px-2">
                  <span
                    className={`flex items-center ${
                      order.status === "Paid"
                        ? "text-green-500"
                        : "text-red-500"
                    }`}
                  >
                    <span
                      className={`w-2 h-2 rounded-full mr-2 ${
                        order.status === "Paid" ? "bg-green-500" : "bg-red-500"
                      }`}
                    ></span>
                    {order.status}
                  </span>
                </td>
                <td className="py-4 px-2 text-center">
                  <button className="inline-flex items-center justify-center text-gray-400 hover:text-gray-500">
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

export default TicketReport;
