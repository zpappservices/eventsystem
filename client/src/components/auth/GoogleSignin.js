import React from "react";
import { FcGoogle } from "react-icons/fc";

const GoogleSignin = () => {
  const handleSocialLogin = (provider) => console.log(`${provider} login clicked`);

  return (
    <>
      <button
        type="button"
        onClick={() => handleSocialLogin("Google")}
        className="w-full flex justify-between items-center p-1 mt-4 font-medium text-black border border-black rounded transition-transform duration-200 ease-in-out hover:scale-[1.05]"
      >
        <FcGoogle className="text-xl" />
        <p className="mr-[25%]"> Continue with Google</p>
      </button>
    </>
  );
};

export default GoogleSignin;
