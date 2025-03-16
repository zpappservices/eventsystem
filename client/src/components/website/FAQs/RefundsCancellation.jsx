import React, { useState } from "react";
import CustomAccordion from "./CustomAccordion";

const ComponentData = [
  {
    id: 1,
    question: "Can I get a refund for my ticket?",
    answer: `Refund policies vary by event. Check the event’s refund policy on the ticket page before purchasing.`,
  },
  {
    id: 2,
    question: "How do I request a refund?",
    answer: `If eligible, go to your account, find the ticket, and click "Request Refund." If you need assistance, contact our support team.`,
  },
];

const RefundsCancellation = () => {
  const [expandedId, setExpandedId] = useState(null);

  const handleTogglePanel = (id) => {
    setExpandedId((cur) => (cur === id ? null : id));
  };

  return (
    <div>
      <h4 className="lg:text-[24px] md:text-[20px] text-[15px] leading-[120%] font-bold mb-3">
        Refunds & Cancellation
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

export default RefundsCancellation;
