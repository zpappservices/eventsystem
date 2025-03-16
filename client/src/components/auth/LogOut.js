import React from "react";
import Button from "../Button";
import { useModal } from "@/hooks/useModal";
import StyledImage from "../StyledImage";
import useApiRequest from "@/hooks/useApiRequest";
import useAuthToken from "@/hooks/useAuthToken";
import { apiRequest } from "@/utils/apiService";
import { useRouter } from "next/router";
import useLoading from "@/hooks/useLoading";
import { ButtonLoading } from "../widgets/ButtonLoading";
import { toast } from "react-toastify";

const LogOut = ({ children, container }) => {
  const { isOpen, closeModal, openModal } = useModal();
  const { activeUser, clearUserToken } = useAuthToken();
  const router = useRouter();

  const { startLoading, stopLoading, isLoading } = useLoading();

  const signOut = async () => {
    startLoading();
    try {
      const response = await apiRequest(
        "post",
        "auth/signout",
        { userId: activeUser },
        true,
        null
      );

      const data = response;
      if (data?.statusCode >= 200 && data?.statusCode < 300) {
        toast.success("Logout Successful!");
        clearUserToken();
        closeModal();
        router.reload();
      } else if (data?.error || data?.message) {
        toast.error(data?.error || data?.message || "Logout failed!");
      } else if (data?.statusCode >= 400 && data?.statusCode < 500) {
        toast.error(data?.error || data?.message || "Logout failed!");
      }
    } catch (error) {
      toast.error("error");
    } finally {
      stopLoading();
    }
  };

  return (
    <>
      <div className="cursor-pointer" onClick={openModal}>
        {children}
      </div>

      {isOpen && (
        <div className={`fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 ${container}`}>
          <div className="bg-white rounded-lg p-6 w-96 space-y-7">
            <div className="flex flex-col gap-5 items-center">
              <p className="text-[25px] font-bold text-gray-800 font-inter">
                Logout
              </p>
              <div>
                <StyledImage src="/img/logout.svg" />
              </div>
              <p className="text-[16px] text-black font-inter">
                Are you sure you want to log out?
              </p>
            </div>
            <div className="flex justify-end space-x-4">
              <ButtonLoading
                className="w-full py-3 rounded-[8px] !max-w-none bg-gray-700 text-white hover:bg-gray-700/90"
                onClick={closeModal}>
                Cancel
              </ButtonLoading>
              <ButtonLoading
                isLoading={isLoading}
                className="w-full py-3 rounded-[8px] bg-red-600 text-white hover:bg-red-700/90"
                onClick={signOut}>
                Logout
              </ButtonLoading>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default LogOut;
