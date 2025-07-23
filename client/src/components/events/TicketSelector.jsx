import React from "react";
import Quantity from "../Quantity";
import { formatCurrencyWithoutDecimal } from "@/utils/conversions";

const TicketSelector = ({ events, details, setTickets }) => {
  const currency = details?.currency;
  return (
    <div className="w-full flex flex-col gap-2  pb-2.5 space-y-2">
      <p className="text-xl sm:text-2xl font-bold text-baseBlack">
        Select Ticket Type
      </p>

      {events?.map(({ price, name, quantity, ...item }, index) => (
        <div
          key={index}
          className=" p-5 border border-neutrals100 rounded-[8px]"
        >
          <div className="flex justify-between items-center gap-4">
            <p className="text-[16px] leading-snug text-xl sm:text-2xl">
              {name}{" "}
            </p>
            <p className="text-[16px] leading-snug ms-auto mr-3">
              {item?.description}
            </p>

            <Quantity
              inStock={quantity}
              onChange={setTickets}
              item={{ name: name, amount: price }}
            />
          </div>

          <p className="text-base sm:text-xl font-bold ms-auto mt-3">
            {formatCurrencyWithoutDecimal(Number(price), currency)}
          </p>
        </div>
      ))}
    </div>
  );
};

export default TicketSelector;
