import EventList from "@/components/dashboard/EventList";
import Layout from "@/components/dashboard/Layout";
import WeeklyStats from "@/components/dashboard/WeeklyStats";
import React from "react";

const events = () => {
  return (
    <Layout>
      <div className="w-full max-w-[1190px] space-y-12 py-5">
        <p className="font-bold text-2xl text-baseBlack">Events</p>

        <div className="rounded-[10px] md:border md:bg-baseWhite border-neutrals400 md:p-5 md:py-5 space-y-5">
          <WeeklyStats />
        </div>

        <EventList />
      </div>
    </Layout>
  );
};

export default events;
