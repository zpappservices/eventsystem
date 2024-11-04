import { useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";

const Quantity = () => {
   const [quantity, setQuantity] = useState(1);

   const handleDecrement = () => {
      if (quantity > 1) {
         setQuantity((prevQuantity) => prevQuantity - 1);
      }
   };

   const handleIncrement = () => {
      setQuantity((prevQuantity) => prevQuantity + 1);
   };

   return (
      <div className="w-fit flex items-center justify-between gap-2 overflow-hidden border border-gray-500 rounded-md">
         <div
            className="leading-normal text-black px-4 transition-all duration-300 py-3 flex items-center hover:bg-[#FF7F50]"
            onClick={handleDecrement}
         >
            <RemoveIcon fontSize="small" color="#9ca3af"/>
         </div>

         <p className="text-[22px] leading-normal text-black text-center w-8">
            {quantity}
         </p>

         <div
            className="leading-normal text-black px-4 transition-all duration-300 py-3 flex items-center hover:bg-[#FF7F50]"
            onClick={handleIncrement}
         >
            <AddIcon fontSize="small" color="#9ca3af"/>
         </div>
      </div>
   );
};

export default Quantity;
