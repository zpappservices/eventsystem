import { useState, useEffect, useMemo } from "react";
import SignUpSignInModal from "./SignUpSignInModal";
import { useRouter } from "next/router";
import useAuthToken from "@/hooks/useAuthToken";
import useApiRequest from "@/hooks/useApiRequest";

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
     const items = [
       {
         item: "Home",
         id: 1,
         ariaLabel: "Home",
         onClick: () => router.push("/"),
       },
     ];

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
         item: "Login",
         id: 3,
         ariaLabel: "Login",
         onClick: handleLoginClick,
       });
     }

     setNavItems(items);
   };

  useEffect(() => {
    updateNavItems();
    console.log(isLoggedIn, isVendor)
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
    console.log(data?.data?.isVendor, loginStatus?.data)
  }, [loginStatus, data]);

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
              onClick={i.onClick}>
              {i.item}
            </li>
          ))}
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
    </>
  );
};

export default NavBar;
