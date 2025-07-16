import { useState, useEffect, useRef } from "react";
import TextField from "../widgets/TextField";
import Button from "../widgets/Button";
import { useMediaQuery } from "@mui/material";
import { LuSearch } from "react-icons/lu";

const images = [
  "/img/slider-1.svg",
  "/img/slider-2.svg",
  "/img/slider-3.svg",
  "/img/slider-4.svg",
  "/img/slider-5.svg",
];

const Slider = ({ query, setQeury }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const sliderRef = useRef(null);

  const isWideScreen = useMediaQuery("(min-width:639px)");

  useEffect(() => {
    const preloadImages = () => {
      images.forEach((image) => {
        new Image().src = image;
      });
    };

    preloadImages();

    const interval = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % images.length);
    }, 3000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <div
      ref={sliderRef}
      className="relative w-full overflow-hidden mx-auto"
      style={{ height: `${328}px` }}
    >
      {images.map((image, index) => (
        <img
          key={index}
          src={image}
          alt={`Slide ${index + 1}`}
          className={`absolute top-0 left-0 w-full h-full transition-opacity duration-1000 object-cover ${
            index === currentSlide ? "opacity-100" : "opacity-0"
          }`}
        />
      ))}
      <div className="absolute w-full h-full px-5 pb-10">
        <div className="sm:max-w-[50%] w-full mx-auto flex items-end h-full gap-3 sm:gap-8">
          <TextField
            style="bg-primary/20 border-primary placeholder:text-white backdrop-blur text-white"
            container="flex-1"
            placeholder="Search for events, location or categories"
            onChange={(e) => {
              setQeury(e.target.value);
            }}
            value={query}
          />
          <Button style="px-4">
            {isWideScreen ? (
              "Search"
            ) : (
              <LuSearch className="text-2xl text-white" />
            )}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Slider;
