import React from "react";
import PlaceAdvert from "../events/PlaceAdvert";
import TopOrganizers from "./TopOrganizers";

const ProductAds = () => {
  return (
    <div className="w-full max-w-[457px] flex flex-col md:flex-row lg:flex-col gap-5">
      <PlaceAdvert />

      <TopOrganizers />
    </div>
  );
};

export default ProductAds;
