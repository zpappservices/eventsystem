import OtpForm from "@/components/auth/Otp";
import { ButtonLoading } from "@/components/widgets/ButtonLoading";
import { apiRequest } from "@/utils/apiService";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { emailVerifySignIn } from "../api/emailverifyauth";
import { removeCredentials, retrieveCredentials } from "@/utils/token";
import useAuthToken from "@/hooks/useAuthToken";
import Layout from "@/components/auth/Layout";
import Button from "@/components/widgets/Button";

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
      router.push("/auth/role");
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
    <Layout img="/img/verify-email.png">
      <div className="flex justify-center items-center">
        <div className="flex flex-col items-center">
          <div className="w-full max-w-[493px] flex flex-col gap-3 items-center">
            <img src="/img/verify-email.svg" />
            <p className="text-center text-xl sm:text-[40px] not-italic font-bold leading-[140%] text-primary1000">
              Check your email for code
            </p>
            <p className="text-center text-sm text-baseBlack not-italic font-normal leading-[140%]">
              We have a 6 digit code sent to
              <span> {email}</span>. The code expires shortly so please enter it
              soon
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
            <Button
              style="w-full"
              disabled={!isComplete}
              isLoading={isLoading}
              className="mx-auto py-3 w-fit px-5 font-medium mt-[50px]"
            >
              Verify email
            </Button>
            <p className="text-sm text-center mx-auto mt-1.5">
              Didn’t receive an email?{" "}
              <span
                className="text-center text-baseBlack/70 underline underline-offset-2 font-bold cursor-pointer"
                onClick={resendOtp}
              >
                Resend
              </span>
            </p>
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default Verifyemail;
