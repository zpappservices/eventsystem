import ActiveEvents from "@/components/dashboard/ActiveEvents";
import Calendar from "@/components/dashboard/Calendar";
import Earnings from "@/components/dashboard/Earnings";
import Layout from "@/components/dashboard/Layout";
import RecentActivities from "@/components/dashboard/ReventActivities";
import SalesRevenue from "@/components/dashboard/SalesRevenue";
import Summary from "@/components/dashboard/Summary";

const Dashboard = () => {
  return (
    <Layout>
      <div className="w-full flex flex-col gap-7">
        <div className="w-full bg-white py-3">
          <Summary />
        </div>

        <div className="w-full flex flex-wrap items-start gap-5">
          <SalesRevenue />

          <Earnings />

          <RecentActivities />
        </div>

        <div className="w-full bg-white py-6 pb-10 flex flex-col xl:flex-row items-start gap-5">
          <ActiveEvents />

          <Calendar />
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;
