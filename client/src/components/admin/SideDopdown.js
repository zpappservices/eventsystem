import { useRouter } from "next/router";
import React from "react";
import { BiBarChartAlt2 } from "react-icons/bi";
import { BsFillCaretRightFill, BsFillTicketFill } from "react-icons/bs";
import { GoHomeFill } from "react-icons/go";
import { TbLayoutDashboardFilled } from "react-icons/tb";
import { motion } from "framer-motion";

const SideDopdown = ({
  menuItem = {
    id: "dashboard",
    name: "Dashboard",
    icon: TbLayoutDashboardFilled,
    path: "/admin",
    hasSubMenu: true,
    active: "admin, analytics, tickets",
    subItems: [
      {
        name: "Overview",
        icon: GoHomeFill,
        path: "/admin",
        active: "admin",
      },
      {
        name: "Analytics",
        icon: BiBarChartAlt2,
        path: "/admin/analytics",
        active: "analytics",
      },
      {
        name: "Ticket Report",
        icon: BsFillTicketFill,
        path: "/admin/tickets",
        active: "tickets",
      },
    ],
  },
  isExpanded,
  onToggle,
}) => {
  const router = useRouter();

  const isActive = () => {
    return menuItem.active.split(/,\s*/).some((item) => {
      if (item === "admin") {
        return router.pathname === "/admin";
      } else {
        return router.pathname.includes(item);
      }
    });
  };

  const isSubItemActive = (index) => {
    const subItem = menuItem.subItems[index];
    return router.pathname === subItem.path;
  };

  const handleToggle = () => {
    if (!menuItem.hasSubMenu) {
      router.push(menuItem.path);
      return;
    }
    
    if (isActive()) {
      onToggle(menuItem.id);
    } else {
      router.push(menuItem.path);
    }
  };
  return (
    <div className="flex flex-col w-full cursor-pointer" onClick={handleToggle}>
      <div className="flex items-start">
        <div className="mt-2.5">
          {
            <menuItem.icon
              className={`text-[32px] rounded-[10px] p-1.5 ${
                isActive()
                  ? "bg-primary text-white"
                  : "bg-inherit text-neutrals600"
              }`}
            />
          }
        </div>
        <div
          className={`mt-6 ${
            isActive() ? "bg-primary" : "bg-inherit"
          } w-2 h-1.5`}
        ></div>
        <div className="w-full">
          <div
            className={`w-full flex items-center justify-between p-3 rounded-[10px] text-xl ${
              isActive()
                ? "bg-primary text-white"
                : "bg-inherit text-neutrals600"
            }`}
          >
            {menuItem.name}

            {menuItem.hasSubMenu && (
              <BsFillCaretRightFill
                className={`transition-all duration-300 ${
                  isActive() ? "text-white" : "text-neutrals600"
                } ${isExpanded ? "rotate-90" : ""}`}
              />
            )}
          </div>
          {menuItem.hasSubMenu && (
            <motion.div
              initial={{ height: 0 }}
              animate={isExpanded ? { height: "auto" } : { height: 0 }}
              exit={{ height: 0 }}
              transition={{ duration: 0.4, ease: "easeInOut" }}
              className="w-full overflow-hidden"
            >
              {menuItem.subItems?.map((item, index) => (
                <div
                  className={`p-2 px-3 flex items-center gap-3 ${
                    isSubItemActive(index) ? "text-primary" : "text-neutrals600"
                  }`}
                  onClick={() => router.push(item.path)}
                  key={index}
                >
                  <div>{<item.icon />}</div>
                  <p>{item.name}</p>
                </div>
              ))}
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SideDopdown;
