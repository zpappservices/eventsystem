import PayTabs from "./PayTab";


const PaymentMethods = () => {
   return (
      <div className="flex flex-col gap-4">
         <div>
            <p className="text-[20px] leading-snug font-bold">
               Payment Methods
            </p>
            <p className="text-[16px] leading-snug">
               All transactions are secure and encrypted
            </p>
         </div>
         <PayTabs />
      </div>
   );
};

export default PaymentMethods;
