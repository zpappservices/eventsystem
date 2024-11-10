import React from "react";
import Button from "../Button";

const BankAccount = () => {
   return (
      <div>
         <p className="text-[16px] leading-[20px]">Manage your bank account</p>
         <div className="max-w-[461px] flex flex-col items-center mx-auto gap-2 mt-6">
            <p>No bank account found</p>
            <Button >Add Payout Bank Account</Button>
         </div>
      </div>
   );
};

export default BankAccount;
