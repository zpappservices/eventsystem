import EventsCard from "./EventsCard";
import TopEvents from "./TopEvents";

const eventsData = [
   {
      id: 1,
      title: "STANDUP COMEDY",
      image: "/img/standup.svg",
   },
   {
      id: 2,
      title: "MUSIC FESTIVAL",
      image: "/img/theater.svg",
   },

   {
      id: 3,
      title: "MUSIC FESTIVAL",
      image: "/img/concert.svg",
   },

   {
      id: 4,
      title: "MUSIC FESTIVAL",
      image: "/img/festival.svg",
   },
];

const Home = ({ next }) => {
   return (
      <div className="w-full flex flex-col gap-5">
         <div className="w-full flex items-center justify-between flex-wrap gap-5">
            {eventsData.map((event, index) => (
               <EventsCard
                  key={index}
                  title={event.title}
                  image={event.image}
               />
            ))}
            <div className="w-full max-w-[390] text-[24px] font-bold">
               Here we know how to make you enjoy in style
            </div>
         </div>
         <TopEvents  />
      </div>
   );
};

export default Home;
