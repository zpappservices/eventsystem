import useApiRequest from "@/hooks/useApiRequest";
import EventsCard from "./EventsCard";
import TopEvents from "./TopEvents";
import { useEffect } from "react";
import { CircularProgress } from "@mui/material";

const categoryImages = {
  Music:
    "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8bXVzaWMlMjBpY29ufGVufDB8fDB8fHww",
  Nightlife:
    "https://images.unsplash.com/photo-1567593810070-7a3d471af022?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fG5pZ2h0JTIwZW50ZXJ0YWlubWVudHxlbnwwfHwwfHx8MA%3D%3D",
  Comedy:
    "https://images.unsplash.com/photo-1475721027785-f74eccf877e2?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fG1pY3JvcGhvbmV8ZW58MHx8MHx8fDA%3D",
  "Performing & Visual Art":
    "https://images.unsplash.com/photo-1492037766660-2a56f9eb3fcb?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mjh8fHBlcmZvcm1pbmclMjBhcnR8ZW58MHx8MHx8fDA%3D",
  Holidays:
    "https://plus.unsplash.com/premium_photo-1661964304872-7b715cf38cd1?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8aG9saWRheXxlbnwwfHwwfHx8MA%3D%3D",
  Dating:
    "https://images.unsplash.com/photo-1517957096399-3a4e3d34d95e?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fGRhdGluZyUyMHRhYmxlfGVufDB8fDB8fHww",
  Business:
    "https://plus.unsplash.com/premium_photo-1661370129267-218cf5075c23?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NTN8fGJ1c2luZXNzJTIwbWVldGluZ3xlbnwwfHwwfHx8MA%3D%3D",
  "Food & Drink":
    "https://plus.unsplash.com/premium_photo-1674106347866-8282d8c19f84?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8Zm9vZCUyMGFuZCUyMGRyaW5rfGVufDB8fDB8fHww",
};

// Example of dynamically accessing a value:
const categoryName = "Nightlife"; // This could be a variable
const imageUrl = categoryImages[categoryName];

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
      <div className="h-[400px] w-full flex justify-between items-center">
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
      <TopEvents />

      <div className="space-y-10">
        <div className="bg-black px-2 py-3">
          <p className="text-[20px] leading-normal text-[#FF7F50] font-bold">
            Popular categories
          </p>
        </div>
        <div className="w-full flex items-center justify-center sm:justify-between flex-wrap gap-5">
          {data?.data.length > 0 ? (
            data.data
              .filter(({ active, name }) => active && name !== "Sport" )
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

      <div className="w-full max-w-[390] text-[24px] font-bold">
        Here we know how to make you enjoy in style
      </div>
    </div>
  );
};

export default Home;
