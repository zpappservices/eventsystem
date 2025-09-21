import { useCreateEvent } from "@/context/CreateEventContext";
import FormButton from "./FormButton";
import TextArea from "../widgets/TextArea";
import { useState } from "react";
import TextField from "../widgets/TextField";
import { FaCaretDown, FaCaretUp } from "react-icons/fa";
import Button from "../widgets/Button";

const ContactDto = ({ handleNext, handleBack }) => {
  const [error, setError] = useState({
    name: "",
    quantity: "",
    price: "",
    description: "",
    min: "",
    max: "",
    location: "",
    venue: "",
  });
  const { setTicket, ticket, location, setLocation } = useCreateEvent();

  const handleSubmit = () => {
    handleNext();
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (
      name === "quantity" ||
      name === "price" ||
      name === "min" ||
      name === "max"
    ) {
      const rawValue = value.replace(/,/g, "");

      if (rawValue === "" || /^[0-9]+$/.test(rawValue)) {
        setTicket((prevData) => ({
          ...prevData,
          [name]: rawValue,
        }));
      }
    } else if (name === "location" || name === "venue") {
      setLocation((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    } else {
      setTicket((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  const adjustValue = (field, direction, step = 1) => {
    setTicket((prev) => {
      let current = parseInt(prev[field] || "0", 10);
      if (isNaN(current)) current = 0;

      const newValue =
        direction === "up" ? current + step : Math.max(0, current - step);

      return { ...prev, [field]: String(newValue) };
    });
  };

  const formattedPrice =
    ticket.price && !isNaN(Number(ticket.price))
      ? Number(ticket.price).toLocaleString()
      : "";

  return (
    <div className="space-y-7">
      <div className="rounded-[20px] md:border border-neutrals400 md:p-10 md:py-12 space-y-5">
        <div className="flex items-center justify-center flex-wrap gap-5 font-bold mb-5">
          <div className="bg-sec100 text-baseBlack h-[30px] w-[30px] rounded-full flex items-center justify-center">
            <p>4</p>
          </div>
          <p>what type of ticket is it?</p>
        </div>

        <div className="flex flex-wrap items-center gap-5 md:gap-7">
          {["Free", "Paid"]?.map((item, index) => {
            const isSelected = item === ticket.type;

            return (
              <div
                className={`border border-sec/40 text-baseBlack rounded-[10px] p-3.5 px-5 cursor-pointer hover:bg-sec/50 transition-all ${
                  isSelected ? "bg-sec" : ""
                }`}
                key={index}
                onClick={() =>
                  setTicket((prevData) => {
                    return {
                      ...prevData,
                      type: item,
                    };
                  })
                }
              >
                <p className="text-sm text-baseBlack">{item}</p>
              </div>
            );
          })}
        </div>

        <div className="w-full max-w-[450px] xl:max-w-none flex flex-col xl:flex-row items-start gap-5 xl:gap-12">
          <div className="w-full flex-1 space-y-5">
            <TextField
              value={ticket.name}
              onChange={handleChange}
              error={error.name}
              label="Ticket name*"
              style="!rounded-[6px]"
              name="name"
              placeholder="Enter ticket name"
            />

            <div className="grid xl:grid-cols-2 gap-x-10 2xl:gap-x-20 gap-y-5">
              <div className="w-full">
                <TextField
                  value={ticket.quantity}
                  onChange={handleChange}
                  error={error.quantity}
                  label="Quantity"
                  style="!rounded-[6px]"
                  name="quantity"
                  placeholder="Enter quantity"
                />
              </div>

              <div className="w-full flex relative">
                <span className="text-xl text-neutrals500 font-bold absolute bottom-2.5 z-10 left-2">
                  ₦
                </span>
                <TextField
                  value={formattedPrice}
                  onChange={handleChange}
                  error={error.price}
                  label="Price*"
                  style="!rounded-[6px] !ps-8 !w-full"
                  container="!w-full"
                  name="price"
                  placeholder={
                    ticket.type?.toLowerCase() === "free"
                      ? "Free"
                      : "Enter price"
                  }
                  disabled={ticket.type?.toLowerCase() === "free"}
                />
              </div>

              <div>
                <TextField
                  value={ticket.min}
                  onChange={handleChange}
                  error={error.title}
                  label="Ticket per order"
                  style="!rounded-[6px]"
                  name="min"
                  placeholder="Min"
                  icon={
                    <div>
                      <FaCaretUp
                        onClick={() => adjustValue("min", "up")}
                        className="text-2xl text-neutrals600 -my-1.5 cursor-pointer"
                      />
                      <FaCaretDown
                        onClick={() => adjustValue("min", "down")}
                        className="text-2xl text-neutrals600 -my-1.5 cursor-pointer"
                      />
                    </div>
                  }
                  iconClass="!top-[34px] !right-1"
                />
              </div>

              <div>
                <TextField
                  value={ticket.max}
                  onChange={handleChange}
                  error={error.title}
                  label="none"
                  labelStyle="hidden xl:block opacity-0"
                  style="!rounded-[6px]"
                  name="max"
                  placeholder="Max"
                  icon={
                    <div>
                      <FaCaretUp
                        onClick={() => adjustValue("max", "up")}
                        className="text-2xl text-neutrals600 -my-1.5 cursor-pointer"
                      />
                      <FaCaretDown
                        onClick={() => adjustValue("max", "down")}
                        className="text-2xl text-neutrals600 -my-1.5 cursor-pointer"
                      />
                    </div>
                  }
                  iconClass="top-[7px] xl:!top-[34px] !right-1"
                />
              </div>
            </div>
          </div>

          <div className="w-full flex-1">
            <TextArea
              value={ticket.description}
              onChange={handleChange}
              error={error.description}
              label="Describe the ticket"
              style="!rounded-[6px]"
              name="description"
              placeholder="Enter ticket description"
              textAreaClassName="!bg-inherit !border-neutrals200 h-full"
              rows={9}
            />
          </div>
        </div>
      </div>

      <div className="rounded-[20px] md:border border-neutrals400 md:p-10 md:py-12 space-y-5">
        <div className="flex items-center justify-center flex-wrap gap-5 font-bold mb-5">
          <div className="bg-sec100 text-baseBlack h-[30px] w-[30px] rounded-full flex items-center justify-center">
            <p>5</p>
          </div>
          <p>Where is the event</p>
        </div>

        <div className="space-y-5 w-full max-w-[450px] xl:max-w-none">
          <TextField
            value={location.location}
            onChange={handleChange}
            error={error.location}
            label="Event location*"
            style="!rounded-[6px]"
            name="location"
            placeholder="Enter your event location"
          />

          <TextField
            value={location.venue}
            onChange={handleChange}
            error={error.venue}
            label="Venue name"
            style="!rounded-[6px]"
            name="venue"
            placeholder="Enter event venue"
          />
        </div>
      </div>

      <div className="flex justify-between mt-5">
        <div className="p-4 flex justify-center">
          <Button onClick={handleBack} outline text="text-primary hover:text-white">
            Back
          </Button>
        </div>

        <FormButton
          handleAction={handleSubmit}
          position={"justify-end"}
          direction={"Next"}
        />
      </div>
    </div>
  );
};

export default ContactDto;
