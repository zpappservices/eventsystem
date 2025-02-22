import React from "react";
import OrganizersCard from "../events/OrganizersCard";
import { mockOrganizers } from "@/mock/organizers";
import Slider from "react-slick";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const NextArrow = ({ onClick }) => (
  <button
    className="absolute right-[-30px] top-1/2 transform -translate-y-1/2 bg-sec100 p-2 rounded-full shadow-lg hover:bg-sec300 transition"
    onClick={onClick}>
    <FaChevronRight className="text-xl text-baseBlack" />
  </button>
);

const PrevArrow = ({ onClick }) => (
  <button
    className="absolute left-[-30px] top-1/2 transform -translate-y-1/2 bg-sec100 p-2 rounded-full shadow-lg hover:bg-sec300 transition"
    onClick={onClick}>
    <FaChevronLeft className="text-xl text-baseBlack" />
  </button>
);

const TopOrganizers = () => {
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplaySpeed: 5000,
    autoplay: true,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
  };
  return (
    <div className="bg-neutrals100/50 p-5 rounded-[10px] space-y-5">
      <p className="text-[20px] leading-[28px] text-center font-bold underline underline-offset-[5px]">
        Top Organizers
      </p>
      <div className="p-[50px] bg-sec100 rounded-[10px] max-w-[355px] mx-auto">
        <Slider {...settings}>
          {mockOrganizers.map((organizer) => (
            <OrganizersCard key={organizer.id} data={organizer} />
          ))}
        </Slider>
      </div>
    </div>
  );
};

const UpcomingEvent = () => {
  return (
    <div className="bg-neutrals100/50 p-5 rounded-[10px] space-y-5">
      <p className="text-[20px] leading-[28px] text-center font-bold underline underline-offset-[5px]">
        Top Organizers
      </p>
      <img src="/img/upcoming-event.png" className="w-full object-cover" />
    </div>
  );
};

export default UpcomingEvent;
