import { useState } from "react";
import { IoIosCloseCircleOutline } from "react-icons/io";
import { FaApple, FaFacebook } from "react-icons/fa";
import SignUpSignInForm from "./SignUpSignInForm";
import SocialLogin from "./auth/SocialLogin";
import SignUp from "./auth/SignUp";
import GoogleSignin from "./auth/GoogleSignin";
import SignIn from "./auth/SignIn";

const SignUpSignInModal = ({
  isLoginModal,
  setIsLoginModal,
  setIsModalOpen,
}) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const resetFields = () => {
    setEmail("");
    setPassword("");
    setConfirmPassword("");
    setErrorMessage("");
    setShowPassword(false);
  };

  const closeModal = () => {
    resetFields();
    setIsModalOpen(false);
  };

  const toggleModalType = () => {
    setIsLoginModal((prev) => !prev);
    resetFields();
  };

  return (
    <>
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
        <div className="flex flex-col bg-white rounded-lg p-9 w-11/12 sm:w-[29rem] relative">
          <button
            type="button"
            onClick={closeModal}
            className="absolute top-6 right-7 text-gray-600 text-2xl"
            aria-label="Close modal"
          >
            <IoIosCloseCircleOutline className="transition-transform duration-200 ease-in-out hover:scale-[1.4] hover:text-[#FF7F50]" />
          </button>
          <h2 className="text-2xl font-bold mb-2">
            {isLoginModal ? "Sign in to your account" : "Create a new account"}
          </h2>
          <p className="text-sm mb-1">
            {isLoginModal
              ? "Don't have an account?"
              : "Already have an account?"}
            <button
              type="button"
              onClick={toggleModalType}
              className="text-black px-1 font-medium text-lg underline"
            >
              {isLoginModal ? "Sign Up" : "Sign In"}
            </button>
          </p>
          <GoogleSignin />

          {/*---------Sign Up and Sign In Form------------------------*/}
          {/* <SignUpSignInForm
            isLoginModal={isLoginModal}
            email={email}
            setEmail={setEmail}
            password={password}
            setPassword={setPassword}
            confirmPassword={confirmPassword}
            setConfirmPassword={setConfirmPassword}
            showPassword={showPassword}
            setShowPassword={setShowPassword}
            errorMessage={errorMessage}
            setErrorMessage={setErrorMessage}
            resetFields={resetFields}
            setIsModalOpen={setIsModalOpen}
          /> */}

          {isLoginModal ? (
            <SignIn />
          ) : (
            <SignUp />
          )}

          <SocialLogin />
        </div>
      </div>
    </>
  );
};

export default SignUpSignInModal;
