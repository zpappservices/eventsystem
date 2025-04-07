import React, { useState, useEffect } from "react";
import { BsHourglassSplit } from "react-icons/bs";
import { FaAngleDown } from "react-icons/fa";
import { FaCircleCheck } from "react-icons/fa6";

const tickets = [
  { title: "Evolution of Wash...", percentage: 70 },
  { title: "Galaxy Night Ride", percentage: 55 },
  { title: "Mystic Forest Trek", percentage: 82 },
  { title: "Neon Festival Blast", percentage: 40 },
  { title: "Sunset Chill Vibes", percentage: 66 },
];

const TicketSales = () => {
  const [animate, setAnimate] = useState(false);
  const [tooltip, setTooltip] = useState({
    visible: false,
    content: null,
    x: 0,
    y: 0,
  });

  useEffect(() => {
    // Trigger animation after component mounts
    const timer = setTimeout(() => setAnimate(true), 100);
    return () => clearTimeout(timer);
  }, []);

  const handleMouseMove = (e, type, value) => {
    const content =
      type === "sold" ? (
        <div className="flex items-center gap-1">
          <FaCircleCheck className="text-green-400" />
          <span className="text-white text-xs">Sold: {value}%</span>
        </div>
      ) : (
        <div className="flex items-center gap-1">
          <BsHourglassSplit className="text-orange-300" />
          <span className="text-white text-xs">Remaining: {value}%</span>
        </div>
      );
    setTooltip({
      visible: true,
      content,
      x: e.clientX + 10,
      y: e.clientY + 10,
    });
  };

  const hideTooltip = () => {
    setTooltip((prev) => ({ ...prev, visible: false }));
  };

  return (
    <div className="p-6 rounded-[20px] shadow-md w-full max-w-[351px]">
      <div className="flex justify-between items-center mb-4 gap-10">
        <h2 className="text-baseBlack font-bold">Most Sold Ticket</h2>
        <p className="text-sm text-gray-500 flex items-center gap-1">
          Last 7 days
          <span>
            <FaAngleDown />
          </span>
        </p>
      </div>
      {tickets.map((ticket, index) => (
        <div key={index} className="mb-4">
          <div className="flex justify-between text-sm text-gray-700">
            <span>{ticket.title}</span>
            <span>{ticket.percentage}%</span>
          </div>
          <div className="w-full h-2 mt-1 bg-white rounded-full overflow-hidden flex gap-1">
            <div
              className={`h-full bg-[#068a4f] rounded-full transition-all duration-700 ease-in-out`}
              style={{
                width: animate ? `${ticket.percentage}%` : "0%",
                transitionDelay: `${index * 100}ms`,
              }}
              onMouseMove={(e) => handleMouseMove(e, "sold", ticket.percentage)}
              onMouseLeave={hideTooltip}
            ></div>

            <div
              className="h-full flex justify-end bg-green-100 rounded-full transition-all duration-700 ease-in-out"
              style={{
                width: animate ? `${100 - ticket.percentage}%` : "100%",
                transitionDelay: `${index * 100}ms`,
              }}
              onMouseMove={(e) => handleMouseMove(e, "remaining", 100 - ticket.percentage)}
              onMouseLeave={hideTooltip}
            >
              <div className="w-[7px] h-full bg-[#068a4f] rounded-full"></div>
            </div>
          </div>
        </div>
      ))}

      {tooltip.visible && (
        <div
          className="fixed z-50 bg-black text-baseWhite text-xs px-3 py-1 rounded shadow-lg pointer-events-none transition-opacity duration-150"
          style={{
            left: tooltip.x,
            top: tooltip.y,
          }}
        >
          {tooltip.content}
        </div>
      )}
    </div>
  );
};

export default TicketSales;
