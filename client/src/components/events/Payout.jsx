import React, { useEffect, useState } from "react";
import Button from "../widgets/Button";
import { getEventDetails } from "@/apis/eventsServices";
import useLoading from "@/hooks/useLoading";
import { Loader2 } from "lucide-react";
import TextField from "../widgets/TextField";
import { useRouter } from "next/router";
import { checkComplete, validateInfoForm } from "@/utils/validation";
import { payForTicket, reserveSpot } from "@/apis/paymentServices";
import Checkbox from "../widgets/CheckBox";
import Link from "next/link";
import { toast } from "react-toastify";
import useAuthToken from "@/hooks/useAuthToken";

const Payout = ({ paymentDetails, prev }) => {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
  });
  const [event, setEvent] = useState();
  const [errors, setErrors] = useState({});
  const [isChecked, setIsChecked] = useState(false);
  const [isComplete, setIsComplete] = useState(false);

  const { id, eventDetails, tickets } = paymentDetails || {};
  const { totalQuantity, totalCost, eventName, banner, currency, platformFee } =
    eventDetails || {};

  const router = useRouter();
  const { activeUser } = useAuthToken();
  const { isLoading, startLoading, stopLoading } = useLoading();
  const {
    isLoading: isPaying,
    startLoading: startPaying,
    stopLoading: stopPaying,
  } = useLoading();

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

  const totalInStock = event?.reduce(
    (acc, ticket) => acc + ticket?.quantity,
    0
  );

  const handlePay = async () => {
    if (!validateInfoForm(form, isChecked, setErrors)) {
      return;
    }

    if (!activeUser && !activeUser) {
      toast.info("Please sign in to proceed with the purchase.");
      return;
    }

    if (totalInStock < totalQuantity) {
      toast.warn(
        "The quantity requested exceeds the available stock. Please adjust your order to proceed."
      );
      return;
    }

    let payload;

    if (totalCost > 0) {
      payload = {
        userId: activeUser,
        eventId: id,
        ...form,
        email_CC: form.email,
        channel: "paystack",
        totalAmount: totalCost,
        tickets,
      };
    } else {
      payload = {
        ...form,
        eventId: id,
        channel: "free",
        userId: activeUser,
        totalAmount: totalCost,
        email_CC: form.email,
        tickets,
      };
    }

    const cost = Number(totalCost);

    if (cost > 0.001) {
      const { success, message, data } = await payForTicket(
        payload,
        startPaying,
        stopPaying
      );

      if (success) {
        const authorization_url = data?.data?.authorization_url;
        toast.success(message);
        router.push(authorization_url);
      } else {
        toast.error(message);
      }
    } else {
      const { success, message, data, response } = await reserveSpot(
        payload,
        startPaying,
        stopPaying
      );

      if (success) {
        toast.success("Ticket reserved successfully");
        router.push(response?.url);
      } else {
        toast.error(message);
      }
    }
  };

  useEffect(() => {
    if (id) {
      fetchEvents();
    }
  }, [id]);

  useEffect(() => {
    const isComplete = checkComplete(form) && isChecked;
    setIsComplete(isComplete);
  }, [form, isChecked]);

  if (isLoading) {
    return (
      <div className="h-[100px] flex justify-center items-center">
        <Loader2 className="animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-5 min-h-full flex-1 flex flex-col">
      <p className="text-2xl font-bold text-baseBlack">Buyer’s Information</p>

      <div className="border border-neutrals100/50 rounded-[10px] overflow-hidden">
        <div>
          <div className="bg-neutrals100 p-4">
            <p className="text-base font-bold text-baseBlack">{eventName}</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 p-5">
            <TextField
              label="First Name*"
              onChange={(e) => setForm({ ...form, firstName: e.target.value })}
              value={form.firstName}
              error={errors.firstName}
            />

            <TextField
              label="Last Name*"
              onChange={(e) => setForm({ ...form, lastName: e.target.value })}
              value={form.lastName}
              error={errors.lastName}
            />

            <TextField
              label="Email*"
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              value={form.email}
              error={errors.email}
            />

            <TextField
              label="Mobile No*"
              onChange={(e) => setForm({ ...form, phone: e.target.value })}
              value={form.phone}
              error={errors.phone}
            />
          </div>

          <div className="p-5 space-y-2">
            <Checkbox
              isChecked={true}
              onToggle={() => {}}
              label={<>Use same detail for all ticket</>}
            />

            <Checkbox
              isChecked={isChecked}
              onToggle={() => setIsChecked(!isChecked)}
              label={
                <>
                  I accept the{" "}
                  <Link
                    href="/terms"
                    className="text-primary500 font-medium"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Terms and Conditions
                  </Link>{" "}
                  and{" "}
                  <Link
                    href="/useragreement"
                    className="text-primary500 font-medium"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    User Agreement
                  </Link>
                </>
              }
            />
          </div>
        </div>
      </div>

      <div className="w-full flex items-center justify-between !mt-auto">
        <Button
          style="!px-10 !py-2.5 !w-fit"
          text="text-primary"
          hover="hover:text-white hover:bg-primary"
          outline={true}
          onClick={prev}
        >
          Back
        </Button>

        <Button
          disabled={!isComplete}
          style="!px-10 !w-fit"
          onClick={handlePay}
          isLoading={isPaying}
        >
          Pay
        </Button>
      </div>
    </div>
  );
};

export default Payout;
