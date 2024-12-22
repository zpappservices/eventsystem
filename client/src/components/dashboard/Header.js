import { BiSolidBell } from "react-icons/bi";
import { IoCloseOutline, IoMenuOutline } from "react-icons/io5";
import Profile from "./Profile";
import Link from "next/link";
import StyledImage from "../StyledImage";

const Header = ({ toggleMenu, route = "Dashboard", isOpen }) => {
   return (
     <div className="w-full fixed z-50 top-0">
       <div className="w-full max-w-[1300px] flex items-center gap-5 lg:gap-x-[77px] px-5 md:px-7 justify-between py-8 bg-white drop-shadow-md">
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
           <Link href="/" className="ms-[40px]">
             <StyledImage
               src="/img/zafariplus-logo-black.png"
               className="w-full max-w-[10px] scale-[11] sm:scale-[12] mx-auto hover:scale-[13.2] duration-300"
             />
           </Link>

           <Profile />
           {/*
               <BiSolidBell color="#000" size={24} /> */}
         </div>
       </div>
     </div>
   );
};

export default Header;
