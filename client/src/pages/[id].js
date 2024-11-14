import React from "react";
import { useRouter } from "next/router";
import Layout from "@/components/Layout";
import EventsDetails from "@/components/EventsDetails";

const Event = () => {
  const router = useRouter();
  const { id } = router.query; // Get the `id` from the query object

  const status = id ? `[id]: ${id}` : "Loading...";
  console.log(id);

  return (
    <Layout>
      <div>
        <EventsDetails id={id} />
      </div>
    </Layout>
  );
};

export default Event;
