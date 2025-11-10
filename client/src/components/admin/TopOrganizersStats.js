import React, { useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";
import OptionsInput from "../widgets/OptionsInput";
import { FaSortDown } from "react-icons/fa6";

const TopOrganizersStats = () => {
  const [period, setPeriod] = useState("This Month");

  const handlePeriodChange = (name, value) => {
    setPeriod(value);
  };

  // Data for the top organizers bar chart
  const data = [
    { name: "Org A", tickets: 850 },
    { name: "Org B", tickets: 670 },
    { name: "Org C", tickets: 580 },
    { name: "Org D", tickets: 480 },
    { name: "Org E", tickets: 380 },
  ];

  return (
    <div className="w-full max-w-[312px] md:w-[312px] p-6 rounded-3xl shadow">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-baseBlack font-bold">Top Organizer</h2>

        <OptionsInput
          value={period}
          options={[
            { label: "This Month", value: "This Month" },
            { label: "This Year", value: "This Year" },
            { label: "Last Year", value: "Last Year" },
            { label: "2 Years ago", value: "2 Years ago" },
            { label: "3 Years ago", value: "3 Years ago" },
          ]}
          openIcon={<FaSortDown className="text-[18px] text-baseblack -mt-2" />}
          style="rounded-[8px] !py-2.5 !px-2.5 !border-none bg-primary100/50 !font-bold"
          selectedStyle="!text-xs !font-bold text-baseBlack"
          onChange={handlePeriodChange}
        />
      </div>

      <div className="h-[176px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={data}
            margin={{ top: 20, right: 10, left: 10, bottom: 20 }}
            barSize={18}
          >
            <CartesianGrid vertical={false} stroke="#f0f0f0" />
            <XAxis
              dataKey="name"
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 14 }}
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 14 }}
              domain={[0, 1000]}
              ticks={[0, 200, 400, 600, 800, 1000]}
              label={{
                value: "Sold Tickets",
                angle: -90,
                position: "insideLeft",
                style: { textAnchor: "middle" },
                offset: 0,
              }}
            />
            <Bar
              dataKey="tickets"
              fill="#2e8b57"
              radius={[8, 8, 0, 0]}
              isAnimationActive={false}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default TopOrganizersStats;
