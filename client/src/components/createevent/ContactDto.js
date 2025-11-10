import { useCreateEvent } from "@/context/CreateEventContext";
import TextArea from "../widgets/TextArea";
import { useEffect, useState } from "react";
import TextField from "../widgets/TextField";
import { FaCaretDown, FaCaretUp, FaTrash } from "react-icons/fa";
import Button from "../widgets/Button";
import { FiPlus } from "react-icons/fi";
import { checkComplete } from "@/utils/validation";

const ContactDto = ({ handleNext, handleBack }) => {
  const [error, setError] = useState({});
  const { location, setLocation, setTicket, ticket } = useCreateEvent();

  const [tickets, setTickets] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [currentTicket, setCurrentTicket] = useState({
    type: "",
    name: "",
    quantity: "",
    price: "",
    description: "",
    min: "",
    max: "",
  });
  const [isComplete, setIsComplete] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (["quantity", "price", "min", "max"].includes(name)) {
      const rawValue = value.replace(/,/g, "");
      if (rawValue === "" || /^[0-9]+$/.test(rawValue)) {
        setCurrentTicket((prev) => ({ ...prev, [name]: rawValue }));
      }
    } else {
      setCurrentTicket((prev) => ({ ...prev, [name]: value }));
    }
  };

  const adjustValue = (field, direction, step = 1) => {
    setCurrentTicket((prev) => {
      let current = parseInt(prev[field] || "0", 10);
      if (isNaN(current)) current = 0;
      const newValue =
        direction === "up" ? current + step : Math.max(0, current - step);
      return { ...prev, [field]: String(newValue) };
    });
  };

  const formattedPrice =
    currentTicket.price && !isNaN(Number(currentTicket.price))
      ? Number(currentTicket.price).toLocaleString()
      : "";

  const handleAddType = (type) => {
    setCurrentTicket({
      type,
      name: "",
      quantity: "",
      price: "",
      description: "",
      min: "",
      max: "",
    });
    setShowForm(true);
    setError({});
  };

  const addTicket = () => {
    if (!currentTicket.name) {
      setError({ name: "Ticket name is required" });
      return;
    }

    setTickets((prev) => [...prev, currentTicket]);
    setTicket((prev) => [...tickets, currentTicket]);
    setCurrentTicket({
      type: "",
      name: "",
      quantity: "",
      price: "",
      description: "",
      min: "",
      max: "",
    });
    setShowForm(false);
    setError({});
  };

  const deleteTicket = (index) => {
    setTickets((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = () => {
    handleNext();
  };

  useEffect(() => {
    const { price, ...ticketWithoutPrice } = currentTicket;
    const isComplete =
      currentTicket.type?.toLowerCase() === "free"
        ? checkComplete(ticketWithoutPrice)
        : checkComplete(currentTicket);
    setIsComplete(isComplete);
  }, [currentTicket]);

  return (
    <div className="space-y-7">
      <div className="rounded-[20px] md:border border-neutrals200 md:p-10 md:py-12 space-y-5">
        <div className="flex items-center justify-center flex-wrap gap-5 font-bold mb-5">
          <div className="bg-sec100 text-baseBlack h-[30px] w-[30px] rounded-full flex items-center justify-center">
            <p>4</p>
          </div>
          <p>Add Ticket Type</p>
        </div>

        {(tickets.length > 0 || ticket.length > 0) && (
          <div className="space-y-4">
            <h3 className="font-semibold text-lg">Added Tickets</h3>
            {(tickets.length > 0 ? tickets : ticket)?.map((t, index) => (
              <div
                key={index}
                className="flex justify-between items-center border border-neutrals200 rounded-lg p-4"
              >
                <div>
                  <p className="font-bold">
                    {t.name} ({t.type})
                  </p>
                  <p className="text-sm text-neutrals600">
                    {t.quantity || 0} available —{" "}
                    {t.type === "Free" ? "Free" : `₦${t.price}`}
                  </p>
                </div>
                <button
                  onClick={() => deleteTicket(index)}
                  className="text-red-500 hover:text-red-700"
                >
                  <FaTrash />
                </button>
              </div>
            ))}
          </div>
        )}

        <div className="flex gap-5  mb-5">
          <Button
            onClick={() => handleAddType("Free")}
            outline
            className="!py-2"
            text="text-purple-500"
            hover=""
            border="border-purple-500"
            startIcon={<FiPlus className="text-[24px]" />}
          >
            Free
          </Button>
          <Button
            onClick={() => handleAddType("Paid")}
            outline
            className="!py-2"
            text="text-sec"
            hover=""
            border="border-sec"
            startIcon={<FiPlus className="text-[24px]" />}
          >
            Paid
          </Button>
        </div>

        {showForm && (
          <div className="mt-6 pt-6 space-y-5">
            <p className="font-semibold text-base">
              {currentTicket.type} Ticket Details
            </p>

            <div className="w-full max-w-[450px] xl:max-w-none flex flex-col xl:flex-row items-start gap-5 xl:gap-12">
              <div className="w-full flex-1 space-y-5">
                <TextField
                  value={currentTicket.name}
                  onChange={handleChange}
                  error={error.name}
                  label="Ticket name*"
                  name="name"
                  placeholder="Enter ticket name"
                />

                <div className="grid xl:grid-cols-2 gap-x-10 2xl:gap-x-20 gap-y-5">
                  <TextField
                    value={currentTicket.quantity}
                    onChange={handleChange}
                    label="Quantity"
                    name="quantity"
                    placeholder="Enter quantity"
                  />

                  <div className="w-full flex relative">
                    <span className="text-xl text-neutrals500 font-bold absolute bottom-2.5 z-10 left-2">
                      ₦
                    </span>
                    <TextField
                      value={
                        currentTicket.type === "Free" ? "Free" : formattedPrice
                      }
                      onChange={handleChange}
                      label="Price*"
                      name="price"
                      placeholder={
                        currentTicket.type === "Free" ? "Free" : "Enter price"
                      }
                      disabled={currentTicket.type === "Free"}
                      style="!ps-8 !w-full"
                    />
                  </div>

                  <TextField
                    value={currentTicket.min}
                    onChange={handleChange}
                    label="Ticket per order"
                    name="min"
                    placeholder="Min"
                    container="!mt-auto"
                    icon={
                      <div>
                        <FaCaretUp
                          onClick={() => adjustValue("min", "up")}
                          className="text-2xl text-neutrals600 cursor-pointer"
                        />
                        <FaCaretDown
                          onClick={() => adjustValue("min", "down")}
                          className="text-2xl text-neutrals600 cursor-pointer"
                        />
                      </div>
                    }
                    iconClass="!top-[26px] !right-1"
                  />

                  <TextField
                    value={currentTicket.max}
                    onChange={handleChange}
                    label=" "
                    name="max"
                    placeholder="Max"
                    container="!mt-auto"
                    icon={
                      <div>
                        <FaCaretUp
                          onClick={() => adjustValue("max", "up")}
                          className="text-2xl text-neutrals600 cursor-pointer"
                        />
                        <FaCaretDown
                          onClick={() => adjustValue("max", "down")}
                          className="text-2xl text-neutrals600 cursor-pointer"
                        />
                      </div>
                    }
                    iconClass="top-[7px] xl:!top-[4px] !right-1"
                  />
                </div>
              </div>

              <div className="w-full flex-1">
                <TextArea
                  value={currentTicket.description}
                  onChange={handleChange}
                  label="Describe the ticket"
                  name="description"
                  placeholder="Enter ticket description"
                  textAreaClassName="!bg-inherit !border-neutrals200 h-full"
                  rows={9}
                />
              </div>
            </div>

            <div className="flex justify-end gap-3">
              <Button
                outline
                onClick={() => setShowForm(false)}
                className="!py-2.5"
                text="text-primary"
              >
                Cancel
              </Button>
              <Button onClick={addTicket} disabled={!isComplete}>
                Add Ticket
              </Button>
            </div>
          </div>
        )}
      </div>

      <div className="rounded-[20px] md:border border-neutrals200 md:p-10 md:py-12 space-y-5">
        <div className="flex items-center justify-center flex-wrap gap-5 font-bold mb-5">
          <div className="bg-sec100 text-baseBlack h-[30px] w-[30px] rounded-full flex items-center justify-center">
            <p>5</p>
          </div>
          <p>Where is the event</p>
        </div>

        <div className="space-y-5 w-full max-w-[450px] xl:max-w-none">
          <TextField
            value={location.location}
            onChange={(e) =>
              setLocation((prev) => ({ ...prev, location: e.target.value }))
            }
            label="Event location*"
            name="location"
            placeholder="Enter your event location"
          />
          <TextField
            value={location.venue}
            onChange={(e) =>
              setLocation((prev) => ({ ...prev, venue: e.target.value }))
            }
            label="Venue name"
            name="venue"
            placeholder="Enter event venue"
          />
        </div>
      </div>

      <div className="flex justify-between mt-5">
        <Button
          onClick={handleBack}
          outline
          text="text-primary hover:text-white"
        >
          Back
        </Button>
        <Button onClick={handleSubmit} className="ms-auto !mb-10">
          Next
        </Button>
      </div>
    </div>
  );
};

export default ContactDto;
