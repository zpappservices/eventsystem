import React from "react";
import Button from "../widgets/Button";
import DynamicModal from "../widgets/DynamicModal";
import SalesTeamForm from "./SalesTeamForm";
import { useModal } from "@/hooks/useModal";
import useLoading from "@/hooks/useLoading";

const ContactSales = () => {
  const { isOpen, openModal, closeModal } = useModal();
  const { isLoading } = useLoading();
  return (
    <div className="w-full max-w-[433px] space-y-[30px]">
      <p className="text-baseBlack text-[20px] sm:text-[24px] font-bold text-center">
        Contact Sales
      </p>
      <p className="text-baseBlack text-[14px] sm:text-[16px] text-center">
        Connect with our sales team to talk about pricing, becoming an organizer
        or to request a demo
      </p>

      <Button style="!mt-[50px] mx-auto" onClick={openModal}>Contact sales</Button>

      <DynamicModal open={isOpen} onClose={closeModal} disableBackdropClick={isLoading}>
        <SalesTeamForm />
      </DynamicModal>
    </div>
  );
};

export default ContactSales;
