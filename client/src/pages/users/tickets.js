import PrivateRoute from "@/components/dashboard/PrivateRoute";
import Layout from "@/components/Layout";
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
  return (
    <PrivateRoute>
      <Layout isHeader={false}>
        <p className="text-[17px] sm:text-[20px] font-semibold leading-normal">
          My Tickets
        </p>
        <div className="space-y-10 py-10">
          {tickets?.length > 0 &&
            tickets?.map(({ eventName, transaction }, index) => (
              <div className="space-y-5" key={index}>
                <p className="text-[15px] sm:text-[18px] font-semibold leading-normal capitalize">
                  {eventName}
                </p>
                <div className="w-full flex flex-wrap items-center justify-center my-4 mx-auto gap-10">
                  {transaction?.length > 0 &&
                    transaction?.map(({ ticketId, ticket, id }, index) => (
                      <div
                        className="w-full max-w-[250px] xl:max-w-[300px] mx-3"
                        key={id}>
                        <QRCode
                          title="title"
                          value={ticketId}
                          bgColor="#FFFFFF"
                          fgColor="#000000"
                          level="L"
                          className="shadow-[0_3px_10px_rgb(0,0,0,0.2)] p-3 py-7 rounded-[10px]  h-[200px] "
                        />
                        <div className="mt-3">
                          <p>
                            <span className="font-bold">Ticket:</span> {ticket}
                          </p>
                          <p>
                            <span className="font-bold">Ticket Id:</span>{" "}
                            {ticketId}
                          </p>
                        </div>
                      </div>
                    ))}
                </div>
              </div>
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
