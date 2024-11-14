import { useState } from "react";
import { IoIosCloseCircleOutline } from "react-icons/io";
import { FcGoogle } from "react-icons/fc";
import { FaApple, FaFacebook } from "react-icons/fa";
import SignUpSignInForm from "./SignUpSignInForm";

const SignUpSignInModal = ({ isLoginModal, setIsLoginModal, setIsModalOpen }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleSocialLogin = (provider) => console.log(`${provider} login clicked`);

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
            {isLoginModal ? "Don't have an account?" : "Already have an account?"}
            <button
              type="button"
              onClick={toggleModalType}
              className="text-black px-1 font-medium text-lg underline"
            >
              {isLoginModal ? "Sign Up" : "Sign In"}
            </button>
          </p>
          <button
            type="button"
            onClick={() => handleSocialLogin("Google")}
            className="w-full flex justify-between items-center p-1 mt-4 font-medium text-black border border-black rounded transition-transform duration-200 ease-in-out hover:scale-[1.05]"
          >
            <FcGoogle className="text-xl" />
            <p className="mr-[25%]"> Continue with Google</p>
          </button>

          {/*---------Sign Up and Sign In Form------------------------*/}
          <SignUpSignInForm
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
          />

          <p className="text-gray-500 text-lg self-center my-3 font-medium">OR</p>

          <div className="flex gap-10">
            <button
              type="button"
              onClick={() => handleSocialLogin("Apple")}
              className="w-1/2 flex justify-between items-center p-1 mt-4 font-medium text-black border border-black rounded transition-transform duration-200 ease-in-out hover:scale-[1.05]"
            >
              <FaApple className="text-xl" />
              <p className="mr-[25%]">Apple</p>
            </button>

            <button
              type="button"
              onClick={() => handleSocialLogin("Facebook")}
              className="w-1/2 flex justify-between items-center p-1 mt-4 font-medium text-black border border-black rounded transition-transform duration-200 ease-in-out hover:scale-[1.05]"
            >
              <FaFacebook className="text-xl" />
              <p className="mr-[6%] sm:mr-[15%] md:mr-[20%]">Facebook</p>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default SignUpSignInModal;
