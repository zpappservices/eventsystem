import { BiSolidBell } from "react-icons/bi";
import { IoCloseOutline, IoMenuOutline } from "react-icons/io5";

const Header = ({ toggleMenu, route = "Dashboard", isOpen }) => {
   return (
      <div className="w-full fixed z-50 top-0">
         <div className="w-full max-w-[1300px] flex items-center gap-5 lg:gap-x-[77px] px-5 md:px-7 justify-between py-5 bg-white drop-shadow-md">
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
               <p className="text-[32px] font-bold leading-[140%] text-primary hidden md:block">
                  {route}
               </p>
               <BiSolidBell color="#000" size={24} />
            </div>
         </div>
      </div>
   );
};

export default Header;
