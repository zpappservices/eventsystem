import { TicketProvider } from "@/context/TicketContext";
import "@/styles/globals.css";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Head from "next/head";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const customTheme = createTheme({
  palette: {
    primary: {
      main: "#068A4F", 
    },
    secondary: {
      main: "#F58634",
    },
  },
});

export default function App({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>Zafariplus</title>
      </Head>

      <ThemeProvider theme={customTheme}>
        <TicketProvider>
          <Component {...pageProps} />
          <ToastContainer theme="colored" />
        </TicketProvider>
      </ThemeProvider>
    </>
  );
}
