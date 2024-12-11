import OtpForm from "@/components/auth/Otp";
import { ButtonLoading } from "@/components/widgets/ButtonLoading";
import { apiRequest } from "@/utils/apiService";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { emailVerifySignIn } from "../api/emailverifyauth";
import { removeCredentials, retrieveCredentials } from "@/utils/token";
import useAuthToken from "@/hooks/useAuthToken";

const Verifyemail = () => {
  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();
  const { email } = router.query;

  const isComplete = otp.length === 6;

  const authData = retrieveCredentials();
  const { storeUserToken } = useAuthToken();

  const handleOtpChange = (otp) => {
    setOtp(otp);
  };

  const data = {
    email: email,
    otp: otp,
  };

  const resendOtp = async () => {
    setIsLoading(true);

    try {
      const response = await apiRequest(
        "get",
        `auth/resend-otp?email=${email}`
      );

      if (response?.statusCode >= 200 && response?.statusCode < 300) {
        toast.success("Email verification Code Sent!");
      } else if (response?.error || response?.message) {
        toast.error(
          response?.error || response?.message || "Operation failed!"
        );
      } else if (response?.statusCode >= 400 && response?.statusCode < 500) {
        toast.error(
          response?.error || response?.message || "Operation failed!"
        );
      }
    } catch (error) {
      toast.error("Operation failed!");
    } finally {
      setIsLoading(false);
    }
  };

  const signInUser = async () => {
    setIsLoading(true);
    try {
      const { accessToken, user } = await emailVerifySignIn(
        authData.email,
        authData.password,
        setIsLoading
      );
      const { id } = user.existingUser;
      toast.success("User Successfully Signed up");
      removeCredentials();
      storeUserToken(id, accessToken, true);
      router.push("/");
    } catch (error) {
      toast.error("There was an error");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setIsLoading(true);

    try {
      const response = await apiRequest("post", "auth/verify-email", data);

      if (response?.statusCode >= 200 && response?.statusCode < 300) {
        signInUser();
      } else if (response?.error || response?.message) {
        toast.error(
          response?.error || response?.message || "Operation failed!"
        );
      } else if (response?.statusCode >= 400 && response?.statusCode < 500) {
        toast.error(
          response?.error || response?.message || "Operation failed!"
        );
      }
    } catch (error) {
      toast.error("Operation failed! Check Otp and retry.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (email === undefined) return;

    if (!email) {
      router.push("/auth/signup");
    }
  }, [email]);

  return (
    <div className="h-screen flex justify-center items-center">
      <div className="flex flex-col items-center">
        <div className="w-full max-w-[577px] flex flex-col gap-5 items-center">
          <img src="/img/verify-email.svg" />
          <p className="text-center text-[18px] not-italic font-semibold leading-[140%] text-primary1000">
            Verify Email
          </p>
          <p className="text-center text-[20px] text-[#9DA9B3] not-italic font-normal leading-[140%]">
            A confirmation code has been sent to
            <span> {email}</span>
          </p>
        </div>
        <form onSubmit={handleSubmit}>
          <OtpForm onOtpChange={handleOtpChange} error={error} />
          {error && (
            <p className="text-[16px] text-center text-error">
              {Array.isArray(error.errors) &&
                error.errors.length > 0 &&
                error.errors[0].message}
            </p>
          )}
          <p
            className="text-center underline underline-offset-2 cursor-pointer"
            onClick={resendOtp}>
            Resend otp
          </p>
          <ButtonLoading
            disabled={!isComplete}
            isLoading={isLoading}
            className="mx-auto py-3 w-fit px-5 font-medium mt-[50px]">
            Verify email
          </ButtonLoading>
        </form>
      </div>
    </div>
  );
};

export default Verifyemail;
