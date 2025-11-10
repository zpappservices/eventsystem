import useApiRequest from "@/hooks/useApiRequest";
import useAuthToken from "@/hooks/useAuthToken";
import React, { useEffect } from "react";

const Profile = () => {
  const { activeUser, token } = useAuthToken();
  const { data, request } = useApiRequest({
    method: "get",
    url: `user/getvendorbyuserid/${activeUser}`,
    useToken: true,
  });

  const getUser = async () => {
    if (activeUser) await request();
  };

  useEffect(() => {
    getUser();
  }, [activeUser, token]);

  const { firstName } = data?.data || {};
  return (
    <div className="text-[15px] sm:text-[20px] leading-[20px] ms-auto">
      {" "}
      Welcome <span className="capitalize font-bold">{firstName}</span>
    </div>
  );
};

export default Profile;
