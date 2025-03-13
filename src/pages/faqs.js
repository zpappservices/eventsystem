import Layout from "@/components/Layout";
import Faqs from "@/components/website/FAQs/Faqs";
import React from "react";

const faqs = () => {
  return (
    <div>
      <Layout container="mx-auto mt-[163px] pb-0 mb-[64px] flex flex-col justify-center items-center ">
        <Faqs />
      </Layout>
    </div>
  );
};

export default faqs;
