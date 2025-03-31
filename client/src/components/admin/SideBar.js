import { IoMenuOutline } from "react-icons/io5";
import Link from "next/link";
import { LuCalendarDays } from "react-icons/lu";
import { FaAddressCard, FaMoneyBills } from "react-icons/fa6";
import { usePathname } from "next/navigation";
import { useModal } from "@/hooks/useModal";
import { useRouter } from "next/router";
import useLoading from "@/hooks/useLoading";
import { Box, Modal } from "@mui/material";
import { ButtonLoading } from "../widgets/ButtonLoading";
import StyledImage from "../StyledImage";
import useAuthToken from "@/hooks/useAuthToken";
import { apiRequest } from "@/utils/apiService";
import { toast } from "react-toastify";
import SideDopdown from "./SideDopdown";
import { FaUser, FaUserFriends, FaUsersCog } from "react-icons/fa";
import { useState } from "react";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "inherit",
  p: "20px",
  border: "none",
  outline: "none",
  borderRadius: 8,
  maxWidth: "610px",
  width: "100%",
};

const SideBar = ({ isOpen, toggleMenu, showModal }) => {
  const [expandedMenuId, setExpandedMenuId] = useState(null);

  const { activeUser, clearUserToken } = useAuthToken();
  const router = useRouter();
  const pathname = usePathname();

  const { isOpen: isModalOpen, closeModal, openModal } = useModal();

  // Prevent modal from closing on backdrop click
  const handleClose = (event, reason) => {
    if (reason === "backdropClick") return;
    closeModal();
  };

  const handleToggleMenu = (menuId) => {
    setExpandedMenuId((prevId) => (prevId === menuId ? null : menuId));
  };

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
        handleClose();
        router.push("/");
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
      <div
        className={`${
          isOpen ? "translate-x-0" : "translate-x-[-100%] md:translate-x-0"
        } w-[260px] md:w-[350px] h-screen text-[14px] border-r divide-dashed border-neutrals100 border-dashed transition-all duration-300 fixed md:static z-30 pt-[95px] md:pt-0 top-0 left-0 md:left-auto overflow-y-auto md:overflow-y-hidden`}
      >
        <div className="flex flex-col gap-y-[180px]">
          <ul className="text-[#A5D4B8] flex flex-col text-[16px] px-5 space-y-5">
            <Link href="/" className="!z-[1400]">
              <StyledImage
                src="/img/logo.svg"
                className="w-full sm:min-w-[150px] max-w-[160px] !z-30 mx-auto"
              />
            </Link>

            <SideDopdown
              isExpanded={expandedMenuId === "dashboard"}
              onToggle={handleToggleMenu}
            />

            <SideDopdown
              menuItem={{
                id: "customers",
                name: "Customers",
                icon: FaUserFriends,
                path: "/admin/users",
                hasSubMenu: true,
                active: "users, organizers",
                subItems: [
                  {
                    name: "Users",
                    icon: FaUser,
                    path: "/admin/users",
                    active: "users",
                  },
                  {
                    name: "Organizers",
                    icon: FaAddressCard,
                    path: "/admin/organizers",
                    active: "organizers",
                  },
                ],
              }}
              isExpanded={expandedMenuId === "customers"}
              onToggle={handleToggleMenu}
            />
          </ul>
        </div>
      </div>
      <Modal
        open={isModalOpen}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <div className="w-full  rounded-[15px] p-6 sm:px-[30px]">
            <div className="bg-white rounded-lg p-6 w-96 space-y-7 mx-auto">
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
                  onClick={closeModal}
                >
                  Cancel
                </ButtonLoading>
                <ButtonLoading
                  isLoading={isLoading}
                  className="w-full py-3 rounded-[8px] bg-red-600 text-white hover:bg-red-700/90"
                  onClick={signOut}
                >
                  Logout
                </ButtonLoading>
              </div>
            </div>
          </div>
        </Box>
      </Modal>
    </>
  );
};

export default SideBar;
