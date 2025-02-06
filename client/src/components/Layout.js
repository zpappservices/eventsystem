import React from "react";
import Header from "./Header";
import NavBar from "./Navbar";
import Footer from "./website/Footer";
import { useRouter } from "next/router";

const Layout = ({ children, container, isHeader = true, isFooter = true }) => {
  const router = useRouter();
  const isHome = router.pathname === "/";
  return (
    <div className="w-full mx-auto selection:bg-orange-600 selection:text-black">
      <NavBar />

      {isHome && (
        <div className="mt-[220px] sm:mt-[170px]">
          <Header />
        </div>
      )}
      <div
        className={`w-full max-w-[1512px] ${container} min-h-screen mx-auto  px-5 ${
          !isHome ? "mt-[220px] sm:mt-44" : ""
        }`}>
        {children}
      </div>
      {isFooter && <Footer />}
    </div>
  );
};

export default Layout;
