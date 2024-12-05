import useApiRequest from "@/hooks/useApiRequest";
import useAuthToken from "@/hooks/useAuthToken";
import { usePathname } from "next/navigation";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { toast } from "react-toastify";

const PrivateRoute = ({ children }) => {
  const { activeUser, token } = useAuthToken();
  const router = useRouter();
  const pathname = usePathname();

  const {
    data: userData,
    error: userError,
    request: fetchUser,
  } = useApiRequest({
    method: "get",
    url: `user/getoneuser/${activeUser}`,
    useToken: true,
  });

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

  useEffect(() => {
    if (loginStatus) {
      const { data: isLoggedIn } = loginStatus;
      if (!isLoggedIn) {
        toast.info("Session expired. Please login to continue");
        router.push("/");
        return;
      }
    }

    if (userData) {
      const { data: user } = userData;
      const { isVendor = false } = user || {};

      if (isVendor && pathname === "/auth/onboarding") {
        toast.info("You're already a vendor");
        router.push("/dashboard");
      }

      if (!isVendor && pathname === "/dashboard") {
        toast.info("You're not a vendor yet! Onboard to be vendor");
        router.push("/auth/onboarding");
      }
    }
  }, [loginStatus, userData]);

  useEffect(() => {
  }, [loginError, userError]);

  useEffect(() => {
    validateSession();

    fetchUser();
  }, [activeUser, token]);

  return <div className="w-full">{children}</div>;
};

export default PrivateRoute;
