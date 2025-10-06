import Layout from "@/components/dashboard/Layout";
import Button from "@/components/widgets/Button";
import TextField from "@/components/widgets/TextField";
import { auth } from "@/config/firebase";
import useLoading from "@/hooks/useLoading";
import { EmailAuthProvider, reauthenticateWithCredential, updatePassword } from "firebase/auth";
import { usePathname } from "next/navigation";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

const settings = () => {
  const [form, setForm] = useState({
    OldPassword: "",
    NewPassword: "",
    ConfirmPassword: "",
  });
  const [isComplete, setIsComplete] = useState(false);

  const pathname = usePathname();
  const { push } = useRouter();
  const { isLoading, startLoading, stopLoading } = useLoading();
  const router = useRouter();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  const handleChangePassword = async () => {
    if (isLoading) return;
    startLoading();

    try {
      const user = auth.currentUser;
      if (!user || !user.email) {
        toast.error("No authenticated user found.");
        return;
      }

      try {
        const credential = EmailAuthProvider.credential(
          user.email,
          form.OldPassword
        );
        await reauthenticateWithCredential(user, credential);
      } catch (err) {
        toast.error("Old password is incorrect.");
        return;
      }

      if (form.NewPassword !== form.ConfirmPassword) {
        toast.error("New password and confirm password do not match.");
        return;
      }

      await updatePassword(user, form.NewPassword);

      toast.success("Password changed successfully");
      setForm({
        OldPassword: "",
        NewPassword: "",
        ConfirmPassword: "",
      });
    } catch (error) {
      console.error("Password change error:", error);
      toast.error(error.message || "An unexpected error occurred");
    } finally {
      stopLoading();
    }
  };

  useEffect(() => {
    const { OldPassword, NewPassword, ConfirmPassword } = form;
    setIsComplete(!!OldPassword && !!NewPassword && !!ConfirmPassword);
  }, [form]);

  return (
    <Layout>
      <div className="border-neutrals100 max-w-[1190px] w-full py-5 space-y-10">
        <p className="font-bold text-xl sm:text-2xl text-black ">Settings</p>

        <div className="flex items-center">
          {[
            { title: "Account security", path: "/dashboard/settings" },/* 
            {
              title: "Billing/Fees",
              path: "/dashboard/settings/billing-settings",
            },
            {
              title: "Team management",
              path: "/dashboard/settings/team-settings",
            },
            {
              title: "Notifications",
              path: "/dashboard/settings/notification-settings",
            }, */
          ]?.map((item, index) => (
            <div
              className={`border-b text-xs sm:text-sm px-5 py-3 relative cursor-pointer duration-500 transition-all ${
                item.path === pathname ? "text-primary" : ""
              }`}
              key={index}
              onClick={() => push(item.path)}
            >
              {item.title}
              <div
                className={`border-2 rounded-lg absolute -bottom-[3px] left-0 w-full transition-opacity ${
                  item.path === pathname
                    ? "border-primary opacity-100"
                    : "opacity-0"
                }`}
              ></div>
            </div>
          ))}
        </div>

        <div className="rounded-[10px] md:border md:bg-baseWhite border-neutrals200 md:p-10 space-y-5">
          <p className="text-xl text-neutrals600 font-bold">
            Change your password
          </p>

          <div className="space-y-5">
            <TextField
              value={form.OldPassword}
              onChange={handleInputChange}
              label="Current password"
              style="!rounded-[6px]"
              name="OldPassword"
              placeholder="Enter current password"
              password
              passwordToggleClass="!top-10"
            />

            <TextField
              value={form.NewPassword}
              onChange={handleInputChange}
              label="New password"
              style="!rounded-[6px]"
              name="NewPassword"
              placeholder="Enter new password"
              password
              passwordToggleClass="!top-10"
            />

            <TextField
              value={form.ConfirmPassword}
              onChange={handleInputChange}
              label="Confirm new password"
              style="!rounded-[6px]"
              name="ConfirmPassword"
              placeholder="Enter new password"
              password
              passwordToggleClass="!top-10"
            />

            <Button
              className="!ms-auto !mt-10"
              onClick={handleChangePassword}
              isLoading={isLoading}
              disabled={!isComplete || isLoading}
            >
              Update password
            </Button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default settings;
