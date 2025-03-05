import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/my-components/Header";
import { CartProvider } from "./context/CartContext";
import CartDrawer from "@/components/my-components/cart-drawer/cartDrawer";
import Footer from "@/components/my-components/footer/Footer";
import ScrollToTopButton from "@/components/my-components/ScrollToTopButton";
import Layout from "@/components/my-components/PreLoader";
import { WishlistProvider } from "./context/WishlistContext";

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
        <Layout>
          <CartProvider>
            <WishlistProvider>
              <CartDrawer />

              <Header />
              {children}
              <Footer />

              <ScrollToTopButton />
            </WishlistProvider>
          </CartProvider>
        </Layout>
      </body>
    </html>
  );
}
