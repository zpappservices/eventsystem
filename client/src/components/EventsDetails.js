import { useRouter } from "next/router";
import StyledImage from "./StyledImage";
import { convertTo12HourFormat, formatDate } from "@/utils/time";
import { SlClock } from "react-icons/sl";
import { BsTags } from "react-icons/bs";
import { useEffect, useState, useRef } from "react";
import { formatCurrencyWithoutDecimal } from "@/utils/conversions";
import { IoMdShare } from "react-icons/io";
import Button from "./widgets/Button";
import SimilarEvents from "./events/SimilarEvents";
import { AnimatePresence, motion } from "framer-motion"; // 👈 added

const EventsDetails = ({ id, details }) => {
  const [tickets, setTickets] = useState([]);
  const [isFloating, setIsFloating] = useState(false);
  const cardRef = useRef(null);

  const event = details;
  const location = details?.EventLocation?.[0];
  const bannerPhotos = details?.image_banner?.slice(1) || [];
  const venuePhotos = details?.venue_image || [];
  const photos = [...bannerPhotos, ...venuePhotos];

  const router = useRouter();

  const handleClick = () => {
    router.push({
      pathname: "/events/checkout",
      query: { id },
    });
  };

  const { currency } = details || {};
  const totalCost = tickets.reduce(
    (acc, ticket) => acc + ticket.amount * ticket.quantity,
    0
  );

  // 👇 Observe scroll to toggle floating card visibility
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (window.innerWidth >= 1024) {
          setIsFloating(!entry.isIntersecting);
        } else {
          setIsFloating(false);
        }
      },
      { threshold: 0.1 }
    );

    if (cardRef.current) observer.observe(cardRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div className="w-full flex flex-col gap-6 relative">
      <div className="w-full gap-6">
        <div className="w-full flex flex-col sm:flex-row items-start gap-6">
          <div className="w-full max-w-[952px] h-[400px] overflow-hidden">
            <StyledImage
              src={event?.image_banner?.[0]}
              className="w-full h-full rounded-[10px] object-cover"
            />
          </div>

          {/* Static sidebar card */}
          <div
            ref={cardRef}
            id="float"
            className="w-full max-w-[336px] space-y-8 p-5 border border-neutrals100 rounded-[10px]"
          >
            <div className="flex items-center gap-4">
              <p className="text-sm text-baseBlack">
                Price{" "}
                <span className="text-base text-primary font-medium">
                  {totalCost
                    ? formatCurrencyWithoutDecimal(totalCost, currency)
                    : "Free"}
                </span>
              </p>
              <IoMdShare className="text-base text-baseBlack ms-auto" />
            </div>

            <p className="text-[14px] leading-normal capitalize flex items-center">
              <BsTags className="text-xl" />
              <span className="font-medium mx-0.5 ms-4 text-primary">
                {event?.Category?.name}
              </span>
            </p>

            <p className="text-[14px] leading-normal capitalize flex items-start sm:items-center">
              <StyledImage className="shrink-0" src="/img/calendar.svg" />
              <span className="font-medium mx-0.5 ms-4">
                {formatDate(event?.StartDate)}
              </span>
            </p>

            <p className="text-[14px] leading-normal capitalize flex items-center">
              <SlClock className="text-xl" />
              <span className="font-medium mx-0.5 ms-4">
                {convertTo12HourFormat(event?.StartTime)} -{" "}
                {convertTo12HourFormat(event?.EndTime)}
              </span>
            </p>

            <p className="text-[14px] leading-normal capitalize flex items-center">
              <StyledImage className="shrink-0" src="/img/location.svg" />
              <span className="font-medium mx-0.5 ms-4">
                {location?.location}
              </span>
            </p>

            <Button style="w-full !mt-10" onClick={handleClick}>
              Get Ticket
            </Button>
          </div>
        </div>
      </div>

      {/* Floating animated version */}
      <AnimatePresence>
        {isFloating && (
          <motion.div
            key="floating-card"
            initial={{ opacity: 0, x: 80 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 80 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
            className="hidden lg:block fixed top-24 right-10 w-[336px] bg-white shadow-xl border border-neutrals100 rounded-[10px] p-5 z-50 space-y-8"
          >
            <div className="flex items-center gap-4">
              <p className="text-sm text-baseBlack">
                Price{" "}
                <span className="text-base text-primary font-medium">
                  {totalCost
                    ? formatCurrencyWithoutDecimal(totalCost, currency)
                    : "Free"}
                </span>
              </p>
              <IoMdShare className="text-base text-baseBlack ms-auto" />
            </div>

            <p className="text-[14px] leading-normal capitalize flex items-center">
              <BsTags className="text-xl" />
              <span className="font-medium mx-0.5 ms-4 text-primary">
                {event?.Category?.name}
              </span>
            </p>

            <p className="text-[14px] leading-normal capitalize flex items-start sm:items-center">
              <StyledImage className="shrink-0" src="/img/calendar.svg" />
              <span className="font-medium mx-0.5 ms-4">
                {formatDate(event?.StartDate)}
              </span>
            </p>

            <p className="text-[14px] leading-normal capitalize flex items-center">
              <SlClock className="text-xl" />
              <span className="font-medium mx-0.5 ms-4">
                {convertTo12HourFormat(event?.StartTime)} -{" "}
                {convertTo12HourFormat(event?.EndTime)}
              </span>
            </p>

            <p className="text-[14px] leading-normal capitalize flex items-center">
              <StyledImage className="shrink-0" src="/img/location.svg" />
              <span className="font-medium mx-0.5 ms-4">
                {location?.location}
              </span>
            </p>

            <Button style="w-full !mt-10" onClick={handleClick}>
              Get Ticket
            </Button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Other sections */}
      <div className="space-y-5">
        <div className="border-b border-neutrals100 flex items-center overflow-x-auto gap-8 pb-3">
          {["Description", "Location", "Photos", "About Organizer"].map(
            (item, index) => (
              <p className="min-w-fit" key={index}>
                {item}
              </p>
            )
          )}
        </div>

        <div className="space-y-4">
          <div>
            <p className="text-3xl font-bold text-baseBlack">{event?.title}</p>
            <p className="text-base text-baseBlack">
              Hosted by:{" "}
              <span className="text-primary font-medium">Shadow Empire</span>
            </p>
          </div>

          <p>{event?.description}</p>

          <div className="space-y-3">
            <p className="text-base sm:text-xl font-medium">Location</p>
            <p className="text-[14px] leading-normal capitalize flex items-center">
              <StyledImage className="shrink-0" src="/img/location.svg" />
              <span className="font-medium mx-0.5 ms-4">
                {location?.location}
              </span>
            </p>
          </div>

          <div className="space-y-3">
            <p className="text-base sm:text-xl font-medium">Photos</p>
            <div className="text-[14px] flex flex-wrap items-center gap-5">
              {photos?.map((item, index) => (
                <StyledImage
                  key={index}
                  className="rounded-[4px] w-[200px] h-[200px] object-cover"
                  src={item}
                />
              ))}
            </div>
          </div>

          <SimilarEvents id={event?.category} />
        </div>
      </div>
    </div>
  );
};

export default EventsDetails;
