import useApiRequest from "@/hooks/useApiRequest";
import EventsCard from "./EventsCard";
import TopEvents from "./TopEvents";
import { useEffect } from "react";
import { CircularProgress } from "@mui/material";

const Home = () => {
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
      <div className="h-[200px] w-full flex justify-between items-center">
        <CircularProgress color="#FF7F50" className="mx-auto" />
      </div>
    );
  }

  // Handle error state
  if (error) {
    return <div>Error loading data</div>;
  }

  return (
    <div className="w-full flex flex-col gap-5">
      <div className="w-full flex items-center justify-between flex-wrap gap-5">
        {data?.data.length > 0
          ? data.data
              .filter(({ active }) => active)
              .map(({ name, description }, index) => (
                <EventsCard
                  key={index}
                  title={name}
                  description={description}
                  image="/img/standup.svg"
                />
              ))
          : <div>No active categories available.</div>}
      </div>

      <div className="w-full max-w-[390] text-[24px] font-bold">
        Here we know how to make you enjoy in style
      </div>

      <TopEvents />
    </div>
  );
};

export default Home;