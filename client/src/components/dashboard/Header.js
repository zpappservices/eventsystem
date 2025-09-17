import { IoCloseOutline, IoMenuOutline } from "react-icons/io5";
import Search from "./Search";
import Notifications from "./Notifications";
import Messages from "./Messages";
import Profile from "./Profile";

const Header = ({
  toggleMenu,
  route = "Dashboard",
  isOpen,
  isRightSidebarOpen,
  toggleRightSidebar,
}) => {
  return (
    <div className="w-full fixed md:z-30 z-40 top-0 left-0 bg-white">
      <div className="w-full flex items-center px-4 md:px-6 py-4 border-b border-dashed border-neutrals300">
        <div className="flex items-center gap-4">
          {isOpen ? (
            <IoCloseOutline
              size={30}
              onClick={toggleMenu}
              className="md:hidden"
            />
          ) : (
            <IoMenuOutline
              size={30}
              onClick={toggleMenu}
              className="md:hidden"
            />
          )}
          {/*
               <BiSolidBell color="#000" size={24} /> */}
        </div>

        {/* Improved responsive layout */}
        <div className="w-full flex flex-row items-center gap-3 sm:gap-4 md:pl-[260px]">
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
