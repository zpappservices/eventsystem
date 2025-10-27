import React from "react";
import StyledImage from "../StyledImage";

const Layout = ({ children, img = "/img/signup.png" }) => {
  return (
    <div className="w-full flex items-center justify-center gap-5 md:gap-10 xl:gap-[300px] min-h-screen 3xl:min-h-0 p-5 sm:px-10">
      {/* <div className="w-full max-w-[553px] hidden lg:block">
        <StyledImage
          src={img}
          className="!rounded-[21px] h-full w-full object-cover"
        />
      </div> */}

     {children}
    </div>
  );
};

export default Layout;
