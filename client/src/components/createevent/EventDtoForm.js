import { useCreateEvent } from "@/context/CreateEventContext";
import MenuItem from "@mui/material/MenuItem";
import FormButton from "./FormButton";
import useApiRequest from "@/hooks/useApiRequest";
import { useEffect } from "react";
import PhotoUpload from "./PhotoUpload";
import TextField from "../widgets/TextField";
import { CgSpinner } from "react-icons/cg";
import { Skeleton } from "@mui/material";
import TextArea from "../widgets/TextArea";
import { TextField as MUITextField } from "@mui/material";

const EventDtoForm = ({ handleNext }) => {
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
            location: value === "Online" ? "Online" : "",
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
    <div className="space-y-10">
      <div className="rounded-[20px] md:border border-neutrals200 md:p-10 md:py-12">
        <div className="flex items-center justify-center flex-wrap gap-5 font-bold mb-5">
          <div className="bg-sec100 text-baseBlack h-[30px] w-[30px] rounded-full flex items-center justify-center">
            <p>1</p>
          </div>
          <p>Tell the world about your event</p>
        </div>

        <div className="space-y-6">
          <TextField
            value={formData.eventDto.title}
            onChange={handleChange}
            error={formError.title}
            label="Event name*"
            style="!rounded-[6px]"
            name="title"
          />

          <TextArea
            value={formData.eventDto.description}
            onChange={handleChange}
            error={formError.description}
            label="Describe your event*"
            style="!rounded-[6px]"
            name="description"
            placeholder=""
            rows={7}
            textAreaClassName="!bg-inherit !border-neutrals200"
          />

          <div className="w-full space-y-3">
            <p className="text-sm sm:text-base text-baseBlack">
              Select a category for your event*
            </p>
            <div className="flex flex-wrap items-center justify-center gap-5 md:gap-7">
              {loading
                ? ["", "", "", "", "", "", ""]?.map((item, index) => (
                    <Skeleton
                      height={60}
                      className="w-full max-w-[80px]"
                      key={index}
                    />
                  ))
                : categories?.map((item, index) => {
                    const isSelected = item.id === formData.eventDto.categoryId;

                    return (
                      <div
                        className={`border border-sec/40 text-baseBlack rounded-[10px] p-3.5 px-5 cursor-pointer hover:bg-sec/50 transition-all ${
                          isSelected ? "bg-sec" : ""
                        }`}
                        key={index}
                        onClick={() =>
                          setFormData((prevData) => {
                            return {
                              ...prevData,
                              eventDto: {
                                ...prevData.eventDto,
                                categoryId: item.id,
                              },
                            };
                          })
                        }
                      >
                        <p className="text-sm text-baseBlack">{item?.name}</p>
                      </div>
                    );
                  })}
            </div>
          </div>

          <div className="w-full space-y-2">
            <p className="text-sm sm:text-base text-baseBlack">
              Select event type
            </p>
            <div className="flex flex-wrap items-center ">
              {["Public Event", "Private Event"]?.map((item, index) => {
                const isSelected = item === formData.eventType;
                return (
                  <div
                    className={`border border-sec/40 text-baseBlack first:rounded-l-[10px] last:rounded-r-[10px] first:border-r-0 p-2.5 cursor-pointer hover:bg-sec/50 transition-all ${
                      isSelected ? "bg-sec" : ""
                    }`}
                    key={index}
                    onClick={() =>
                      setFormData((prevData) => {
                        return {
                          ...prevData,
                          eventType: item,
                        };
                      })
                    }
                  >
                    <p className="text-sm text-baseBlack">{item}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      <div className="rounded-[20px] md:border border-neutrals200 md:p-10 md:py-12">
        <div className="flex items-center justify-center flex-wrap gap-5 font-bold mb-5">
          <div className="bg-sec100 text-baseBlack h-[30px] w-[30px] rounded-full flex items-center justify-center">
            <p>2</p>
          </div>
          <p>What time is the event</p>
        </div>

        <div className="space-y-6">
          <div className="w-full space-y-2">
            <p className="text-sm sm:text-base text-baseBlack">Event Date</p>
            <div className="flex flex-wrap items-center ">
              {["Single Event", "Multiple Days Event"]?.map((item, index) => {
                const isSelected = item === formData.eventDuration;
                return (
                  <div
                    className={`border border-sec/40 text-baseBlack first:rounded-l-[10px] last:rounded-r-[10px] first:border-r-0 p-2.5 cursor-pointer hover:bg-sec/50 transition-all ${
                      isSelected ? "bg-sec" : ""
                    }`}
                    key={index}
                    onClick={() =>
                      setFormData((prevData) => {
                        return {
                          ...prevData,
                          eventDuration: item,
                        };
                      })
                    }
                  >
                    <p className="text-sm text-baseBlack">{item}</p>
                  </div>
                );
              })}
            </div>
          </div>
          <div className="flex flex-wrap justify-between">
            <div className="flex gap-6">
              <TextField
                label="Start date"
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
                label="Time"
                id="event-start-time"
                type="time"
                name="startTime"
                value={formData.eventDto.startTime}
                onChange={handleChange}
                focused
                color="warning"
                error={!!formError.startTime || !!formError.dateTime}
                helperText={formError.startTime || formError.dateTime || ""}
                style="custom-time"
              />
            </div>
            <div className="flex flex-wrap gap-6">
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
            </div>
          </div>
        </div>
      </div>

      <div className="rounded-[20px] md:border border-neutrals200 md:p-10 md:py-12">
        <div className="flex items-center justify-center flex-wrap gap-5 font-bold mb-5">
          <div className="bg-sec100 text-baseBlack h-[30px] w-[30px] rounded-full flex items-center justify-center">
            <p>3</p>
          </div>
          <p>Do you have an Event banner or Flyer?</p>
        </div>

        <div className="p-4">
          <PhotoUpload
            onImageChange={handleImageChange}
            maxSizeMB={5}
            fileError={formError.base64Image || fileError}
            setFileError={setFileError}
          />
        </div>
      </div>
      
      <FormButton
        handleAction={handleSubmit}
        position={"justify-end"}
        direction={"Next"}
      />
    </div>
  );
}

export default EventDtoForm;
