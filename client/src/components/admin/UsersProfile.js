import React from "react";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";

const data = [
  { name: "Series 1", value: 55, color: "#068a4f" },
  { name: "Series 2", value: 30, color: "#f97316" },
  { name: "Series 3", value: 15, color: "#6b7280" },
];

const UsersProfileChart = () => {
  return (
    <div className="p-6 rounded-[20px] shadow-md w-full">
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-semibold text-lg text-black">Users Profile</h3>
        <button className="text-gray-500 hover:text-black">
          <span className="text-xl">⋮</span>
        </button>
      </div>

      <div className="flex items-center justify-between">
        <ResponsiveContainer width={120} height={120}>
          <PieChart>
            <Pie data={data} cx="50%" cy="50%" innerRadius={35} outerRadius={50} dataKey="value">
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>

        {/* Legend */}
        <div className="ml-4 space-y-2 text-sm">
          {data.map((entry, index) => (
            <div key={index} className="flex items-center space-x-2">
              <span
                className="w-3 h-3 rounded inline-block"
                style={{ backgroundColor: entry.color }}
              ></span>
              <span className="text-gray-700">{entry.name}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default UsersProfileChart;
