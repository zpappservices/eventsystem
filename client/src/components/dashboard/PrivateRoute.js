import useApiRequest from "@/hooks/useApiRequest";
import useAuthToken from "@/hooks/useAuthToken";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { toast } from "react-toastify";

const PrivateRoute = ({ children }) => {
  const { activeUser, token } = useAuthToken();

  const router = useRouter();

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

  useEffect(() => {
    if (!token && !activeUser) {
      toast.info("Session expired. Please login to continue");
      const getUser = async () => {
        await request();
      };
    }

    if (isVendor) {
      toast.info("You're already a vendor");
      router.push("/");
    }
  }, [activeUser, token, data]);

  useEffect(() => {
    getUser();
  }, []);

  return <div className="w-full">{children}</div>;
};

export default PrivateRoute;
