import React, { useEffect, useState } from "react";
import { ButtonLoading } from "../widgets/ButtonLoading";
import { toast } from "react-toastify";
import { useRouter } from "next/router";
import axios from "axios";
import useApiRequest from "@/hooks/useApiRequest";
import { storeCredentials } from "@/utils/token";
import TextField from "../widgets/TextField";
import Button from "../widgets/Button";

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const router = useRouter();

  const resetFields = () => {
    setEmail("");
    setPassword("");
    setConfirmPassword("");
    setErrorMessage("");
    setShowPassword(false);
  };

  const { data, error, loading, request } = useApiRequest({
    method: "post",
    url: "auth/signup",
    data: { email: email, password: password },
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage(""); // Reset error message on submit
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Regex for email validation

    if (!emailPattern.test(email)) {
      setErrorMessage("Please enter a valid email address or password.");
      return;
    }

    if (password !== confirmPassword) {
      setErrorMessage("Passwords do not match!");
      return;
    }

    await request();
  };

  useEffect(() => {
    if (data?.statusCode >= 200 && data?.statusCode < 300) {
      toast.success("Email verification Code Sent!");
      storeCredentials(email, password);
      router.push({
        pathname: "/auth/verifyemail",
        query: { email: email },
      });
    } else if (data?.error || data?.message) {
      toast.error(data?.error || data?.message || "Operation failed!");
    } else if (data?.statusCode >= 400 && data?.statusCode < 500) {
      toast.error(data?.error || data?.message || "Operation failed!");
    }
  }, [data]);

  useEffect(() => {
    const err = error?.response?.data;
    if (error) {
      toast.error(err?.message[0] || err?.error || "Operation failed! Retry.");
    }
  }, [error]);

  return (
    <>
      <form className="flex flex-col gap-4 my-3" onSubmit={handleSubmit}>
        <TextField
          type="email"
          label="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          error={
            errorMessage === "Please enter a valid email address or password."
              ? errorMessage
              : null
          }
          passwordToggleClass="!top-10"
        />

        <TextField
          value={password}
          password
          label="Password"
          passwordToggleClass="!top-10"
          onChange={(e) => setPassword(e.target.value)}
          error={
            errorMessage === "Passwords do not match!" ? errorMessage : null
          }
        />

        <TextField
          value={confirmPassword}
          password
          label="Password"
          passwordToggleClass="!top-10"
          onChange={(e) => setConfirmPassword(e.target.value)}
          error={
            errorMessage === "Passwords do not match!" ? errorMessage : null
          }
        />

        {errorMessage && (
          <p className="text-pink-500 text-xs">{errorMessage}</p>
        )}

        <label className="text-sm flex items-center w-[35%] cursor-pointer">
          <input
            type="checkbox"
            checked={showPassword}
            onChange={() => setShowPassword((prev) => !prev)}
            className="mr-2"
          />
          Show Password
        </label>

        <Button
          isLoading={loading}
        >
          Submit
        </Button>
      </form>
    </>
  );
};

export default SignUp;
