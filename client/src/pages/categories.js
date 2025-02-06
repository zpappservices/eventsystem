import useApiRequest from "@/hooks/useApiRequest";
import { useEffect } from "react";
import { CircularProgress } from "@mui/material";
import { categoryImages } from "@/mock/categoryImages";
import Button from "@/components/widgets/Button";
import EventsCard from "@/components/EventsCard";
import Layout from "@/components/Layout";

const categories = () => {
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
      <Layout>
        <div className="h-[400px] w-full flex justify-between items-center">
          <CircularProgress color="#FF7F50" className="mx-auto" />
        </div>
      </Layout>
    );
  }

  // Handle error state
  if (error) {
    return (
      <Layout>
        <div>Error loading data</div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="w-full max-w-[1323px] mx-auto flex flex-col gap-5 py-10 sm:pb-20">
        <div className="space-y-10">
          <div className="flex items-center gap-3 justify-between">
            <p className="text-[20px] leading-normal  font-bold">Categories</p>
          </div>
          <div className="w-full grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10">
            {data?.data.length > 0 ? (
              data.data
                .filter(({ active, name }) => active && name !== "Sport")
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
    </Layout>
  );
};

export default categories;
