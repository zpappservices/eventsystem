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
import useLoading from "@/hooks/useLoading";
import { apiRequest } from "@/utils/apiService";
import { toast } from "react-toastify";
import { useRouter } from "next/router";
import { validateContact } from "@/utils/validation";

const UpdateContact = ({ event }) => {
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
      email: event?.EventContact[0]?.email || "",
      eventId: event?.id || "",
      phone: event?.EventContact[0]?.phone || "",
      facebook: event?.EventContact[0]?.facebook || "",
      instagram: event?.EventContact[0]?.instagram || "",
      twitter: event?.EventContact[0]?.twitter || "",
    }));

    setContactData((prev) => ({
      ...prev,
      email: event?.EventContact[0]?.email || "",
      eventId: event?.id || "",
      phone: event?.EventContact[0]?.phone || "",
      facebook: event?.EventContact[0]?.facebook || "",
      instagram: event?.EventContact[0]?.instagram || "",
      twitter: event?.EventContact[0]?.twitter || "",
    }));
  }, [event, activeUser]);

  const handleBack = (e) => {
    e.preventDefault();
    setIsEditable(false);
    if (contactData) {
      setForm(contactData);
    }
  };

  const updateEvent = async (e) => {
    e.preventDefault();
    if (!validateContact(form, setError)) return;

    startLoading();
    try {
      const data = await apiRequest(
        "post",
        `event/updatecontact/${event?.id}`,
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
      <form className="space-y-7">
        <TextInput
          name="email"
          label="Enter your email address"
          type="email"
          value={form.email}
          onChange={handleChange}
          placeholder="Enter email"
          errorMessage={error.email}
          required
          disabled={!isEditable}
        />
        <TextInput
          name="phone"
          label="Phone number"
          type="tel"
          value={form.phone}
          onChange={handleChange}
          placeholder="Enter your phone number"
          errorMessage={error.phone}
          required
          disabled={!isEditable}
        />
        <TextInput
          name="facebook"
          label="Facebook "
          type="text"
          value={form.facebook}
          onChange={handleChange}
          placeholder="Enter your facebook url"
          errorMessage={error.facebook}
          required
          disabled={!isEditable}
        />
        <TextInput
          name="instagram"
          label="Instagram"
          type="text"
          value={form.instagram}
          onChange={handleChange}
          placeholder="Enter your instagram url"
          errorMessage={error.instagram}
          required
          disabled={!isEditable}
        />
        <TextInput
          name="twitter"
          label="Twitter"
          type="text"
          value={form.twitter}
          onChange={handleChange}
          placeholder="Enter your twitter url"
          errorMessage={error.twitter}
          required
          disabled={!isEditable}
        />
        {isEditable && (
          <div className="flex gap-5 sm:gap-20 !mt-16">
            <ButtonLoading
              className="!w-fit bg-gray-700 hover:bg-gray-700/80 text-white hover:text-white py-2.5 px-10"
              onClick={handleBack}>
              Cancel
            </ButtonLoading>

            <ButtonLoading
              isLoading={isLoading}
              className="!w-fit px-10"
              onClick={updateEvent}>
              Save
            </ButtonLoading>
          </div>
        )}
      </form>
    </div>
  );
};

export default UpdateContact;
