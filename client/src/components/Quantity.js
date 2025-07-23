import React, { useState } from "react";
import { toast } from "react-toastify";
import Button from "./widgets/Button";
import { FiMinus, FiPlus } from "react-icons/fi";

const Quantity = ({ onChange, inStock, item }) => {
  const [quantity, setQuantity] = useState(0);

  const handleDecrement = () => {
    if (quantity > 0) {
      const newQuantity = quantity - 1;
      setQuantity(newQuantity);

      onChange((prev) => {
        if (newQuantity === 0) {
          return prev.filter((ticket) => ticket.name !== item.name);
        } else {
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
    const maxQuantity = Math.min(inStock, 5);
    if (quantity < maxQuantity) {
      const newQuantity = quantity + 1;
      setQuantity(newQuantity);

      onChange((prev) => {
        const existingItem = prev.find((ticket) => ticket.name === item.name);

        if (existingItem) {
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
    } else {
      toast.warn(`Maximum ticket limit reached: ${maxQuantity}`);
    }
  };

  return (
    <div className="flex items-center rounded-[8px] overflow-hidden">
      <Button
        style="!py-1.5 !px-2"
        startIcon={<FiMinus className="text-white text-xl" />}
        onClick={handleDecrement}
      ></Button>

      <p className="text-xl leading-normal text-black text-center w-10">
        {quantity}
      </p>

      <Button
        style="!py-1.5 !px-2"
        text="font-medium"
        startIcon={<FiPlus className="text-white text-xl" />}
        onClick={handleIncrement}
      ></Button>
    </div>
  );
};

export default Quantity;
