import type { Metadata, Viewport } from "next";
import "./globals.css";
import Navbar from "../components/layout/navbar";
import Footer from "../components/layout/footer";
import PwaRegister from "../components/pwa-register";
import SplashScreen from "../components/layout/splash-screen";
import { CartProvider } from "../components/cart-provider";

import { Lora, Karla } from "next/font/google";

const lora = Lora({
  variable: "--font-lora",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
});

const karla = Karla({
  variable: "--font-karla",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Swagat at Rada — Indian Kitchen & Dining Room, Makati",
  description:
    "Flavours rooted in tradition. Indian kitchen and dining room at 105 Rada Street, Legazpi Village, Makati. Order online, book a table, open daily 11:00 to 23:00.",
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "Swagat",
  },
  icons: {
    icon: "/icons/icon-192x192.png",
    apple: "/icons/icon-192x192.png",
  },
};

export const viewport: Viewport = {
  themeColor: "#0D0D0B",
  colorScheme: "dark",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${lora.variable} ${karla.variable} h-full scroll-smooth antialiased`}
    >
      <body className="min-h-full bg-[#0D0D0B] font-(family-name:--font-karla) text-white">
        <SplashScreen />
        <CartProvider>
          <PwaRegister />
          <Navbar />
          {children}
          <Footer />
        </CartProvider>
      </body>
    </html>
  );
}
