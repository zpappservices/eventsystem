import { FaCalendarAlt } from "react-icons/fa";
import { LiaExclamationCircleSolid } from "react-icons/lia";

export default function WeeklyStats() {
  const stats = [
    {
      label: "Total Event Published",
      value: "55,550.00",
      change: "+1.2%",
    },
    {
      label: "Total Sold Tickets",
      value: "247,520",
      change: "+1.2%",
    },
    {
      label: "Active Events",
      value: "20",
      change: "+1.2%",
    },
  ];

  return (
    <div className="w-full flex flex-col md:flex-row items-center justify-between gap-6 p-5">
      <div className="flex items-center gap-3 min-w-[150px]">
        <FaCalendarAlt className="text-primary text-xl" />
        <span className="text-lg font-medium text-primary">This Week</span>
      </div>

      {/* Divider */}
      <div className="hidden md:block w-px bg-black h-20" />

      <div className="flex-1 grid lg:grid-cols-2 xl:grid-cols-3 gap-10 items-center justify-around w-full">
        {stats.map((item, index) => {
          const isBorder = index < 2;
          return (
            <div
              key={index}
              className={`${isBorder ? "2xl:border-r border-black" : ""}`}
            >
              <div className="w-full max-w-[242px] mx-auto flex flex-col items-center md:items-start gap-2.5 text-center md:text-left">
                <div className="w-full flex items-center gap-2 text-neutrals600 text-sm font-medium">
                  <span className="text-sm">{item.label}</span>
                  <LiaExclamationCircleSolid className="text-neutrals400 ms-auto text-lg" />
                </div>
                <div className="w-full flex gap-5 items-center">
                  <p className="text-2xl font-semibold text-black">
                    {item.value}
                  </p>
                  <div className="text-right ms-auto">
                    <span className="text-xs text-primary bg-primary100 px-2 py-0.5 rounded-md">
                      ↑ {item.change}
                    </span>

                    <p className="text-right text-xs text-neutrals500">
                      from last week
                    </p>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
