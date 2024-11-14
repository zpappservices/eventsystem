import { useState } from "react";
import SideBar from "./SideBar";
import Header from "./Header";

const Layout = ({ children, container = "max-w-[1440px]" }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="w-full max-w-[1300px] bg-baseWhite mx-auto bg-gray-100">
      <Header toggleMenu={toggleMenu} isOpen={isOpen} />
      <div className={`flex min-h-screen gap-0 ${container} mx-auto relative mt-4 pt-[80px]`}>
        <SideBar isOpen={isOpen} toggleMenu={toggleMenu} />
        <div className="w-full relative max-w-[1300px] ms-auto">
          <div className="w-full mx-auto">{children}</div>
        </div>
      </div>
    </div>
  );
};

export default Layout;
