import { IoCloseOutline, IoMenuOutline } from "react-icons/io5";
import Search from "@/components/admin/Search";
import Notifications from "@/components/admin/Notifications";
import Messages from "@/components/admin/Messages";
import Profile from "@/components/admin/Profile";
import Link from "next/link";
import StyledImage from "../StyledImage";

const Header = ({
  toggleMenu,
  route = "Dashboard",
  isOpen,
  isRightSidebarOpen,
  toggleRightSidebar,
}) => {
  return (
    <div className="w-full fixed md:z-30 z-50 top-0 bg-white">
      <div className="w-full flex items-center px-4 md:px-6 py-4 border-b border-dashed border-neutrals100">
        <div className="flex items-center gap-4">
          {isOpen ? (
            <IoCloseOutline size={30} onClick={toggleMenu} className="md:hidden" />
          ) : (
            <IoMenuOutline size={30} onClick={toggleMenu} className="md:hidden" />
          )}
          {/*
               <BiSolidBell color="#000" size={24} /> */}
        </div>

        {/* Improved responsive layout */}
        <div className="w-full flex flex-row items-center gap-3 sm:gap-4 md:pl-[350px]">
          {/* Center: Responsive Search Bar */}
          <div className="w-full flex justify-between gap-3">
            <Search />

            {/* Right: Icon buttons */}
            <div className="flex items-center gap-4 sm:ms-auto">
              <div onClick={toggleRightSidebar} className="cursor-pointer">
                <Notifications isActive={isRightSidebarOpen} />
              </div>
              <Messages />
              <Profile />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
