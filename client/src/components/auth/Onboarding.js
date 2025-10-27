import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import useApiRequest from "@/hooks/useApiRequest";
import { toast } from "react-toastify";
import useAuthToken from "@/hooks/useAuthToken";
import TextField from "../widgets/TextField";
import Button from "../widgets/Button";

const Onboarding = ({ next }) => {
  const { activeUser } = useAuthToken();
  const [formData, setFormData] = useState({
    userId: activeUser,
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
    company: "",
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
    Object.entries(formData).filter(
      ([_, value]) => value != null && value !== ""
    )
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
        data?.error ||
          data?.message ||
          "Couldn't Create Vendor Profile! Try again."
      );
    } else if (data?.statusCode >= 400 && data?.statusCode < 500) {
      toast.error(
        data?.error ||
          data?.message ||
          "Couldn't Create Vendor Profile! Try again."
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

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full max-w-[500px] flex flex-col gap-3"
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
        { id: "website", label: "Website", type: "text", required: false },
      ].map((field) => (
        <div key={field.id} className="w-full">
          <TextField
            id={field.id}
            label={field.label}
            name={field.id}
            {...(field.required && { required: true })}
            value={formData[field.id]}
            onChange={handleChange}
            error={!!errors[field.id]}
          />
        </div>
      ))}

      <Button
        className="py-3.5 w-full !mt-10"
        onClick={handleSubmit}
        isLoading={loading}
      >
        Proceed
      </Button>
    </form>
  );
};

export default Onboarding;
