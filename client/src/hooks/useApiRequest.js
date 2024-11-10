import { useState, useCallback } from "react";
import { apiRequest } from "../api/apiServices";

const useApiRequest = ({
   method,
   url,
   data = {},
   headers = {},
   useToken = true,
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
            headers
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
