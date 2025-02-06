import React from "react";
import StyledImage from "../StyledImage";
import Button from "../widgets/Button";

const Ads = () => {
  return (
    <div className="bg-sec300 py-4 sm:px-[70px] ">
      <div className="flex flex-wrap gap-6 items-center">
        <div>
          <StyledImage src="/img/ad-image.png" />
        </div>
        <div className="text-[18px] sm:text-[20px]">
          <p>Powered by the Kingdom Hotel</p>
          <p>Be the first to know when your favorite artists play nearby</p>
        </div>

        <Button>Subscribe</Button>
      </div>
    </div>
  );
};

export default Ads;
