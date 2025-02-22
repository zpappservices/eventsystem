import { businessCardsData } from "@/mock/businessGrow";
import React from "react";
import BusinessGrowCard from "./BusinessGrowCard";

const BusinessGrow = () => {
  return (
    <div className="w-full max-w-[1322px] px-5 mx-auto space-y-10">
      <p className="text-baseBlack text-[22px] sm:text-[40px] uppercase font-bold leading-normal">
        How we help businesses grow
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-x-5 md:gap-x-[56px] gap-y-10 mx-auto">
        {businessCardsData?.map((item, index) => (
          <BusinessGrowCard key={index} data={item} />
        ))}
      </div>
    </div>
  );
};

export default BusinessGrow;
