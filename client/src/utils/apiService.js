import axios from "axios";
import { getToken } from "../utils/token";

const url = "http://34.171.52.201:4000";

const apiInstance = axios.create({
   baseURL: `${url}/api/`,
   headers: {
      "Content-Type": "application/json",
   },
});

apiInstance.interceptors.request.use(
   (config) => {
      if (config.useToken) {
         const token = getToken();
         if (token) {
            config.headers.Authorization = `Bearer ${token}`;
         }
      }
      return config;
   },
   (error) => Promise.reject(error)
);

export const apiRequest = async (
   method,
   url,
   data = {},
   useToken = false,
   headers = {},
   token
) => {
   const config = {
      method,
      url,
      headers: {
         ...headers,
      },
      useToken,
   };

   if (method === "get") {
   } else {
      config.data = data;
   }

   if (token) {
      apiInstance.defaults.headers.Authorization = `Bearer ${token}`;
   }

   const response = await apiInstance(config);

   return response.data;
};
