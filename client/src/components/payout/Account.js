import React, { useEffect } from "react";
import BankAccount from "./BankAccount";
import useAuthToken from "@/hooks/useAuthToken";
import useApiRequest from "@/hooks/useApiRequest";

const Account = () => {
  const { activeUser, token } = useAuthToken();
  const { data, request } = useApiRequest({
    method: "get",
    url: `user/get-vendor-account/${activeUser}`,
    data: null,
    headers: {},
    useToken: true,
  });

  const getBankAccount = async () => {
    await request();
  };

  useEffect(() => {
    getBankAccount();
  }, []);

  console.log(data);
  return (
    <div className="flex flex-col gap-1">
      <p className="text-[20px] font-bold leading-[24px]">My Bank Account</p>
      <BankAccount />
    </div>
  );
};

export default Account;
