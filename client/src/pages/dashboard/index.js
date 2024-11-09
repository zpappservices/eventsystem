import ActiveEvents from "@/components/dashboard/ActiveEvents";
import Layout from "@/components/dashboard/Layout";
import Summary from "@/components/dashboard/Summary";

const Dashboard = () => {
   return (
      <Layout>
         <div className="w-full flex flex-col gap-[50px]">
            <div className="w-full max-w-[1000px] bg-white px-5 py-3 pb-[60px] drop-shadow-lg">
               <Summary />
            </div>

            <div className="w-full max-w-[1000px] bg-white px-5 py-6 pb-10 drop-shadow-lg">
               <ActiveEvents />
            </div>
         </div>
      </Layout>
   );
};

export default Dashboard;
