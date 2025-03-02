import React from "react";
import { Card } from "../dashboard/Summary";

const Overview = () => {
   return (
      <div className="w-full flex flex-wrap md:flex-nowrap justify-between items-center gap-5">
         <Card
            title="Current Balance"
            amount="$100,000"
            background="bg-[#FBAF93]"
         />
         <Card
            title="Pending Request Amount"
            amount="$100,000"
            background="bg-[#7C88F0]"
         />
         <Card
            title="Successful Payouts"
            amount="$100,000"
            background="bg-[#52CB7B]"
         />
      </div>
   );
};

export default Overview;
