import React, { useEffect } from "react";
import Button from "../Button";
import useAuthToken from "@/hooks/useAuthToken";
import useApiRequest from "@/hooks/useApiRequest";
import { CircularProgress } from "@mui/material";
import { useModal } from "@/hooks/useModal";
import Modal from "../widgets/Modal";
import SubAccount from "../auth/SubAccount";
import DynamicModal from "../widgets/DynamicModal";

const BankAccount = () => {
  const { activeUser, token } = useAuthToken();
  const { data, request, error, loading } = useApiRequest({
    method: "get",
    url: `payment/get-vendor-account/${activeUser}`,
    data: null,
    headers: {},
    useToken: true,
  });

  const { closeModal, isOpen, openModal } = useModal();

  const getBankAccount = async () => {
    await request();
  };

  useEffect(() => {
    getBankAccount();
  }, []);

  if (loading)
    return (
      <div className="h-[200px] flex items-center justify-center">
        <CircularProgress color="#FF7F50" />
      </div>
    );

  const account = data?.data;
  return (
    <div>
      {/* 
      <p className="text-[16px] leading-[20px]">Manage your bank account</p> */}
      {data?.data && (
        <div className="py-5">
          <div className="">
            <p>
              Account Name:{" "}
              <span className="font-medium">{account?.accountName}</span>
            </p>
            <p>
              Bank Name:{" "}
              <span className="font-medium">{account?.bankName}</span>
            </p>
            <p>
              Account Number:{" "}
              <span className="font-medium">{account?.accountNumber}</span>
            </p>
            <p>
              Currency: <span className="font-medium">{account?.currency}</span>
            </p>
          </div>
        </div>
      )}
      {!data?.data && (
        <div className="max-w-[461px] flex flex-col items-center mx-auto gap-2 mt-6">
          <p>No bank account found</p>
          <Button onClick={openModal}>Add Payout Bank Account</Button>
        </div>
      )}

      <DynamicModal
        open={isOpen}
        disableBackdropClick={true}
        style={{ bgcolor: "white", paddingY: "50px" }}
        onClose={closeModal}>
        <SubAccount isDashboard={true} onClose={closeModal}/>
      </DynamicModal>
    </div>
  );
};

export default BankAccount;
