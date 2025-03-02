import React from "react";
import StyledImage from "../StyledImage";

const Mission = () => {
  return (
    <div className="w-full max-w-[1322px] px-5 mx-auto space-y-10 !mt-20">
      <div className="flex flex-col md:flex-row items-center gap-5 md:gap-[71px]">
        <div className="space-y-5">
          <p className="text-primary1000 uppercase font-bold text-[22px] sm:text-[40px] leading-normal">
            Our Mission
          </p>
          <p className="text-primary1000 text-[14px] sm:text-[20px] font-medium leading-normal">
            At Zafariplus, we are dedicated to empowering businesses of all
            sizes through our online platform. We provide a range of digital
            online services including being your number one online business hub.
            <br />
            Our platform serves as a comprehensive hub where businesses and
            services of all sizes and industries can showcase their products,
            services and expertise to enable an eco-friendly online hub for
            Africans to do business at ease.
          </p>
        </div>

        <div className="w-full max-w-[555px]">
          <StyledImage src="/img/mission.png" className="w-full h-full" />
        </div>
      </div>
    </div>
  );
};

export default Mission;
