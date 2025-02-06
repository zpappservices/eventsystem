import React from "react";
import PlaceAdvert from "../events/PlaceAdvert";
import TopOrganizers from "./TopOrganizers";

const ProductAds = () => {
  return (
    <div className="w-full max-w-[457px] flex flex-col gap-5 mx-auto">
      <PlaceAdvert />

      <TopOrganizers />
    </div>
  );
};

export default ProductAds;
