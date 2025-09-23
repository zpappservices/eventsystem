import Layout from "@/components/dashboard/Layout";
import OrderStats from "@/components/dashboard/OrderStats";
import OrderSummary from "@/components/dashboard/OrderSummary";
import StyledImage from "@/components/StyledImage";
import Button from "@/components/widgets/Button";
import OptionsInput from "@/components/widgets/OptionsInput";
import React, { useState } from "react";
import { FaSortDown } from "react-icons/fa";

const sales = () => {
  const [period, setPeriod] = useState("This week");
  return (
    <Layout>
      <div className="w-full max-w-[1190px] space-y-12 py-5">
        <div className="space-y-7">
          <div className="flex items-center gap-3">
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
                { label: "This Month", value: "This Month" },
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
            <OrderStats period={period} />
          </div>
        </div>

        <div className="">
          <OrderSummary />
        </div>
      </div>
    </Layout>
  );
};

export default sales;
