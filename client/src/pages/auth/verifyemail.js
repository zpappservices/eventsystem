import OtpForm from "@/components/auth/Otp";
import { ButtonLoading } from "@/components/widgets/ButtonLoading";
import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

const Verifyemail = () => {
  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();
  const { email } = router.query;

  const isComplete = otp.length === 6;

  const handleOtpChange = (otp) => {
    setOtp(otp);
  };

  const data = {
    email: email,
    otp: otp,
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setIsLoading(true);

    try {
      const response = await axios.post(
         "http://34.171.52.201:4000/api/auth/verify-email",
         data
       );
   
       if (response?.data?.statusCode >= 200 && response?.data?.statusCode < 300) {
         toast.success("Verification Successful! Login to continue");
         router.push("/");
       } else if (response?.data?.error || response?.data?.message) {
         toast.error(response?.data?.error || response?.data?.message || "Operation failed!");
       } else if (response?.data?.statusCode >= 400 && response?.data?.statusCode < 500) {
         toast.error(response?.data?.error || response?.data?.message || "Operation failed!");
       }
    } catch (error) {
      toast.error("Operation failed! Check Otp and retry.")
      console.log(error);
    } finally {
      setIsLoading(true);
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
          <ButtonLoading
            disabled={!isComplete}
            isLoading={isLoading}
            className="mx-auto py-3 w-fit px-5 font-medium"
          >
            Verify email
          </ButtonLoading>
        </form>
      </div>
    </div>
  );
};

export default Verifyemail;
