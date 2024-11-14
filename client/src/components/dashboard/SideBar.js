import { IoAnalytics, IoMenuOutline } from "react-icons/io5";
import Link from "next/link";
import { LuCalendarDays } from "react-icons/lu";
import { FaMoneyBills } from "react-icons/fa6";
import { CgProfile } from "react-icons/cg";
import { AiFillSetting } from "react-icons/ai";
import { TfiHelpAlt } from "react-icons/tfi";
import { FiLogOut } from "react-icons/fi";
import { usePathname } from "next/navigation";

const SideBar = ({ isOpen, toggleMenu, showModal }) => {
   const pathname = usePathname();

   return (
      <div
         className={`${
            isOpen ? "translate-x-0" : "translate-x-[-100%] md:translate-x-0"
         } w-[260px] md:w-[350px] h-screen bg-[#f5f3f3] text-[14px] transition-all duration-300 fixed md:static z-30 pt-[82px] md:pt-0 top-0 left-0 md:left-auto overflow-y-auto md:overflow-y-hidden`}
      >
         <div className="flex flex-col h-[93%] gap-y-[180px]">
            <ul className="text-[#A5D4B8] flex flex-col text-[16px]">
               <Link
                  href="/dashboard"
                  className={`transition-all duration-300 relative ps-5 ${
                     pathname === "/dashboard" ? "bg-white" : ""
                  }`}
               >
                  {pathname === "/dashboard" ? (
                     <li className="text-[#FF7F50] flex gap-x-4 items-center bg-baseWhite p-3 rounded-l-full transition-all">
                        <IoMenuOutline
                           color="#FF7F50"
                           size={22}
                           onClick={toggleMenu}
                           className=""
                        />
                        Dashboard
                     </li>
                  ) : (
                     <li className="text-black flex gap-x-4 items-center p-3 rounded-l-full transition-all">
                        <IoMenuOutline
                           color="#000"
                           size={22}
                           onClick={toggleMenu}
                           className=""
                        />
                        Dashboard
                     </li>
                  )}
               </Link>
               <Link
                  href="/dashboard/createevent"
                  className={`transition-all duration-300 relative ps-5 ${
                     pathname === "/dashboard/createevent" ? "bg-white" : ""
                  }`}
               >
                  {pathname === "/dashboard/createevent " ? (
                     <li className="text-[#FF7F50] flex gap-x-4 items-center bg-baseWhite p-3 rounded-l-full transition-all">
                        <LuCalendarDays
                           color="#FF7F50"
                           size={20}
                           onClick={toggleMenu}
                           className=""
                        />
                        Create Event
                     </li>
                  ) : (
                     <li className="text-black flex gap-x-4 items-center p-3 rounded-l-full transition-all">
                        <LuCalendarDays
                           color="#000"
                           size={20}
                           onClick={toggleMenu}
                           className=""
                        />
                        Create Event
                     </li>
                  )}
               </Link>
               <Link
                  href="/dashboard/eventanalysis"
                  className={`transition-all duration-300 relative ps-5 ${
                     pathname === "/dashboard/eventanalysis" ? "bg-white" : ""
                  }`}
               >
                  {pathname === "/dashboard/eventanalysis" ? (
                     <li className="text-[#FF7F50] flex gap-x-4 items-center bg-baseWhite p-3 rounded-l-full transition-all">
                        <IoAnalytics
                           color="#FF7F50"
                           size={20}
                           onClick={toggleMenu}
                           className=""
                        />
                        Event Analysis
                     </li>
                  ) : (
                     <li className="text-black flex gap-x-4 items-center p-3 rounded-l-full transition-all">
                        <IoAnalytics
                           color="#000"
                           size={20}
                           onClick={toggleMenu}
                           className=""
                        />
                        Event Analysis
                     </li>
                  )}
               </Link>
               <Link
                  href="/dashboard/payout"
                  className={`transition-all duration-300 relative ps-5 ${
                     pathname === "/dashboard/payout" ? "bg-white" : ""
                  }`}
               >
                  {pathname === "/dashboard/payout" ? (
                     <li className="text-[#FF7F50] flex gap-x-4 items-center bg-baseWhite p-3 rounded-l-full transition-all">
                        <FaMoneyBills
                           color="#FF7F50"
                           size={20}
                           onClick={toggleMenu}
                           className=""
                        />
                        Payout
                     </li>
                  ) : (
                     <li className="text-black flex gap-x-4 items-center p-3 rounded-l-full transition-all">
                        <FaMoneyBills
                           color="#000"
                           size={20}
                           onClick={toggleMenu}
                           className=""
                        />
                        Payout
                     </li>
                  )}
               </Link>
               <Link
                  href="/dashboard/profile"
                  className={`transition-all duration-300 relative ps-5 ${
                     pathname === "/dashboard/profile" ? "bg-white" : ""
                  }`}
               >
                  {pathname === "/dashboard/profile" ? (
                     <li className="text-[#FF7F50] flex gap-x-4 items-center bg-baseWhite p-3 rounded-l-full transition-all">
                        <CgProfile
                           color="#FF7F50"
                           size={20}
                           onClick={toggleMenu}
                           className=""
                        />
                        My Profile
                     </li>
                  ) : (
                     <li className="text-black flex gap-x-4 items-center p-3 rounded-l-full transition-all">
                        <CgProfile
                           color="#000"
                           size={20}
                           onClick={toggleMenu}
                           className=""
                        />
                        My Profile
                     </li>
                  )}
               </Link>
               <Link
                  href="/dashboard/settings"
                  className={`transition-all duration-300 relative ps-5 ${
                     pathname === "/dashboard/settings" ? "bg-white" : ""
                  }`}
               >
                  {pathname === "/dashboard/settings" ? (
                     <li className="text-[#FF7F50] flex gap-x-4 items-center bg-baseWhite p-3 rounded-l-full transition-all">
                        <AiFillSetting
                           color="#FF7F50"
                           size={20}
                           onClick={toggleMenu}
                           className=""
                        />
                        Account Settiings
                     </li>
                  ) : (
                     <li className="text-black flex gap-x-4 items-center p-3 rounded-l-full transition-all">
                        <AiFillSetting
                           color="#000"
                           size={20}
                           onClick={toggleMenu}
                           className=""
                        />
                        Account Settiings
                     </li>
                  )}
               </Link>
               <Link
                  href="/dashboard/help"
                  className={`transition-all duration-300 relative ps-5 ${
                     pathname === "/dashboard/help" ? "bg-white" : ""
                  }`}
               >
                  {pathname === "/dashboard/help" ? (
                     <li className="text-[#FF7F50] flex gap-x-4 items-center bg-baseWhite p-3 rounded-l-full transition-all">
                        <TfiHelpAlt
                           color="#FF7F50"
                           size={20}
                           onClick={toggleMenu}
                           className=""
                        />
                        Need Help ?
                     </li>
                  ) : (
                     <li className="text-black flex gap-x-4 items-center p-3 rounded-l-full transition-all">
                        <TfiHelpAlt
                           color="#000"
                           size={20}
                           onClick={toggleMenu}
                           className=""
                        />
                        Need Help ?
                     </li>
                  )}
               </Link>
               <Link
                  href="/dashboard/logout"
                  className={`transition-all duration-300 relative ps-5 ${
                     pathname === "/dashboard/logout" ? "bg-white" : ""
                  }`}
               >
                  {pathname === "/dashboard/logout" ? (
                     <li className="text-[#FF7F50] flex gap-x-4 items-center bg-baseWhite p-3 rounded-l-full transition-all">
                        <FiLogOut
                           color="#FF7F50"
                           size={20}
                           onClick={toggleMenu}
                           className=""
                        />
                        Logout
                     </li>
                  ) : (
                     <li className="text-black flex gap-x-4 items-center p-3 rounded-l-full transition-all">
                        <FiLogOut
                           color="#000"
                           size={20}
                           onClick={toggleMenu}
                           className=""
                        />
                        Logout
                     </li>
                  )}
               </Link>
            </ul>
         </div>
      </div>
   );
};

export default SideBar;