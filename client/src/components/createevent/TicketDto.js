import { TextField, MenuItem, FormControl } from "@mui/material";
import React, { useEffect, useState } from "react";
import FormButton from "./FormButton";
import { useCreateEvent } from "@/context/CreateEventContext";
import { toast } from "react-toastify";
import useApiRequest from "@/hooks/useApiRequest";

const TicketDto = ({ handleBack }) => {
  const [tickets, setTickets] = useState([
    {
      type: "free",
      name: "Free",
      price: 0,
      quantity: 10,
    },
    {
      type: "paid",
      name: "Standard",
      price: 1000,
      quantity: 10,
    },
  ]);

  const { formData, formError, setFormError, setFormData } = useCreateEvent();

  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({
    type: "",
    name: "",
    price: "",
    quantity: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleConfirm = () => {
    if (form.type && form.name && form.price && form.quantity) {
      setFormData((prev) => ({
        ...prev,
        ticketDto: [
          ...prev.ticketDto,
          {
            ...form,
            price: parseFloat(form.price),
            quantity: parseInt(form.quantity, 10),
          },
        ],
      }));
      setForm({ type: "", name: "", price: "", quantity: "" });
      setShowForm(false);
    } else {
      alert("Please fill in all fields.");
    }
  };

  const handleCancel = () => {
    setForm({ type: "", name: "", price: "", quantity: "" });
    setShowForm(false);
  };

  const isComplete = formData?.ticketDto.length > 0;

  const { data, error, loading, request } = useApiRequest({
    method: "post",
    url: "event/v2/createevent",
    data: formData,
    headers: null,
    useToken: true
  });

  const createEvent = async () => {
    await request();
  };

  useEffect(() => {
    if (data?.statusCode >= 200 && data?.statusCode < 300) {
      toast.success(data?.message || "Career Advised successfully!");

    } else if (data?.error || data?.message) {
      toast.error(data?.error || data?.message || "Couldn't Post Event! Try again later.");
    } else if (data?.statusCode >= 400 && data?.statusCode < 500) {
      toast.error(data?.error || data?.message || "Couldn't Post Event! Try again later.");
    }
  }, [data]);

  useEffect(() => {
    if (error) {
      toast.error("Unexpected error. Please try again!");
    }
  }, [error]);

  return (
    <>
      <div className="p-4">
        {!showForm && (
          <button
            className="bg-[#FF7F50] hover:bg-[#FFB26F] text-white px-4 py-2 rounded transition-all duration-300 ease-in-out hover:scale-[1.1]"
            onClick={() => setShowForm(true)}
          >
            Add Ticket
          </button>
        )}

        {showForm && (
          <div className="p-4 rounded shadow">
            <FormControl fullWidth className="mb-2">
              <TextField
                fullWidth
                id="demo-simple-select"
                select
                labelid="demo-simple-select-label"
                label="Ticket Type"
                name="type"
                value={form.type}
                onChange={handleInputChange}
                color="warning"
              >
                <MenuItem value="free">Free</MenuItem>
                <MenuItem value="paid">Paid</MenuItem>
              </TextField>
            </FormControl>
            <FormControl fullWidth className="mb-2">
              <TextField
                fullWidth
                id="demo-simple-select"
                select
                labelid="demo-simple-select-label"
                label="Ticket name"
                name="name"
                value={form.name}
                onChange={handleInputChange}
                color="warning"
              >
                <MenuItem value="Regular">Regular</MenuItem>
                <MenuItem value="VIP">VIP</MenuItem>
                <MenuItem value="Silver">Silver</MenuItem>
                <MenuItem value="Gold">Gold</MenuItem>
                <MenuItem value="Diamond">Diamond</MenuItem>
              </TextField>
            </FormControl>
            {/* 
            <div className="mb-3">
              <TextField
                fullWidth
                label="Name"
                name="name"
                value={form.name}
                onChange={handleInputChange}
                color="warning"
              />
            </div> */}

            <div className="mb-3">
              <TextField
                label="Price ($)"
                type="number"
                name="price"
                value={form.price}
                onChange={handleInputChange}
                color="warning"
              />
            </div>
            <div className="mb-3">
              <TextField
                label="Quantity"
                type="number"
                name="quantity"
                value={form.quantity}
                onChange={handleInputChange}
                color="warning"
              />
            </div>

            <div className="flex space-x-5">
              <button
                className="bg-[#62825D] hover:bg-[#B1C29E] text-white px-4 py-2 rounded transition-all duration-300 ease-in-out hover:scale-[1.1]"
                onClick={handleConfirm}
              >
                Confirm
              </button>
              <button
                className="bg-[#FF7F50] hover:bg-[#FFB26F] text-white px-4 py-2 rounded transition-all duration-300 ease-in-out hover:scale-[1.1]"
                onClick={handleCancel}
              >
                Cancel
              </button>
            </div>
          </div>
        )}

        <div className="mt-4">
          <h2 className="text-lg font-bold">Tickets:</h2>
          <ul className="list-disc pl-5">
            {formData?.ticketDto?.map((ticket, index) => (
              <li key={index}>
                {`${ticket.name} (${ticket.type})=> `}
                <span>{`Price of tickets $(${ticket.price}) - Number of tickets: (${ticket.quantity})`}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="flex justify-between">
        <FormButton
          handleAction={handleBack}
          position={"justify-start"}
          direction={"Back"}
        />

        <FormButton
          handleAction={createEvent}
          position={"justify-end"}
          direction={"Submit"}
          disabled={!isComplete || loading}
          isLoading={loading}
        />
      </div>
    </>
  );
};

export default TicketDto;
