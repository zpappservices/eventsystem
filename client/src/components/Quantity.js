import React, { useState } from "react";

const Quantity = ({ onChange, inStock, item }) => {
  const [quantity, setQuantity] = useState(0);

  const handleDecrement = () => {
    if (quantity > 0) {
      const newQuantity = quantity - 1;
      setQuantity(newQuantity);

      onChange((prev) => {
        if (newQuantity === 0) {
          // Remove the item from the array if quantity is 0
          return prev.filter((ticket) => ticket.name !== item.name);
        } else {
          // Update the quantity of the item
          return prev.map((ticket) =>
            ticket.name === item.name
              ? { ...ticket, quantity: newQuantity }
              : ticket
          );
        }
      });
    }
  };

  const handleIncrement = () => {
    if (quantity < inStock) {
      const newQuantity = quantity + 1;
      setQuantity(newQuantity);

      onChange((prev) => {
        const existingItem = prev.find((ticket) => ticket.name === item.name);

        if (existingItem) {
          // Update the quantity of the existing item
          return prev.map((ticket) =>
            ticket.name === item.name
              ? { ...ticket, quantity: newQuantity }
              : ticket
          );
        } else {
          // Add the item if it doesn't exist in the array
          return [...prev, { ...item, quantity: newQuantity }];
        }
      });
    }
  };

  return (
    <div className="flex border rounded-[8px] overflow-hidden">
      <div
        className="w-10 text-[#636363] leading-[24px] text-center text-[16px] hover:bg-[#FF7F50] cursor-pointer"
        onClick={handleDecrement}
      >
        -
      </div>
      <p className="text-[16px] leading-normal text-black text-center w-10">
        {quantity}
      </p>
      <div
        className="w-10 text-[#636363] leading-[24px] text-center text-[16px] hover:bg-[#FF7F50] cursor-pointer"
        onClick={handleIncrement}
      >
        +
      </div>
    </div>
  );
};

export default Quantity;
