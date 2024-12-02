import { useState, useEffect } from "react";
import SignUpSignInModal from "./SignUpSignInModal";
import { useRouter } from "next/router";
import useAuthToken from "@/hooks/useAuthToken";
import Link from "next/link";
import useApiRequest from "@/hooks/useApiRequest";

const NavBar = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoginModal, setIsLoginModal] = useState(true);

  const { activeUser, token } = useAuthToken();

  const router = useRouter();

  const handleLoginClick = () => {
    setIsLoginModal(true);
    setIsModalOpen(true);
  };

  const becomeVendor = () => router.push("/auth/onboarding");
  const gotToDashboard = () => router.push("/dashboard");

  const { data, error, loading, request } = useApiRequest({
    method: "get",
    url: `user/getoneuser/${activeUser}`,
    data: null,
    headers: null,
    useToken: true,
  });

  const getUser = async () => {
    await request();
  };

  const { isVendor = false } = data?.data || {};

  const navItems = [
    { item: "Home", id: 1, ariaLabel: "Home", onClick: () => router.push("/") },
    token && activeUser
      ? isVendor
        ? {
            item: "Dashboard",
            id: 2.0,
            ariaLabel: "Dashboard",
            onClick: gotToDashboard,
          }
        : {
            item: "Become a Vendor",
            id: 2.1,
            ariaLabel: "Become a Vendor",
            onClick: becomeVendor,
          }
      : {
          item: "Login",
          id: 3,
          ariaLabel: "Login",
          onClick: handleLoginClick,
        },
  ];

  useEffect(() => {
    getUser();
  }, [activeUser, token, isVendor]);

  return (
    <>
      <nav className="flex justify-end py-5 px-5 bg-[#FF7F50] items-center font-medium text-sm lg:text-lg font-inter">
        <ul className="flex items-center justify-between gap-6 cursor-pointer">
          {navItems.map((i) => (
            <li
              role="button"
              className="flex justify-center items-center transition-all duration-300 ease-in-out hover:scale-[1.1] hover:opacity-80"
              key={i.id}
              aria-label={i.ariaLabel}
              onClick={i.onClick}
            >
              {i.item}
            </li>
          ))}
        </ul>
      </nav>

      {/*--------------------------------- Login and sign up modal */}
      {isModalOpen && (
        <SignUpSignInModal
          isLoginModal={isLoginModal}
          setIsLoginModal={setIsLoginModal}
          setIsModalOpen={setIsModalOpen}
        />
      )}
    </>
  );
};

export default NavBar;
