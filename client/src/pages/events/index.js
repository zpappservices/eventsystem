import Layout from "@/components/Layout";
import useApiRequest from "@/hooks/useApiRequest";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { apiRequest } from "@/utils/apiService";
import useLoading from "@/hooks/useLoading";
import EventCard from "@/components/events/EventCard";
import EventCardSkeleton from "@/components/events/EventCardSkeleton";
import OptionsInput from "@/components/widgets/OptionsInput";

const Events = () => {
  const router = useRouter();
  const [filter, setFilter] = useState(null);
  const [categories, setCategories] = useState([]);

  const { isLoading, startLoading, stopLoading } = useLoading();

  const handleSelect = (name, value) => {
    setFilter(value);
  };

  const { data, error, loading, request } = useApiRequest({
    method: "get",
    url: filter ? `event/geteventbycategory/${filter}` : "event/getallevent",
  });

  const getCategories = async () => {
    startLoading();
    try {
      const data = await apiRequest("get", "setup/getallcategory", {}, true);
      if (data?.statusCode === 200) {
        setCategories(data?.data);
      }
    } catch (error) {
    } finally {
      stopLoading();
    }
  };

  const getAllEvents = async () => {
    await request();
  };

  useEffect(() => {
    getCategories();
  }, []);

  useEffect(() => {
    getAllEvents();
  }, [filter]);

  if (loading) {
    return (
      <Layout isHeader={false} container="w-full max-w-[1512px] px-5">
        <div className="w-full grid grid-cols-1 gap-x-5 gap-y-10 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 py-6">
          {["", "", "", "", "", "", "", "", "", "", ""]?.map((item, index) => (
            <EventCardSkeleton key={index} />
          ))}
        </div>
      </Layout>
    );
  }

  if (error) {
    return (
      <Layout isHeader={false} container="w-full max-w-[1512px] px-5">
        <div>Error loading data</div>
      </Layout>
    );
  }

  const events = data?.data;

  const goBack = () => {
    router.back();
  };

  return (
    <Layout isHeader={false} container="w-full max-w-[1512px] px-5">
      <div className="w-full flex items-start justify-between gap-x-5">
        <p
          className="flex items-center gap-x-2 text-[18px] font-medium cursor-pointer"
          onClick={goBack}>
          <img src="/img/return.svg" />
          Back
        </p>

        <OptionsInput
          name="filter"
          value={filter}
          onChange={handleSelect}
          placeholder={"Select category"}
          options={categories?.map((category) => category.name)}
          container="w-full max-w-[240px]"
        />
      </div>
      <div className="w-full grid grid-cols-1 gap-x-5 md:gap-x-7 gap-y-10 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 py-6">
        {events?.length > 0 &&
          events
            .filter(
              (item) => new Date() < new Date(item?.EndDate) && item?.active
            )
            .map((item) => <EventCard data={item} key={item?.id} />)}
      </div>
      {events?.length < 1 && (
        <div className="flex items-center justify-center h-[200px]">
          <p className="mt-10 text-center flex items-center">
            No events available
          </p>
        </div>
      )}
    </Layout>
  );
};

export default Events;
