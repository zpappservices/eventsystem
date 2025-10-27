import Link from "next/link";
import { FaMoneyBills } from "react-icons/fa6";
import { FiLogOut } from "react-icons/fi";
import { usePathname } from "next/navigation";
import LogOut from "../auth/LogOut";
import { useModal } from "@/hooks/useModal";
import { useRouter } from "next/router";
import useLoading from "@/hooks/useLoading";
import { Box, Modal } from "@mui/material";
import { ButtonLoading } from "../widgets/ButtonLoading";
import StyledImage from "../StyledImage";
import useAuthToken from "@/hooks/useAuthToken";
import { apiRequest } from "@/utils/apiService";
import { toast } from "react-toastify";
import { useState } from "react";
import { TbLayoutDashboard, TbLogout2 } from "react-icons/tb";
import { MdEvent, MdEventAvailable } from "react-icons/md";
import { IoSettingsOutline } from "react-icons/io5";

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
        } w-[260px] md:w-[262px] h-screen text-[14px] transition-all bg-white border-r border-dashed border-neutrals300 duration-300 fixed z-40 pt-[95px] md:pt-0 top-0 left-0 md:left-auto overflow-y-auto md:overflow-y-hidden`}
      >
        <div className="flex flex-col h-[93%] gap-y-[180px]">
          <ul className="text-[#A5D4B8] flex flex-col gap-2 text-[16px]">
            <Link href="/" className="!z-[1400] py-2.5">
              <StyledImage
                src="/img/logo.svg"
                className="w-full sm:min-w-[150px] max-w-[160px] !z-30 mx-auto mb-8"
              />
            </Link>

            <Link
              href="/dashboard"
              className={`transition-all duration-300 relative px-3 ${
                pathname === "/dashboard" ? "bg-white" : ""
              }`}
            >
              {pathname === "/dashboard" ? (
                <li className="text-white flex gap-x-4 items-center bg-primary p-3 rounded-[10px] transition-all">
                  <TbLayoutDashboard
                    color="#fff"
                    onClick={toggleMenu}
                    className="text-[27px]"
                  />
                  Dashboard
                </li>
              ) : (
                <li className="text-black flex gap-x-4 items-center p-3 hover:bg-primary100/60 rounded-[10px] transition-all">
                  <TbLayoutDashboard
                    color="#000"
                    onClick={toggleMenu}
                    className="text-[27px]"
                  />
                  Dashboard
                </li>
              )}
            </Link>
            <Link
              href="/dashboard/createevent"
              className={`transition-all duration-300 relative px-3 ${
                pathname === "/dashboard/createevent" ? "bg-white" : ""
              }`}
            >
              {pathname === "/dashboard/createevent" ? (
                <li className="text-white flex gap-x-4 items-center bg-primary p-3 rounded-[10px] transition-all">
                  <MdEvent
                    color="#fff"
                    onClick={toggleMenu}
                    className="text-[27px]"
                  />
                  Create Event
                </li>
              ) : (
                <li className="text-black flex gap-x-4 items-center p-3 hover:bg-primary100/60 rounded-[10px] transition-all">
                  <MdEvent
                    color="#000"
                    onClick={toggleMenu}
                    className="text-[27px]"
                  />
                  Create Event
                </li>
              )}
            </Link>
            <Link
              href="/dashboard/events"
              className={`transition-all duration-300 relative px-3 ${
                pathname === "/dashboard/events" ? "bg-white" : ""
              }`}
            >
              {pathname === "/dashboard/events" ? (
                <li className="text-white flex gap-x-4 items-center bg-primary p-3 rounded-[10px] transition-all">
                  <MdEventAvailable
                    color="#fff"
                    onClick={toggleMenu}
                    className="text-[27px]"
                  />
                  Events
                </li>
              ) : (
                <li className="text-black flex gap-x-4 items-center p-3 hover:bg-primary100/60 rounded-[10px] transition-all">
                  <MdEventAvailable
                    color="#000"
                    onClick={toggleMenu}
                    className="text-[27px]"
                  />
                  Events
                </li>
              )}
            </Link>
            <Link
              href="/dashboard/sales"
              className={`transition-all duration-300 relative px-3 ${
                pathname === "/dashboard/sales" ? "bg-white" : ""
              }`}
            >
              {pathname === "/dashboard/sales" ? (
                <li className="text-white flex gap-x-4 items-center bg-primary p-3 rounded-[10px] transition-all">
                  <StyledImage
                    src="/img/ticket-sales-active.svg"
                    className="w-[27px]"
                  />
                  Ticket Sales
                </li>
              ) : (
                <li className="text-black flex gap-x-4 items-center p-3 hover:bg-primary100/60 rounded-[10px] transition-all">
                  <StyledImage
                    src="/img/ticket-sales.svg"
                    className="w-[27px]"
                  />
                  Ticket Sales
                </li>
              )}
            </Link>
            {/* <Link
              href="/dashboard/eventanalysis"
              className={`transition-all duration-300 relative px-3 ${
                pathname === "/dashboard/eventanalysis" ? "bg-white" : ""
              }`}>
              {pathname === "/dashboard/eventanalysis" ? (
                <li className="text-white flex gap-x-4 items-center bg-primary p-3 rounded-[10px] transition-all">
                  <IoAnalytics
                    color="#fff"
                    onClick={toggleMenu}
                    className="text-[27px]"
                  />
                  Event Analysis
                </li>
              ) : (
                <li className="text-black flex gap-x-4 items-center p-3 hover:bg-primary100/60 rounded-[10px] transition-all">
                  <IoAnalytics
                    color="#000"
                    onClick={toggleMenu}
                    className="text-[27px]"
                  />
                  Event Analysis
                </li>
              )}
            </Link> */}
            {/* <Link
              href="/dashboard/payout"
              className={`transition-all duration-300 relative px-3 ${
                pathname === "/dashboard/payout" ? "bg-white" : ""
              }`}
            >
              {pathname === "/dashboard/payout" ? (
                <li className="text-white flex gap-x-4 items-center bg-primary p-3 rounded-[10px] transition-all">
                  <FaMoneyBills
                    color="#fff"
                    onClick={toggleMenu}
                    className="text-[27px]"
                  />
                  Payout
                </li>
              ) : (
                <li className="text-black flex gap-x-4 items-center p-3 hover:bg-primary100/60 rounded-[10px] transition-all">
                  <FaMoneyBills
                    color="#000"
                    onClick={toggleMenu}
                    className="text-[27px]"
                  />
                  Payout
                </li>
              )}
            </Link> */}
            <Link
              href="/dashboard/profile"
              className={`transition-all duration-300 relative px-3 ${
                pathname === "/dashboard/profile" ? "bg-white" : ""
              }`}
            >
              {pathname === "/dashboard/profile" ? (
                <li className="text-white flex gap-x-4 items-center bg-primary p-3 rounded-[10px] transition-all">
                  <StyledImage
                    src="/img/user-active.svg"
                    className="w-[27px]"
                  />
                  My Profile
                </li>
              ) : (
                <li className="text-black flex gap-x-4 items-center p-3 hover:bg-primary100/60 rounded-[10px] transition-all">
                  <StyledImage src="/img/user.svg" className="w-[27px]" />
                  My Profile
                </li>
              )}
            </Link>
            <Link
              href="/dashboard/settings"
              className={`transition-all duration-300 relative px-3 ${
                pathname?.includes("settings") ? "bg-white" : ""
              }`}
            >
              {pathname?.includes("settings") ? (
                <li className="text-white flex gap-x-4 items-center bg-primary p-3 rounded-[10px] transition-all">
                  <IoSettingsOutline
                    color="#fff"
                    onClick={toggleMenu}
                    className="text-[27px]"
                  />
                  Settings
                </li>
              ) : (
                <li className="text-black flex gap-x-4 items-center p-3 hover:bg-primary100/60 rounded-[10px] transition-all">
                  <IoSettingsOutline
                    color="#000"
                    onClick={toggleMenu}
                    className="text-[27px]"
                  />
                  Settings
                </li>
              )}
            </Link>
            {/*<Link
              href="/dashboard/help"
              className={`transition-all duration-300 relative px-3 ${
                pathname === "/dashboard/help" ? "bg-white" : ""
              }`}>
              {pathname === "/dashboard/help" ? (
                <li className="text-white flex gap-x-4 items-center bg-primary p-3 rounded-[10px] transition-all">
                  <TfiHelpAlt
                    color="#fff"
                    onClick={toggleMenu}
                    className="text-[27px]"
                  />
                  Need Help ?
                </li>
              ) : (
                <li className="text-black flex gap-x-4 items-center p-3 hover:bg-primary100/60 rounded-[10px] transition-all">
                  <TfiHelpAlt
                    color="#000"
                    onClick={toggleMenu}
                    className="text-[27px]"
                  />
                  Need Help ?
                </li>
              )}
            </Link> */}
            <li
              className="text-error flex gap-x-4 ms-3 items-center p-3 rounded-l-full transition-all cursor-pointer"
              onClick={openModal}
            >
              <TbLogout2 onClick={toggleMenu} className="text-[27px]" />
              Logout
            </li>
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
