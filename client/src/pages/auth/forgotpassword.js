import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import useLoading from "@/hooks/useLoading";
import { toast } from "react-toastify";
import StyledImage from "@/components/StyledImage";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "@/config/firebase";
import Button from "@/components/widgets/Button";
import TextField from "@/components/widgets/TextField";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [errors, setErrors] = useState({});
  const [emailComplete, setEmailComplete] = useState(false);
  const router = useRouter();

  const { isLoading, startLoading, stopLoading } = useLoading();

  const handleInputChange = (event) => {
    const { value } = event.target;

    setEmail(value);
  };

  const checkInputs = () => {
    let error = {};
    if (!/[@.]/.test(email)) {
      error.email = "Invalid email address";
    } else {
      error.email = "";
    }

    setErrors((prev) => ({
      ...prev,
      ...error,
    }));

    const hasErrors = Object.values(error).some((error) => error);

    if (hasErrors) {
      return false;
    } else {
      return true;
    }
  };

  const checkComplete = () => {
    if (!email) {
      setEmailComplete(false);
    } else {
      setEmailComplete(true);
    }
  };

  const forgotPassword = async () => {
    startLoading();

    try {
      await sendPasswordResetEmail(auth, email);
      setEmail("")
      toast.success("Password reset link sent! Check your inbox.");
    } catch (error) {
      if (error.code === "auth/user-not-found") {
        toast.error("No user found with that email.");
      } else {
        toast.error("Failed to send reset email. Try again.");
      }
    } finally {
      stopLoading();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (checkInputs()) {
      forgotPassword();
    }
  };

  useEffect(() => {
    checkComplete();
  }, [email]);

  return (
    <div className="w-full min-h-screen flex items-center justify-center">
      <div className="w-full max-w-[450px] flex items-center justify-center px-3 py-10 pt-24 lg:pt-10 mx-auto lg:mx-0">
        <div className="w-full bg-white p-3 sm:p-10 rounded-xl">
          <Link href="/" className="ms-[40px]">
            <StyledImage
              src="/img/zafariplus-logo-black.png"
              className="w-full max-w-[10px] scale-[12] mx-auto hover:scale-[13.2] duration-300"
            />
          </Link>
          <h2 className="text-[32px] font-semibold text-[#0B2253] text-center mt-12">
            Forgot Password
          </h2>
          <p className="text-[14px] text-[#6D7A98] text-center">
            Enter your email address to reset password
          </p>
          <hr className="mt-5" />
          <form className="mt-5" onSubmit={handleSubmit}>
            <div className="w-full flex flex-col gap-y-6">
              <TextField
                value={email}
                label="Email"
                passwordToggleClass="!top-10"
                onChange={(e) => setEmail(e.target.value)}
              />

              <Button
                isLoading={isLoading}
                className="rounded-[5px] duration-300"
                disabled={!emailComplete || isLoading}
              >
                {isLoading ? (
                  <div className="flex items-center justify-center">
                    <span className="loading loading-spinner"></span>
                  </div>
                ) : (
                  "Proceed"
                )}
              </Button>
            </div>
          </form>
          <p className="text-[15px] text-[#81909D] text-center mt-3">
            <span className="text-custard500 underline">
              <Link href="/">Back To Login</Link>
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
