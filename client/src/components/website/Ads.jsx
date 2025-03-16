import React from "react";
import StyledImage from "../StyledImage";
import Button from "../widgets/Button";

const Ads = () => {
  return (
    <div className="bg-sec300">
      <div className="px-5 max-w-[1512px] mx-auto py-4 sm:px-[70px]">
        <div className="w-full flex flex-wrap gap-6 items-center">
          <div className="w-full max-w-[180px] h-[106px]">
            <StyledImage
              src="/img/ad-image.png"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="text-[16px] sm:text-[18px] max-w-[722px]">
            <p>
              3Ways Properties Your Partner in Real Estate Management and
              Investment in Lagos
            </p>
            <p className="text-[14px] sm:text-[16px]">
              Experience the Difference in Real Estate Investment
            </p>
          </div>

          <Button style="ms-auto w-full max-w-[223px]">Subscribe</Button>
        </div>
      </div>
    </div>
  );
};

export default Ads;
