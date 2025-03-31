import React, { useState } from "react";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";

const TopCategoriesStats = () => {
  const [periodSelection, setPeriodSelection] = useState("Monthly");

  // Data for the pie chart categories
  const data = [
    { name: "Comedy", value: 89000, color: "#068a4f" }, // Green
    { name: "Concert", value: 55000, color: "#e9967a" }, // Orange
    { name: "Business", value: 35000, color: "#5fb8d5" }, // Light blue
    { name: "others", value: 9245, color: "#708090" }, // Gray
  ];

  // Calculate total value
  const total = data.reduce((sum, item) => sum + item.value, 0);

  // Format number with commas
  const formatNumber = (num) => {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  return (
    <div className="p-6 rounded-[10px] border border-neutrals100/30 shadow-md max-w-[312px] w-full">
      <div className="flex justify-between items-center mb-4">
        <h2 className="font-bold">Top Categories</h2>

        <div className="bg-green-50 rounded-full px-4 py-2">
          <button className="flex items-center text-base font-medium">
            {periodSelection}
            <svg
              className="w-5 h-5 ml-1"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M19 9l-7 7-7-7"
              ></path>
            </svg>
          </button>
        </div>
      </div>

      <div className="relative h-[300px] flex items-center justify-center">
        <div className="absolute inset-0">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius="70%"
                outerRadius="80%"
                startAngle={90}
                endAngle={-270}
                dataKey="value"
                strokeWidth={0}
                cornerRadius={5}
                paddingAngle={3}
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="text-center z-10">
          <p className="text-gray-500 text-sm mb-1">Total</p>
          <p className="text-3xl font-bold">{formatNumber(total)}</p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-x-4 gap-y-3 mt-2">
        {data.map((category, index) => (
          <div key={index} className="flex items-center">
            <span
              className="w-5 h-5 rounded mr-2"
              style={{ backgroundColor: category.color }}
            ></span>
            <span className="font-medium">{category.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TopCategoriesStats;
