import React, { useState } from "react";
import { FaSortDown } from "react-icons/fa6";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import OptionsInput from "../widgets/OptionsInput";

const data = [
  { name: "Jan", sales: 3500 },
  { name: "Feb", sales: 2300 },
  { name: "Mar", sales: 4000 },
  { name: "Apr", sales: 5800 },
  { name: "May", sales: 4200 },
  { name: "Jun", sales: 4800 },
  { name: "Jul", sales: 3500 },
  { name: "Aug", sales: 5500 },
  { name: "Sep", sales: 4200 },
  { name: "Oct", sales: 4800 },
  { name: "Nov", sales: 3500 },
  { name: "Dec", sales: 5500 },
];

const SalesRevenue = () => {
  const [period, setPeriod] = useState("This Month");
  const [yearSelection, setYearSelection] = useState("2025");

  const handlePeriodChange = (name, value) => {
    setPeriod(value);
  };

  const handleYearChange = (name, value) => {
    setYearSelection(value);
  };

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="p-3 shadow-md rounded-lg bg-white">
          <p className="text-sm font-medium">{label}</p>
          {payload.map((entry, index) => (
            <p key={index} className="text-sm" style={{ color: entry.color }}>
              {entry.name}: {entry.value}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="p-6 rounded-[20px] shadow-md w-full max-w-[527px]">
      <div className="flex justify-between items-center mb-8">
        <div className="flex items-center">
          <h2 className="text-baseBlack font-bold">Sales Revenue</h2>
          <div className="mx-4 bg-neutrals400 rounded-full font-bold h-6 w-1"></div>
          <OptionsInput
            value={yearSelection}
            options={[
              { label: "2025", value: "2025" },
              { label: "2024", value: "2024" },
              { label: "Last Year", value: "Last Year" },
              { label: "2 Years ago", value: "2 Years ago" },
              { label: "3 Years ago", value: "3 Years ago" },
            ]}
            openIcon={<FaSortDown className="text-[18px] text-baseBlack -mt-2" />}
            style="rounded-[8px] !py- !px-2.5 !border-none"
            onChange={handleYearChange}
          />
        </div>

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

      <div className="h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data} margin={{ top: 5, right: 0, left: 0, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#F0F0F0" vertical={false} />
            <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: "#666" }} />
            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fill: "#666" }}
              ticks={[0, 1000, 2000, 3000, 4000, 5000, 6000]}
            />
            <Tooltip content={<CustomTooltip />} />
            <Line
              type="monotone"
              dataKey="sales"
              stroke="#068a4f"
              strokeWidth={2}
              dot={false}
              activeDot={{ r: 8, fill: "#068a4f" }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default SalesRevenue;
