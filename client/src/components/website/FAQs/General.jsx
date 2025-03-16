import React, { useState } from "react";
import CustomAccordion from "./CustomAccordion";

const ComponentData = [
  {
    id: 1,
    question: "What is ticket.Zafariplus?",
    answer: `ticket.zafariplus.com is an online event ticketing platform that allows users to discover, buy, and sell tickets for various events, including concerts, sports, theater, conferences, and more.`,
  },
  {
    id: 2,
    question: "How do I create an account to sell tickets?",
    answer: `Click on the "Create an Event / Log in" button at the top right of the homepage and follow the instructions to register using your email or Gmail account.`,
  },
  {
    id: 3,
    question: "Do I need an account to buy tickets?",
    answer: `Yes, an account is required to track your ticket purchases, receive event updates, and manage your bookings. Click on the “Sign in to buy” button on the top right of the home page and follow the instructions to create an account in order to buy a ticket.`,
  },
  {
    id: 4,
    question: "Is it safe to buy tickets on ticket.zafariplus.com?",
    answer: `Absolutely! We use secure payment gateways and encryption to protect your transactions.`,
  },
];

const General = () => {
  const [expandedId, setExpandedId] = useState(null);

  const handleTogglePanel = (id) => {
    setExpandedId((cur) => (cur === id ? null : id));
  };

  return (
    <div>
      <h4 className="lg:text-[24px] md:text-[20px] text-[15px] leading-[120%] font-bold mb-3">
        General Questions
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

export default General;
