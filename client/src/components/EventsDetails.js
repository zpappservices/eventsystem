import { useRouter } from "next/router";
import CustomAccordion from "./Accordion";
import BreadCrumb from "./BreadCrumb";
import Button from "./Button";
import Quantity from "./Quantity";
import StyledImage from "./StyledImage";
import { useTicketContext } from "@/context/TicketContext";
import { toast } from "react-toastify";
import { convertTo12HourFormat } from "@/utils/time";
import moment from "moment";
import { MdAccessTime, MdLocationPin } from "react-icons/md";
import { BsCalendar2Date } from "react-icons/bs";
import { createTicketContext } from "@/utils/ticket";
import { useState } from "react";
import useAuthToken from "@/hooks/useAuthToken";

const eventDetails = {
  name: "Night of a Thousand Laughs",
  image: "/img/event1.svg",
  date: "November 19th, 2024",
};

const EventsDetails = ({ id, details }) => {
  const event = details?.EventTicket;
  const [tickets, setTickets] = useState([]);

  const router = useRouter();
  const { activeUser, token } = useAuthToken();

  const totalInStock = event?.reduce((acc, ticket) => acc + ticket.quantity, 0);
  const totalQuantity = tickets?.reduce(
    (acc, ticket) => acc + ticket.quantity,
    0
  );

  const totalCost = tickets.reduce(
    (acc, ticket) => acc + ticket.amount * ticket.quantity,
    0
  );

  const handleClick = () => {
    if (!activeUser && !activeUser) {
      toast.info("Please sign in to proceed with the purchase.");
      return;
    }

    const serializedData = {
      id: id,
      tickets: JSON.stringify(tickets),
      eventDetails: JSON.stringify({
        totalQuantity: totalQuantity,
        totalCost: `${totalCost}`,
        eventName: details?.title,
        banner: details?.image_banner,
        currency: details?.currency,
      }),
    };

    router.push({
      pathname: "/payment",
      query: serializedData,
    });
  };

  const { currency } = details || {};

  return (
    <div className="w-full flex flex-col gap-6">
      <div className="w-full flex flex-col md:flex-row justify-between gap-6">
        <div className="w-full max-w-[551px] cursor-pointer rounded-lg">
          <StyledImage
            src={details?.image_banner ?? "/img/event1.svg"}
            className="w-full"
          />
          <div className="mt-5">
            <p className="text-[16px] leading-normal capitalize flex items-center">
              <MdLocationPin size={19} />
              <span className="font-semibold mx-0.5">Location: </span>{" "}
              {details?.location}
            </p>
            <p className="text-[16px] leading-normal capitalize flex items-center">
              <BsCalendar2Date size={16} />
              <span className="font-semibold mx-1.5">Date: </span>{" "}
              {moment(details?.StartDate).format("YYYY-MM-DD")} -{" "}
              {moment(details?.EndDate).format("YYYY-MM-DD")}
            </p>
            <p className="text-[16px] leading-normal capitalize flex items-center">
              <MdAccessTime size={19} />
              <span className="font-semibold mx-0.5">Time: </span>{" "}
              {convertTo12HourFormat(details?.StartTime)} -{" "}
              {convertTo12HourFormat(details?.EndTime)}
            </p>
          </div>
        </div>
        <div className="w-full max-w-[578px] flex flex-col gap-4 cursor-pointer">
          <div>
            <p className="text-[20px] font-semibold leading-snug">
              {details?.title}
            </p>
            {totalInStock > 0 ? (
              <p className="text-[#1FCA59] text-[16px] leading-snug">
                In stock {totalInStock} tickets
              </p>
            ) : (
              <p className="text-red-600 text-[16px] leading-snug">
                In stock {totalInStock} tickets
              </p>
            )}
          </div>
          <div className="w-full flex flex-col gap-2  border-b-2 border-gray-400 pb-2.5">
            {event?.map(({ price, name, quantity }, index) => (
              <div
                key={index}
                className="flex justify-between items-center gap-4"
              >
                <p className="text-[16px] leading-snug">{name} </p>
                <p className="text-[16px] leading-snug ms-auto mr-3">
                  <span className="font-semibold ms-5 mr-0.5">
                    {currency === "USD" && "$"}
                    {currency === "NGN" && "₦"}
                    {currency === "GHS" && "GH₵"}
                    {currency === "ZAR" && "R"}
                    {!currency && "₦"}
                  </span>
                  {price.toLocaleString()}
                </p>
                <Quantity
                  inStock={quantity}
                  onChange={setTickets}
                  item={{ name: name, amount: price }}
                />
              </div>
            ))}
          </div>
          <div className="flex flex-wrap items-center justify-between gap-1 border-b-2 border-gray-400 pb-4">
            <p className="text-[16px] leading-snug">
              <span className="font-bold">Total Quantity:</span> {totalQuantity}
            </p>
            <p className="text-[16px] leading-snug">
              <span className="font-bold">Total Amount:</span>{" "}
              <span className="font-semibold">₦</span>
              {totalCost.toLocaleString()}
            </p>
          </div>
          <div className="w-full flex flex-col gap-4 my-3">
            <Button
              container="w-full max-w-none"
              disabled={tickets.length < 1}
              onClick={handleClick}
            >
              CHECKOUT
            </Button>
          </div>

          <div>
            <CustomAccordion description={details?.description} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventsDetails;
