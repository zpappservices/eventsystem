import React from "react";

const Footer = () => {
  const year = new Date().getFullYear();
  return (
    <div className="w-full bg-black py-3 px-5 text-[white] text-center">
      <p className="">
        &copy; {year} zafariplusticket All Rights Reserved. 
      </p>
      <p>Beta Version</p>
    </div>
  );
};

export default Footer;
