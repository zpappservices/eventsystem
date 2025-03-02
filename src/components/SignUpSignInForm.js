import { auth } from "@/config/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { ButtonLoading } from "./widgets/ButtonLoading";
import axios from "axios";
import { useState } from "react";

const SignUpSignInForm = ({
  isLoginModal,
  email,
  setEmail,
  password,
  setPassword,
  confirmPassword,
  setConfirmPassword,
  showPassword,
  setShowPassword,
  resetFields,
  setIsModalOpen,
  errorMessage,
  setErrorMessage,
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage(""); // Reset error message on submit
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Regex for email validation

    if (!emailPattern.test(email)) {
      setErrorMessage("Please enter a valid email address or password.");
      return;
    }

    if (!isLoginModal) {
      if (password !== confirmPassword) {
        setErrorMessage("Passwords do not match!");
        return;
      }
      //   console.log({ email, password });
      // } else {
      //   console.log({ email, password });
    }
    resetFields(); /* 
    setIsModalOpen(false); */

    if (isLoginModal) {
      setIsLoading(true);
      try {
        const fbUser = await signInWithEmailAndPassword(auth, email, password);
        console.log(fbUser?.user.accessToken);
      } catch (error) {
        console.log(error.message, error.code);
      } finally {
        setIsLoading(false);
      }
    } else {
      setIsLoading(true);
      try {
        const response = await axios.post(
          "http://34.171.52.201:4000/api/auth/signup"
        );
        console.log(response.data);
      } catch (error) {
        console.log(error);
        <Toast
          message="Item added to cart"
          duration={5000}
          actionLabel="UNDO"
          onActionClick={() => console.log("Undo clicked")}
          position={{ vertical: "top", horizontal: "right" }}
        />;
      } finally {
        setIsLoading(false);
      }
    }
  };

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
        {!isLoginModal && (
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
        )}
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
          {isLoginModal ? "Forgot password?" : ""}
        </button>
        <ButtonLoading
          disabled={isLoading}
          type="submit"
          className="w-[30%] self-center p-1 mt-3 font-medium bg-[#FF7F50] text-white rounded transition-transform duration-200 ease-in-out hover:scale-[1.05]"
        >
          {isLoginModal ? "Continue" : "Submit"}
        </ButtonLoading>
      </form>
    </>
  );
};

export default SignUpSignInForm;
