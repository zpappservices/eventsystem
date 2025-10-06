import useApiRequest from "@/hooks/useApiRequest";
import useAuthToken from "@/hooks/useAuthToken";
import { useEffect } from "react";
import StyledImage from "../StyledImage";
import { AiOutlineInfoCircle } from "react-icons/ai";
import { formatCurrencyWithoutDecimal } from "@/utils/conversions";
import { HiArrowLongUp, HiArrowLongDown } from "react-icons/hi2";

const Card = ({ title, amount, icon, data, percentile }) => {
  return (
    <div className="w-full max-w-[195px]  border border-neutrals400 bg-neutrals100/10 rounded-[10px]">
      <div className="flex flex-col gap-5 p-3">
        <div className="flex items-start justify-between">
          {icon}
          <AiOutlineInfoCircle className="text-neutrals700 text-xl" />
        </div>
        <div className="flex items-end gap-5">
          <div>
            <p className="text-xs text-neutrals600 ">{title}</p>
            <p className="text-sm text-baseBlack">{amount}</p>
          </div>
          {percentile && (
            <div
              className={`text-xs font-bold rounded-[4px] p-0.5 px-1 ms-auto flex items-center ${
                percentile?.trend === "up"
                  ? "bg-primary100 text-primary"
                  : "bg-error100 text-error"
              }`}
            >
              {percentile?.trend === "up" ? (
                <HiArrowLongUp />
              ) : (
                <HiArrowLongDown />
              )}
              {percentile?.value}
            </div>
          )}
        </div>
      </div>
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

  const { data: profileData, request: profileRequest } = useApiRequest({
    method: "get",
    url: `user/getvendorbyuserid/${activeUser}`,
    useToken: true,
  });

  const getProfile = async () => {
    if (activeUser) await profileRequest();
  };

  const getUser = async () => {
    await request();
  };

  useEffect(() => {
    getUser();
    getProfile();
  }, []);

  const { activeEvent, totalAmmountSold, totalEvent, totalTransactions } =
    data?.data || {};
  const { firstName } = profileData?.data || {};
  const currentHour = new Date().getHours();
  const greeting =
    currentHour < 12
      ? "Good Morning"
      : currentHour < 18
      ? "Good Afternoon"
      : "Good Evening";

  return (
    <div className="w-full">
      <div className="w-full flex flex-wrap items-center gap-5">
        <div className="w-full max-w-[272px] mr-10">
          <div className="space-y-3 text-baseBlack">
            <p>
              {greeting}, {firstName}
            </p>
            <p className="text-2xl font-bold">
              Welcome to Your Event Management!
            </p>
            <p className="text-sm text-neutrals500">
              Here’s is the summary of your events
            </p>
          </div>
        </div>
        <Card
          title="Total Events"
          amount={totalEvent}
          background="bg-black"
          icon={<StyledImage src="/img/tickets-sold.svg" />}
          percentile={{ trend: "up", value: "1.2%" }}
        />
        {/* <Card
          title="Total tickets sold"
          amount={totalEvent}
          icon={<StyledImage src="/img/tickets-sold.svg" />}
        /> */}

        <Card
          title="Total Revenue"
          amount={formatCurrencyWithoutDecimal(totalAmmountSold)}
          icon={<StyledImage src="/img/total-revenue.svg" />}
          percentile={{ trend: "down", value: "1.7%" }}
        />
        {/* <Card
          title="Upcoming events"
          amount={totalEvent}
          icon={<StyledImage src="/img/upcoming-events.svg" />}
        /> */}
        <Card
          title="Active Events"
          amount={activeEvent}
          icon={<StyledImage src="/img/upcoming-events.svg" />}
        />
        <Card
          title="Total Transactions"
          amount={totalTransactions}
          icon={<StyledImage src="/img/tickets-sold.svg" />}
        />
        {/* <Card
          title="Total Scanned Tickets"
          amount={totalTransactions}
          icon={<StyledImage src="/img/tickets-sold.svg" />}
        /> */}
      </div>
    </div>
  );
};

export { Card };
export default Summary;
