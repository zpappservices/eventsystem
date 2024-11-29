import React from "react";

const Quantity = ({ value, onChange }) => {
  const handleDecrement = () => {
    if (value > 0) {
      onChange(value - 1);
    }
  };

  const handleIncrement = () => {
    onChange(value + 1);
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
        {value}
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
