import React from "react";
import Button from "../widgets/Button";
import DynamicModal from "../widgets/DynamicModal";
import HelpForm from "./HelpForm";
import { useModal } from "@/hooks/useModal";
import useLoading from "@/hooks/useLoading";

const HelpSupport = () => {
  const { isOpen, openModal, closeModal } = useModal();
  const { isLoading } = useLoading();
  return (
    <div className="w-full max-w-[433px] space-y-[30px]">
      <p className="text-baseBlack text-[20px] sm:text-[24px] font-bold text-center">
        Help & Support
      </p>
      <p className="text-baseBlack text-[14px] sm:text-[16px] text-center">
        Have questions complain or feature requests? let us know what we can do
        to improve Zafariplus. we will reply as soon as possible
      </p>

      <Button style="!mt-[50px] mx-auto" onClick={openModal}>Get in touch</Button>

      <DynamicModal
        open={isOpen}
        onClose={closeModal}
        disableBackdropClick={isLoading}>
        <HelpForm />
      </DynamicModal>
    </div>
  );
};

export default HelpSupport;
