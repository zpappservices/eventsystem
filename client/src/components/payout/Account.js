import BankAccount from "./BankAccount";

const Account = () => {
  return (
    <div className="flex flex-col gap-1">
      <p className="text-[20px] font-bold leading-[24px]">My Bank Account</p>
      <BankAccount />
    </div>
  );
};

export default Account;
