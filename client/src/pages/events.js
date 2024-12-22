import Layout from "@/components/Layout";
import StyledImage from "@/components/StyledImage";
import useApiRequest from "@/hooks/useApiRequest";
import { formatDate } from "@/utils/time";
import { CircularProgress } from "@mui/material";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import NativeSelect from "../components/widgets/NativeSelect";
import { apiRequest } from "@/utils/apiService";
import useLoading from "@/hooks/useLoading";

const Events = () => {
  const router = useRouter();
  const [filter, setFilter] = useState(null); // null means no filter
  const [categories, setCategories] = useState([]);

  const { isLoading, startLoading, stopLoading } = useLoading();

  const { data, error, loading, request } = useApiRequest({
    method: "get",
    url: filter ? `event/geteventbycategory/${filter}` : "event/getallevent", // Dynamically change the endpoint based on the filter
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
    getAllEvents(); // Fetch events whenever filter changes or the component is mounted
  }, [filter]);

  if (loading) {
    return (
      <div className="h-[200px] w-full flex justify-between items-center">
        <CircularProgress color="#FF7F50" className="mx-auto" />
      </div>
    );
  }

  if (error) {
    return <div>Error loading data</div>;
  }

  const events = data?.data;

  const goBack = () => {
    router.back();
  };

  return (
    <Layout isHeader={false}>
      <div className="w-fit flex items-center justify-center gap-x-5">
        <p
          className="flex items-center gap-x-2 text-[18px] font-medium cursor-pointer mt-5"
          onClick={goBack}>
          <img src="/img/return.svg" />
          Back
        </p>
        <NativeSelect
          options={categories?.map((category) => category.name)}
          value={filter}
          onChange={(e) => setFilter(e.target.value)} // Set the selected category's id as filter
          selectedOption={filter}
          name="filter"
          label="Select category"
          placeholder="Select category"
        />
      </div>
      <div className="w-full grid grid-cols-1 gap-x-5 md:gap-x-7 gap-y-10 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 py-6">
        {events?.length > 0 &&
          events?.map((item) => (
            <div
              key={item.id}
              className="w-full max-w-[249px] mx-auto cursor-pointer bg-gray-50 shadow-[0_10px_15px_-3px_rgba(0,0,0,0.1)] rounded-[10px] overflow-hidden"
              onClick={() => router.push(`/${item?.id}`)}>
              <div className="h-[168px]">
                <StyledImage
                  src={item?.image_banner || "/img/event1.svg"}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="py-2 px-3 pb-3">
                <p className="text-lg text-black font-semibold">
                  {item?.title}
                </p>
                <p className="font-inter text-xs font-medium bg-[#FF7F50] w-fit rounded-[8px] px-1.5 text-white">
                  {item?.category}
                </p>
                <p className="text-xs mt-1 font-medium text-black text-ellipsis">
                  <span className="mr-0.5">🗓️</span>
                  {formatDate(item?.StartDate)}
                </p>
              </div>
            </div>
          ))}
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
