import BreadCrumb from "@/components/BreadCrumb";
import Button from "@/components/Button";
import Contact from "@/components/Contact";
import Layout from "@/components/Layout";
import PaymentMethods from "@/components/PaymentMethods";
import StyledImage from "@/components/StyledImage";


const payment = () => {
   return (
      <Layout>
         <div className="w-full flex flex-col gap-6">
            <BreadCrumb />
            <div className="w-full flex flex-col md:flex-row justify-between gap-6">
               <div className="w-full max-w-[518px] cursor-pointer rounded-lg flex flex-col gap-5">
                  <Contact />
                  <PaymentMethods />
               </div>
               <div className="w-full max-w-[458px] flex flex-col gap-4 cursor-pointer">
                  <StyledImage
                     src="/img/event1.svg"
                     className="w-full max-h-[300px] object-cover"
                  />
                  <p className="text-[20px] font-semibold leading-snug">
                     Night of a thousand laugh November 19th 2024
                  </p>
                  <div className="w-full flex flex-col gap-2 border-b-2 border-black pb-2.5 my-8">
                     <div className="flex justify-between items-center gap-2">
                        <p className="text-[16px] leading-snug">Subtotal</p>
                        <p className="text-[16px] leading-snug">
                           <span className="font-semibold ms-5 ">$</span>
                           5000.0
                        </p>
                     </div>
                     <div className="flex justify-between items-center gap-2">
                        <p className="text-[16px] leading-snug">
                           Delivery Method
                        </p>
                        <p className="text-[16px] leading-snug">
                           <span className="font-semibold ms-5 ">$</span>
                           5000.0
                        </p>
                     </div>
                     <div className="flex justify-between items-center gap-2">
                        <p className="text-[16px] leading-snug">Total</p>
                        <p className="text-[16px] leading-snug">
                           <span className="font-semibold ms-5 ">$</span>
                           5000.0
                        </p>
                     </div>
                  </div>
                  <div className="w-full flex flex-col gap-4">
                     <p className="text-[12px] leading-snug text-center mb-[-5px]">
                        By completing this purchase you agree to these
                        <span className="text-[#1FCA59]">
                           {" "}
                           Terms and Conditions
                        </span>
                     </p>
                     <Button onClick={() => {}}>COMPLETE PAYMENT</Button>
                  </div>
               </div>
            </div>
         </div>
      </Layout>
   );
};

export default payment;
