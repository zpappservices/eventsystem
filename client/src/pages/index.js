import Categories from "@/components/Categories";
import Layout from "@/components/Layout";
import Ads from "@/components/website/Ads";

const Index = () => {
  return (
    <Layout>
      <div className="space-y-10">
        <Ads />
        <Categories />
      </div>
    </Layout>
  );
};

export default Index;
