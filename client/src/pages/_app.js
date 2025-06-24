import { TicketProvider } from "@/context/TicketContext";
import "@/styles/globals.css";
import Head from "next/head";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function App({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>Zafariplus</title>
      </Head>

      <TicketProvider>
        <Component {...pageProps} />
        <ToastContainer theme="colored" />
      </TicketProvider>
    </>
  );
}
