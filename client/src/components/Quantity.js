import { useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";

const Quantity = () => {
   const [quantity, setQuantity] = useState(0);

   const handleDecrement = () => {
      if (quantity > 0) {
         setQuantity((prevQuantity) => prevQuantity - 1);
      }
   };

   const handleIncrement = () => {
      setQuantity((prevQuantity) => prevQuantity + 1);
   };

   return (
      <div className="flex border rounded-[8px] overflow-hidden">
         <div
            className="w-10 text-[#636363] leading-[24px] text-center text-[16px] hover:bg-[#FF7F50]"
            onClick={handleDecrement}
         >
            -
         </div>

         <p className="text-[16px] leading-normal text-black text-center w-10">
            {quantity}
         </p>

         <div
            className="w-10 text-[#636363] leading-[24px] text-center text-[16px] hover:bg-[#FF7F50]"
            onClick={handleIncrement}
         >
            +
         </div>
      </div>
   );
};

export default Quantity;
