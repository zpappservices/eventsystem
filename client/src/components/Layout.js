import React from "react";
import Header from "./Header";
import NavBar from "./Navbar";

const Layout = ({ children }) => {
  return (
    <div className="w-full max-w-[1300px] mx-auto px-5 md:px-7 py-10 flex flex-col gap-5 selection:bg-orange-600 selection:text-black">
      <NavBar />
      <Header />
      {children}
    </div>
  );
};

export default Layout;
