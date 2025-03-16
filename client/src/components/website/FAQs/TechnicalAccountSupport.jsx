import React, { useState } from "react";
import CustomAccordion from "./CustomAccordion";

const ComponentData = [
  {
    id: 1,
    question: "I lost my ticket. What should I do?",
    answer: `Log into your account and re-download your ticket from the "My Tickets" section.`,
  },
  {
    id: 2,
    question: "How do I contact customer support?",
    answer: (
      <p>
        You can reach us via live chat, email at{" "}
        <a
          href={`mailto:cs@zafariplus.com`}
          className="text-green-600 underline hover:text-green-700"
        >
          cs@zafariplus.com
        </a>
      </p>
    ),
  },
  {
    id: 3,
    question: "How do I reset my password?",
    answer: `Click on "Forgot Password" on the login page and follow the instructions to reset it.`,
  },
];

const TechnicalAccountSupport = () => {
  const [expandedId, setExpandedId] = useState(null);

  const handleTogglePanel = (id) => {
    setExpandedId((cur) => (cur === id ? null : id));
  };

  return (
    <div>
      <h4 className="lg:text-[24px] md:text-[20px] text-[15px] leading-[120%] font-bold mb-3">
        Technical & Account support
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

export default TechnicalAccountSupport;
