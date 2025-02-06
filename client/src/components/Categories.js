import useApiRequest from "@/hooks/useApiRequest";
import EventsCard from "./EventsCard";
import { useEffect } from "react";
import { CircularProgress } from "@mui/material";
import Button from "./widgets/Button";
import { categoryImages } from "@/mock/categoryImages";
import Link from "next/link";
import CategoryCardSkeleton from "./categories/CategoryCardSkeleton";

const Categories = () => {
  const { data, error, loading, request } = useApiRequest({
    method: "get",
    url: "setup/getallcategory",
  });

  const getEventsCategories = async () => {
    await request();
  };

  useEffect(() => {
    getEventsCategories();
  }, []);

  // Handle loading state
  if (loading) {
    return (
      <div className="w-full max-w-[1323px] px-5 flex items-center justify-center sm:justify-between flex-wrap gap-5">
        <div className="w-full grid grid-cols-1 gap-x-5 gap-y-10 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 py-6">
          {["", "", "", "", "", "", "", "", "", "", ""]?.map((item, index) => (
            <CategoryCardSkeleton key={index} />
          ))}
        </div>
      </div>
    );
  }

  // Handle error state
  if (error || data?.length < 1) {
    return (
      <div className="max-w-[1323px] px-5 text-center mx-auto">
        Couldn't load data
      </div>
    );
  }

  return (
    <div className="w-full max-w-[1323px] px-5 mx-auto flex flex-col gap-5">
      <div className="space-y-10">
        <div className="py-3 flex items-center gap-3 justify-between">
          <p className="text-[20px] leading-normal  font-bold">
            Trending Category
          </p>

          <Link href="/categories">
            <Button
              background="bg-baseBlack"
              style="!font-normal"
              text="text-white text-[14px]"
              hover="hover:bg-baseBlack/90 hover:text-white">
              See more
            </Button>
          </Link>
        </div>
        <div className="w-full flex items-center justify-center sm:justify-between flex-wrap gap-5">
          {data?.data.length > 0 ? (
            data.data
              .filter(({ active, name }) => active && name !== "Sport")
              .slice(0, 4)
              .map(({ name, description }, index) => (
                <EventsCard
                  key={index}
                  title={name}
                  description={description}
                  image={categoryImages[name] ?? "/img/standup.svg"}
                />
              ))
          ) : (
            <div>No active categories available.</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Categories;
