import React from "react";
import HelpSupport from "./HelpSupport";
import ContactSales from "./ContactSales";
import { ImWhatsapp } from "react-icons/im";
import { TfiEmail } from "react-icons/tfi";
import StyledImage from "../StyledImage";

const Card = ({ icon, heading, text, action, actionText }) => {
  return (
    <div className="w-full max-w-[241px] flex flex-col border-primary border shadow-md rounded-[10px] p-5 gap-y-5">
      <div className="flex gap-3 items-center">
        {icon}
        <p className="text-[16px] leading-[19px] font-medium">{heading}</p>
      </div>

      <p className="text-[10px] leading-normal text-baseBlack ">{text}</p>

      <p className="text-primary text-[10px] leading-normal mt-auto">
        {actionText}
      </p>
    </div>
  );
};

const Contact = () => {
  return (
    <div className="max-w-[1067px] mx-auto py-10 md:pt-[137px]">
      <div className="flex flex-col items-center md:items-start md:flex-row gap-x-[201px] gap-y-10 relative">
        <HelpSupport />

        <ContactSales />

        <div className="border-r border-dashed absolute hidden md:block left-[50%] h-[222%] -top-[135px] mx-auto border-neutrals200"></div>
      </div>

      <div className="max-w-[883px] flex flex-col items-center md:items-stretch md:flex-row md:justify-between mx-auto gap-x-[80px] gap-y-10 mt-10 sm:mt-[150px]">
        <Card
          icon={<ImWhatsapp size={19} className="text-baseBlack" />}
          heading={"Chat with us"}
          text="Chat with us directly to get in touch quickly"
          actionText="Send a message"
        />

        <Card
          icon={<TfiEmail size={19} className="text-baseBlack" />}
          heading={"Send us an email"}
          text="Reach us at Cs@zafariplus.com"
          actionText="Email us"
        />

        <Card
          icon={<StyledImage src="/img/help-center.svg" className="w-[19px]" />}
          heading={"Help Center"}
          text="Browse through our documentation and customer’s frequently asked questions"
          actionText="Visit our help center"
        />
      </div>
    </div>
  );
};

export default Contact;
