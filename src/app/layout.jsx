import { Krub } from "next/font/google";
import "./globals.css";
import Provider from "@/chakra-config/provider";
import { Footer, NavBar } from "@/components/organisms";
import { Toaster } from "sonner";
const krub = Krub({
  variable: "--font-krub",
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
});

export const metadata = {};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${krub.variable}`}>
        <Provider>
          <Toaster
            position="top-right"
            richColors
            toastOptions={{ style: { marginTop: "3.25rem" } }}
          />

          <NavBar />
          {children}
          <Footer />
        </Provider>
      </body>
    </html>
  );
}
