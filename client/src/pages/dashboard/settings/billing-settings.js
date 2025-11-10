import Layout from "@/components/dashboard/Layout";
import Button from "@/components/widgets/Button";
import { usePathname } from "next/navigation";
import { useRouter } from "next/router";
import React from "react";
import { RxExternalLink } from "react-icons/rx";

const BillingSettings = () => {
  const pathname = usePathname();
  const { push } = useRouter();

  return (
    <Layout>
      <div className="border-neutrals100 max-w-[1190px] w-full py-5 space-y-10">
        <p className="font-bold text-xl sm:text-2xl text-black ">Settings</p>

        <div className="flex items-center">
          {[
            { title: "Account security", path: "/dashboard/settings" },
            {
              title: "Billing/Fees",
              path: "/dashboard/settings/billing-settings",
            },
            {
              title: "Team management",
              path: "/dashboard/settings/team-settings",
            },
            {
              title: "Notifications",
              path: "/dashboard/settings/notification-settings",
            },
          ]?.map((item, index) => (
            <div
              className={`border-b text-xs sm:text-sm px-5 py-3 relative cursor-pointer duration-500 transition-all ${
                item.path === pathname ? "text-primary" : ""
              }`}
              key={index}
              onClick={() => push(item.path)}
            >
              {item.title}
              <div
                className={`border-2 rounded-lg absolute -bottom-[3px] left-0 w-full transition-opacity ${
                  item.path === pathname
                    ? "border-primary opacity-100"
                    : "opacity-0"
                }`}
              ></div>
            </div>
          ))}
        </div>

        <div className="rounded-[10px] md:border md:bg-baseWhite border-neutrals200 md:p-10 space-y-5">
          <p className="text-xl text-neutrals600 font-bold">Your plan</p>

          <div className="space-y-5">
            <div>
              <p className="text-3xl font-bold ">Free plan</p>
              <p className="text-black">
                Publish unlimited free ticket and {"<"} ₦20,000 per paid ticket{" "}
              </p>
            </div>

            <Button
              className="!ms-auto !mt-10"
              outline
              border="border-primary"
              text="text-primary hover:text-white"
              endIcon={
                <RxExternalLink className="text-primary hover:text-white text-xl" />
              }
            >
              Update password
            </Button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default BillingSettings;
