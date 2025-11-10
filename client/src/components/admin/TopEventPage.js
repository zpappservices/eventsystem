import React from "react";
import { FiArrowUpRight } from "react-icons/fi";

const topPages = [
  { title: "Evolution of ...", status: "Active" },
  { title: "Evolution of ...", status: "Active" },
  { title: "Evolution of ...", status: "Active" },
];

const TopEventPage = () => {
  return (
    <div className="p-6 rounded-[20px] shadow-md w-full">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="font-semibold text-lg text-black">Top Event Page</h3>
          <p className="text-sm text-gray-400">Most visited page</p>
        </div>
        <button className="text-gray-500 hover:text-black">
          <span className="text-xl">⋮</span>
        </button>
      </div>

      <div className="space-y-3 divide-y">
        {topPages.map((item, index) => (
          <div key={index} className="flex justify-between items-center py-2">
            <div className="flex items-center gap-2 text-sm text-gray-700">
              <FiArrowUpRight className="text-lg text-gray-400" />
              <span>{item.title}</span>
            </div>
            <div className="flex items-center bg-green-100 text-green-700 text-xs px-2 py-1 rounded-full gap-2">
              <span>{item.status}</span>
              <span className="w-2 h-2 bg-green-500 rounded-full"></span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TopEventPage;
