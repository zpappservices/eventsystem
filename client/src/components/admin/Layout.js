import { useState } from "react";
import SideBar from "./SideBar";
import Header from "./Header";

const Layout = ({ children, container = "", isHeader = true }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="w-full mx-auto">
      <div className={`flex min-h-screen gap-0 ${container} mx-auto relative`}>
        <SideBar isOpen={isOpen} toggleMenu={toggleMenu} />
        <div className="w-full relative ms-auto">
          {isHeader && <Header isOpen={isOpen} />}
          <div
            className={`w-full mx-auto ${
              isHeader
                ? "mt-24"
                : ""
            }`}
          >
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Layout;
