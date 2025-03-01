import { Geist, Geist_Mono, Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/my-components/Header";
import { CartProvider } from "./context/CartContext";
import CartDrawer from "@/components/my-components/cart-drawer/cartDrawer";
import Footer from "@/components/my-components/footer/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata = {
  title: "Euca Redesign",
  description: "Eccomerce website redesign",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${inter.variable} antialiased`}>
        <CartProvider>
          <CartDrawer />
          <Header />
          {children}
          <Footer />
        </CartProvider>
      </body>
    </html>
  );
}
