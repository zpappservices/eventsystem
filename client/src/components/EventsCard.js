import StyledImage from "./StyledImage";
import Button from "./widgets/Button";

const EventsCard = ({ title, image }) => {
  return (
    <div className="w-full max-w-[297px] !h-[330px] rounded-[20px] overflow-hidden flex flex-col gap-2 cursor-pointer relative duration-300 hover:scale-[1.05]">
      <StyledImage
        src={image}
        className="w-full h-full object-cover"
      />

      <div className="!absolute bottom-3 left-0 right-0">
        <Button style="mx-auto min-w-[180px] !font-medium">{title}</Button>{" "}
      </div>
    </div>
  );
};

export default EventsCard;
