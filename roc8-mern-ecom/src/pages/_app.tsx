import { type AppType } from "next/app";
import { Inter } from "next/font/google";

import { api } from "~/utils/api";

import "~/styles/globals.css";
import Header from "~/components/header/Header";
import { AppProvider } from "~/context/appContext";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});
const MyApp: AppType = ({ Component, pageProps }) => {
  return (
    <AppProvider>
      <main className={`font-sans ${inter.variable}`}>
        <Header />
        <Component {...pageProps} />
        <ToastContainer position="bottom-left" pauseOnHover={true} />
      </main>
    </AppProvider>
  );
};

export default api.withTRPC(MyApp);
