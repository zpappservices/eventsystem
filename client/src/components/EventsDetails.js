import { useRouter } from "next/router";
import CustomAccordion from "./Accordion";
import BreadCrumb from "./BreadCrumb";
import Button from "./Button";
import Quantity from "./Quantity";
import StyledImage from "./StyledImage";
import { useTicketContext } from "@/context/TicketContext";
import { toast } from "react-toastify";

const eventDetails = {
  name: "Night of a Thousand Laughs",
  image: "/img/event1.svg",
  date: "November 19th, 2024",
};

const EventsDetails = ({ id }) => {
  const {
    ticketData,
    quantities,
    grandTotalQuantity,
    totalCost,
    updateQuantity,
    eventInfo,
    setCart
  } = useTicketContext();

  console.log(quantities, grandTotalQuantity, totalCost, eventInfo);

  const handleClick = () => {
    router.push({
      pathname: "/payment",
      query: { id: id },
    });
  };

  const handleAddToCart = () => {
    const cartItem = {
      eventDetails: {
        name: "Night of a Thousand Laughs",
        image: "/img/event1.svg",
        date: "November 19th, 2024",
      },
      total: {
        price: totalCost,
        quantity: grandTotalQuantity,
      },
      tickets: ticketData
        .map((ticket, index) => ({
          ticketType: ticket.ticketType,
          price: ticket.price,
          quantity: quantities[index],
        }))
        .filter((ticket) => ticket.quantity > 0), // Include only tickets with quantity > 0
    };

    const existingCart = JSON.parse(localStorage.getItem("cart")) || [];
    // Add the new item to the cart array
    const updatedCart = [...existingCart, cartItem];
    // Update localStorage with the new cart data
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    setCart(updatedCart);

    toast.success("Event added to cart!");
  };

  const isAddToCartDisabled = quantities.every((quantity) => quantity === 0);

  return (
    <div className="w-full flex flex-col gap-6">
      <BreadCrumb id={id} />
      <div className="w-full flex flex-col md:flex-row justify-between gap-6">
        <div className="w-full max-w-[551px] cursor-pointer rounded-lg">
          <StyledImage src="/img/event1.svg" className="w-full" />
          <div className="mt-5">
            <p className="text-[18px] leading-normal ">Venue :</p>
            <p className="text-[18px] leading-normal ">Date :</p>
            <p className="text-[18px] leading-normal ">City :</p>
            <p className="text-[18px] leading-normal ">Location :</p>
          </div>
        </div>
        <div className="w-full max-w-[458px] flex flex-col gap-4 cursor-pointer">
          <div>
            <p className="text-[20px] font-semibold leading-snug">
              Night of a thousand laugh November 19th 2024
            </p>
            <p className="text-[#1FCA59] text-[16px] leading-snug">
              In stock 100 tickets
            </p>
          </div>
          <div className="w-full flex flex-col gap-2  border-b-2 border-gray-400 pb-2.5">
            {ticketData.map((ticket, index) => (
              <div
                key={index}
                className="flex justify-between items-center gap-4"
              >
                <p className="text-[16px] leading-snug">{ticket.ticketType} </p>
                <p className="text-[16px] leading-snug ms-auto mr-3">
                  <span className="font-semibold">$</span>
                  {ticket.price.toLocaleString()}
                </p>
                <Quantity
                  value={quantities[index]}
                  onChange={(value) => updateQuantity(index, value)}
                />
              </div>
            ))}
          </div>
          <div className="flex flex-wrap items-center justify-between gap-1 border-b-2 border-gray-400 pb-4">
            <p className="text-[16px] leading-snug">
              <span className="font-bold">Total Quantity:</span>{" "}
              {grandTotalQuantity}
            </p>
            <p className="text-[16px] leading-snug">
              <span className="font-bold">Total Amount:</span>{" "}
              <span className="font-semibold">$</span>
              {totalCost}
            </p>
          </div>
          <div>
            <p className="text-[20px] leading-normal font-semibold">QUANTITY</p>
          </div>
          <div className="w-full flex flex-col gap-4">
            <Button onClick={handleAddToCart} disabled={isAddToCartDisabled}>
              ADD TO CART
            </Button>
            <Button
              disabled={isAddToCartDisabled}
              container="bg-white border-2 border-[#FF7F50]"
              onClick={handleClick}
            >
              BUY IT NOW
            </Button>
          </div>

          <div>
            <CustomAccordion />
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventsDetails;
