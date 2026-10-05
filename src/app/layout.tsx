import "bootstrap/dist/css/bootstrap.min.css";
import "./globals.css";

import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import AppNavbar from "@/components/layout/AppNavbar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Device Repair UI Improvements",
  description:
    "A cleaner, faster version of the device repair pages: fewer clicks and clearer status.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable}`}>
      <body>
        <AppNavbar />
        {children}
      </body>
    </html>
  );
}
