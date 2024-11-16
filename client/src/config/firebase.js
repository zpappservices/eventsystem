import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
   apiKey: "AIzaSyDJ0Gz0ELiN4-_z0PC09AJXF0g3Y5Ol8_0",
   authDomain: "zp-et247.firebaseapp.com",
   projectId: "zp-et247",
   storageBucket: "zp-et247.appspot.com",
   messagingSenderId: "952293170399",
   appId: "1:952293170399:web:0b8980419ef85a81b55d6a",
   measurementId: "G-Z1QM7MK5V8",
};

console.log(firebaseConfig)

const app = initializeApp(firebaseConfig, process.env);
export const auth = getAuth(app);
export default app;
