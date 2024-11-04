const EventsCard = ({ title, image }) => {
   return (
      <div className="w-full max-w-[250px] flex flex-col gap-2 cursor-pointer">
         <p className="text-[20px] text-black">{title}</p>
         <img src={image} className="rounded-lg" />
      </div>
   );
};

export default EventsCard;
