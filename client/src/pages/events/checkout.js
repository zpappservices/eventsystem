import { getEventDetails } from "@/apis/eventsServices";
import Payout from "@/components/events/Payout";
import StepHeader from "@/components/events/StepHeader";
import TicketSelector from "@/components/events/TicketSelector";
import Layout from "@/components/Layout";
import StageFlow from "@/components/StageFlow";
import StyledImage from "@/components/StyledImage";
import Button from "@/components/widgets/Button";
import useAuthToken from "@/hooks/useAuthToken";
import useLoading from "@/hooks/useLoading";
import { formatCurrencyWithoutDecimal } from "@/utils/conversions";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

const checkout = () => {
  const [event, setEvent] = useState();
  const [details, setDetails] = useState();
  const [tickets, setTickets] = useState([]);

  const [currentStep, setCurrentStep] = useState(0);
  const steps = [{ component: TicketSelector }, { component: Payout }];

  const router = useRouter();
  const { id } = router.query;
  const { isLoading, startLoading, stopLoading } = useLoading(true);
  const { activeUser } = useAuthToken();

  const fetchEvents = async () => {
    const { message, success, data, error } = await getEventDetails(
      id,
      startLoading,
      stopLoading
    );

    if (success) {
      setEvent(data?.EventTicket);
      setDetails(data);
    }
  };

  const { currency, title, image_banner } = details || {};

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
    <Layout container="w-full max-w-[1512px] mx-auto px-5 mt-[103px] sm:!mt-[98px]">
      <div className="flex flex-col min-h-[80vh]">
        <div className="flex-1 min-h-full">
          <div className="w-full max-w-[678px] min-h-full mx-auto flex flex-col gap-4 space-y-5">
            <p className="text-xl sm:text-3xl mx-auto font-semibold text-baseBlack">
              {title}
            </p>

            <StepHeader totalSteps={2} stepNumber={currentStep + 1} />

            <StageFlow
              steps={steps}
              currentStep={currentStep}
              setCurrentStep={setCurrentStep}
              events={event}
              details={details}
              setTickets={setTickets}
              tickets={tickets}
              paymentDetails={{
                id,
                tickets,
                eventDetails: {
                  totalQuantity: totalQuantity,
                  totalCost: `${finalTotalCost.toFixed(2)}`,
                  eventName: details?.title,
                  banner: details?.image_banner,
                  currency: details?.currency,
                  platformFee: platformFee,
                },
              }}
            />

            {currentStep === 0 && (
              <Button
                style="!mt-auto !px-10 !w-fit !ms-auto"
                disabled={tickets.length < 1}
                onClick={() => setCurrentStep(1)}
              >
                Next
              </Button>
            )}
          </div>
        </div>

        <div className="w-full max-w-[523px] bg-neutrals100/50">
          <StyledImage
            className="h-[290px] w-full object-cover aspect-video"
            src={image_banner}
          />

          <div className="w-full overflow-x-auto px-2">
            <table className="w-full">
              <thead>
                <tr>
                  <th className="px-3 py-1 text-left text-base sm:text-xl font-medium">
                    Order Summary
                  </th>
                  <th className="px-3 py-1 text-left text-base sm:text-xl font-medium">
                    Qty
                  </th>
                  <th className="px-3 py-1 text-left text-base sm:text-xl font-medium">
                    Amount
                  </th>
                </tr>
              </thead>
              <tbody>
                {tickets?.map((item, index) => (
                  <tr className="font-light" key={index}>
                    <td className="px-3 py-1 text-base sm:text-xl">
                      {item?.name}
                    </td>
                    <td className="px-3 py-1 text-base sm:text-xl">
                      {item?.quantity}
                    </td>
                    <td className="px-3 py-1 text-base sm:text-xl">
                      {formatCurrencyWithoutDecimal(item?.amount)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="p-5">
            <div className="flex flex-wrap items-center justify-between gap-1 text-sm sm:base font-medium">
              <p className="leading-snug">Subtotal</p>

              <p className="leading-snug">
                <span>{formatCurrencyWithoutDecimal(totalCost)}</span>
              </p>
            </div>

            <div className="flex flex-wrap items-center justify-between gap-1 text-sm sm:base">
              <p className="leading-snug">Service charges</p>

              <p className="leading-snug">
                <span>{formatCurrencyWithoutDecimal(platformFee)}</span>
              </p>
            </div>

            <div className="flex flex-wrap items-center justify-between gap-1 text-sm sm:base">
              <p className="leading-snug">Gateway charges</p>

              <p className="leading-snug">
                <span>{formatCurrencyWithoutDecimal(platformFee)}</span>
              </p>
            </div>

            <div className="flex flex-wrap items-center justify-between gap-1 mt-2 text-xl sm:text-2xl font-bold">
              <p className="leading-snug">Total Amount</p>

              <p className="leading-snug">
                <span>{formatCurrencyWithoutDecimal(finalTotalCost)}</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default checkout;
