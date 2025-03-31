import { IoCloseOutline, IoMenuOutline } from "react-icons/io5";
import Link from "next/link";
import StyledImage from "../StyledImage";

const Header = ({ toggleMenu, route = "Dashboard", isOpen }) => {
  return (
    <div className="w-full fixed z-50 top-0 ">
      <div className="w-full flex items-center gap-5 lg:gap-x-[77px] px-5 md:px-7 justify-between py-8 border-b divide-dashed border-neutrals100 border-dashed">
        <div className="w-full flex items-center gap-5 lg:gap-x-[48px]">
          {isOpen ? (
            <IoCloseOutline
              size={30}
              onClick={toggleMenu}
              className="md:hidden"
            />
          ) : (
            <IoMenuOutline
              size={30}
              onClick={toggleMenu}
              className="md:hidden"
            />
          )}

          {/*
               <BiSolidBell color="#000" size={24} /> */}
                  
                  dfgf
        </div>
      </div>
    </div>
  );
};

export default Header;
