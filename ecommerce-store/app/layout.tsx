import type { Metadata } from "next";
import { Urbanist } from "next/font/google";

import Navbar from "@/components/navbar";
import FooterBar from "@/components/footer-bar";
import Footer from "@/components/footer";

import "./globals.css";
import ModalProvider from "@/providers/modal-provider";
import ToastProvider from "@/providers/toast-provider";

const font = Urbanist({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Store4U",
  description: "Project of a store for future clients",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={font.className}>
        <ModalProvider />
        <ToastProvider />
        <Navbar />
        {children}
        <FooterBar />
        <Footer />
      </body>
    </html>
  );
}
