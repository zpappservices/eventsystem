import React, { useEffect, useRef, useState } from "react";
import { FaEye } from "react-icons/fa";

const EventsTableContent = ({ data, isLastItem }) => {
  const {
    id,
    batchId,
    eventId,
    eventName,
    userId,
    ticketId,
    ticket,
    price,
    status,
    checkIn,
    active,
  } = data || {};

  return (
    <tr
      className={`text-[14px] text-baseBlack ${isLastItem ? "" : "border-b"}`}>
      <th className="px-2 py-3.5">{ticket}</th>
      <th className="px-2 py-3.5">{price}</th>
      <th className="px-2 py-3.5">
        {checkIn ? "Checked In" : "Not Checked In"}
      </th>
      <th className="px-2 py-3.5">{active ? "active" : "not active"}</th>
      <th className="px-2 py-3.5">{ticketId}</th>
      <td className="px-2 py-3.5">
        <p
          className={`text-baseBlack text-center rounded-sm p-2 ${
            !status === "PENDING" ? "bg-primary200" : "bg-accent500"
          }`}>
          {status}
        </p>
      </td>
      <td>
        <FaEye className="text-[18px] text-baseBlack text-center mx-auto cursor-pointer" />
      </td>
    </tr>
  );
};

export default EventsTableContent;
