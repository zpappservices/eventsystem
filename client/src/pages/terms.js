// /pages/terms.js
import Head from "next/head";

export default function Terms() {
  return (
    <>
      <Head>
        <title>Terms and Conditions - Zafariplus</title>
        <meta
          name="description"
          content="Terms and Conditions for using Zafariplus services."
        />
      </Head>
      <div className="bg-gray-50 min-h-screen py-10 px-6">
        <div className="max-w-4xl mx-auto bg-white shadow-md rounded-lg p-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-6">
            Terms and Conditions
          </h1>
          <p className="text-gray-600 mb-4">
            This agreement outlines the terms and conditions under which users
            (“You” or “User”) may utilize the online event ticketing services
            provided by Zafariplus Limited (“Zafariplus,” “We,” or “Us”). By
            accessing or using our services, you agree to the terms and
            conditions detailed below.
          </p>

          <section className="mb-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-2">
              1. Service Description
            </h2>
            <p className="text-gray-600">
              Zafariplus Limited provides an online platform for the creation,
              promotion, management, and ticketing of events. Users can create
              events, purchase tickets, and track sales through our system.
            </p>
          </section>

          <section className="mb-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-2">
              2. User Responsibilities
            </h2>
            <ul className="list-disc list-inside text-gray-600 space-y-2">
              <li>
                <strong>Event Creation:</strong> Users are responsible for
                providing accurate and complete information about events,
                including the event title, description, date, time, venue, and
                pricing.
              </li>
              <li>
                Users must ensure that all events comply with applicable laws
                and regulations.
              </li>
              <li>
                <strong>Ticket Sales and Pricing:</strong> Users set ticket
                prices and quantities for their events and are responsible for
                applicable taxes, fees, or surcharges.
              </li>
              <li>
                <strong>Customer Support:</strong> Users must provide timely
                support to attendees and address ticket-related issues as they
                arise.
              </li>
            </ul>
          </section>

          <section className="mb-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-2">
              3. Fees and Payments
            </h2>
            <ul className="list-disc list-inside text-gray-600 space-y-2">
              <li>
                <strong>Platform Fees:</strong> Zafariplus charges a platform
                fee for each ticket sold, which is agreed upon during
                registration and deducted automatically from ticket sales.
              </li>
              <li>
                <strong>Payment Processing:</strong> Payments for ticket sales
                will be processed and remitted to the User within the agreed
                timeline, minus applicable fees.
              </li>
            </ul>
          </section>

          {/* Repeat similar blocks for other sections */}
          <section className="mb-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-2">
              4. Refunds and Cancellations
            </h2>
            <p className="text-gray-600">
              Users must clearly state their refund and cancellation policies on
              their event page. Refunds are the responsibility of the user
              managing the event.
            </p>
          </section>

          <section className="mb-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-2">
              12. Contact Information
            </h2>
            <p className="text-gray-600">
              For questions or concerns regarding these terms, please contact
              Zafariplus Limited at:
            </p>
            <ul className="list-disc list-inside text-gray-600 mt-2">
              <li>
                <strong>Email:</strong>{" "}
                <a href="mailto:cs@zafariplus.com" className="text-primary">
                  cs@zafariplus.com
                </a>
              </li>
              <li>
                <strong>Phone:</strong> +2349032335845
              </li>
            </ul>
          </section>
        </div>
      </div>
    </>
  );
}
