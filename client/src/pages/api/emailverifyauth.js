import { auth } from "@/config/firebase";
import { apiRequest } from "@/utils/apiService";
import { handleFirebaseError } from "@/utils/resolveErrors";
import { FirebaseError } from "firebase/app";
import { signInWithEmailAndPassword } from "firebase/auth";
import { toast } from "react-toastify";

const emailVerifySignIn = async (email, password, setIsLoading) => {
  setIsLoading(true);
  try {
    const fbUser = await signInWithEmailAndPassword(auth, email, password);

    const { accessToken } = fbUser.user;

    const user = await apiRequest(
      "post",
      "auth/login",
      {
        email: email,
        password: password,
      },
      false,
      null,
      accessToken
    );

    if (user?.statusCode >= 300) {
      toast.error("Unexpected error! Please try again");
    }

    return {
      accessToken,
      user: user?.data,
      fbUser,
    };
  } catch (error) {
    let errorMessage = "An unexpected error occurred.";
    let returnValue = error.message;

    if (error instanceof FirebaseError) {
      errorMessage = handleFirebaseError(error);
      returnValue = error.message;
    } else if (error.response) {
      returnValue = error;
    } else {
      returnValue = error.message;
    }
    toast.error(returnValue);
  } finally {
      setIsLoading(false);
  
  }
};

export { emailVerifySignIn };
