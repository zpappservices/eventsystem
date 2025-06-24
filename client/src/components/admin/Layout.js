import { useState } from "react";
import SideBar from "./SideBar";
import Header from "./Header";
import RightSideBar from "./RightSideBar";

const Layout = ({ children, container = "", isHeader = true }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isRightSidebarOpen, setIsRightSidebarOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen((prev) => !prev);
    setIsRightSidebarOpen(false);
  };

  const toggleRightSidebar = () => {
    setIsRightSidebarOpen((prev) => !prev);
    setIsOpen(false);
  };

  return (
    <div className="w-full mx-auto">
      <div className={`flex min-h-screen gap-0 ${container} mx-auto relative`}>
        <SideBar isOpen={isOpen} toggleMenu={toggleMenu} />
        <div className="w-full relative ms-auto ">
          {isHeader && (
            <Header
              isOpen={isOpen}
              toggleMenu={toggleMenu}
              isRightSidebarOpen={isRightSidebarOpen}
              toggleRightSidebar={toggleRightSidebar}
            />
          )}
          <div className={`w-full mx-auto md:pl-[350px] ${isHeader ? "mt-24" : ""}`}>
            {children}
          </div>
        </div>
        {isRightSidebarOpen && <RightSideBar toggleRightSidebar={toggleRightSidebar} />}
      </div>
    </div>
  );
};

export default Layout;
