import { auth } from "@/config/firebase";
import useAuthToken from "@/hooks/useAuthToken";
import { apiRequest } from "@/utils/apiService";
import { handleFirebaseError } from "@/utils/resolveErrors";
import { storeToken } from "@/utils/token";
import { FirebaseError } from "firebase/app";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { useRouter } from "next/router";
import React from "react";
import { FcGoogle } from "react-icons/fc";
import { toast } from "react-toastify";

const GoogleSignin = ({ closeModal }) => {
  const router = useRouter();

  const { storeUserToken } = useAuthToken();

  const handleGoogleLogin = async () => {
    try {
      const provider = new GoogleAuthProvider();

      provider.setCustomParameters({
        prompt: "select_account",
      });

      const fbUser = await signInWithPopup(auth, provider);
      const token = await fbUser.user.getIdToken();
      const { displayName, email, providerData, uid, emailVerified } =
        fbUser.user;

      const details = {
        email: email,
        provider: providerData[0].providerId,
        displayName: displayName,
        uid: uid,
        emailVerified: emailVerified,
      };

      const user = await apiRequest(
        "post",
        "auth/singlesignon",
        details,
        false,
        null,
        token
      );

      if (user?.statusCode >= 200 && user?.statusCode < 300) {
        const id = user?.data?.existingUser?.id;
        const role = user?.data?.existingUser?.role;

        if (router.pathname === "/auth/vendor/login") {
          if (role === "USER") {
            toast.error("Account is not a vendor account!");
            return;
          } else {
            toast.success("Google signin successful!");
            storeUserToken(id, token, true);
          }
        } else {
          closeModal && closeModal();
          toast.success("Google signin successful!");
          storeUserToken(id, token, true);
          router.reload();
        }
      } else {
        toast.error(
          user?.code ||
            user?.message ||
            "Google signin failed! Please try again"
        );
      }
    } catch (error) {
      if (error instanceof FirebaseError) {
        const err = handleFirebaseError(error);
        toast.error(error.message);
      } else if (error.response) {
      } else {
        toast.error("An unexpected error occurred! Please try again");
      }
    }
  };

  return (
    <>
      <button
        type="button"
        onClick={() => handleGoogleLogin("Google")}
        className="w-full flex justify-center gap-3 duration-300 items-center p-1 py-2.5 mt-4 font-medium text-black border border-gray-500 rounded-[5px] transition-transform ease-in-out hover:scale-[1.05]">
        <FcGoogle className="text-xl" />
        <p className="text-gray-800 text-sm"> Continue with Google</p>
      </button>
    </>
  );
};

export default GoogleSignin;
