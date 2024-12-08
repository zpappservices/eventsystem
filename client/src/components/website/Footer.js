import Link from "next/link";
import React from "react";

const Footer = () => {
  const year = new Date().getFullYear();
  return (
    <div className="mt-auto bg-black py-3 px-5 text-[white] space-y-3">
      <div className="flex gap-5 items-center justify-center">
        <Link href="/terms">
          <p className="text-baseWhite text-[16px] font-semibold leading-normal">
            Terms of Service
          </p>
        </Link>
        <Link href="/useragreement">
          <p className="text-baseWhite text-[16px] font-semibold leading-normal">
           UELA
          </p>
        </Link>
      </div>
      <div className="w-full  text-center ">
        <p className="">&copy; {year} zafariplusticket All Rights Reserved.</p>
        <p>Beta Version</p>
      </div>
    </div>
  );
};

export default Footer;
