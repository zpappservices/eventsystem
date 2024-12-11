import { useState, useEffect, useMemo } from "react";
import SignUpSignInModal from "./SignUpSignInModal";
import { useRouter } from "next/router";
import useAuthToken from "@/hooks/useAuthToken";
import useApiRequest from "@/hooks/useApiRequest";
import Link from "next/link";
import LogOut from "./auth/LogOut";
import { FiLogOut } from "react-icons/fi";

const NavBar = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoginModal, setIsLoginModal] = useState(true);
  const [isVendor, setIsVendor] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [navItems, setNavItems] = useState([]);

  const { activeUser, token } = useAuthToken();
  const router = useRouter();

  const handleLoginClick = () => {
    setIsLoginModal(true);
    setIsModalOpen(true);
  };

  const becomeVendor = () => router.push("/auth/onboarding");
  const goToDashboard = () => router.push("/dashboard");

  const { data, request } = useApiRequest({
    method: "get",
    url: `user/getoneuser/${activeUser}`,
    useToken: true,
  });

  const getUser = async () => {
    if (activeUser) await request();
  };

  const {
    data: loginStatus,
    error: loginError,
    request: validateSession,
  } = useApiRequest({
    method: "post",
    url: "auth/islogin",
    data: { token: token, userId: activeUser },
    useToken: false,
  });

  const getLoginStatus = async () => {
    if (activeUser) await validateSession();
  };

  const updateNavItems = () => {
    const items = [];

    if (isLoggedIn) {
      if (isVendor) {
        items.push({
          item: "Dashboard",
          id: 2.0,
          ariaLabel: "Dashboard",
          onClick: goToDashboard,
        });
      } else {
        items.push({
          item: "Become a Vendor",
          id: 2.1,
          ariaLabel: "Become a Vendor",
          onClick: becomeVendor,
        });
      }
    } else {
      items.push({
        item: "Signin",
        id: 3,
        ariaLabel: "Signin",
        onClick: handleLoginClick,
      });
    }

    setNavItems(items);
  };

  useEffect(() => {
    updateNavItems();
  }, [isLoggedIn, isVendor]);

  useEffect(() => {
    getUser();
    getLoginStatus();
  }, [activeUser, token]);

  useEffect(() => {
    if (data) {
      const { isVendor: isAVendor } = data?.data || {};
      setIsVendor(isAVendor);
    }

    if (loginStatus) {
      const { data: isUserLoggedIn } = loginStatus || {};
      setIsLoggedIn(isUserLoggedIn);
    }
  }, [loginStatus, data]);

  return (
    <div className="fixed top-0 left-0 z-10 w-full bg-gray-900">
      <nav className="w-full max-w-[1300px] mx-auto flex py-7 px-5 text-white items-center font-medium text-sm">
        <ul className="w-full flex items-center justify-between gap-6 cursor-pointer text-white">
          <Link href="">
            <li className="transition-all duration-300 ease-in-out hover:scale-[1.1] hover:opacity-80 text-[20px] font-bold text-[#FF7F50]">
              Zafariplus
            </li>
          </Link>
          <div className="flex justify-end gap-5 !ms-auto">
            {navItems.map((i) => (
              <li
                role="button"
                className="ms-auto flex justify-center items-center transition-all duration-300 ease-in-out hover:scale-[1.1] hover:opacity-80"
                key={i.id}
                aria-label={i.ariaLabel}
                onClick={i.onClick}>
                {i.item}
              </li>
            ))}
          </div>
          {isLoggedIn && (
            <LogOut>
              <FiLogOut color="white" size={20} />
            </LogOut>
          )}
        </ul>
      </nav>

      {/* Login and Sign-Up Modal */}
      {isModalOpen && (
        <SignUpSignInModal
          isLoginModal={isLoginModal}
          setIsLoginModal={setIsLoginModal}
          setIsModalOpen={setIsModalOpen}
        />
      )}
    </div>
  );
};

export default NavBar;
