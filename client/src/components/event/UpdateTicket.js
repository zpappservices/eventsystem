import React, { useEffect, useState } from "react";
import useAuthToken from "@/hooks/useAuthToken";
import NativeSelect from "@/components/widgets/NativeSelect";
import TextInput from "../widgets/TextInput";
import StyledImage from "../StyledImage";
import { ButtonLoading } from "../widgets/ButtonLoading";
import useLoading from "@/hooks/useLoading";
import { apiRequest } from "@/utils/apiService";
import { toast } from "react-toastify";
import { useRouter } from "next/router";
import { validateTicket } from "@/utils/validation";

const Form = ({ ticket, eventId, description }) => {
  const { activeUser } = useAuthToken();
  const [form, setForm] = useState({});
  const [contactData, setContactData] = useState(null);
  const [error, setError] = useState({});
  const [isEditable, setIsEditable] = useState(false);
  const router = useRouter();

  const { startLoading, stopLoading, isLoading } = useLoading();

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  }

  useEffect(() => {
    setForm((prev) => ({
      ...prev,
      name: ticket.name || "",
      eventId: eventId || "",
      type: ticket.type || "",
      description: ticket.description || "",
      quantity: ticket.quantity || "",
      price: ticket.price || "",
    }));

    setContactData((prev) => ({
      ...prev,
      name: ticket.name || "",
      eventId: eventId || "",
      type: ticket.type || "",
      description: ticket.description || "",
      quantity: ticket.quantity || "",
      price: ticket.price || "",
    }));
  }, [ticket, activeUser]);

  const handleBack = (e) => {
    e.preventDefault();
    setIsEditable(false);
    if (contactData) {
      setForm(contactData);
    }
  };

  const updateTicket = async (e) => {
    e.preventDefault();
    if (!validateTicket(form, setError)) return;

    startLoading();
    try {
      const data = await apiRequest(
        "post",
        `event/updateticket/${ticket?.id}`,
        form,
        true
      );

      toast.success("Event contact updated successfully!");
      setTimeout(() => {
        router.reload();
      }, 1500);
    } catch (error) {
      toast.error(error?.response?.data?.message[0] || "Error updating event");
    } finally {
      stopLoading();
    }
  };

  return (
    <div>
      {!isEditable && (
        <StyledImage
          src="/img/edit.svg"
          className="ms-auto cursor-pointer"
          onClick={() => setIsEditable(true)}
        />
      )}
      <form className="space-y-3">
        <div className="max-w-[600px] sm:flex gap-5 space-y-7 sm:space-y-0">
          <TextInput
            name="name"
            label="Ticket Name"
            type="text"
            value={form.name}
            onChange={handleChange}
            placeholder="Enter ticket name"
            errorMessage={error.name}
            required
            disabled={!isEditable}
            containerClassName="flex-1"
          />
          <NativeSelect
            options={["Free", "Paid"]}            
            value={form.type}
            onChange={handleChange}
            selectedOption={form.type}
            name="type"
            label="Select ticket type"
            placeholder="Select ticket type"
            disabled={!isEditable}
            containerClassName="flex-1"
          />
        </div>
        <div className="max-w-[600px] sm:flex gap-5 space-y-7 sm:space-y-0">
          <TextInput
            name="quantity"
            label="Tickets quantity"
            type="number"
            value={form.quantity}
            onChange={handleChange}
            placeholder="Enter quantity of tickets"
            errorMessage={error.quantity}
            required
            disabled={!isEditable}
            containerClassName="flex-1"
          />
          <TextInput
            name="price"
            label="Ticket Price"
            type="text"
            value={form.price}
            onChange={handleChange}
            placeholder="Enter price of ticket"
            errorMessage={error.price}
            required
            disabled={!isEditable}
            containerClassName="flex-1"
          />
        </div>
        {isEditable && (
          <div className="flex gap-5 sm:gap-20">
            <ButtonLoading
              className="!w-fit bg-gray-700 hover:bg-gray-700/80 text-white hover:text-white py-2.5 px-10"
              onClick={handleBack}>
              Cancel
            </ButtonLoading>

            <ButtonLoading
              isLoading={isLoading}
              className="!w-fit px-10"
              onClick={updateTicket}>
              Save
            </ButtonLoading>
          </div>
        )}
      </form>
    </div>
  );
};

const UpdateTicket = ({ event }) => {
  const tickets = event?.EventTicket;
  return (
    <div className="space-y-7">
      {tickets?.length > 0 &&
        tickets?.map((item, index) => (
          <Form
            eventId={event?.id}
            description={event?.description}
            ticket={item}
            key={index}
          />
        ))}
    </div>
  );
};

export default UpdateTicket;
