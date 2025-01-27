import { usePathname } from "next/navigation";
import StyledImage from "./StyledImage";
import Link from "next/link";

const Header = ({ step }) => {
   
    const pathname = usePathname();
   return pathname === "/" ? (
     <div className="w-full transition-all py-5 px-5 hero rounded-[8px] overflow-hidden">
       <div
         className="relative hero-content rounded-sm py-5 px-6 bg-cover bg-center"
         style={{ backgroundImage: "url('/path/to/your-image.jpg')" }}>
         <div className="absolute inset-0 bg-black bg-opacity-40 rounded-[8px]"></div>{" "}
         <div className="relative z-10 text-center">
           <h1 className="text-white text-2xl sm:text-5xl font-bold leading-tight sm:leading-snug">
             A Better Way To Discover More Events
           </h1>
           <p className="text-white font-semibold text-lg sm:text-2xl">
             Get your{" "}
             <span className="text-[#FF7F50] text-xl sm:text-3xl">
               Tickets Now
             </span>
           </p>
           <p className="text-white text-sm sm:text-lg lg:text-xl mt-3">
             Zafariplus is an all-in-one ticketing and marketing platform that
             offers excellent value for both event organisers and people looking
             for events of all kinds. With Zafariplus ticketing, you can easily
             create events for free, sell event tickets online and reach your
             target audience.
           </p>
           <Link href="/events" className="">
             <button className="bg-[#FF7F50] mt-4 text-white px-8 py-3 rounded-full text-lg font-semibold hover:bg-[#FF6347] transition duration-300">
               Explore Now
             </button>
           </Link>
         </div>
       </div>
     </div>
   ) : (
     <div className="w-full mx-auto bg-black p-5 text-white rounded-md">
       <p className="text-xl sm:text-[40px] font-bold text-center leading-snug">
         Online Tickets
       </p>
       <p className="text-xl sm:text-[40px] font-bold text-center leading-snug">
         You have select to buy the following event ticket
       </p>
     </div>
   );
};

export default Header;
