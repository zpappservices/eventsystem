import useApiRequest from "@/hooks/useApiRequest";
import useAuthToken from "@/hooks/useAuthToken";
import { useEffect } from "react";

const Card = ({ background, title, amount }) => {
  return (
    <div
      className={`w-full max-w-[249px] flex flex-col gap-5 py-6 px-5 text-white ${background} rounded-lg`}>
      <p>{title}</p>
      <p>{amount}</p>
    </div>
  );
};

const Summary = () => {
  const { activeUser } = useAuthToken();
  const { data, request } = useApiRequest({
    method: "get",
    url: `event/getVendorDashboardSumarry/${activeUser}`,
    useToken: true,
  });

  const getUser = async () => {
    await request();
  };

  useEffect(() => {
    getUser();
  }, []);

  const { activeEvent, totalAmmountSold, totalEvent, totalTransactions } =
    data?.data || {};
  return (
    <div className="w-full">
      <p className="text-[20px] font-bold leading-[24px]">Overrall Summary</p>
      <div className="w-full flex flex-wrap md:flex-nowrap justify-center items-center gap-5 mt-10">
        <Card title="Total Events" amount={totalEvent} background="bg-black" />
        <Card
          title="Active Events"
          amount={activeEvent}
          background="bg-black"
        />
        {/* <Card
          title="Total Amount Sales"
          amount={`₵ ${totalAmmountSold
            ?.toString()
            ?.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`}
          background="bg-[#FF7F50]"
        /> */}
        <Card
          title="Total Transactions"
          amount={totalTransactions}
          background="bg-[#7C88F0]"
        />
      </div>
    </div>
  );
};

export { Card };
export default Summary;
