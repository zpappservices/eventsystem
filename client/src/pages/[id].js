import React, { useEffect } from "react";
import { useRouter } from "next/router";
import Layout from "@/components/Layout";
import EventsDetails from "@/components/EventsDetails";
import { Loader2 } from "lucide-react";
import useApiRequest from "@/hooks/useApiRequest";

const Event = () => {
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    if (!id) router.push("/");
  }, [id]);

  const { data, error, loading, request } = useApiRequest({
    method: "get",
    url: `event/getoneevent/${id}`,
    data: null,
    headers: null,
    useToken: true,
  });

  const getEvent = async () => {
    await request();
  };

  useEffect(() => {
    getEvent();
  }, []);

  const { data: event = {} } = data || {};
  console.log(event);

  return (
    <Layout>
      {loading ? (
        <div className="h-[200px] flex justify-center items-center">
          <Loader2 className="animate-spin" />
        </div>
      ) : (
        event && (
          <div>
            <EventsDetails id={id} details={event}/>
          </div>
        )
      )}
    </Layout>
  );
};

export default Event;
