import React from "react";
import StyledImage from "../StyledImage";

const BusinessGrowCard = ({ data }) => {
  return (
    <div className="w-full rounded-[20px] bg-primary py-[19px] px-6">
      <div className="space-y-[13px] w-full">
        <div className="w-[58px] h-[58px]">
          <StyledImage className="w-full h-full" src={data?.image} />
        </div>

        <div className="space-y-2">
          <p className="text-white text-[18px] sm:text-[20px] font-bold leading-normal">
            {data?.title}
          </p>
          <p className="text-white text-[12px] leading-normal">
            {data?.description}
          </p>
        </div>
      </div>
    </div>
  );
};

export default BusinessGrowCard;
