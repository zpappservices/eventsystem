import Layout from "@/components/admin/Layout";
import SalesRevenue from "@/components/admin/SalesRevenue";
import StatCard from "@/components/admin/StatCard";
import React from "react";

const analytics = () => {
  const stats = [
    {
      id: 1,
      title: "Total Sales",
      value: "$147,400.58",
      percentage: 1.2,
      percentageType: "calculate in the last 7 days",
      trend: "down",
    },
    {
      id: 2,
      title: "Total Users",
      value: "5,716",
      percentage: 1.2,
      percentageType: "calculate in the last 7 days",
      trend: "up",
    },
    {
      id: 3,
      title: "Total Organizers",
      value: "23",
      percentage: 1.2,
      percentageType: "calculate in the last 7 days",
      trend: "up",
    },
    {
      id: 4,
      title: "Active Organizers",
      value: "10",
      percentage: 1.2,
      percentageType: "calculate in the last 7 days",
      trend: "up",
    },
  ];
  return (
    <Layout>
      <div className="flex flex-col xl:flex-row gap-10 xl:gap-0">
        <div className="w-full">
          <div className="border-t border-dashed border-neutrals100 px-5 py-5">
            <p className="text-baseBlack font-bold mb-7">
              Dashboard <span className="font-normal text-neutrals600">/ Analytics</span>
            </p>

            <div className="w-full">
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

              <div className="flex flex-row gap-2 mt-2">
                <div className="w-full px-1">
                  <SalesRevenue />
                </div>
                <div className="w-full px-1">6</div>
              </div>

              <div className="flex flex-col gap-2 mt-2">
                <div>7</div>
                <div>8</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default analytics;
