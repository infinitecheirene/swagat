import type { Metadata, Viewport } from "next";
import "./globals.css";
import Navbar from "../components/layout/navbar";
import Footer from "../components/layout/footer";
import PwaRegister from "../components/pwa-register";
import { CartProvider } from "../components/cart-provider";

import { Lora, Karla } from "next/font/google";

const lora = Lora({
  variable: "--font-lora",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const karla = Karla({
  variable: "--font-karla",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});


export const metadata: Metadata = {
  title: "Swagat - Indian Kitchen and Dining Room",
  description: "Experience the authentic flavours of India at Swagat.",
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
  themeColor: "#0d0d0b",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
          <html lang="en" className={`${lora.variable} ${karla.variable} h-full scroll-smooth antialiased`}>
      <body className="min-h-full">
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
