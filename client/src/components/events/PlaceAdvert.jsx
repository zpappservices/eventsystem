import React from "react";
import Button from "../widgets/Button";
import StyledImage from "../StyledImage";

const PlaceAdvert = () => {
  return (
    <div className="bg-neutrals100/50 p-5 rounded-[10px] space-y-5">
      <div className="w-full max-w-[417px] aspect-video h-[284px]">
        <StyledImage src="/img/ads-image.png" className="h-full object-cover" />
      </div>
      <p className="text-[14px] leading-[16px] !mt-1 text-center">Advertisement</p>
    </div>
  );
};

export default PlaceAdvert;
