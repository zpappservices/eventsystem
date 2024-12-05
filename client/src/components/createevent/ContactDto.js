import { useCreateEvent } from "@/context/CreateEventContext";
import TextField from "@mui/material/TextField";
import FormButton from "./FormButton";

function ContactDto({ handleNext, handleBack }) {
  const { formData, formError, setFormError, setFormData } = useCreateEvent();

  const fields = [
    {
      name: "email",
      label: "Email",
      type: "text",
      placeholder: "Enter your email",
      fullWidth: true,
    },
    {
      name: "facebook",
      label: "Facebook URL",
      type: "text",
      placeholder: "Enter your Facebook profile URL",
      fullWidth: true,
    },
    {
      name: "phone",
      label: "Phone Number",
      type: "text",
      placeholder: "Enter your phone number",
      fullWidth: false,
    },
  ];

  const validateForm = () => {
    const errors = {};
    if (
      !formData.contactDto.email ||
      !/\S+@\S+\.\S+/.test(formData.contactDto.email)
    )
      errors.email = "Enter a valid email address.";
    if (
      !!formData.contactDto.facebook &&
      !/^https?:\/\/(www\.)?facebook\.com\/.+$/.test(
        formData.contactDto.facebook
      )
    )
      errors.facebook = "Enter a valid Facebook URL.";
    if (
      !formData.contactDto.phone ||
      !/^\+?\d{11}$/.test(formData.contactDto.phone)
    )
      errors.phone = "Enter a valid phone number.";

    setFormError(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = () => {
    if (validateForm()) handleNext();
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      contactDto: { ...prevData.contactDto, [name]: value },
    }));
  };

  return (
    <>
      {fields.map((field) => (
        <div key={field.name} className="p-4">
          <h2 className="font-semibold pb-2">{field.label}</h2>
          <TextField
            sx={{ width: field.fullWidth ? "100%" : "30%" }}
            label={field.placeholder}
            name={field.name}
            value={formData.contactDto[field.name] || ""}
            onChange={handleChange}
            color="warning"
            error={!!formError[field.name]}
            helperText={formError[field.name] || ""}
          />
        </div>
      ))}

      <div className="flex justify-between">
        <FormButton
          handleAction={handleBack}
          position={"justify-start"}
          direction={"Back"}
        />

        <FormButton
          handleAction={handleSubmit}
          position={"justify-end"}
          direction={"Next"}
        />
      </div>
    </>
  );
}

export default ContactDto;
