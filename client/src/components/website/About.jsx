import React from "react";

const About = () => {
  return (
    <div className="w-full max-w-[1326px] px-5 mx-auto">
      <p className="text-primary text-[20px] sm:text-[24px] font-medium leading-normal">
        About us
      </p>
      <div className="w-full flex flex-col md:flex-row md:items-start gap-5 md:gap-20">
        <div className="w-full max-w-[633px]">
          <p className="text-primary1000 uppercase font-bold text-[22px] sm:text-[40px] leading-normal">
            Empowering small
            <br className="hidden md:block" /> businesses and
            <br className="hidden md:block" /> services in
            <br className="hidden md:block" /> Africa.
          </p>
        </div>

        <div className="w-full max-w-[613px]">
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
      </div>
    </div>
  );
};

export default About;
