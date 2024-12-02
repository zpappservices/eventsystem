import BreadCrumb from "@/components/BreadCrumb";
import Button from "@/components/Button";
import Contact from "@/components/Contact";
import Layout from "@/components/Layout";
import PaymentMethods from "@/components/PaymentMethods";
import StyledImage from "@/components/StyledImage";
import { ButtonLoading } from "@/components/widgets/ButtonLoading";
import useApiRequest from "@/hooks/useApiRequest";
import useAuthToken from "@/hooks/useAuthToken";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { BiCheckSquare, BiSquare } from "react-icons/bi";
import { toast } from "react-toastify";

const payment = () => {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
  });
  const [errors, setErrors] = useState({});
  const [isChecked, setIsChecked] = useState(false);

  const router = useRouter();
  const { activeUser } = useAuthToken();

  const {
    query: { id, tickets, eventDetails },
  } = router;
  const parsedTickets = tickets ? JSON.parse(tickets) : null;
  const parsedEvents = eventDetails ? JSON.parse(eventDetails) : null;

  const { totalQuantity, totalCost, eventName, banner, currency } =
    parsedEvents || {};

  console.log(parsedTickets, parsedEvents, parseInt(totalCost));

  const handleCheckboxToggle = () => {
    setIsChecked((prev) => !prev);
  };

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const validateForm = () => {
    const newErrors = {};
    if (!form.firstName.trim()) newErrors.firstName = "First name is required";
    if (!form.lastName.trim()) newErrors.lastName = "Last name is required";
    if (!form.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!validateEmail(form.email)) {
      newErrors.email = "Enter a valid email address";
    }
    if (!isChecked) {
      newErrors.isChecked = "You must accept the Terms and Conditions";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const { data, error, loading, request } = useApiRequest({
    method: "get",
    url: `event/getoneevent/${id}`,
    data: null,
    headers: null,
    useToken: true,
  });

  const getEvent = async () => {
    await request();
  };

  useEffect(() => {
    getEvent();
  }, []);

  const { data: event = {} } = data || {};

  const totalInStock = event?.EventTicket?.reduce(
    (acc, ticket) => acc + ticket.quantity,
    0
  );

  const payload = {
    userId: activeUser,
    eventId: id,
    firstName: form.firstName,
    lastName: form.lastName,
    email: form.email,
    channel: "paystack",
    totalAmount: totalCost,
    tickets: parsedTickets,
  };

  const {
    data: payData,
    error: payError,
    loading: payLoading,
    request: payRequest,
  } = useApiRequest({
    method: "post",
    url: "payment/place-order",
    data: payload,
    headers: null,
    useToken: true,
  });

  const placeOrder = async () => {
    await payRequest();
  };

  const handlePay = () => {
    if (validateForm()) {
      placeOrder();
    }
  };

  useEffect(() => {
    if (!activeUser && !activeUser) {
      toast.info("Please sign in to proceed with the purchase.");
      router.push("/");
    }

    if (totalInStock < totalQuantity) {
      toast.info(
        "The quantity requested exceeds the available stock. Please adjust your order to proceed."
      );
      router.push(`/${id}`);
    }
  }, []);

  useEffect(() => {
    const { authorization_url = "" } = payData?.data?.data || {};
    if (payData?.statusCode >= 200 && payData?.statusCode < 300) {
      toast.success(payData?.message || "Event Created successfully!");

      console.log(authorization_url, payData);
      if (authorization_url) {
        window.location.href = authorization_url;
      } 
    } else if (payData?.error || payData?.message) {
      toast.error(
        payData?.error ||
          payData?.message ||
          "Couldn't Post Event! Try again later."
      );
    } else if (payData?.statusCode >= 400 && payData?.statusCode < 500) {
      toast.error(
        payData?.error ||
          payData?.message ||
          "Couldn't Post Event! Try again later."
      );
    }
  }, [payData]);

  useEffect(() => {
    if (payError) {
      toast.error("Unexpected error. Please try again!");
    }
  }, [payError]);

  return (
    <Layout>
      <div className="w-full flex flex-col gap-6">
        <div className="w-full flex flex-col md:flex-row justify-between gap-6">
          <div className="w-full max-w-[518px] cursor-pointer rounded-lg flex flex-col gap-2">
            <p className="text-[20px] font-semibold">Contact</p>
            <p className="text-[18px] font-medium">
              Ticket owner’s information
            </p>
            <Contact form={form} setForm={setForm} errors={errors} />
          </div>
          <div className="w-full max-w-[558px] flex flex-col gap-2 cursor-pointer">
            <StyledImage
              src="/img/event1.svg"
              className="w-full max-h-[300px] object-cover"
            />
            <p className="text-[18px] text-gray-800 font-medium leading-snug">
              {eventName}
            </p>
            <div className="w-full flex flex-col gap-2 border-b-2 border-black pb-2.5 my-2">
              <p className="text-[19px] font-semibold leading-snug">
                Order Summary:
              </p>
              <div className="flex justify-between items-center gap-2">
                <p className="text-[16px] leading-snug">Delivery Method</p>
                <p className="text-[16px] leading-snug">Email</p>
              </div>
              <div className="flex justify-between items-center gap-2">
                <p className="text-[16px] leading-snug">Number of ticket(s):</p>
                <p className="text-[16px] leading-snug">{totalQuantity}</p>
              </div>
              {parsedTickets?.length > 0 &&
                parsedTickets?.map(({ name, amount, quantity }, index) => (
                  <div
                    className="flex justify-between items-center gap-2"
                    key={index}
                  >
                    <p className="text-[16px] leading-snug">
                      {name} x{quantity}
                    </p>
                    <p className="text-[16px] leading-snug">{amount}</p>
                  </div>
                ))}
              <div className="flex justify-between items-center gap-2 font-bold">
                <p className="text-[16px] leading-snug font-bold">
                  Total Amount
                </p>
                <p className="text-[16px] leading-snug">
                  <span className="font-semibold ms-5 mr-0.5">
                    {currency === "USD" && "$"}
                    {currency === "NGN" && "₦"}
                    {currency === "GHS" && "GH₵"}
                    {currency === "ZAR" && "R"}
                    {!currency && "₦"}
                  </span>
                  {parseInt(totalCost).toLocaleString()}
                </p>
              </div>
            </div>
            <div className="w-full flex flex-col gap-4 mt-5">
              <label
                className="flex items-center gap-2 cursor-pointer text-[16px] leading-snug"
                onClick={handleCheckboxToggle}
              >
                {isChecked ? (
                  <BiCheckSquare className="text-primary text-[24px]" />
                ) : (
                  <BiSquare className="text-gray-400 text-[24px]" />
                )}
                <span>
                  I accept the{" "}
                  <Link
                    href="/terms"
                    className="text-black underline underline-offset-2"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Terms and Conditions
                  </Link>
                  .
                </span>
              </label>
              <ButtonLoading
                onClick={handlePay}
                disabled={!isChecked}
                isLoading={payLoading}
                className="w-full max-w-none py-3.5 disabled:text-gray-700 disabled:bg-gray-400"
              >
                PAY NOW
              </ButtonLoading>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default payment;
