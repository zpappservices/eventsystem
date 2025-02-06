import React from "react";
import Button from "../widgets/Button";

const PlaceAdvert = () => {
  return (
    <div className="bg-neutrals100 p-5 rounded-[10px] space-y-5">
      <div className="p-[50px] bg-sec100 rounded-[10px] max-w-[355px] mx-auto">
        <div className="max-w-[217px] mx-auto">
          <p className="text-baseBlack text-center text-[14px] sm:text-[20px] sm:leading-normal font-semibold">
            Place your product advert here
          </p>
          <p className="text-neutrals500 text-center text-[14px] sm:text-[20px] sm:leading-normal font-semibold">
            320x200
          </p>
        </div>
      </div>

      <Button
        background="bg-sec"
              hover="hover:bg-sec/90"
              text="text-baseBlack"
        style="w-full max-w-[182px] mx-auto">
        Contact Sales
      </Button>
    </div>
  );
};

export default PlaceAdvert;
