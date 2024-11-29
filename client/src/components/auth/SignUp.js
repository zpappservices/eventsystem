import React, { useEffect, useState } from "react";
import { ButtonLoading } from "../widgets/ButtonLoading";
import { toast } from "react-toastify";
import { useRouter } from "next/router";
import axios from "axios";
import useApiRequest from "@/hooks/useApiRequest";

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
    /* resetFields(); 
    setIsModalOpen(false); */

    console.log({ email: email, password: password })

    await request();
  };

  useEffect(() => {
    if (data?.statusCode >= 200 && data?.statusCode < 300) {
      toast.success("Email verification Code Sent!");
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
    const err = error?.response?.data
    if (error) {
        toast.error(err?.message[0] || err?.error || "Operation failed! Retry.");
        console.log(err)
    }
  }, [error]);

  return (
    <>
      <form className="flex flex-col gap-4 my-3" onSubmit={handleSubmit}>
        <div className="flex flex-col">
          <label className="text-xs mb-1">Email</label>
          <input
            type="email"
            className={`p-1 border-2 rounded focus:outline-none ${
              errorMessage === "Please enter a valid email address or password."
                ? "focus:border-pink-500 focus:ring-pink-500/30 focus:ring border-pink-500"
                : "focus:border-[#FFC8A0] focus:ring-[#FFC8A0]/30 focus:ring border-gray-300"
            }`}
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="flex flex-col">
          <label className="text-xs mb-1">Password</label>
          <input
            type={showPassword ? "text" : "password"}
            className={`p-1 border-2 rounded focus:outline-none ${
              errorMessage === "Passwords do not match!"
                ? "focus:border-pink-500 focus:ring-pink-500/30 focus:ring border-pink-500"
                : "focus:border-[#FFC8A0] focus:ring-[#FFC8A0]/30 focus:ring border-gray-300"
            }`}
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="flex flex-col">
          <label className="text-xs mb-1">Confirm Password</label>
          <input
            type={showPassword ? "text" : "password"}
            className={`p-1 border-2 rounded focus:outline-none ${
              errorMessage === "Passwords do not match!"
                ? "focus:border-pink-500 focus:ring-pink-500/30 focus:ring border-pink-500"
                : "focus:border-[#FFC8A0] focus:ring-[#FFC8A0]/30 focus:ring border-gray-300"
            }`}
            required
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </div>
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

        <ButtonLoading
          isLoading={loading}
          type="submit"
          className="w-[30%] self-center p-1 mt-3 font-medium bg-[#FF7F50] text-white rounded transition-transform duration-200 ease-in-out hover:scale-[1.05]"
        >
          Submit
        </ButtonLoading>
      </form>
    </>
  );
};

export default SignUp;
