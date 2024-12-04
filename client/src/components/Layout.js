import React from "react";
import Header from "./Header";
import NavBar from "./Navbar";

const Layout = ({ children, isHeader = true }) => {
  return (
    <div className="w-full max-w-[1300px] mx-auto flex flex-col gap-5 selection:bg-orange-600 selection:text-black">
      <NavBar />
      <div className="space-y-4">
        {isHeader && <Header />}
        {children}
      </div>
    </div>
  );
};

export default Layout;
