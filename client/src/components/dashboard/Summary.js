const Card = ({ background, title, amount }) => {
   return (
      <div className={`w-full max-w-[249px] flex flex-col gap-5 py-6 px-5 text-white ${background} rounded-lg`}>
         <p>{title}</p>
         <p>{amount}</p>
      </div>
   );
};

const Summary = () => {
   return (
      <div className="w-full">
         <p className="text-[20px] font-bold leading-[24px]">
            Overrall Summary
         </p>
         <div className="w-full flex flex-wrap md:flex-nowrap justify-center items-center gap-5 mt-10">
            <Card title="Balance" amount="$100,000" background="bg-[#FBAF93]" />
            <Card
               title="Active Events"
               amount="$100,000"
               background="bg-[#7C88F0]"
            />
            <Card
               title="Total Cashout"
               amount="$100,000"
               background="bg-[#52CB7B]"
            />
            <Card
               title="Tickets Sold"
               amount="$100,000"
               background="bg-[#7C88F0]"
            />
         </div>
      </div>
   );
};

export default Summary;
