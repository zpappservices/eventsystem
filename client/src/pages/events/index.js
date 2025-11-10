import EventsList from "@/components/events/EventsList";
import Slider from "@/components/events/Slider";
import Layout from "@/components/Layout";
import { useState } from "react";

const Events = () => {
  const [filters, setFilters] = useState({
    sortBy: "new",
  });

  return (
    <Layout
      isHeader={false}
      container="w-full max-w-[1512px] mx-auto px-5 mt-[103px] sm:!mt-[88px]"
    >
      <Slider />

      <EventsList filters={filters} setFilters={setFilters} />
    </Layout>
  );
};

export default Events;
