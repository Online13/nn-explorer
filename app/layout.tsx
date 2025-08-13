import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Explore AI",
  description: "Explore the architecture of AI",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="w-full h-screen overflow-hidden">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased w-full h-screen overflow-hidden`}
      >
        {children}
      </body>
    </html>
  );
}
