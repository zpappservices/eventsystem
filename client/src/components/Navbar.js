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
import Search from "./ui/Search";
import { FaListUl } from "react-icons/fa";
import MenuRoundedIcon from "@mui/icons-material/MenuRounded";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import { Backdrop } from "@mui/material";
import AllCategoriesDropdown from "./categories/AllCategoriesDropdown";

const NavBar = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoginModal, setIsLoginModal] = useState(true);
  const [isVendor, setIsVendor] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [navItems, setNavItems] = useState([]);
  const [user, setUser] = useState("");
  const [dropdown, setDropdown] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const { activeUser, token } = useAuthToken();
  const router = useRouter();
  const pathname = router.pathname;
  const dropdownRef = useRef(null);
  const bgRef = useRef(null);

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
        item: "Sign in to buy",
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
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target) &&
        !event.target.closest("#dynamic-dropdown")
      ) {
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

  const isHome = router.pathname === "/";

  return (
    <div className="fixed top-0 left-0 z-10 w-full bg-white drop-shadow-md">
      <nav className="w-full max-w-[1512px] mx-auto p-5">
        <ul className="w-full flex items-center justify-between gap-3 sm:gap-6 cursor-pointer text-baseBlack">
          <Link href="/" className="!z-[1400]">
            <StyledImage
              src="/img/logo.svg"
              className="w-full sm:min-w-[150px] max-w-[200px] !z-30"
            />
          </Link>
          <Backdrop
            id="dynamic-backdrop"
            sx={{ color: "#fff", zIndex: 1300 }}
            open={isOpen}
            onClick={() => setIsOpen(false)}>
            <div
              ref={bgRef}
              className={`flex flex-col md2:hidden ${
                isOpen ? "left-0" : "left-[-100%]"
              } absolute top-0 left-0 z-10 shadow-xl px-7 lg:px-[68px] transition-all h-screen w-[75%] sm:w-[50%] bg-white pt-[150px] gap-y-6 gap-x-[70px] items-start text-baseBlack text-[20px] md:text-[21px] leading-[24px]`}>
              <Link
                href="/events"
                className={
                  pathname === "/events" ? "text-baseBlack font-bold" : ""
                }>
                Events
              </Link>
              <Link
                href="/"
                className={pathname === "" ? "text-baseBlack font-bold" : ""}>
                Concerts
              </Link>
              <Link
                href="/"
                className={pathname === "" ? "text-baseBlack font-bold" : ""}>
                Sports
              </Link>
              <Link
                href="/"
                className={pathname === "" ? "text-baseBlack font-bold" : ""}>
                Theater & Comedy
              </Link>
              <Link
                href="/contact"
                className={
                  pathname === "/contact" ? "text-baseBlack font-bold" : ""
                }>
                Help Center
              </Link>

              {navItems?.map((i) => (
                <p
                  role="button"
                  className={`flex md:hidden justify-center items-center transition-all duration-300 ease-in-out hover:scale-[1.1] hover:opacity-80 ${
                    i?.item === "Dashboard" ? "hidden sm:flex" : ""
                  }`}
                  key={i.id}
                  aria-label={i.ariaLabel}
                  onClick={i.onClick}>
                  {i.item}
                </p>
              ))}

              {!isLoggedIn && (
                <li
                  role="button"
                  className="flex lg:hidden justify-center items-center transition-all duration-300 ease-in-out hover:scale-[1.1] hover:opacity-80"
                  onClick={() => router.push("/auth/vendor/signup")}>
                  Create an Event / Log in
                </li>
              )}

              {isLoggedIn && (
                <div className="flex lg:hidden">
                  <LogOut>
                    <FiLogOut className="text-baseBlack" size={20} />
                  </LogOut>
                </div>
              )}
            </div>
          </Backdrop>
          <div className="w-full hidden md2:flex justify-center text-[18px] md:text-[19px] items-center mx-auto gap-6">
            <Link
              href="/events"
              className={
                pathname === "/events" || pathname.includes("events")
                  ? "text-baseBlack font-bold"
                  : ""
              }>
              Events
            </Link>
            <Link
              href="/"
              className={pathname === "" ? "text-baseBlack font-bold" : ""}>
              Concerts
            </Link>
            <Link
              href="/"
              className={pathname === "" ? "text-baseBlack font-bold" : ""}>
              Sports
            </Link>
            <Link
              href="/"
              className={pathname === "" ? "text-baseBlack font-bold" : ""}>
              Theater & Comedy
            </Link>
            <Link
              href="/contact"
              className={
                pathname === "/contact" ? "text-baseBlack font-bold" : ""
              }>
              Help Center
            </Link>
          </div>
          <div className="min-w-fit flex justify-end gap-5 !ms-auto">
            <div className="hidden md:block">
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
            </div>
            {!isLoggedIn && (
              <li
                role="button"
                className="ms-auto hidden lg:flex justify-center items-center transition-all duration-300 ease-in-out hover:scale-[1.1] hover:opacity-80"
                onClick={() => router.push("/auth/vendor/signup")}>
                Create an Event / Log in
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
                className={`duration-200 text-baseBlack ${
                  dropdown ? "rotate-180" : ""
                }`}
              />
              {dropdown && (
                <div className="absolute top-7 z-30 rounded-[5px] bg-white shadow-xl min-w-full w-fit p-1 text-black space-y-1">
                  <Link href="/users/tickets">
                    <p className="px-2 py-2 hover:bg-slate-100 rounded-[5px]">
                      My tickets
                    </p>
                  </Link>
                  {hasDashboard && (
                    <Link href="/dashboard" className="md:hidden">
                      <p className="px-2 py-2 hover:bg-slate-100 rounded-[5px]">
                        Dashboard
                      </p>
                    </Link>
                  )}
                  {!isLoggedIn && (
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
              <FiLogOut className="text-baseBlack" size={20} />
            </LogOut>
          )}

          <button
            onClick={() => setIsOpen(!isOpen)}
            className="text-gray-600 focus:outline-none lg:hidden z-[1400]">
            {isOpen ? (
              <CloseRoundedIcon
                style={{
                  color: isOpen ? "white" : "black",
                  fontSize: "42px",
                }}
              />
            ) : (
              <MenuRoundedIcon
                style={{
                  color: isOpen ? "white" : "black",
                  fontSize: "42px",
                }}
              />
            )}
          </button>
        </ul>

        {isHome && (
          <div className="flex flex-col sm:flex-row justify-center sm:items-center space-y-3 py-3 sm:py-0 gap-x-10">
            <AllCategoriesDropdown />

            <Search />
          </div>
        )}
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
