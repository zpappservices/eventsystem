import { IoAnalytics, IoMenuOutline } from "react-icons/io5";
import Link from "next/link";
import { LuCalendarDays } from "react-icons/lu";
import { FaMoneyBills } from "react-icons/fa6";
import { CgProfile } from "react-icons/cg";
import { AiFillSetting } from "react-icons/ai";
import { TfiHelpAlt } from "react-icons/tfi";
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
        } w-[260px] md:w-[350px] h-screen bg-[#f5f3f3] text-[14px] transition-all duration-300 fixed md:static z-30 pt-[82px] md:pt-0 top-0 left-0 md:left-auto overflow-y-auto md:overflow-y-hidden`}>
        <div className="flex flex-col h-[93%] gap-y-[180px]">
          <ul className="text-[#A5D4B8] flex flex-col text-[16px]">
            <Link
              href="/dashboard"
              className={`transition-all duration-300 relative ps-5 ${
                pathname === "/dashboard" ? "bg-white" : ""
              }`}>
              {pathname === "/dashboard" ? (
                <li className="text-[#FF7F50] flex gap-x-4 items-center bg-baseWhite p-3 rounded-l-full transition-all">
                  <IoMenuOutline
                    color="#FF7F50"
                    size={22}
                    onClick={toggleMenu}
                    className=""
                  />
                  Dashboard
                </li>
              ) : (
                <li className="text-black flex gap-x-4 items-center p-3 rounded-l-full transition-all">
                  <IoMenuOutline
                    color="#000"
                    size={22}
                    onClick={toggleMenu}
                    className=""
                  />
                  Dashboard
                </li>
              )}
            </Link>
            <Link
              href="/dashboard/createevent"
              className={`transition-all duration-300 relative ps-5 ${
                pathname === "/dashboard/createevent" ? "bg-white" : ""
              }`}>
              {pathname === "/dashboard/createevent" ? (
                <li className="text-[#FF7F50] flex gap-x-4 items-center bg-baseWhite p-3 rounded-l-full transition-all">
                  <LuCalendarDays
                    color="#FF7F50"
                    size={20}
                    onClick={toggleMenu}
                    className=""
                  />
                  Create Event
                </li>
              ) : (
                <li className="text-black flex gap-x-4 items-center p-3 rounded-l-full transition-all">
                  <LuCalendarDays
                    color="#000"
                    size={20}
                    onClick={toggleMenu}
                    className=""
                  />
                  Create Event
                </li>
              )}
            </Link>
            {/* <Link
              href="/dashboard/eventanalysis"
              className={`transition-all duration-300 relative ps-5 ${
                pathname === "/dashboard/eventanalysis" ? "bg-white" : ""
              }`}>
              {pathname === "/dashboard/eventanalysis" ? (
                <li className="text-[#FF7F50] flex gap-x-4 items-center bg-baseWhite p-3 rounded-l-full transition-all">
                  <IoAnalytics
                    color="#FF7F50"
                    size={20}
                    onClick={toggleMenu}
                    className=""
                  />
                  Event Analysis
                </li>
              ) : (
                <li className="text-black flex gap-x-4 items-center p-3 rounded-l-full transition-all">
                  <IoAnalytics
                    color="#000"
                    size={20}
                    onClick={toggleMenu}
                    className=""
                  />
                  Event Analysis
                </li>
              )}
            </Link> */}
            <Link
              href="/dashboard/payout"
              className={`transition-all duration-300 relative ps-5 ${
                pathname === "/dashboard/payout" ? "bg-white" : ""
              }`}>
              {pathname === "/dashboard/payout" ? (
                <li className="text-[#FF7F50] flex gap-x-4 items-center bg-baseWhite p-3 rounded-l-full transition-all">
                  <FaMoneyBills
                    color="#FF7F50"
                    size={20}
                    onClick={toggleMenu}
                    className=""
                  />
                  Payout
                </li>
              ) : (
                <li className="text-black flex gap-x-4 items-center p-3 rounded-l-full transition-all">
                  <FaMoneyBills
                    color="#000"
                    size={20}
                    onClick={toggleMenu}
                    className=""
                  />
                  Payout
                </li>
              )}
            </Link>
            {/* <Link
              href="/dashboard/profile"
              className={`transition-all duration-300 relative ps-5 ${
                pathname === "/dashboard/profile" ? "bg-white" : ""
              }`}>
              {pathname === "/dashboard/profile" ? (
                <li className="text-[#FF7F50] flex gap-x-4 items-center bg-baseWhite p-3 rounded-l-full transition-all">
                  <CgProfile
                    color="#FF7F50"
                    size={20}
                    onClick={toggleMenu}
                    className=""
                  />
                  My Profile
                </li>
              ) : (
                <li className="text-black flex gap-x-4 items-center p-3 rounded-l-full transition-all">
                  <CgProfile
                    color="#000"
                    size={20}
                    onClick={toggleMenu}
                    className=""
                  />
                  My Profile
                </li>
              )}
            </Link> */}
            {/* <Link
              href="/dashboard/settings"
              className={`transition-all duration-300 relative ps-5 ${
                pathname === "/dashboard/settings" ? "bg-white" : ""
              }`}>
              {pathname === "/dashboard/settings" ? (
                <li className="text-[#FF7F50] flex gap-x-4 items-center bg-baseWhite p-3 rounded-l-full transition-all">
                  <AiFillSetting
                    color="#FF7F50"
                    size={20}
                    onClick={toggleMenu}
                    className=""
                  />
                  Account Settiings
                </li>
              ) : (
                <li className="text-black flex gap-x-4 items-center p-3 rounded-l-full transition-all">
                  <AiFillSetting
                    color="#000"
                    size={20}
                    onClick={toggleMenu}
                    className=""
                  />
                  Account Settiings
                </li>
              )}
            </Link> */}
            {/*<Link
              href="/dashboard/help"
              className={`transition-all duration-300 relative ps-5 ${
                pathname === "/dashboard/help" ? "bg-white" : ""
              }`}>
              {pathname === "/dashboard/help" ? (
                <li className="text-[#FF7F50] flex gap-x-4 items-center bg-baseWhite p-3 rounded-l-full transition-all">
                  <TfiHelpAlt
                    color="#FF7F50"
                    size={20}
                    onClick={toggleMenu}
                    className=""
                  />
                  Need Help ?
                </li>
              ) : (
                <li className="text-black flex gap-x-4 items-center p-3 rounded-l-full transition-all">
                  <TfiHelpAlt
                    color="#000"
                    size={20}
                    onClick={toggleMenu}
                    className=""
                  />
                  Need Help ?
                </li>
              )}
            </Link> */}
            <li
              className="text-black flex gap-x-4 ms-5 items-center p-3 rounded-l-full transition-all cursor-pointer"
              onClick={openModal}>
              <FiLogOut
                color="#000"
                size={20}
                onClick={toggleMenu}
                className=""
              />
              Logout
            </li>
          </ul>
        </div>
      </div>
      <Modal
        open={isModalOpen}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description">
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
        </Box>
      </Modal>
    </>
  );
};

export default SideBar;
