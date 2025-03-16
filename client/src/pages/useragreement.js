import { useRouter } from "next/router";
import React from "react";

const UserAgreement = () => {
  const router = useRouter();

  const goBack = () => {
    router.back();
  };
  return (
    <div className="min-h-screen bg-gray-100 p-6 sm:p-12">
      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg p-8">
        <p
          className="flex items-center gap-x-2 text-[18px] font-medium cursor-pointer mr-auto mb-5"
          onClick={goBack}>
          <img src="/img/return.svg" />
          Back
        </p>
        <h1 className="text-3xl font-bold text-gray-900 mb-6">
          User Agreement
        </h1>
        <p className="text-gray-700 mb-6">
          This User Agreement ("Agreement") outlines the terms and conditions
          governing the use of Zafariplus Limited’s online event ticketing
          system ("Platform"). By accessing or using the Platform, you agree to
          this Agreement.
        </p>

        <h2 className="text-xl font-semibold text-gray-800 mb-4">
          1. Definitions
        </h2>
        <ul className="list-disc pl-6 text-gray-700 mb-4 space-y-2">
          <li>
            <strong>Platform:</strong> The online event ticketing system
            operated by Zafariplus Limited.
          </li>
          <li>
            <strong>User:</strong> Any individual or entity that accesses or
            uses the Platform.
          </li>
        </ul>

        <h2 className="text-xl font-semibold text-gray-800 mb-4">
          2. Account Registration
        </h2>
        <p className="text-gray-700 mb-4">
          Users must create an account and provide accurate information. They
          are responsible for maintaining the confidentiality of their
          credentials.
        </p>

        <h2 className="text-xl font-semibold text-gray-800 mb-4">
          3. Ticket Purchase and Delivery
        </h2>
        <p className="text-gray-700 mb-4">
          Ticket sales are final, except as specified in the refund policy.
          Tickets are delivered electronically unless otherwise stated.
        </p>

        <h2 className="text-xl font-semibold text-gray-800 mb-4">
          4. User Conduct
        </h2>
        <ul className="list-disc pl-6 text-gray-700 mb-4 space-y-2">
          <li>Use the Platform for lawful purposes only.</li>
          <li>Do not engage in fraudulent activities.</li>
          <li>Users must be 18+ to make transactions.</li>
        </ul>

        <h2 className="text-xl font-semibold text-gray-800 mb-4">
          5. Liability and Disclaimers
        </h2>
        <p className="text-gray-700 mb-4">
          Zafariplus Limited is not liable for event cancellations, delays, or
          damages resulting from actions of Event Organizers.
        </p>

        <h2 className="text-xl font-semibold text-gray-800 mb-4">
          6. Contact Information
        </h2>
        <p className="text-gray-700">
          Email: cs@zafariplus.com | Phone: +2349032335845
        </p>
      </div>
    </div>
  );
};

export default UserAgreement;
