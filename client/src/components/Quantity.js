import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import Button from "./widgets/Button";
import { FiMinus, FiPlus } from "react-icons/fi";

const Quantity = ({ onChange, inStock, item }) => {
  const minOrder = item?.minOrder ?? 1;
  const maxOrder = Math.min(item?.maxOrder ?? 5, inStock ?? Infinity);

  const [quantity, setQuantity] = useState(minOrder);

  useEffect(() => {
    if (!item) return;

    setQuantity(minOrder);

    onChange((prev) => {
      const existingItem = prev.find((ticket) => ticket.name === item.name);

      if (existingItem) {
        return prev.map((ticket) =>
          ticket.name === item.name ? { ...ticket, quantity: minOrder } : ticket
        );
      } else {
        return [...prev, { ...item, quantity: minOrder }];
      }
    });
  }, [item?.name, minOrder]);

  const handleDecrement = () => {
    if (quantity > minOrder) {
      const newQuantity = quantity - 1;
      setQuantity(newQuantity);

      onChange((prev) =>
        prev.map((ticket) =>
          ticket.name === item.name
            ? { ...ticket, quantity: newQuantity }
            : ticket
        )
      );
    }
  };

  const handleIncrement = () => {
    if (quantity < maxOrder) {
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
          return [...prev, { ...item, quantity: newQuantity }];
        }
      });
    } else {
      toast.warn(`Maximum ticket limit reached: ${maxOrder}`);
    }
  };

  return (
    <div className="flex flex-col items-center">
      <div className="flex items-center rounded-[8px] overflow-hidden">
        <Button
          style={`!py-1.5 !px-2 ${
            quantity <= minOrder ? "!opacity-50 !cursor-not-allowed" : ""
          }`}
          startIcon={<FiMinus className="text-white text-xl" />}
          onClick={handleDecrement}
          disabled={quantity <= minOrder}
        />
        <p className="text-xl leading-normal text-black text-center w-10">
          {quantity}
        </p>
        <Button
          style="!py-1.5 !px-2"
          text="font-medium"
          startIcon={<FiPlus className="text-white text-xl" />}
          onClick={handleIncrement}
        />
      </div>

      <p className="text-xs text-neutrals500 mt-1">
        Min {minOrder} / Max {maxOrder}
      </p>
    </div>
  );
};

export default Quantity;
