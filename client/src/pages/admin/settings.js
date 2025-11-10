 import Layout from "@/components/admin/Layout";
import AdminDashboardTheme from "@/components/admin/settings/AdminDashboardTheme";
import Currency from "@/components/admin/settings/Currency";
import DateTimeFormat from "@/components/admin/settings/DateTimeFormat";
import Notifications from "@/components/admin/settings/Notifications";
import SystemLanguage from "@/components/admin/settings/SystemLanguage";
import TimeZone from "@/components/admin/settings/TimeZone";
import UserSignUp from "@/components/admin/settings/UserSignUp";
import UserTheme from "@/components/admin/settings/UserTheme";
import { usePathname } from "next/navigation";
import { useRouter } from "next/router";
import React from "react";

const settings = () => {
  const pathname = usePathname();
  const { push } = useRouter();
  return (
    <Layout>
      <div className="border-neutrals100 max-w-[1190px] w-full px-5 py-5 space-y-10">
        <div>
          <p className="font-bold text-xl sm:text-2xl text-black ">
            System Settings
          </p>
          <p className="text-sm sm:text-base text-black">
            Setup and edit system settings and preferences
          </p>
        </div>

        <div className="flex items-center">
          {[
            { title: "General Settings", path: "/admin/settings" },
            {
              title: "Organizer’s Settings",
              path: "/admin/organizer-settings",
            },
            { title: "User’s Settings", path: "/admin/client-settings" },
            { title: "Security", path: "/admin/security-settings" },
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

        <div className="sm:border border-neutrals100 rounded-lg sm:p-5 space-y-5">
          <p className="font-bold text-lg sm:text-xl text-black">General</p>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 sm:gap-10">
            <div className="space-y-5">
              <SystemLanguage />

              <AdminDashboardTheme />

              <TimeZone />

              <Currency />
            </div>

            <div className="space-y-5">
              <UserSignUp />

              <UserTheme />

              <DateTimeFormat />

              <Notifications />
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default settings;
