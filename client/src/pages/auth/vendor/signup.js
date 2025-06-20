import GoogleSignin from "@/components/auth/GoogleSignin";
import StyledImage from "@/components/StyledImage";
import Button from "@/components/widgets/Button";
import { ButtonLoading } from "@/components/widgets/ButtonLoading";
import TextField from "@/components/widgets/TextField";
import useApiRequest from "@/hooks/useApiRequest";
import { storeCredentials } from "@/utils/token";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

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
      {" "}
      <div className="mx-auto py-10 px-5 flex justify-center items-center">
        <div className="w-full max-w-[500px] space-y-10">
          <div className="!mb-14">
            <Link href="/" className="!z-[1400]">
              <StyledImage
                src="/img/logo.svg"
                className="w-full sm:min-w-[150px] max-w-[200px] !z-30"
              />
            </Link>
            <div>
              <p className="text-[20px] sm:text-[32px] font-bold text-baseBlack text-center sm:text-left">
                Get Started
              </p>
              <p className="text-base sm:text-[20px] text-baseBlack text-center sm:text-left">
                Welcome to Zarafiplus - Let’s get started
              </p>
            </div>
          </div>

          <GoogleSignin />

          <form className="flex flex-col gap-4 my-3" onSubmit={handleSubmit}>
            <div className="flex flex-col">
              <TextField
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email address"
                error={error}
              />
            </div>

            <div className="flex flex-col">
              <TextField
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                error={error}
                password
              />
            </div>

            {errorMessage && (
              <p className="text-pink-500 text-xs">{errorMessage}</p>
            )}

            <div className="w-full mt-5">
              <Button isLoading={loading} style="w-full" type="submit">
                Sign up
              </Button>
              <p className="!text-baseBlack self-end text-sm sm:text-base mt-2 text-center">
                Already have a vendor account?{" "}
                <Link href="/auth/vendor/login" className="text-primary font-bold">
                  Log in
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default SignUp;
