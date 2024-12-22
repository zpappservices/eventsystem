import { useState, useEffect, useMemo, useRef } from "react";
import SignUpSignInModal from "./SignUpSignInModal";
import { useRouter } from "next/router";
import useAuthToken from "@/hooks/useAuthToken";
import useApiRequest from "@/hooks/useApiRequest";
import Link from "next/link";
import LogOut from "./auth/LogOut";
import { FiLogOut } from "react-icons/fi";
import StyledImage from "./StyledImage";
import { BiCaretDown } from "react-icons/bi";

const NavBar = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoginModal, setIsLoginModal] = useState(true);
  const [isVendor, setIsVendor] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [navItems, setNavItems] = useState([]);
  const [user, setUser] = useState("");
  const [dropdown, setDropdown] = useState(false);

  const { activeUser, token } = useAuthToken();
  const router = useRouter();
  const dropdownRef = useRef(null);

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
      } /*  else {
        items.push({
          item: "Become a Vendor",
          id: 2.1,
          ariaLabel: "Become a Vendor",
          onClick: becomeVendor,
        });
      } */
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
      const { isVendor: isAVendor, username = "" } = data?.data || {};
      setIsVendor(isAVendor);
      setUser(username);
    }

    if (loginStatus) {
      const { data: isUserLoggedIn } = loginStatus || {};
      setIsLoggedIn(isUserLoggedIn);
    }
  }, [loginStatus, data]);

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [dropdown]);

  const hasDashboard = navItems?.some(
    (navItem) => navItem?.item === "Dashboard"
  );

  return (
    <div className="fixed top-0 left-0 z-10 w-full bg-gray-900">
      <nav className="w-full max-w-[1300px] mx-auto flex py-7 px-5 text-white items-center font-medium text-sm">
        <ul className="w-full flex items-center justify-between gap-6 cursor-pointer text-white">
          <Link href="/" className="ms-[40px]">
            <StyledImage
              src="/img/zafariplus-logo.png"
              className="w-full max-w-[10px] scale-[12]"
            />
          </Link>
          <div className="flex justify-end gap-5 !ms-auto">
            {navItems?.map((i) => (
              <li
                role="button"
                className={`ms-auto flex justify-center items-center transition-all duration-300 ease-in-out hover:scale-[1.1] hover:opacity-80 ${
                  i?.item === "Dashboard" ? "hidden sm:flex" : ""
                }`}
                key={i.id}
                aria-label={i.ariaLabel}
                onClick={i.onClick}>
                {i.item}
              </li>
            ))}
            {!hasDashboard && (
              <li
                role="button"
                className="ms-auto hidden sm:flex justify-center items-center transition-all duration-300 ease-in-out hover:scale-[1.1] hover:opacity-80"
                onClick={() => router.push("/auth/vendor/signup")}>
                Register Vendor
              </li>
            )}
          </div>
          {isLoggedIn && user && (
            <div
              className="relative flex gap-2 items-center"
              ref={dropdownRef}
              onClick={() => setDropdown(!dropdown)}>
              <p className="ms-auto flex justify-center items-center transition-all duration-300 ease-in-out hover:scale-[1.1] hover:opacity-80">
                {user}
              </p>
              <BiCaretDown
                color="white"
                className={`duration-200 ${dropdown ? "rotate-180" : ""}`}
              />
              {dropdown && (
                <div className="absolute top-7 rounded-[5px] bg-white shadow-xl min-w-full w-fit p-1 text-black space-y-1">
                  <Link href="/users/tickets">
                    <p className="px-2 py-2 hover:bg-slate-100 rounded-[5px]">
                      My tickets
                    </p>
                  </Link>
                  {hasDashboard ? (
                    <Link href="/dashboard" className="sm:hidden">
                      <p className="px-2 py-2 hover:bg-slate-100 rounded-[5px]">
                        Dashboard
                      </p>
                    </Link>
                  ) : (
                    <Link href="/auth/vendor/signup" className="sm:hidden">
                      <p className="px-2 py-2 hover:bg-slate-100 rounded-[5px]">
                        Register Vendor
                      </p>
                    </Link>
                  )}
                </div>
              )}
            </div>
          )}
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
