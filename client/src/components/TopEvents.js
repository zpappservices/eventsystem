import { useRouter } from "next/router";
import StyledImage from "./StyledImage";


const TopEvents = ({ next }) => {
   const router = useRouter();
   return (
      <div className="w-full">
         <div className="bg-black px-2 py-3">
            <p className="text-[20px] leading-normal text-[#FF7F50] font-bold">
               Top events this week
            </p>
         </div>
         <div className="w-full flex justify-center items-center py-6">
            <div
               className="w-full max-w-[249px] cursor-pointer "
               onClick={() => router.push("/23")}
            >
               <StyledImage src="/img/event1.svg" className="w-full" />
            </div>
         </div>
      </div>
   );
};

export default TopEvents;
