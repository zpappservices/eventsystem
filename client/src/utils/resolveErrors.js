import { toast } from "react-toastify";


const resolveErrors = (errorResponse, setErrors, errors) => {
  let newErrors = {};

  if (
    errorResponse &&
    errorResponse.errors &&
    Array.isArray(errorResponse.errors)
  ) {
    errorResponse.errors.forEach((error) => {
      if (error.field) {
        newErrors[error.field] = error.message || "An error occurred.";
      } else {
        if (!newErrors.general) {
          newErrors.general = [];
        }
        newErrors.general.push(error.message || "An error occurred.");
      }
    });
  } else {
    newErrors = errors;
  }

  setErrors(newErrors);
};

const handleFirebaseError = (error) => {
  let errorMessage;
  if (error.code) {
    switch (error.code) {
      case "auth/invalid-email":
        errorMessage = "Invalid email format.";
        break;
      case "auth/user-disabled":
        errorMessage = "This user account is disabled.";
        break;
      case "auth/user-not-found":
        errorMessage = "No user associated with this email.";
        break;
      case "auth/wrong-password":
        errorMessage = "Incorrect password.";
        break;
      default:
        errorMessage = "Authentication error!";
        break;
    }
  } else {
    errorMessage = "Unknown Error!";
  }
  return errorMessage;
};

const handleError = (error, errMsg) => {
  let message = errMsg || "An unexpected error occurred.";

  if (error && error.errors && Array.isArray(error.errors)) {
    if (error.errors.length > 0 && error.errors[0] && error.errors[0].message) {
      message = error.errors[0].message;
    } else {
      message = errMsg || "An error occurred. Please try again.";
    }
  } else if (error && error.status) {
    switch (error.status) {
      case 400:
        message = "Bad Request. Please check the data you've provided.";
        break;
      case 401:
        message = "Unauthorized. Please log in and try again.";
        break;
      case 403:
        message =
          "Forbidden. You do not have permission to access this resource.";
        break;
      case 404:
        message = "Resource not found. Please check the URL and try again.";
        break;
      case 500:
        message = "Server error. Please try again later.";
        break;
      case 502:
        message =
          "Bad Gateway. The server received an invalid response. Please try again later.";
        break;
      case 503:
        message = "Service unavailable. Please try again later.";
        break;
      default:
        message = errMsg || "An unexpected error occurred. Please try again.";
        break;
    }
  } else if (error === "Failed to fetch") {
    message = "Please check your internet connection and try again.";
  } else if (error === "AbortError") {
    message = "The request was aborted. Please try again later.";
  } else if (error === "TypeError") {
    message = "An unexpected network error occurred. Please try again later.";
  } else if (error === "Network Error") {
    message = "Please check your internet connection and try again.";
  }

  toast.error(message);
};

export { resolveErrors, handleError, handleFirebaseError };
