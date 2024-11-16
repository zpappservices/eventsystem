import React from "react";
import { FaApple, FaFacebook } from "react-icons/fa";

const SocialLogin = () => {
  return (
    <div>
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
          className="w-1/2 flex justify-between items-center p-1 mt-4 font-medium  border border-black rounded transition-transform duration-200 ease-in-out hover:scale-[1.05]"
        >
          <FaFacebook className="text-xl" color="#1877F2"/>
          <p className="mr-[6%] sm:mr-[15%] md:mr-[20%] text-black">Facebook</p>
        </button>
      </div>
    </div>
  );
};

export default SocialLogin;
