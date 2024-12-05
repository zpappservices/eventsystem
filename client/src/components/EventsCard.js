import StyledImage from "./StyledImage";

const EventsCard = ({ title, image }) => {
  return (
    <div className="w-full max-w-[250px] !h-[250px] overflow-hidden flex flex-col gap-2 cursor-pointer">
      <p className="text-[20px] text-black">{title}</p>
      <StyledImage src={image} className="rounded-lg w-full h-full object-cover" />
    </div>
  );
};

export default EventsCard;
