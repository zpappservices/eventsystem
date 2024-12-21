import PrivateRoute from "@/components/dashboard/PrivateRoute";
import Layout from "@/components/Layout";
import StyledImage from "@/components/StyledImage";
import useApiRequest from "@/hooks/useApiRequest";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import QRCode from "react-qr-code";
import { toast } from "react-toastify";

const ticketsreceipt = () => {
  const router = useRouter();

  const { reference, success } = router.query;

  const { data, error, loading, request } = useApiRequest({
    method: "get",
    url: `payment/gettransactionbyref/${reference}`,
    data: null,
    headers: null,
    useToken: true,
  });

  const {
    data: verifyData,
    error: verifyError,
    loading: verifyLoading,
    request: verifyRequest,
  } = useApiRequest({
    method: "get",
    url: `payment/verify-transaction/4501263899`,
    data: null,
    headers: null,
    useToken: true,
  });

  const getTransactions = async () => {
    await request();
    await verifyRequest();
  };

  useEffect(() => {
    getTransactions();
  }, []);

  const { data: transaction = [] } = data || {};

  useEffect(() => {
    if (!transaction) {
      toast.info("Invalid ticket receipt");
      router.push("/");
    }
  }, [transaction]);

  /* console.log(verifyData, verifyError); */

  return (
    <PrivateRoute>
      <Layout isHeader={false}>
        <div className="w-full bg-black p-5 text-white rounded-md">
          <p className="text-xl sm:text-[40px] font-bold text-center leading-snug">
            Online Tickets
          </p>
          <p className="text-xl sm:text-[40px] font-bold text-center leading-snug">
            Ticket purchase confirmation
          </p>
        </div>

        {success === "true" && transaction?.length > 0 && (
          <div className="mx-auto w-full my-3 flex flex-col gap-2 items-center">
            <StyledImage src="/img/ticket-success.svg" />

            <div>
              <p className="text-[20px] leading-[21px] text-black text-center">
                Congratulations!
              </p>
              <p className="text-[20px] leading-[21px] text-black text-center">
                Your Ticket purchased is Confirmed
              </p>
            </div>

            <div className="w-full flex flex-wrap items-center justify-center my-4 mx-auto gap-10">
              {transaction?.length > 0 &&
                transaction?.map(
                  (
                    {
                      id,
                      batchId,
                      eventId,
                      eventName,
                      userId,
                      ticketId,
                      ticket,
                    },
                    index
                  ) => (
                    <div
                      className="w-full max-w-[250px] xl:max-w-[300px] mx-3"
                      key={id}>
                      <QRCode
                        title="title"
                        value={batchId}
                        bgColor="#FFFFFF"
                        fgColor="#000000"
                        level="L"
                        className="shadow-[0_3px_10px_rgb(0,0,0,0.2)] p-3 py-7 rounded-[10px]  h-[200px] "
                      />
                      <div className="mt-3">
                        <p className="">
                          <span className="font-bold">Event:</span> {eventName}
                        </p>
                        <p>
                          <span className="font-bold">Ticket:</span> {ticket}
                        </p>
                        <p>
                          <span className="font-bold">Ticket Id:</span>{" "}
                          {ticketId}
                        </p>
                      </div>
                    </div>
                  )
                )}
            </div>
          </div>
        )}

        {success === "false" ||
          (transaction?.length < 1 && (
            <div className="flex flex-col max-w-[380px] gap-5 mx-auto !my-16">
              <StyledImage
                src="/img/ticket-fail.svg"
                className="w-full max-w-[150px] mx-auto"
              />

              <div>
                <p className="text-[16px] leading-[21px] text-gray-700 text-center">
                  Oops! Something went wrong.
                </p>
                <p className="text-[16px] leading-[20px] text-gray-700 text-center">
                  Your ticket purchase could not be confirmed. Please try again
                  later.
                </p>
              </div>
            </div>
          ))}
      </Layout>
    </PrivateRoute>
  );
};

export default ticketsreceipt;
