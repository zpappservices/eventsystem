import { useState, useEffect, useCallback } from "react";
import {
   storeToken,
   setActiveUser,
   getActiveUser,
   getToken,
   removeToken,
   clearActiveUser,
} from "../utils/token";

const useAuthToken = () => {
   const [activeUser, setActiveUserState] = useState(getActiveUser());
   const [token, setTokenState] = useState(getToken());

   useEffect(() => {
      setTokenState(getToken());
   }, [activeUser]);

   const storeUserToken = useCallback((userId, token, rememberMe) => {
      storeToken(userId, token, rememberMe);
      setActiveUser(userId);
      setActiveUserState(userId);
      setTokenState(token);
   }, []);

   const clearUserToken = useCallback(() => {
      removeToken();
      clearActiveUser();
      setActiveUserState(null);
      setTokenState(null);
   }, []);

   return {
      activeUser,
      token,
      storeUserToken,
      clearUserToken,
   };
};

export default useAuthToken;
