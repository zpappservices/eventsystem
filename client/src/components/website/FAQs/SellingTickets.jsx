import React, { useState } from "react";
import CustomAccordion from "./CustomAccordion";

const ComponentData = [
  {
    id: 1,
    question: "Are there any fees for selling tickets?",
    answer: (
      <ul className="list-disc pl-5">
        <li>
          Yes, we charge a small service fee per ticket sold. For details, contact our sales team at{" "}
          <a
            href={`mailto:sales@zafariplus.com`}
            className="text-green-600 underline hover:text-green-700"
          >
            sales@zafariplus.com
          </a>
          .
        </li>
      </ul>
    ),
  },
  {
    id: 2,
    question: "How do I sell tickets on ticket.zafariplus.com",
    answer: (
      <ul className="list-disc pl-5">
        <li>Sign up as an event organizer.</li>
        <li>Create an event and set up ticket types and pricing.</li>
        <li>Publish the event and start selling tickets.</li>
      </ul>
    ),
  },
  {
    id: 3,
    question: "How and when do I get paid for ticket sales?",
    answer: `Payments are processed after the event ends and transferred to your bank account or preferred payment method for some vendors, payments are remitted immediately per sales.`,
  },
];

const SellingTickets = () => {
  const [expandedId, setExpandedId] = useState(null);

  const handleTogglePanel = (id) => {
    setExpandedId((cur) => (cur === id ? null : id));
  };

  return (
    <div>
      <h4 className="lg:text-[24px] md:text-[20px] text-[15px] leading-[120%] font-bold mb-3">
        Selling Tickets
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

export default SellingTickets;
