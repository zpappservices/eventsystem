import { apiRequest } from "@/utils/apiService";
import { useState, useCallback } from "react";

const useApiRequest = ({
   method,
   url,
   data = {},
   headers = {},
   useToken = true,
   token,
}) => {
   const [responseData, setResponseData] = useState(null);
   const [error, setError] = useState(null);
   const [loading, setLoading] = useState(false);

   const request = useCallback(async () => {
      setLoading(true);
      setError(null);

      try {
         const response = await apiRequest(
            method,
            url,
            data,
            useToken,
            headers,
            token
         );
         setResponseData(response);
      } catch (err) {
         setError(err);
      } finally {
         setLoading(false);
      }
   }, [method, url, data, headers, useToken]);

   return { data: responseData, error, loading, request };
};

export default useApiRequest;
