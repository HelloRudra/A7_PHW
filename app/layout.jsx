import "./globals.css";
import { Toaster } from "react-hot-toast";
import Header from "@/components/Header";
import Ticker from "@/components/Ticker";
import Footer from "@/components/Footer";
import { getCategories, getProducts } from "@/lib/api";
export const metadata = { title: "বাজার দর", description: "প্রয়োজনীয় পণ্যের দাম এক নজরে" };
export default async function RootLayout({ children }) {
  const [categories, products] = await Promise.all([getCategories(), getProducts()]);
  return (
    <html lang="bn" data-theme="bazardor">
      <head><link href="https://fonts.googleapis.com/css2?family=Hind+Siliguri:wght@400;600;700&display=swap" rel="stylesheet" /></head>
      <body>
        <Header categories={categories} />
        <Ticker products={products} />
        <main className="mx-auto min-h-[60vh] max-w-6xl px-4 pb-12 pt-6">{children}</main>
        <Footer />
        <Toaster toastOptions={{ style: { fontFamily: "inherit" } }} />
      </body>
    </html>
  );
}
