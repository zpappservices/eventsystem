import React, { useState } from "react";
import CustomAccordion from "./CustomAccordion";

const ComponentData = [
  {
    id: 1,
    question: "How can I find event details?",
    answer: `You can find event details, including date, time, venue, and ticket prices, on the event page.`,
  },
  {
    id: 2,
    question: "What happens if an event is canceled or rescheduled?",
    answer: `Zafariplus is not responsible for events, we are an online ticketing platform, If an event is canceled, we will ensure we work with the vendor to get you a refund. If rescheduled, your ticket will remain valid for the new date, or you can request a refund if eligible base on vendor’s discretion.`,
  },
];

const EventInformation = () => {
  const [expandedId, setExpandedId] = useState(null);

  const handleTogglePanel = (id) => {
    setExpandedId((cur) => (cur === id ? null : id));
  };

  return (
    <div>
      <h4 className="lg:text-[24px] md:text-[20px] text-[15px] leading-[120%] font-bold mb-3">
        Event Information
      </h4>
      <div className="space-y-4">
        {ComponentData.map((item) => (
          <CustomAccordion
            key={item.id}
            question={item.question}
            answer={item.answer}
            id={item.id}
            expandedId={expandedId}
            onTogglePanel={handleTogglePanel}
          />
        ))}
      </div>
    </div>
  );
};

export default EventInformation;
