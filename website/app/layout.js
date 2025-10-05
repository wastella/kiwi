import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "./navbar/navbar";
import { Suspense } from "react";

const inter = Inter({
  subsets: ["latin"],
});

export const metadata = {
  title: "",
  description: "",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${inter.className} antialiased`}>
        <Navbar />
        <Suspense>{children}</Suspense>
      </body>
    </html>
  );
}
