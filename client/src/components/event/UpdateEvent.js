import React, { useEffect, useState } from "react";
import StyledTextField from "../widgets/StyledTextField";
import useAuthToken from "@/hooks/useAuthToken";
import { MenuItem, TextField } from "@mui/material";
import useApiRequest from "@/hooks/useApiRequest";
import NativeSelect from "@/components/widgets/NativeSelect";
import TextInput from "../widgets/TextInput";
import TextArea from "../widgets/TextArea";
import TimeInput from "../widgets/TImeInput";
import DateInput from "../widgets/DateInput";
import { currencies } from "@/lib/currencies";
import PhotoUpload from "../createevent/PhotoUpload";
import StyledImage from "../StyledImage";
import Button from "../Button";
import { ButtonLoading } from "../widgets/ButtonLoading";

const UpdateEvent = ({ event }) => {
  const { activeUser } = useAuthToken();
  const [form, setForm] = useState({});
  const [eventData, setEventData] = useState(null);
  const [error, setError] = useState({});
  const [fileError, setFileError] = useState();
  const [isEditable, setIsEditable] = useState(false);

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  }

  const handleImageChange = (base64) => {
    setForm((prevData) => ({
      ...prevData,
      image_banner: base64,
    }));
  };

  const { data, request } = useApiRequest({
    method: "get",
    url: "setup/getallcategory",
  });

  const getEventsCategories = async () => {
    await request();
  };

  const categories = data?.data?.map((item) => item.name);

  useEffect(() => {
    getEventsCategories();
  }, []);

  useEffect(() => {
    setForm((prev) => ({
      ...prev,
      userId: activeUser,
      categoryId: event?.category || "",
      title: event?.title || "",
      description: event?.description || "",
      location: event?.location || "",
      locationType: event?.locationType || "",
      startDate: event?.StartDate || "",
      endDate: event?.EndDate || "",
      startTime: event?.StartTime || "",
      endTime: event?.EndTime || "",
      AllDay: true,
      image_banner: event?.image_banner || "",
      image_tile: event?.image_tile || "",
      currency: event?.currency || "",
      createdBy: "",
    }));
  }, [event, activeUser]);

  const handleBack = (e) => {
    e.preventDefault();
    setIsEditable(false);
    if (eventData) {
      setForm(eventData);
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
      <form className="space-y-7">
        <TextInput
          name="title"
          label="Name"
          value={form.title}
          onChange={handleChange}
          placeholder="Enter event name"
          errorMessage={error.title}
          required
          disabled={!isEditable}
        />
        <TextArea
          name="description"
          label="Event Description"
          value={form.description}
          onChange={handleChange}
          placeholder="Enter a description for your event"
          errorMessage={error.description}
          rows={4}
          disabled={!isEditable}
        />
        <NativeSelect
          options={categories ?? null}
          value={form.categoryId}
          onChange={handleChange}
          selectedOption={form.categoryId}
          name="categoryId"
          label="Select category"
          placeholder="Select category"
          disabled={!isEditable}
        />

        <NativeSelect
          options={currencies ?? null}
          value={form.currency}
          onChange={handleChange}
          selectedOption={form.currency}
          name="currency"
          label="Select currency"
          placeholder="Select currency"
          disabled={!isEditable}
        />

        <PhotoUpload
          onImageChange={handleImageChange}
          maxSizeMB={5}
          fileError={error.image_banner || fileError}
          setFileError={setFileError}
          file={form?.image_banner}
          disabled={!isEditable}
        />

        <div className="flex gap-5 sm:gap-20">
          <TimeInput
            name="startTime"
            label="Event start time"
            value={form.startTime}
            onChange={handleChange}
            errorMessage={error.startTime}
            containerClassName="flex-1"
            disabled={!isEditable}
          />
          <TimeInput
            name="endTime"
            label="Event end time"
            value={form.endTime}
            onChange={handleChange}
            errorMessage={error.endTime}
            containerClassName="flex-1"
            disabled={!isEditable}
          />
        </div>
        <div className="flex gap-5 sm:gap-20">
          <DateInput
            label="Event start date"
            name="eventDate"
            value={form.startDate}
            onChange={handleChange}
            errorMessage={error.endDate}
            containerClassName="flex-1"
            disabled={!isEditable}
          />

          <DateInput
            label="Event end date"
            name="eventDate"
            value={form.endDate}
            onChange={handleChange}
            errorMessage={error.endDate}
            containerClassName="flex-1"
            disabled={!isEditable}
          />
        </div>
        {isEditable && (
          <div className="flex gap-5 sm:gap-20 !mt-16">
            <ButtonLoading
              className="!w-fit bg-gray-700 hover:bg-gray-700/80 text-white hover:text-white py-2.5 px-10"
              onClick={handleBack}>
              Cancel
            </ButtonLoading>

            <ButtonLoading className="!w-fit px-10">Save</ButtonLoading>
          </div>
        )}
      </form>
    </div>
  );
};

export default UpdateEvent;
