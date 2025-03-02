import React, { useEffect, useRef, useState } from "react";
import { FaEye } from "react-icons/fa";
import { useModal } from "@/hooks/useModal";
import DynamicModal from "../widgets/DynamicModal";
import TicketDetails from "./TicketDetails";
import useApiRequest from "@/hooks/useApiRequest";
import { useRouter } from "next/router";

const TableContent = ({ data, isLastItem }) => {
  const router = useRouter();
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
    lastName,
    firstName,
  } = data || {};

  const { isOpen, closeModal, openModal } = useModal();

  const { data:eventData, error, loading, request } = useApiRequest({
    method: "get",
    url: `event/getoneevent/${eventId}`,
    data: null,
    headers: null,
    useToken: true,
  });

  const getEvent = async () => {
    await request();
  };

  useEffect(() => {
    if (router.isReady && eventId) {
      getEvent();
    }
  }, [eventId]);

  const { data: event = {} } = eventData || {};

  return (
    <tr
      className={`text-[14px] text-baseBlack ${isLastItem ? "" : "border-b"}`}
    >
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
            status !== "PENDING" ? "bg-primary200" : "bg-sec300"
          }`}
        >
          {status}
        </p>
      </td>
      <td>
        <FaEye
          className="text-[18px] text-baseBlack text-center mx-auto cursor-pointer"
          onClick={openModal}
        />
      </td>

      <DynamicModal open={isOpen} onClose={closeModal}>
        <TicketDetails
          data={data}
          event={event}
          name={
            firstName || lastName ? `${firstName} ${lastName}`.trim() : "N/A"
          }
        />
      </DynamicModal>
    </tr>
  );
};

export default TableContent;
