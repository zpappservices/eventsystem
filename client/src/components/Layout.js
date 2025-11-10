import React from "react";
import Header from "./Header";
import NavBar from "./Navbar";
import Footer from "./website/Footer";
import { useRouter } from "next/router";

const Layout = ({ children, container, isHeader = true, isFooter = true }) => {
  const router = useRouter();
  const isHome = router.pathname === "/";
  return (
    <div className="w-full mx-auto selection:bg-green-200 selection:text-black">
      <NavBar />

      {isHome && (
        <div className="mt-[220px] sm:mt-[170px]">
          <Header />
        </div>
      )}
      <div
        className={`w-full ${container} min-h-screen mx-auto ${
          !isHome ? "mt-[120px] pb-10" : "pb-10"
        }`}
      >
        {children}
      </div>
      {isFooter && <Footer />}
    </div>
  );
};

export default Layout;
