import CryptoJS from "crypto-js";

const encryptionKey = "your_secret_key_here";
const isBrowser = typeof window !== "undefined";

const encryptToken = (token) => {
   if (!isBrowser) return null;
   return CryptoJS.AES.encrypt(token, encryptionKey).toString();
};

const decryptToken = (encryptedToken) => {
   try {
      const decryptedToken = CryptoJS.AES.decrypt(
         encryptedToken,
         encryptionKey
      );
      return decryptedToken.toString(CryptoJS.enc.Utf8);
   } catch (error) {
      console.error("Error decrypting token:", error);
      return null;
   }
};

const getActiveUser = () => {
   if (!isBrowser) return null;
   return sessionStorage.getItem("activeUser");
};

const getToken = () => {
   if (!isBrowser) return null;
   const encryptedToken = sessionStorage.getItem("token");
   if (!encryptedToken) return null;
   const decryptedToken = decryptToken(encryptedToken);
   return decryptedToken;
};

const storeToken = (userId, token, rememberMe) => {
   if (isBrowser) {
      const encryptedToken = encryptToken(token);
      sessionStorage.setItem("activeUser", userId);
      sessionStorage.setItem("token", encryptedToken);

      if (rememberMe) {
         localStorage.setItem("activeUser", userId);
         localStorage.setItem("token", token);
      }
   }
};

const removeToken = () => {
   if (isBrowser) {
      sessionStorage.removeItem("token");
      localStorage.removeItem("token");
   }
};

const setActiveUser = (userId) => {
   if (isBrowser) {
      sessionStorage.setItem("activeUser", userId);
   }
};

const clearActiveUser = () => {
   if (isBrowser) {
      sessionStorage.removeItem("activeUser");
      localStorage.removeItem("activeUser");
   }
};

const storeEmail = (email) => {
   if (isBrowser) {
      sessionStorage.setItem("verifyemail", email);
   }
};

const getEmail = () => {
   if (isBrowser) {
      return sessionStorage.getItem("verifyemail");
   }
};

const removeEmail = () => {
   if (isBrowser) {
      return sessionStorage.removeItem("verifyemail");
   }
};


const storeCredentials = (email, password) => {
   if (isBrowser) {
      const credentials = {
         email: email,
         password: password,
      };

      const encryptedCredentials = CryptoJS.AES.encrypt(
         JSON.stringify(credentials),
         encryptionKey
      );

      sessionStorage.setItem("credentials", encryptedCredentials.toString());
   }
};

const retrieveCredentials = () => {
   if (isBrowser) {
      const encryptedCredentials = sessionStorage.getItem("credentials");

      if (!encryptedCredentials) return null;

      const decryptedCredentials = CryptoJS.AES.decrypt(
         encryptedCredentials,
         encryptionKey
      );

      const credentials = JSON.parse(
         decryptedCredentials.toString(CryptoJS.enc.Utf8)
      );

      return credentials;
   }
};

const removeCredentials = () => {
   if (isBrowser) {
      sessionStorage.removeItem("credentials");
   }
};

export {
   storeToken,
   setActiveUser,
   getActiveUser,
   getToken,
   removeToken,
   clearActiveUser,
   getEmail,
   storeEmail,
   removeEmail,
   storeCredentials,
   retrieveCredentials,
   removeCredentials,
   encryptToken,
   decryptToken
};
