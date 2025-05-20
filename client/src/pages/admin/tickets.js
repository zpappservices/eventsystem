import Layout from "@/components/admin/Layout";
import StatCard from "@/components/admin/StatCard";
import TicketReport from "@/components/admin/TicketReport";
import React from "react";

const tickets = () => {
  const stats = [
    {
      id: 1,
      title: "Event Organized (all time)",
      value: "1023",
      percentage: 1.2,
      percentageType: "calculate in the last 7 days",
      trend: "down",
    },
    {
      id: 2,
      title: "Event In-process",
      value: "124",
      percentage: 1.2,
      percentageType: "calculate in the last 7 days",
      trend: "up",
    },
    {
      id: 3,
      title: "Closed Events",
      value: "23",
      percentage: 1.2,
      percentageType: "calculate in the last 7 days",
      trend: "up",
    },
    {
      id: 4,
      title: "Active Event Soldout",
      value: "7",
      percentage: 1.2,
      percentageType: "calculate in the last 7 days",
      trend: "up",
    },
    {
      id: 4,
      title: "Total Ticket Sold",
      value: "5120",
      percentage: 1.2,
      percentageType: "calculate in the last 7 days",
      trend: "up",
    },
  ];
  return (
    <Layout>
      <div className="border-neutrals100 px-5 py-5">
        <p className="text-baseBlack font-bold mb-7">
          Dashboard{" "}
          <span className="font-normal text-neutrals600">/ Ticket Report</span>
        </p>

        <div className="flex flex-wrap gap-5">
          {stats.map((stat) => (
            <StatCard
              key={stat.id}
              title={stat.title}
              value={stat.value}
              percentage={stat.percentage}
              percentageType={stat.percentageType}
              trend={stat.trend}
            />
          ))}
        </div>

        <TicketReport />
      </div>
    </Layout>
  );
};

export default tickets;
