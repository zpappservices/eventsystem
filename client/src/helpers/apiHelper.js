import { apiRequest } from "@/utils/apiService";

const apiHelper = async (
  endpoint,
  method = "get",
  payload = null,
  startLoading = null,
  stopLoading = null,
  headers = {},
  token = null
) => {
  startLoading?.();

  try {
    const response = await apiRequest(
      method,
      endpoint,
      payload,
      true,
      headers,
      token
    );

    const { statusCode, data: result, message = "" } = response || {};

    if (statusCode >= 200 && statusCode < 303) {
      return { success: true, data: result, message };
    } else {
      const errorMessage =
        response?.error || response?.message || "Operation failed!";
      return { success: false, error: response, message: errorMessage };
    }
  } catch (error) {
    const errorMessage =
      (Array.isArray(error?.response?.data?.message)
        ? error?.response?.data?.message[0]
        : error?.response?.data?.message) ||
      error?.message ||
      "An unexpected error occurred.";
    return { success: false, error, message: errorMessage };
  } finally {
    stopLoading?.();
  }
};

export default apiHelper;
