import Layout from "@/components/Layout";
import StyledImage from "@/components/StyledImage";
import About from "@/components/website/About";
import BusinessGrow from "@/components/website/BusinessGrow";
import JoinUs from "@/components/website/JoinUs";
import Mission from "@/components/website/Mission";
import React from "react";

const about = () => {
  return (
    <Layout container="max-w-[1512px] mx-auto space-y-10">
      <About />

      <div className="w-full">
        <StyledImage src="/img/about-hero.svg" className="w-full" />
      </div>

      <BusinessGrow />

      <Mission />

      <JoinUs />
    </Layout>
  );
};

export default about;
