// pages/index.js
import { useState } from "react";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Legend,
  Tooltip,
} from "recharts";

export default function EarningsDashboard() {
  const [data] = useState([
    { name: "Income", value: 150540, color: "#068A4F" },
    { name: "Taxes", value: 15540, color: "#F58634" },
    { name: "Fees", value: 8000, color: "#FFD60A" },
  ]);

  const formatCurrency = (value) => {
    return `₦${value.toLocaleString()}`;
  };

  const formatNumber = (num) => {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  return (
    <div className="w-full max-w-[255px] border rounded-[10px] bg-neutrals100/10">
      <div className="p-6">
        <h1 className="text-base font-bold text-baseBlack mb-2">Earnings</h1>

        <div className="mt-5">
          <div className="relative h-[200px] w-full max-w-[300px] flex items-center justify-center">
            <div className="w-full h-full absolute inset-0">
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
                    cornerRadius={0}
                    paddingAngle={0}
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
              <p className="text-3xl font-bold">{formatNumber(5634)}</p>
            </div>
          </div>

          <div className="space-y-6 mt-5">
            <div className="flex flex-col">
              {data.map((item, index) => (
                <div key={index} className="">
                  <div className="flex items-center gap-3 mb-2">
                    <div
                      className="w-3 h-3 rounded-full "
                      style={{ backgroundColor: item.color }}
                    ></div>
                    <p className="text-sm font-medium text-gray-600">
                      {item.name}
                    </p>

                    <p
                      className="text-lg font-semibold"
                      style={{ color: item.color }}
                    >
                      {formatCurrency(item.value)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
