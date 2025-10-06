import React, { useEffect, useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/config/firebase";
import useAuthToken from "@/hooks/useAuthToken";
import { toast } from "react-toastify";
import { useRouter } from "next/router";
import { apiRequest } from "@/utils/apiService";
import Link from "next/link";
import TextField from "../widgets/TextField";
import Button from "../widgets/Button";

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
      const token = await fbUser.user.getIdToken();
      setKey(fbUser.user.accessToken);
    } catch (error) {
      toast.error(error.code || "Invalid credentials");
    } finally {
      setIsLoading(false);
    }
  };

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
        console.log(data);
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
        toast.error(
          error?.response?.data?.message ||
            "There was an error processing your request"
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
          <TextField
            value={email}
            label="Email"
            passwordToggleClass="!top-10"
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="flex flex-col">
          <TextField
            value={password}
            password
            label="Password"
            passwordToggleClass="!top-10"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        {errorMessage && (
          <p className="text-pink-500 text-xs">{errorMessage}</p>
        )}
        <Link
          href="/auth/forgotpassword"
          className="!text-gray-600 self-end text-[14px]"
        >
          Forgot password?
        </Link>
        <Button isLoading={isLoading} className="!mt-5">Continue</Button>
      </form>
    </>
  );
};

export default SignIn;
