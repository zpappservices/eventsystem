import { getEventDetails } from "@/apis/eventsServices";
import CustomAccordion from "@/components/Accordion";
import Layout from "@/components/Layout";
import Quantity from "@/components/Quantity";
import Button from "@/components/widgets/Button";
import useLoading from "@/hooks/useLoading";
import { formatCurrencyWithoutDecimal } from "@/utils/conversions";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

const checkout = () => {
  const [event, setEvent] = useState();
  const [tickets, setTickets] = useState([]);

  const router = useRouter();
  const { id } = router.query;
  const { isLoading, startLoading, stopLoading } = useLoading(true);

  const fetchEvents = async () => {
    const { message, success, data, error } = await getEventDetails(
      id,
      startLoading,
      stopLoading
    );

    if (success) {
      setEvent(data?.EventTicket);
    }
  };

  const { currency } = event?.details || {};
  const details = event?.details;

  const totalInStock = event?.reduce((acc, ticket) => acc + ticket.quantity, 0);
  const totalQuantity = tickets?.reduce(
    (acc, ticket) => acc + ticket.quantity,
    0
  );

  const totalCost = tickets?.reduce(
    (acc, ticket) => acc + ticket.amount * ticket.quantity,
    0
  );

  const platformFee = details?.platformFee ? totalCost * 0.015 : 0;
  const finalTotalCost = totalCost + platformFee;

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
        totalCost: `${finalTotalCost.toFixed(2)}`,
        eventName: details?.title,
        banner: details?.image_banner,
        currency: details?.currency,
        platformFee: platformFee,
      }),
    };

    router.push({
      pathname: "/payment",
      query: serializedData,
    });
  };

  useEffect(() => {
    if (id) {
      fetchEvents();
    }
  }, [id]);

  if (isLoading)
    return (
      <Layout>
        <div className="h-[200px] flex justify-center items-center">
          <Loader2 className="animate-spin" />
        </div>
      </Layout>
    );

  return (
    <Layout>
      <div className="w-full max-w-[578px] mx-auto flex flex-col gap-4 cursor-pointer">
        <div>
          <p className="text-[20px] font-semibold leading-snug">
            {details?.title}
          </p>
          {/* {totalInStock > 0 ? (
              <p className="text-[#1FCA59] text-[16px] leading-snug">
                In stock {totalInStock} tickets
              </p>
            ) : (
              <p className="text-red-600 text-[16px] leading-snug">
                In stock {totalInStock} tickets
              </p>
            )} */}
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
                {price?.toString()?.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
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
            <span>{formatCurrencyWithoutDecimal(totalCost)}</span>
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
    </Layout>
  );
};

export default checkout;
