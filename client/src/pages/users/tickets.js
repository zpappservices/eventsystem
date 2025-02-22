import PrivateRoute from "@/components/dashboard/PrivateRoute";
import Layout from "@/components/Layout";
import TicketTable from "@/components/tickets/TicketTable";
import useApiRequest from "@/hooks/useApiRequest";
import useAuthToken from "@/hooks/useAuthToken";
import { Loader } from "lucide-react";
import React, { useEffect } from "react";
import QRCode from "react-qr-code";

const tickets = () => {
  const { activeUser } = useAuthToken();
  const { data, error, loading, request } = useApiRequest({
    method: "get",
    url: `event/getticketbyuser/${activeUser}`,
    data: null,
    headers: null,
    useToken: true,
  });

  const getTickets = async () => {
    await request();
  };

  useEffect(() => {
    getTickets();
  }, []);

  const { data: tickets = [] } = data || {};

  console.log(tickets);
  return (
    <PrivateRoute>
      <Layout isHeader={false} container="px-5 max-w-[1512px]">
        <p className="text-[17px] sm:text-[20px] font-semibold leading-normal">
          My Tickets
        </p>
        <div className="space-y-10 py-10">
          {tickets?.length > 0 &&
            tickets?.map(({ transaction, eventName }, index) => (
              <TicketTable
                tickets={transaction}
                key={index}
                event={eventName}
              />
            ))}
        </div>
        {tickets?.length < 1 && !loading && !error && (
          <div className="h-[60vh] flex justify-center items-center">
            No tickets purchased yet
          </div>
        )}
        {loading && (
          <div className="h-[60vh] flex justify-center items-center">
            <Loader className="animate-spin" />
          </div>
        )}
      </Layout>
    </PrivateRoute>
  );
};

export default tickets;
