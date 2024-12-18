import React, { useEffect, useState } from "react";
import { FormControl, MenuItem, TextField } from "@mui/material";
import { ButtonLoading } from "../widgets/ButtonLoading";
import { useRouter } from "next/router";
import useApiRequest from "@/hooks/useApiRequest";
import { toast } from "react-toastify";
import useAuthToken from "@/hooks/useAuthToken";

const SubAccount = ({ isDashboard, onClose }) => {
  const { activeUser } = useAuthToken();
  const [formData, setFormData] = useState({
    business_name: "",
    settlement_bank: "",
    account_number: "",
    userId: activeUser,
  });

  const [errors, setErrors] = useState({});
  const router = useRouter();

  const validateForm = () => {
    const newErrors = {};

    if (!formData.business_name.trim()) {
      newErrors.business_name = "Business Name is required.";
    }

    if (!formData.settlement_bank) {
      newErrors.settlement_bank = "Settlement Bank is required.";
    }

    if (!formData.account_number.trim()) {
      newErrors.account_number = "Account Number is required.";
    } else if (!/^\d+$/.test(formData.account_number)) {
      newErrors.account_number = "Account Number must contain only numbers.";
    } else if (formData.account_number.length < 10) {
      newErrors.account_number = "Account Number must be at least 10 digits.";
    }

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

  const { data, error, loading, request } = useApiRequest({
    method: "post",
    url: "payment/create-subaccount",
    data: formData,
    headers: null,
    useToken: true,
  });

  const createSubAccount = async () => {
    await request();
  };

  const {
    data: banksData,
    error: banksError,
    loading: banksLoading,
    request: banksRequest,
  } = useApiRequest({
    method: "get",
    url: "payment/getallbank",
    data: null,
    headers: null,
    useToken: true,
  });

  const getBankList = async () => {
    await banksRequest();
  };

  const handleSelect = (e) => {
    const { value } = e.target;
    const selectedBank = banksData?.data?.find((bank) => bank.code === value);
    if (selectedBank) {
      setFormData((prevState) => ({
        ...prevState,
        settlement_bank: selectedBank.code,
      }));
    } else {
    }
  };

  useEffect(() => {
    getBankList();
    if (data?.statusCode >= 200 && data?.statusCode < 300) {
      toast.success(data?.message || "Account created successfully!");

      router.push("/dashboard");
    } else if (data?.error || data?.message) {
      toast.error(
        data?.error || data?.message || "Couldn't create account! Try again."
      );
    } else if (data?.statusCode >= 400 && data?.statusCode < 500) {
      toast.error(
        data?.error || data?.message || "Couldn't create account! Try again."
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
      createSubAccount();
    }
  };

  const fields = [
    {
      id: "business_name",
      label: "Business Name",
      type: "text",
      required: true,
    },
    {
      id: "settlement_bank",
      label: "Settlement Bank",
      type: "select",
      required: true,
      options: banksData?.data,
    },
    {
      id: "account_number",
      label: "Account Number",
      type: "text",
      required: true,
    },
  ];

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
      className="w-full max-w-[440px] flex flex-col gap-5">
      {fields?.map((field) =>
        field.type === "select" ? (
          <FormControl fullWidth key={field.id}>
            <TextField
              key={field.id}
              id={field.id}
              select
              label={field.label}
              name={field.id}
              value={formData[field.id]}
              onChange={handleSelect}
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
              SelectProps={{
                MenuProps: {
                  PaperProps: {
                    style: {
                      maxHeight: 250,
                    },
                  },
                },
              }}>
              {field?.options?.length > 0 &&
                field?.options?.map((option) => (
                  <MenuItem key={option.id} value={option.code}>
                    {option.name}
                  </MenuItem>
                ))}
            </TextField>
          </FormControl>
        ) : (
          <TextField
            key={field.id}
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
        )
      )}
      <div className="flex gap-5">
        {isDashboard && (
          <ButtonLoading
            className="py-3.5 w-full flex-1 bg-gray-600"
            onClick={onClose}
            isLoading={loading}>
            Back
          </ButtonLoading>
        )}
        <ButtonLoading
          className="py-3.5 w-full flex-1"
          onClick={handleSubmit}
          isLoading={loading}>
          Proceed
        </ButtonLoading>
      </div>
    </form>
  );
};

export default SubAccount;
