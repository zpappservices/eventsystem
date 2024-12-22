import GoogleSignin from "@/components/auth/GoogleSignin";
import StyledImage from "@/components/StyledImage";
import { ButtonLoading } from "@/components/widgets/ButtonLoading";
import { auth } from "@/config/firebase";
import useAuthToken from "@/hooks/useAuthToken";
import { apiRequest } from "@/utils/apiService";
import { signInWithEmailAndPassword } from "firebase/auth";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

const Login = ({ closeModal }) => {
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
        if (data?.statusCode >= 200 && data?.statusCode < 300) {
          if (data?.data?.existingUser?.role === "USER") {
            toast.error("Account is not a vendor account");
            return;
          }
          toast.success("Signin Successful!");
          const id = data?.data?.existingUser?.id;
          storeUserToken(id, key, true);
          router.push("/dashboard");
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
    <div className="mx-auto py-10 px-5 min-h-screen flex justify-center items-center">
      <div className="w-full max-w-[500px]">
        <div>
          <Link href="/" className="ms-[40px]">
            <StyledImage
              src="/img/zafariplus-logo-black.png"
              className="w-full max-w-[10px] scale-[12] mx-auto hover:scale-[13.2] duration-300"
            />
          </Link>
          <h2 className="text-[32px] font-semibold text-[#0B2253] text-center mt-12">
            Signin
          </h2>
        </div>
        <GoogleSignin />
        <form className="flex flex-col gap-4 my-3 mt-5" onSubmit={handleSubmit}>
          <div className="flex flex-col">
            <label className="text-xs mb-1">Email</label>
            <input
              type="email"
              className={`p-1 py-2.5 border-2 rounded-[8px] focus:outline-none ${
                errorMessage ===
                "Please enter a valid email address or password."
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
              className={`p-1 py-2.5 border-2 rounded-[8px] focus:outline-none ${
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
          <label className="text-sm flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={showPassword}
              onChange={() => setShowPassword((prev) => !prev)}
              className="mr-2"
            />
            Show Password
          </label>
          <Link
            href="/auth/forgotpassword"
            className="!text-gray-600 self-end text-[14px]">
            Forgot password?
          </Link>
          <ButtonLoading
            isLoading={isLoading}
            type="submit"
            className="w-full self-center p-1 py-2.5 mt-3 font-medium bg-[#FF7F50] text-white rounded transition-transform duration-200 ease-in-out hover:scale-[1.05]">
            Continue
          </ButtonLoading>
        </form>
        <p className="!text-gray-600 self-end text-[14px] text-center">
          Don't have a vendor account?{" "}
          <Link href="/auth/vendor/signup" className="text-[#FF7F50]">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
