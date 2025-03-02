import { useState, useEffect } from "react";
import Card from "./Card";
import StyledImage from "./StyledImage";

const PayTab = ({
   type = "Credit / Debit cards",
   child = <Card />,
   method,
   setMethod,
   image = "img/wallet.svg",
}) => {
   const isSelected = method === type;
   return (
      <div className="flex flex-col gap-5" onClick={() => setMethod(type)}>
         <div className="w-full py-3 px-4 bg-[#F1F1F1] border border-black rounded flex items-center gap-4">
            <StyledImage src={isSelected ? "img/checked.svg" : "img/unchecked.svg"} />
            <StyledImage src={image} />
            <p className="text-[16px] font-semibold">{type}</p>
         </div>

         {isSelected && child}
      </div>
   );
};

const PayTabs = ({ step }) => {
   const [method, setMethod] = useState("");

   useEffect(() => {
      setMethod("");
   }, [step]);

   return (
      <div className="flex flex-col gap-5">
         <PayTab method={method} setMethod={setMethod} />
         <PayTab
            method={method}
            setMethod={setMethod}
            type="Bank Transfer"
            image="img/bank.svg"
            child=""
         />
      </div>
   );
};

export default PayTabs;
