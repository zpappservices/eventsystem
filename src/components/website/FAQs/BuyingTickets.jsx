import React, { useState } from "react";
import CustomAccordion from "./CustomAccordion";

const ComponentData = [
  {
    id: 1,
    question: "How do I purchase tickets?",
    answer: (
      <ul className="list-disc pl-5">
        <li>Browse or search for an event.</li>
        <li>Select your preferred ticket type and quantity.</li>
        <li>Proceed to checkout and complete your payment.</li>
        <li>
          If you have registered with us as a user, login and proceed to payment if you have not yet
          register with us, proceed to Click on the “Sign in to buy” button on the top right of the
          home page and follow the instructions to create an account in order to buy a ticket.
        </li>
        <li>Receive your e-ticket via email or in your account dashboard.</li>
      </ul>
    ),
  },
  {
    id: 2,
    question: "What payment methods do you accept?",
    answer: `We accept major credit/debit cards.`,
  },
  {
    id: 3,
    question: "Can I buy tickets for someone else?",
    answer: `Yes! Simply enter their details when checking out, or forward them the e-ticket after purchase.`,
  },
  {
    id: 4,
    question: "Will I receive a physical ticket?",
    answer: `Most of our tickets are digital (e-tickets). Some events may offer physical ticket delivery, which will be mentioned in the event details.`,
  },
];

const BuyingTickets = () => {
  const [expandedId, setExpandedId] = useState(null);

  const handleTogglePanel = (id) => {
    setExpandedId((cur) => (cur === id ? null : id));
  };

  return (
    <div>
      <h4 className="lg:text-[24px] md:text-[20px] text-[15px] leading-[120%] font-bold mb-3">
        Buying Tickets
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

export default BuyingTickets;
