import React, { useEffect, useState } from "react";
import StyledImage from "@/components/StyledImage";
import { ButtonLoading } from "@/components/widgets/ButtonLoading";
import Layout from "@/components/Layout";
import { MdDelete } from "react-icons/md";
import { toast } from "react-toastify";
import { useTicketContext } from "@/context/TicketContext";

const CartPage = () => {
  const {cart, setCart} = useTicketContext();

  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCart(savedCart);
  }, []);

  const handleDelete = (index) => {
    const updatedCart = [...cart];
    updatedCart.splice(index, 1); // Remove the specific item
    setCart(updatedCart); // Update the state
    localStorage.setItem("cart", JSON.stringify(updatedCart)); // Update localStorage

    toast.info("Cart item removed");
  };

  const handleBuy = () => {
    router.push({
      pathname: "/payment",
      query: { id: id },
    });
  };

  return (
    <Layout isHeader={false}>
      {cart.length === 0 ? (
        <p className="text-center text-lg font-medium">
          Your cart is empty. Add tickets to see them here!
        </p>
      ) : (
        cart.map((item, index) => (
          <div
            key={index} // Add a unique key for each item
            className="container mx-auto bg-white shadow-[0_3px_10px_rgb(0,0,0,0.2)] rounded-lg p-6 mb-4"
          >
            <div className="flex flex-col md:flex-row gap-6 relative">
              {/* Delete Icon */}
              <MdDelete
                className="absolute right-0 -top-3 cursor-pointer"
                size={18}
                color="#FF7F50"
                onClick={() => handleDelete(index)}
              />

              {/* Left Section - Event Details */}
              <div className="w-full md:w-1/2">
                <h3 className="text-xl font-semibold">Event Details</h3>
                <div className="mb-0">
                  <StyledImage
                    src={item.eventDetails?.image || "/placeholder.png"}
                    alt="Event"
                    className="w-full rounded-lg max-w-[150px]"
                  />
                  <h4 className="text-lg font-semibold mt-4">
                    {item.eventDetails?.name || "Unknown Event"}
                  </h4>
                  <p className="text-sm font-medium text-gray-600">
                    <span className="font-bold text-black">Date:</span>{" "}
                    {item.eventDetails?.date || "TBD"}
                  </p>
                </div>
              </div>

              {/* Right Section - Ticket Info */}
              <div className="w-full md:w-1/2">
                <h3 className="text-xl font-semibold">Your Tickets</h3>
                {item.tickets?.map((ticket, ticketIndex) => (
                  <div
                    key={ticketIndex} // Add unique key for tickets
                    className="flex justify-between items-center border-b pb-1 mb-2"
                  >
                    <p className="text-md font-medium">
                      {ticket.ticketType || "General Admission"}
                    </p>
                    <p className="text-sm text-gray-500 ms-auto mr-3 font-medium">
                      <span className="text-gray-700 font-semibold">
                        Quantity:
                      </span>{" "}
                      {ticket.quantity || 0}
                    </p>
                    <p className="text-lg font-semibold">
                      ${(ticket.price * ticket.quantity).toLocaleString() || 0}
                    </p>
                  </div>
                ))}
                <div className="flex justify-between items-center">
                  <p className="text-lg font-medium"></p>
                  <p className="text-sm text-gray-500 ms-auto mr-3 font-medium">
                    <span className="text-gray-700 font-semibold mr-0.5">
                      Total Amount:
                    </span>
                    {item.total.quantity}
                  </p>
                  <p className="text-lg font-semibold">${item.total.price}</p>
                </div>
              </div>
            </div>

            <ButtonLoading className="py-2.5 ms-auto min-w-fit max-w-[200px] px-4" onClick={handleBuy}>
              Checkout
            </ButtonLoading>
          </div>
        ))
      )}
    </Layout>
  );
};

export default CartPage;
