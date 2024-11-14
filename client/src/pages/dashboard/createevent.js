import Layout from "@/components/dashboard/Layout";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import { FaTrash } from "react-icons/fa6";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

const CreateEvent = () => {
  const eventCategory = [
    { value: "event 1", label: "first event" },
    { value: "event 2", label: "second event" },
    { value: "event 3", label: "third event" },
    { value: "event 4", label: "fourth event" },
  ];

  const ticketTypes = [
    { value: "Free", label: "Free" },
    { value: "Paid", label: "Paid" },
    { value: "VIP", label: "VIP" },
  ];

  const [formData, setFormData] = useState({
    eventName: "",
    eventCategory: "",
    eventAddress: "",
    eventStartDate: "",
    eventStartTime: "",
    eventEndDate: "",
    eventEndTime: "",
    coverPhoto: null,
    ticketType: "",
    acceptTerms: false,
  });

  const [preview, setPreview] = useState(null);
  const [fileError, setFileError] = useState(""); // File error message
  const [formError, setFormError] = useState({}); // Specific form errors
  const fileInputRef = useRef(null); // Ref for file input

  const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB

  useEffect(() => {
    return () => {
      if (preview) {
        URL.revokeObjectURL(preview);
      }
    };
  }, [preview]);

  const handleChange = (e) => {
    const { name, value, type, files, checked } = e.target;
    if (type === "file") {
      const file = files[0];
      if (file.size > MAX_FILE_SIZE) {
        setFileError("File size should not exceed 5MB.");
        return;
      }
      setFileError(""); // Clear error if file is valid
      setFormData((prevData) => ({ ...prevData, coverPhoto: file }));
      setPreview(URL.createObjectURL(file));
    } else if (type === "checkbox") {
      setFormData((prevData) => ({ ...prevData, [name]: checked }));
    } else {
      setFormData((prevData) => ({ ...prevData, [name]: value }));
    }
  };

  const validateForm = () => {
    const errors = {};
    if (!formData.eventName) errors.eventName = "Event name is required.";
    if (!formData.eventCategory) errors.eventCategory = "Event category is required.";
    if (!formData.eventAddress) errors.eventAddress = "Event address is required.";
    if (!formData.eventStartDate) errors.eventStartDate = "Start date is required.";
    if (!formData.eventStartTime) errors.eventStartTime = "Start time is required.";
    if (!formData.eventEndDate) errors.eventEndDate = "End date is required.";
    if (!formData.eventEndTime) errors.eventEndTime = "End time is required.";
    if (!formData.ticketType) errors.ticketType = "Ticket type is required.";
    if (!formData.acceptTerms) errors.acceptTerms = "You must accept the terms.";

    const isEndDateValid = new Date(formData.eventEndDate) >= new Date(formData.eventStartDate);
    const isEndTimeValid =
      new Date(`1970-01-01T${formData.eventEndTime}:00`) >
      new Date(`1970-01-01T${formData.eventStartTime}:00`);
    if (!isEndDateValid || !isEndTimeValid) {
      errors.dateTime = "End date and time must be after the start date and time.";
    }

    setFormError(errors);
    return Object.keys(errors).length === 0;
  };

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   if (validateForm()) {
  //     console.log("Form submitted successfully:", formData);
  //     handleResetForm();
  //   }
  // };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (validateForm()) {
      const formDataToSend = new FormData();

      // Append each field to FormData
      formDataToSend.append("eventName", formData.eventName);
      formDataToSend.append("eventCategory", formData.eventCategory);
      formDataToSend.append("eventAddress", formData.eventAddress);
      formDataToSend.append("eventStartDate", formData.eventStartDate);
      formDataToSend.append("eventStartTime", formData.eventStartTime);
      formDataToSend.append("eventEndDate", formData.eventEndDate);
      formDataToSend.append("eventEndTime", formData.eventEndTime);
      formDataToSend.append("ticketType", formData.ticketType);
      formDataToSend.append("acceptTerms", formData.acceptTerms);
      if (formData.coverPhoto) {
        formDataToSend.append("coverPhoto", formData.coverPhoto);
        console.log(formData.coverPhoto);
      }

      try {
        // Send formDataToSend to your server (API endpoint example used)
        const response = await fetch("/api/events", {
          method: "POST",
          body: formDataToSend,
        });

        if (response.ok) {
          console.log("Event created successfully!");
          handleResetForm();
        } else {
          console.error("Failed to create event.");
        }
      } catch (error) {
        console.error("Error submitting form:", error);
      }
    }
  };

  const handleDeleteImage = () => {
    setFormData((prevData) => ({ ...prevData, coverPhoto: null }));
    setPreview(null);

    if (fileInputRef.current) fileInputRef.current.value = ""; // Clear the file input value
  };

  const handleResetForm = () => {
    setFormData({
      eventName: "",
      eventCategory: "",
      eventAddress: "",
      eventStartDate: "",
      eventStartTime: "",
      eventEndDate: "",
      eventEndTime: "",
      coverPhoto: null,
      ticketType: "",
      acceptTerms: false,
    });
    setPreview(null);
    setFormError({});
    setFileError("");
    if (fileInputRef.current) fileInputRef.current.value = ""; // Clear the file input value
  };

  return (
    <Layout>
      <form onSubmit={handleSubmit}>
        <div className="rounded bg-white border-b-2 border-[#FF7F50] shadow-sm shadow-slate-400 pt-4 pl-7 text-2xl font-bold">
          <h1 className="w-full">Post a New Event</h1>
        </div>

        <div className="rounded bg-white border-b-2 py-4 px-7 border-slate-400 shadow-sm shadow-slate-400">
          {/* Event Name */}
          <div className="p-4">
            <h2 className="font-semibold pb-2">Event Name</h2>
            <TextField
              fullWidth
              label="Enter event name"
              id="event-name"
              name="eventName"
              value={formData.eventName}
              onChange={handleChange}
              color="warning"
              error={!!formError.eventName}
              helperText={formError.eventName || ""}
            />
          </div>
          {/* Event Category */}
          <div className="p-4">
            <h2 className="font-semibold pb-2">Event Category</h2>
            <TextField
              fullWidth
              id="event-category"
              select
              label="Select event category"
              name="eventCategory"
              value={formData.eventCategory}
              onChange={handleChange}
              color="warning"
              error={!!formError.eventCategory}
              helperText={formError.eventCategory || ""}
            >
              {eventCategory.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
          </div>
          {/* Event Address */}
          <div className="p-4">
            <h2 className="font-semibold pb-2">Event Address</h2>
            <TextField
              fullWidth
              label="Enter event address"
              id="event-address"
              name="eventAddress"
              value={formData.eventAddress}
              onChange={handleChange}
              color="warning"
              error={!!formError.eventAddress}
              helperText={formError.eventAddress || ""}
            />
          </div>
          {/* Event Date & Time */}
          <div className="p-4">
            <h2 className="font-semibold pb-4">Event Date & Time</h2>
            <div className="sm:max-w-[80%] max-w-none grid sm:grid-cols-2 gap-y-7 gap-x-10">
              <TextField
                label="Event starts"
                id="event-start-date"
                type="date"
                name="eventStartDate"
                value={formData.eventStartDate}
                onChange={handleChange}
                focused
                color="warning"
                error={!!formError.eventStartDate || !!formError.dateTime}
                helperText={formError.eventStartDate || formError.dateTime || ""}
              />
              <TextField
                label="Time starts"
                id="event-start-time"
                type="time"
                name="eventStartTime"
                value={formData.eventStartTime}
                onChange={handleChange}
                focused
                color="warning"
                error={!!formError.eventStartTime || !!formError.dateTime}
                helperText={formError.eventStartTime || formError.dateTime || ""}
              />
              <TextField
                label="Event ends"
                id="event-end-date"
                type="date"
                name="eventEndDate"
                value={formData.eventEndDate}
                onChange={handleChange}
                focused
                color="warning"
                error={!!formError.eventEndDate || !!formError.dateTime}
                helperText={formError.eventEndDate || formError.dateTime || ""}
              />
              <TextField
                label="Time ends"
                id="event-end-time"
                type="time"
                name="eventEndTime"
                required
                value={formData.eventEndTime}
                onChange={handleChange}
                focused
                color="warning"
                error={!!formError.eventEndTime || !!formError.dateTime}
                helperText={formError.eventEndTime || formError.dateTime || ""}
              />
            </div>
          </div>
          {/* Cover Photo */}
          <div className="col-span-full p-4">
            <p className="block text-sm font-semibold text-gray-900">Cover photo</p>
            <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
              <div className="text-center">
                {preview ? (
                  <div className="relative w-24 h-24 mx-auto mb-4 rounded-md overflow-hidden">
                    <Image
                      src={preview}
                      alt="Cover photo preview"
                      width={100}
                      height={100}
                      className="object-cover"
                    />
                  </div>
                ) : (
                  <div className="mx-auto h-12 w-12 text-gray-300" aria-hidden="true" />
                )}

                <div className="mt-4 flex text-sm text-gray-600">
                  <label
                    htmlFor="file-upload"
                    className="relative cursor-pointer rounded-md bg-white font-semibold text-[#FF7F50] focus-within:outline-none hover:text-[#FF7F50]"
                  >
                    <span>Upload a file</span>
                    <input
                      id="file-upload"
                      name="coverPhoto"
                      type="file"
                      accept="image/png, image/jpeg, image/gif"
                      className="sr-only"
                      onChange={handleChange}
                      ref={fileInputRef} // Attach ref to file input
                    />
                  </label>
                  <p className="pl-1">or drag and drop</p>
                </div>
                <p className="text-xs text-gray-600">PNG, JPG, GIF up to 5MB</p>

                {preview && (
                  <div className="w-full flex justify-center">
                    <button
                      type="button"
                      onClick={handleDeleteImage}
                      className="flex gap-1 items-center mt-2 text-[#FF7F50] text-sm"
                    >
                      Delete Image
                      <FaTrash />
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
          {/* Display file upload error */}
          {fileError && <p className="text-red-500 text-sm">{error}</p>}

          {/* Ticket Type */}
          <div className="p-4">
            <h2 className="font-semibold pb-2">Ticket Type</h2>
            <TextField
              fullWidth
              id="ticket-type"
              select
              label="Select ticket type"
              name="ticketType"
              value={formData.ticketType}
              onChange={handleChange}
              color="warning"
              error={!!formError.ticketType}
              helperText={formError.ticketType || ""}
            >
              {ticketTypes.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
          </div>

          {/* Terms and Conditions */}
          <div className="p-4">
            <label className="inline-flex items-center space-x-2">
              <input
                type="checkbox"
                name="acceptTerms"
                checked={formData.acceptTerms}
                onChange={handleChange}
                className="form-checkbox text-[#FF7F50]"
              />
              <span className="text-sm">
                I accept the
                <a href="#" className="text-[#FF7F50] underline">
                  Terms and Conditions
                </a>
              </span>
            </label>
          </div>

          {/* Submit Button */}
          <div className="p-4 flex justify-center">
            <button
              type="submit"
              className={`w-full sm:w-auto px-6 py-3 font-semibold rounded-md focus:outline-none transition-all duration-300 ease-in-out ${
                formData.acceptTerms
                  ? "bg-[#FF7F50] text-white hover:bg-[#e66a43] active:scale-95"
                  : "bg-gray-200 text-gray-600 cursor-not-allowed"
              }`}
              disabled={!formData.acceptTerms}
            >
              Submit Event
            </button>
          </div>
        </div>
      </form>
    </Layout>
  );
};

export default CreateEvent;
