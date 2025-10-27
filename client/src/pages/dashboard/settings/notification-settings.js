import Layout from "@/components/dashboard/Layout";
import Button from "@/components/widgets/Button";
import Checkbox from "@/components/widgets/CheckBox";
import { usePathname } from "next/navigation";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { RxExternalLink } from "react-icons/rx";

const TeamSettings = () => {
  const [form, setForm] = useState({
    sales: false,
    attendeeInstruction: false,
    eventAnalytics: false,
    platformUpdates: false,
    accountAlerts: false,
    eventsManagement: false,
  });
  const pathname = usePathname();
  const { push } = useRouter();

  const data = [
    {
      heading: "Ticket sales & purchases",
      subheading: "Emails for new tickets sales, refunds or cancellations",
      name: "sales",
    },
    {
      heading: "Attendee Interactions",
      subheading: "Emails for new tickets sales, refunds or cancellations",
      name: "attendeeInstruction",
    },
    {
      heading: "Event Analytics & Reports",
      subheading: "Weekly/Monthly summaries of sales data, and attendance",
      name: "eventAnalytics",
    },
    {
      heading: "Platform updates",
      subheading:
        "Announcements about new features, policy changes, or maintenance",
      name: "platformUpdates",
    },
    {
      heading: "Security & Accounts alerts",
      subheading: "Password changes, unusual logins, and other security events",
      name: "accountAlerts",
    },
    {
      heading: "Events Managements",
      subheading: "Password changes, unusual logins, and other security events",
      name: "eventsManagement",
    },
  ];

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
          <p className="text-xl text-neutrals600 font-bold">Email preference</p>

          <div className="space-y-5">
            {data?.map((item, index) => {
              const isChecked = form[item.name];
              return (
                <div
                  key={index}
                  className="flex items-start gap-3"
                >
                  <div>
                    <p className="text-base text-black font-medium">{item.heading}</p>

                    <p className="text-sm text-neutrals500">
                      {item.subheading}
                    </p>
                  </div>
                  <Checkbox
                    isChecked={isChecked}
                    onToggle={() =>
                      setForm((prev) => ({
                        ...prev,
                        [item.name]: !prev[item.name],
                      }))
                    }
                          className="ms-auto mt-2"
                          size={30}
                  />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default TeamSettings;
