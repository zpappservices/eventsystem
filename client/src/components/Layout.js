import React from "react";
import Header from "./Header";
import NavBar from "./Navbar";
import Footer from "./website/Footer";

const Layout = ({ children, isHeader = true, isFooter = true }) => {
  return (
    <div className="w-full mx-auto flex flex-col gap-5 selection:bg-orange-600 selection:text-black">
      <NavBar />
      <div className="w-full max-w-[1300px] min-h-screen mx-auto space-y-4 mt-24 px-5">
        {isHeader && <Header />}
        {children}
      </div>
      {isFooter && <Footer />}
    </div>
  );
};

export default Layout;
