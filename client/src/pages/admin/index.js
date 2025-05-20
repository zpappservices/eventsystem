import Layout from "@/components/admin/Layout";
import Messages from "@/components/admin/Messages";
import Notifications from "@/components/admin/Notifications";
import Overview from "@/components/admin/Overview";
import Profile from "@/components/admin/Profile";
import RecentOrders from "@/components/admin/RecentOrders";
import SalesRevenue from "@/components/admin/SalesRevenue";
import Search from "@/components/admin/Search";
import TopCategoriesStats from "@/components/admin/TopCategoriesStats";
import TopOrganizersStats from "@/components/admin/TopOrganizersStats";
import React from "react";

const index = () => {
  return (
    <Layout>
      <div className="flex flex-col xl:flex-row gap-10 xl:gap-0">
        <div className="w-full">
          <div className="border-t border-dashed border-neutrals100 px-5 py-5">
            <p className="text-baseBlack font-bold">
              Dashboard <span className="font-normal text-neutrals600">/ Overview</span>
            </p>

            <div className="mt-10 space-y-10 ">
              <Overview />

              <div className="flex flex-wrap gap-10 items-start">
                <SalesRevenue />

                <TopOrganizersStats />
              </div>

              <div className="flex flex-wrap gap-10 items-start">
                <RecentOrders />

                <TopCategoriesStats />
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default index;
