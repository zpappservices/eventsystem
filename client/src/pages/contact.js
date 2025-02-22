import Layout from "@/components/Layout";
import Contact from "@/components/website/Contact";
import React from "react";

const contact = () => {
  return (
    <Layout container="max-w-[1318px] px-5 mx-auto space-y-10 sm:space-y-36 sm:pb-[100px]">
      <div>
        <p className="text-primary text-[20px] sm:text-[24px] font-medium leading-normal">
          Contact us
        </p>

        <div>
          <p className="text-primary1000 uppercase font-bold text-[22px] sm:text-[40px] leading-normal">
            How can we help?
          </p>

          <p className="text-[18px] sm:text-[20px] leading-normal">
            If you have any questions about zafariplus, we’re happy to help
          </p>
        </div>
      </div>

      <div className="md:shadow-[0px_0px_20px_0px_rgba(6,138,79,0.2)] px-2.5 sm:px-5">
        <Contact />
      </div>
    </Layout>
  );
};

export default contact;
