import React from "react";
import StyledImage from "../StyledImage";

const Card = ({ data }) => {
  return (
    <div className="flex items-center gap-2">
      <div className="h-[32px] w-[32px] rounded-full shrink-0 relative">
        <StyledImage
          src={
            data?.image_banner ||
            "/img/profile.png" ||
            "https://placehold.co/600x400?text=Image not available"
          }
          className="w-full h-full object-cover"
        />
        <div className="absolute top-0 right-1 h-1.5 w-1.5 rounded-full bg-primary"></div>
      </div>
      <div className="">
        <p className="text-sm text-baseBlack font-medium overflow-hidden text-ellipsis">
          Shadow Empire
        </p>
      </div>
    </div>
  );
};

const ActiveOrganizers = () => {
  return (
    <div className="w-full space-y-3">
      <p className="text-xl">Active Organizers</p>

      {["", "", ""]?.map((item, index) => (
        <Card key={index} data={item} />
      ))}
    </div>
  );
};

export default ActiveOrganizers;
