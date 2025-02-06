import Categories from "@/components/Categories";
import Layout from "@/components/Layout";
import TopEvents from "@/components/TopEvents";
import Ads from "@/components/website/Ads";
import CreateEvent from "@/components/website/CreateEvent";

const Index = () => {
  return (
    <Layout>
      <div className="space-y-16">
        <Ads />

        <Categories />

        <TopEvents />

        <CreateEvent />
      </div>
    </Layout>
  );
};

export default Index;
