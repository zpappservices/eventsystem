import React, { useEffect, useState } from "react";
import { TextField } from "@mui/material";
import { ButtonLoading } from "../widgets/ButtonLoading";
import { useRouter } from "next/router";
import useApiRequest from "@/hooks/useApiRequest";
import { toast } from "react-toastify";
import useAuthToken from "@/hooks/useAuthToken";

const Onboarding = ({ next }) => {
  const { activeUser } = useAuthToken()
  const [formData, setFormData] = useState({
    userId: activeUser,
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
    company: "",
    jobTitle: "",
    website: "",
    photo: "",
  });

  const [errors, setErrors] = useState({});
  const router = useRouter();

  const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const validateForm = () => {
    const newErrors = {};
    if (!formData.firstName) newErrors.firstName = "First Name is required.";
    if (!formData.lastName) newErrors.lastName = "Last Name is required.";
    if (!formData.phone) newErrors.phone = "Phone Number is required.";
    if (!formData.email) {
      newErrors.email = "Email is required.";
    } else if (!validateEmail(formData.email)) {
      newErrors.email = "Invalid email format.";
    }
    if (!formData.company) newErrors.company = "Company is required.";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: "",
    }));
  };

  const filteredFormData = Object.fromEntries(
    Object.entries(formData).filter(([_, value]) => value != null && value !== "")
  );

  const { data, error, loading, request } = useApiRequest({
    method: "post",
    url: "user/create-vendor",
    data: filteredFormData,
    headers: null,
    useToken: true,
  });

  const createVendor = async () => {
    await request();
  };

  useEffect(() => {
    if (data?.statusCode >= 200 && data?.statusCode < 300) {
      toast.success(data?.message || "Vendor Profile created successfully!");
      
      next();
    } else if (data?.error || data?.message) {
      toast.error(
        data?.error || data?.message || "Couldn't Create Vendor Profile! Try again."
      );
    } else if (data?.statusCode >= 400 && data?.statusCode < 500) {
      toast.error(
        data?.error || data?.message || "Couldn't Create Vendor Profile! Try again."
      );
    }
  }, [data]);

  useEffect(() => {
    if (error) {
      toast.error("Unexpected error. Please try again!");
    }
  }, [error]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      createVendor();
    }
  };

  console.log(filteredFormData)

  return (
    <form
      onSubmit={handleSubmit}
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "20px",
        maxWidth: "400px",
        margin: "0 auto",
      }}
      className="w-full max-w-[440px] flex flex-col gap-5"
    >
      {[
        { id: "firstName", label: "First Name", type: "text", required: true },
        { id: "lastName", label: "Last Name", type: "text", required: true },
        {
          id: "phone",
          label: "Phone Number (International)",
          type: "text",
          required: true,
        },
        { id: "email", label: "Email", type: "email", required: true },
        { id: "company", label: "Company", type: "text", required: true },
        { id: "jobTitle", label: "Job Title", type: "text", required: false },
        { id: "website", label: "Website", type: "text", required: false },
      ].map((field) => (
        <div key={field.id} className="w-full">
          <TextField
            fullWidth
            id={field.id}
            label={field.label}
            variant="outlined"
            name={field.id}
            {...(field.required && { required: true })}
            value={formData[field.id]}
            onChange={handleChange}
            error={!!errors[field.id]}
            helperText={errors[field.id] || ""}
            sx={{
              "& .MuiOutlinedInput-root": {
                "& fieldset": {
                  borderColor: "#000000",
                },
                "&:hover fieldset": {
                  borderColor: "#FF7F50",
                },
                "&.Mui-focused fieldset": {
                  borderColor: "#FF7F50",
                },
              },
              "& .MuiInputLabel-root": {
                color: "#000000",
              },
              "& .MuiInputLabel-root.Mui-focused": {
                color: "#FF7F50",
              },
            }}
          />
        </div>
      ))}
      <ButtonLoading className="py-3.5 w-full" onClick={handleSubmit} isLoading={loading}>
        Proceed
      </ButtonLoading>
    </form>
  );
};

export default Onboarding;
