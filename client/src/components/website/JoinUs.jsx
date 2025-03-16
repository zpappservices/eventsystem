import React, { useState } from "react";
import SignUpSignInModal from "../SignUpSignInModal";
import { useModal } from "@/hooks/useModal";
import Button from "../widgets/Button";

const JoinUs = () => {
  const [isLoginModal, setIsLoginModal] = useState(false);
  const { isOpen, closeModal, openModal, setIsOpen } = useModal();

  const handleLoginClick = () => {
    setIsLoginModal(true);
    openModal();
  };

  return (
    <div className="bg-sec100 p-5 !-mb-10">
      <div className="max-w-[1322px] mx-auto flex flex-col items-center">
        <p className="text-primary1000 uppercase font-bold text-[22px] sm:text-[40px] leading-normal">
          Join Us Today
        </p>

        <p className="text-primary1000 text-[14px] mt-2 text-center sm:text-[20px] font-medium leading-normal">
          Ready to take your business or service to the next level? Join
          Zafariplus today and unlock the potential of online exposure and
          digital support. Whether you're a local business looking to attract
          nearby customers or a global audience or a service looking for
          recognition, we're here to help you succeed.
        </p>

        <Button style="!px-5 !mt-[32px]" onClick={handleLoginClick}>
          Sign up
        </Button>
      </div>
      {isOpen && (
        <SignUpSignInModal
          isLoginModal={isLoginModal}
          setIsLoginModal={setIsLoginModal}
          setIsModalOpen={setIsOpen}
        />
      )}
    </div>
  );
};

export default JoinUs;
