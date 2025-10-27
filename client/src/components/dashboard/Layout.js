import { useState } from "react";
import SideBar from "./SideBar";
import Header from "./Header";
import PrivateRoute from "./PrivateRoute";

const Layout = ({
  children,
  container = "",
  isHeader = true,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <PrivateRoute>
      <div className="w-full mx-auto ">
        <div
          className={`flex min-h-screen gap-0 ${container} mx-auto relative`}
        >
          <SideBar isOpen={isOpen} toggleMenu={toggleMenu} />
          <div className="w-full relative ms-auto md:pl-[262px]">
            {isHeader && <Header isOpen={isOpen} toggleMenu={toggleMenu} />}
            <div
              className={`w-full mx-auto px-5 ${
                isHeader ? "mt-24" : ""
              }`}
            >
              {children}
            </div>
          </div>
        </div>
      </div>
    </PrivateRoute>
  );
};

export default Layout;
