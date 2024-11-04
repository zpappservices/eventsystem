import { useRouter } from "next/router";
import CustomAccordion from "./Accordion";
import BreadCrumb from "./BreadCrumb";
import Button from "./Button";
import Quantity from "./Quantity";
import StyledImage from "./StyledImage";

const EventsDetails = ({ id }) => {
   const router = useRouter();
   const handleClick = () => {
      router.push({
         pathname: "/payment",
         query: { id: id },
      });
   };
   return (
      <div className="w-full flex flex-col gap-6">
         <BreadCrumb id={id} />
         <div className="w-full flex flex-col md:flex-row justify-between gap-6">
            <div className="w-full max-w-[551px] cursor-pointer rounded-lg">
               <StyledImage src="/img/event1.svg" className="w-full" />
               <div className="mt-5">
                  <p className="text-[18px] leading-normal ">Venue :</p>
                  <p className="text-[18px] leading-normal ">Date :</p>
                  <p className="text-[18px] leading-normal ">City :</p>
                  <p className="text-[18px] leading-normal ">Location :</p>
               </div>
            </div>
            <div className="w-full max-w-[458px] flex flex-col gap-4 cursor-pointer">
               <div>
                  <p className="text-[20px] font-semibold leading-snug">
                     Night of a thousand laugh November 19th 2024
                  </p>
                  <p className="text-[#1FCA59] text-[16px] leading-snug">
                     In stock 100 tickets
                  </p>
               </div>
               <div className="w-full flex flex-col gap-2  border-b-2 border-black pb-2.5">
                  <p className="text-[16px] leading-snug">
                     Regular <span className="font-semibold ms-5">$</span>5000.0
                  </p>
                  <p className="text-[16px] leading-snug">
                     VIP <span className="font-semibold ms-5">$</span>10000.0
                  </p>
                  <p className="text-[16px] leading-snug">
                     Silver table <span className="font-semibold ms-5">$</span>
                     20000.0
                  </p>
                  <p className="text-[16px] leading-snug">
                     Gold table <span className="font-semibold ms-5">$</span>
                     50000.0
                  </p>
                  <p className="text-[16px] leading-snug">
                     Diamond table <span className="font-semibold ms-5">$</span>
                     150000.0
                  </p>
               </div>
               <div>
                  <p className="text-[20px] leading-normal font-semibold">
                     QUANTITY
                  </p>
                  <Quantity />
               </div>
               <div className="w-full flex flex-col gap-4">
                  <Button>ADD TO CART</Button>
                  <Button
                     container="bg-white border-2 border-[#FF7F50]"
                     onClick={handleClick}
                  >
                     BUY IT NOW
                  </Button>
               </div>

               <div>
                  <CustomAccordion />
               </div>
            </div>
         </div>
      </div>
   );
};

export default EventsDetails;
