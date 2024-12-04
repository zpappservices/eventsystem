import { usePathname } from "next/navigation";

const Header = ({ step }) => {
   
    const pathname = usePathname();
   return pathname === "/" ? (
      <div className="py-5 px-5 mx-5 hero rounded-[8px] overflow-hidden">
         <div className="hero-content rounded-sm">
            <p className="text-center leading-[140%] text-white text-xl sm:text-[40px] font-bold">
               Discover More Events
            </p>
            <p className="text-center leading-[140%] text-white font-bold text-lg sm:text-[30px]">
               Get your{" "}
               <span className="text-[#FF7F50] text-xl sm:text-[40px]">
                  Ticket Now
               </span>
            </p>
            <p className="text-center leading-[140%] text-white text-[20px]">
               Relax in style with a startup comedy shows or music concert and
               more ...
            </p>
         </div>
      </div>
   ) : (
      <div className="bg-black p-5 text-white rounded-md">
         <p className="text-xl sm:text-[40px] font-bold text-center leading-snug">Online Tickets</p>
         <p className="text-xl sm:text-[40px] font-bold text-center leading-snug">
            You have select to buy the following event ticket
         </p>
      </div>
   );
};

export default Header;
