import Layout from "@/components/admin/Layout";
import { usePathname } from "next/navigation";
import { useRouter } from "next/router";
import React from "react";

const UserSettings = () => {
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
      </div>
    </Layout>
  );
};

export default UserSettings;
