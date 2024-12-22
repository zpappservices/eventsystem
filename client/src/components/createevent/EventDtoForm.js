import { useCreateEvent } from "@/context/CreateEventContext";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import FormButton from "./FormButton";
import useApiRequest from "@/hooks/useApiRequest";
import { useEffect } from "react";
import PhotoUpload from "./PhotoUpload";

function EventDtoForm({ handleNext }) {
  const {
    formData,
    formError,
    setFormError,
    setFormData,
    handleImageChange,
    base64Image,
    fileError,
    setFileError,
  } = useCreateEvent();

  function handleChange(e) {
    const { name, value } = e.target;

    setFormData((prevData) => {
      if (name === "locationType") {
        return {
          ...prevData,
          eventDto: {
            ...prevData.eventDto,
            [name]: value,
            location:
              value === "Online" ? "Online" : "", 
          },
        };
      }

      return {
        ...prevData,
        eventDto: {
          ...prevData.eventDto,
          [name]: value,
        },
      };
    });
  }


  const { data, error, loading, request } = useApiRequest({
    method: "get",
    url: "setup/getallcategory",
  });

  const getEventsCategories = async () => {
    await request();
  };

  useEffect(() => {
    getEventsCategories();
  }, []);

  const validateForm = () => {
    const errors = {};
    if (!formData.eventDto.title) errors.title = "Event name is required.";
    if (!formData.eventDto.description)
      errors.description = "Event description is required.";
    if (!formData.eventDto.categoryId)
      errors.categoryId = "Event category is required.";
    if (!formData.eventDto.currency) errors.currency = "Currency is required.";
    if (!formData.eventDto.startDate)
      errors.startDate = "Start date is required.";
    if (!formData.eventDto.endDate) errors.endDate = "End date is required.";
    if (!formData.eventDto.startTime)
      errors.startTime = "Start time is required.";
    if (!formData.eventDto.endTime) errors.endTime = "End time is required.";

    if (formData.eventDto.locationType === "Venue") {
      if (!formData.eventDto.location)
        errors.location = "Event location is required.";
    }

    if (!base64Image) errors.base64Image = "Banner Image is required.";

    const isEndDateValid =
      new Date(formData.eventDto.endDate) >=
      new Date(formData.eventDto.startDate);

    if (!isEndDateValid) {
      errors.dateTime =
        "End date and time must be after the start date and time.";
    }

    setFormError(errors);
    return Object.keys(errors).length === 0;
  };


  const handleSubmit = () => {
    if (validateForm()) handleNext();
  };

  const categories = data?.data;

  return (
    <>
      {/* Event Name */}
      <div className="p-4">
        <h2 className="font-semibold pb-2">Event Name</h2>
        <TextField
          fullWidth
          label="Enter event name"
          id="event-name"
          name="title"
          value={formData.eventDto.title}
          onChange={handleChange}
          color="warning"
          error={!!formError.title}
          helperText={formError.title || ""}
        />
      </div>

      {/* Event description */}
      <div className="p-4">
        <h2 className="font-semibold pb-2">Event Description</h2>
        <TextField
          fullWidth
          multiline
          rows={4} // Number of visible lines
          label="Enter event description"
          id="event-description"
          name="description" // Corrected to match `description` in formData.eventDto
          value={formData.eventDto.description}
          onChange={handleChange}
          color="warning"
          error={!!formError.description}
          helperText={formError.description || ""}
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
          name="categoryId"
          value={formData.eventDto.categoryId}
          onChange={handleChange}
          color="warning"
          error={!!formError.categoryId}
          helperText={formError.categoryId || ""}>
          {categories?.length > 0 &&
            categories?.map(({ name, id }) => (
              <MenuItem key={id} value={name}>
                {name}
              </MenuItem>
            ))}
        </TextField>
      </div>
      <div className="p-4">
        <h2 className="font-semibold pb-2">Location type</h2>
        <TextField
          fullWidth
          id="demo-simple-select"
          select
          labelid="demo-simple-select-label"
          label="Location type"
          name="locationType"
          value={formData.eventDto.locationType}
          onChange={handleChange}
          color="warning"
          error={!!formError.locationType}
          helperText={formError.locationType || ""}>
          <MenuItem value="Online">Online</MenuItem>
          <MenuItem value="Venue">Venue</MenuItem>
        </TextField>
      </div>
      {/* Event Address */}
      {formData.eventDto.locationType === "Venue" && (
        <div className="p-4">
          <h2 className="font-semibold pb-2">Event Location</h2>
          <TextField
            fullWidth
            label="Enter event address"
            id="event-address"
            name="location"
            value={formData.eventDto.location}
            onChange={handleChange}
            color="warning"
            error={!!formError.location}
            helperText={formError.location || ""}
          />
        </div>
      )}
      <div className="p-4">
        <PhotoUpload
          onImageChange={handleImageChange}
          maxSizeMB={5}
          fileError={formError.base64Image || fileError}
          setFileError={setFileError}
        />
      </div>
      <div className="p-4">
        <h2 className="font-semibold pb-4">Event Date & Time</h2>
        <div className="sm:max-w-[80%] max-w-none grid sm:grid-cols-2 gap-y-7 gap-x-10">
          <TextField
            label="Event starts"
            id="event-start-date"
            type="date"
            name="startDate"
            value={formData.eventDto.startDate}
            onChange={handleChange}
            focused
            color="warning"
            error={!!formError.startDate || !!formError.dateTime}
            helperText={formError.startDate || formError.dateTime || ""}
            inputProps={{
              min: new Date().toISOString().split("T")[0],
            }}
          />
          <TextField
            label="Time starts"
            id="event-start-time"
            type="time"
            name="startTime"
            value={formData.eventDto.startTime}
            onChange={handleChange}
            focused
            color="warning"
            error={!!formError.startTime || !!formError.dateTime}
            helperText={formError.startTime || formError.dateTime || ""}
          />
          <TextField
            label="Event ends"
            id="event-end-date"
            type="date"
            name="endDate"
            value={formData.eventDto.endDate}
            onChange={handleChange}
            focused
            color="warning"
            error={!!formError.endDate || !!formError.dateTime}
            helperText={formError.endDate || formError.dateTime || ""}
            inputProps={{
              min: new Date().toISOString().split("T")[0], 
            }}
          />
          <TextField
            label="Time ends"
            id="event-end-time"
            type="time"
            name="endTime"
            required
            value={formData.eventDto.endTime}
            onChange={handleChange}
            focused
            color="warning"
            error={!!formError.endTime || !!formError.dateTime}
            helperText={formError.endTime || formError.dateTime || ""}
          />
          <TextField
            disabled={true}
            fullWidth
            id="demo-simple-select"
            select
            labelid="demo-simple-select-label"
            label="Currency"
            name="currency"
            value={formData.eventDto.currency}
            onChange={handleChange}
            color="warning"
            error={!!formError.currency}
            helperText={formError.currency || ""}>
            <MenuItem value="NGN">Naira</MenuItem>
            <MenuItem value="USD">US Dollars</MenuItem>
            <MenuItem value="GHS">Cedis</MenuItem>
            <MenuItem value="ZAR">Rand</MenuItem>
          </TextField>
        </div>
      </div>

      <FormButton
        handleAction={handleSubmit}
        position={"justify-end"}
        direction={"Next"}
      />
    </>
  );
}

export default EventDtoForm;
