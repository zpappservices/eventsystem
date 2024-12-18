import Layout from "@/components/dashboard/Layout";
import Account from "@/components/payout/Account";
import Overview from "@/components/payout/Overview";
import PayoutHistory from "@/components/payout/PayoutHistory";
import React from "react";

const payout = () => {
  return (
    <Layout>
      <div className="w-full flex flex-col gap-[50px]">
        <div className="w-full max-w-[1000px] bg-white px-5 py-3 pb-[60px] drop-shadow-lg flex flex-col gap-5">
          {/* <Overview /> */}
          <Account />
        </div>

        <div className="w-full max-w-[1000px] bg-white px-5 py-6 pb-10 drop-shadow-lg">
          <PayoutHistory />
        </div>
      </div>
    </Layout>
  );
};

export default payout;
