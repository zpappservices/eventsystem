import { useRouter } from "next/router";
import StyledImage from "./StyledImage";
import { convertTo12HourFormat, formatDate } from "@/utils/time";
import { SlClock } from "react-icons/sl";
import { BsTags } from "react-icons/bs";
import { useState } from "react";
import { formatCurrencyWithoutDecimal } from "@/utils/conversions";
import { IoMdShare } from "react-icons/io";
import Button from "./widgets/Button";
import SimilarEvents from "./events/SimilarEvents";

const EventsDetails = ({ id, details }) => {
  const [tickets, setTickets] = useState([]);

  const event = details;
  const location = details?.EventLocation?.[0];
  const bannerPhotos = details?.image_banner?.slice(1) || [];
  const venuePhotos = details?.venue_image || [];
  const photos = [...bannerPhotos, ...venuePhotos];

  const router = useRouter();

  const handleClick = () => {
    const serializedData = {
      id: id,
    };

    router.push({
      pathname: "/events/checkout",
      query: serializedData,
    });
  };

  const { currency } = details || {};
  const totalCost = tickets.reduce(
    (acc, ticket) => acc + ticket.amount * ticket.quantity,
    0
  );

  return (
    <div className="w-full flex flex-col gap-6">
      <div className="w-full gap-6">
        <div className="w-full flex flex-col sm:flex-row items-start gap-6">
          <div className="w-full max-w-[952px] h-[400px] overflow-hidden">
            <StyledImage
              src={event?.image_banner?.[0]}
              className="w-full h-full rounded-[10px] object-cover"
            />
          </div>
          <div className="w-full max-w-[336px] space-y-8 p-5 border border-neutrals100 rounded-[10px]">
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
                {formatDate(event?.StartDate)}{" "}
                {/* - {formatDate(event?.EndDate)} */}
              </span>
            </p>

            <p className="text-[14px] leading-normal capitalize flex items-center">
              <SlClock className="text-xl" />
              <span className="font-medium mx-0.5 ms-4">
                {convertTo12HourFormat(event?.StartTime)} -{" "}
                {convertTo12HourFormat(event?.EndTime)}{" "}
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

      <div className="space-y-5">
        <div className="border-b border-neutrals100 flex items-center overflow-x-auto gap-8 pb-3">
          {["Description", "Location", "Photos", "About Organizer"]?.map(
            (item, index) => (
              <p className="min-w-fit" key={index}>
                {item}
              </p>
            )
          )}
        </div>

        <div className="space-y-4">
          <div className="">
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
            <div className="text-[14px] leading-normal capitalize flex flex-wrap [@media(max-width:461px)]:justify-center items-center gap-5">
              {photos?.map((item, index) => (
                <StyledImage
                  key={index}
                  className="shrink-0 rounded-[4px] w-[200px] h-[200px] aspect-square object-cover"
                  src={item}
                />
              ))}
            </div>
          </div>

          {/* <div className="space-y-3">
            <p className="text-base sm:text-xl font-medium"> About Organizer</p>
            <div className="flex items-center gap-3">
              <StyledImage
                className="shrink-0 h-[48px] w-[48px] rounded-full"
                src="/img/profile.png"
              />
              <div>
                <p className="text-base text-baseBlack">Shadow Empire</p>
                <p className="text-sm text-neutrals600">
                  Events hosted: <span className="text-baseBlack">60</span>
                </p>
              </div>

              <Button background="bg-sec" hover="hover:bg-sec/90">
                Subscribe
              </Button>
            </div>
          </div> */}

          <SimilarEvents id={event?.category} />
        </div>
      </div>
    </div>
  );
};

export default EventsDetails;
