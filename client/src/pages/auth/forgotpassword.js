import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import useLoading from "@/hooks/useLoading";
import { ButtonLoading } from "@/components/widgets/ButtonLoading";
import { apiRequest } from "@/utils/apiService";
import { toast } from "react-toastify";

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
      const response = await apiRequest(
        "post",
        "auth/forgotpassword",
        { email: email },
        false
      );

      const data = response;
      console.log(data);
      if (data?.statusCode >= 200 && data?.statusCode < 300) {
        toast.success(
          "Password reset link sent successfully! Please check your email to reset your password."
        );
      } else if (data?.message == "Operation fail!") {
        toast.error("Email not found!");
      } else if (data?.error || data?.message) {
        toast.error(data?.error || data?.message || "Forgot password failed!");
      } else if (data?.statusCode >= 400 && data?.statusCode < 500) {
        toast.error(data?.error || data?.message || "Forgot password failed!");
      }
    } catch (error) {
      toast.error("error");
      console.error(
        "Error:",
        error.response ? error.response.data : error.message
      );
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
      <div className="max-w-[450px] flex items-center justify-center px-3 py-10 pt-24 lg:pt-10 mx-auto lg:mx-0">
        <div className="w-full bg-white p-3 sm:p-10 rounded-xl">
          <Link href="/">
            <p className="text-gray-800 font-bold text-center text-[20px]">
              Zafariplus
            </p>
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
              <div className="relative">
                <label className="text-[15px] text-[#81909D]">
                  Email Address
                </label>
                <input
                  type="text"
                  name="email"
                  value={email}
                  onChange={handleInputChange}
                  className={`${
                    errors.email && "border-1 border-[#CA1B1B]"
                  } input mt-1 w-full border border-gray-300 py-2.5 p-5 rounded-[8px] focus:outline-none focus:border-apple500 focus:border-1 text-[16px] text-apple900 placeholder:text-apple900`}
                />
                <span className="text-[12px] text-[#CA1B1B] absolute bottom-[-19px] left-0">
                  {errors.email}
                </span>
              </div>
              <ButtonLoading
                isLoading={isLoading}
                className="rounded-[5px] duration-300"
                disabled={!emailComplete || isLoading}>
                {isLoading ? (
                  <div className="flex items-center justify-center">
                    <span className="loading loading-spinner"></span>
                  </div>
                ) : (
                  "Proceed"
                )}
              </ButtonLoading>
            </div>
          </form>
          <p className="text-[15px] text-[#81909D] text-center mt-3">
            <span className="text-custard500 underline">
              <Link href="/auth/signin">Back To Login</Link>
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
