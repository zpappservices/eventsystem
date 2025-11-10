import { getEventDetails } from "@/apis/eventsServices";
import Layout from "@/components/dashboard/Layout";
import StyledImage from "@/components/StyledImage";
import useLoading from "@/hooks/useLoading";
import { formatCurrencyWithoutDecimal } from "@/utils/conversions";
import { convertTo12HourFormat, formatDate } from "@/utils/time";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { CgSpinner } from "react-icons/cg";
import { toast } from "react-toastify";

const EventDetails = () => {
  const [data, setData] = useState();

  const { query } = useRouter();
  const { id } = query;
  const { isLoading, startLoading, stopLoading } = useLoading();

  const getEvent = async () => {
    const { data, success, message } = await getEventDetails(
      id,
      startLoading,
      stopLoading
    );

    if (success) {
      setData(data?.event);
    } else {
      toast.error(message);
    }
  };

  useEffect(() => {
    if (id) {
      getEvent();
    }
  }, [id]);

  const tickets = data?.EventTicket;
  const banner = data?.image_banner;
  const location = data?.EventLocation?.[0];

  if (isLoading) {
    return (
      <Layout>
        <div className="h-screen w-full flex items-center justify-center">
          <CgSpinner className="text-2xl text-neutrals700" />
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="w-full max-w-[1190px] space-y-12 py-5">
        <div className="space-y-4">
          <div className="max-w-[500px] w-full rounded-[10px] overflow-hidden">
            <StyledImage
              src={banner?.[0]}
              className="w-full h-full object-cover aspect-video"
            />
          </div>

          <div className="flex items-center flex-wrap gap-3">
            {banner?.map((item, index) => {
              {
                if (index === 0) return;
                return (
                  <div className="max-w-[90px] h-[90px] w-full rounded-[10px] overflow-hidden">
                    <StyledImage
                      src={item}
                      className="w-full h-full object-cover aspect-square"
                    />
                  </div>
                );
              }
            })}
          </div>
        </div>

        <div className="space-y-5">
          <div className="flex flex-wrap items-start gap-5 md:gap-10">
            <div>
              <p className="text-lg font-semibold">Name</p>
              <p className="text-base text-neutrals700">{data?.title}</p>
            </div>
            <div>
              <p className="text-lg font-semibold">Category</p>
              <p className="text-base text-neutrals700">
                {data?.Category?.name}
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-start gap-5 md:gap-10">
            <div>
              <p className="text-lg font-semibold">Starts</p>
              <p className="text-base text-neutrals700">
                {formatDate(data?.StartDate)}{" "}
                {convertTo12HourFormat(data?.StartTime)}
              </p>
            </div>
            <div>
              <p className="text-lg font-semibold">Ends</p>
              <p className="text-base text-neutrals700">
                {formatDate(data?.EndDate)}{" "}
                {convertTo12HourFormat(data?.EndTime)}
              </p>
            </div>
          </div>

          <div>
            <p className="text-lg font-semibold">Description</p>
            <p className="text-base text-neutrals700">{data?.description}</p>
          </div>

          <div className="flex flex-wrap items-start gap-5 md:gap-10">
            <div>
              <p className="text-lg font-semibold">Location</p>
              <p className="text-base text-neutrals700">{location?.location}</p>
            </div>

            <div>
              <p className="text-lg font-semibold">Venue</p>
              <p className="text-base text-neutrals700">
                {location?.venueName}
              </p>
            </div>
          </div>

          <div className="space-y-2">
            <p className="text-lg font-semibold">Tickets</p>
            <div className="w-full max-w-[400px] flex flex-col gap-3 items-start ">
              {tickets?.map((item, index) => (
                <div className="w-full border p-2.5 rounded-[10px]">
                  <p className="text-base" key={index}>
                    {item?.name}
                  </p>
                  <p className="text-base text-neutrals700" key={index}>
                    {item?.description}
                  </p>
                  <p className="text-base text-primary" key={index}>
                    {formatCurrencyWithoutDecimal(item?.price)}
                  </p>{" "}
                  <div className="flex flex-wrap items-center gap-2.5">
                    <p className="text-base text-neutrals700" key={index}>
                      Min Order: {item?.minOrder}
                    </p>

                    <p className="text-base text-neutrals700" key={index}>
                      Max Order: {item?.maxOrder}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default EventDetails;
