import { getTransactions } from "@/apis/transaction-services";
import Layout from "@/components/dashboard/Layout";
import OrderStats from "@/components/dashboard/OrderStats";
import OrderSummary from "@/components/dashboard/OrderSummary";
import StyledImage from "@/components/StyledImage";
import Button from "@/components/widgets/Button";
import OptionsInput from "@/components/widgets/OptionsInput";
import useLoading from "@/hooks/useLoading";
import React, { useEffect, useState } from "react";
import { FaSortDown } from "react-icons/fa";
import { toast } from "react-toastify";
import GoBack from "../widgets/GoBack";

const Sales = ({ id, back }) => {
  const [data, setData] = useState();
  const [period, setPeriod] = useState("This Week");

  const { isLoading, startLoading, stopLoading } = useLoading();

  const get_transaction = async () => {
    const payload = {
      eventId: id,
      date: "",
      ticket: "",
      page: 1,
      limit: 1,
    };
    const { message, data, success, error } = await getTransactions(
      payload,
      startLoading,
      stopLoading
    );

    if (success) {
      setData(data);
    } else {
      toast.error(message);
    }
  };

  useEffect(() => {
    if (id) {
      get_transaction();
    }
  }, [id]);

  return (
    <Layout>
      <div className="w-full max-w-[1190px] space-y-12 py-5">
        <div className="space-y-7">
          <div className="flex items-center flex-wrap gap-3">
            <GoBack onPrev={back} />
            <p className="font-bold text-2xl text-baseBlack">Orders</p>

            <Button
              className="sm:ms-auto"
              startIcon={
                <StyledImage className="!shrink-0" src="/img/create.svg" />
              }
            >
              Create Event
            </Button>
            <OptionsInput
              value={period}
              options={[
                { label: "This Week", value: "This Week" },
                { label: "All Time", value: "All Time" },
              ]}
              openIcon={
                <FaSortDown className="text-[18px] text-baseBlack -mt-2" />
              }
              style="rounded-[8px] !py-2.5 !px-3 !border-neutrals400"
              placeholder={"Event type"}
              placeholderStyle="!text-black"
              selectedStyle="!text-black"
              onChange={(name, value) => {
                setPeriod(value);
              }}
            />
          </div>

          <div className="rounded-[10px] md:border md:bg-baseWhite border-neutrals400 md:p-5 md:py-5 space-y-5">
            <OrderStats period={period} data={data} />
          </div>
        </div>

        <div className="">
          <OrderSummary data={data} />
        </div>
      </div>
    </Layout>
  );
};

export default Sales;
