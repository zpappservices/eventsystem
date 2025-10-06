import { useState, useEffect, useRef } from "react";
import TextField from "../widgets/TextField";
import Button from "../widgets/Button";
import { ClickAwayListener, MenuItem, Paper, Popper, useMediaQuery } from "@mui/material";
import { LuSearch } from "react-icons/lu";
import useSearch from "@/hooks/useSearch";
import { getEvents } from "@/apis/eventsServices";
import { useRouter } from "next/router";
import useLoading from "@/hooks/useLoading";

const images = [
  "/img/slider-1.svg",
  "/img/slider-2.svg",
  "/img/slider-3.svg",
  "/img/slider-4.svg",
  "/img/slider-5.svg",
];

const Slider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const sliderRef = useRef(null);
  const [events, setEvents] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [open, setOpen] = useState(false);


  const anchorRef = useRef(null);
  const router = useRouter();
  const { isLoading, startLoading, stopLoading } = useLoading(true);

  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }
    setOpen(false);
  };

  const fetchEvents = async () => {
    const { success, data } = await getEvents(startLoading, stopLoading);

    if (success) setEvents(data);
  };

  const searchFunction = (item, term) => {
    return (
      item?.title?.toLowerCase()?.includes(term?.toLowerCase()) ||
      item?.location?.toLowerCase()?.includes(term?.toLowerCase())
    );
  };

  const searchedItems = useSearch(events, searchTerm, searchFunction);

  const search = () => {
    if (searchedItems?.length > 0) {
      setOpen(true);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

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
          <div
            ref={anchorRef}
            className="w-full max-w-[400px] flex items-center rounded-[8px] gap-1.5"
          >
            <TextField
              style="bg-primary/20 border-primary placeholder:text-white backdrop-blur text-white"
              container="flex-1"
              placeholder="Search for events, location or categories"
              onChange={(e) => {
                setSearchTerm(e.target.value);
              }}
              value={searchTerm}
            />
            <Popper
              open={open}
              anchorEl={anchorRef.current}
              placement="bottom-start"
              className="!z-30"
              style={{
                minWidth: anchorRef.current?.offsetWidth,
                maxWidth: 400,
              }}
            >
              <ClickAwayListener onClickAway={handleClose}>
                <Paper className="mt-7">
                  {searchedItems?.map((item, index) => (
                    <MenuItem
                      className="text-[14px] py-3 !font-inter hover:bg-primary100/20"
                      onClick={() => router.push(`/events/${item?.id}`)}
                      key={index}
                    >
                      {item.title}
                    </MenuItem>
                  ))}
                </Paper>
              </ClickAwayListener>
            </Popper>
          </div>
          <Button style="px-4" onClick={search}>
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
