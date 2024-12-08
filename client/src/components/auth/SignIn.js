import React, { useEffect, useState } from "react";
import { ButtonLoading } from "../widgets/ButtonLoading";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/config/firebase";
import useAuthToken from "@/hooks/useAuthToken";
import useApiRequest from "@/hooks/useApiRequest";
import axios from "axios";
import { toast } from "react-toastify";
import { useRouter } from "next/router";
import { apiRequest } from "@/utils/apiService";

const SignIn = ({ closeModal }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [key, setKey] = useState(null);

  const router = useRouter();

  const { storeUserToken } = useAuthToken();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage(""); // Reset error message on submit
    setKey(null);
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Regex for email validation

    if (!emailPattern.test(email)) {
      setErrorMessage("Please enter a valid email address or password.");
      return;
    }

    setIsLoading(true);

    try {
      const fbUser = await signInWithEmailAndPassword(auth, email, password);
      setKey(fbUser.user.accessToken);
    } catch (error) {
      toast.error("Invalid credentials");
    } finally {
      setIsLoading(false);
    }
  };
console.log(key)
  useEffect(() => {
    const signin = async () => {
      setIsLoading(true);
      try {
        const response = await apiRequest(
          "post",
          "auth/login",
          { email: email, password: password },
          false,
          null,
          key
        );

        const data = response;
        if (data?.statusCode >= 200 && data?.statusCode < 300) {
          toast.success("Signin Successful!");
          const id = data?.data?.existingUser?.id;
          storeUserToken(id, key, true);
          router.reload();
        } else if (data?.error || data?.message) {
          toast.error(data?.error || data?.message || "Operation failed!");
        } else if (data?.statusCode >= 400 && data?.statusCode < 500) {
          toast.error(data?.error || data?.message || "Operation failed!");
        }
      } catch (error) {
        toast.error("error");
        console.error(
          "Error:",
          error.response ? error.response.data : error.message
        );
      } finally {
        setIsLoading(false);
      }
    };

    if (key) signin();
  }, [key]);

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
        <button type="button" className="text-sm text-black self-end underline">
          Forgot password?
        </button>
        <ButtonLoading
          isLoading={isLoading}
          type="submit"
          className="w-[30%] self-center p-1 mt-3 font-medium bg-[#FF7F50] text-white rounded transition-transform duration-200 ease-in-out hover:scale-[1.05]"
        >
          Continue
        </ButtonLoading>
      </form>
    </>
  );
};

export default SignIn;
