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
  const { token, activeUser } = useAuthToken()
console.log(activeUser, token)
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
        const { id } = user?.data?.existingUser;
        storeToken(id, token, true);

        toast.success("Google signin successful!");

        router.reload();
        closeModal();
      } else {
        toast.error(
          user?.message ||
            user?.code ||
            "Google signin failed! Please try again"
        );
      }
    } catch (error) {
      if (error instanceof FirebaseError) {
        const err = handleFirebaseError(error);
        toast.error(error.message);
      } else if (error.response) {
        console.error(error);
      } else {
        toast.error("An unexpected error occurred! Please try again");
        console.error("General error: ", error);
      }
    }
  };

  return (
    <>
      <button
        type="button"
        onClick={() => handleGoogleLogin("Google")}
        className="w-full flex justify-between items-center p-1 mt-4 font-medium text-black border border-black rounded transition-transform duration-200 ease-in-out hover:scale-[1.05]">
        <FcGoogle className="text-xl" />
        <p className="mr-[25%]"> Continue with Google</p>
      </button>
    </>
  );
};

export default GoogleSignin;
