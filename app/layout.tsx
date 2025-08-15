import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/src/components/atoms/sonner";

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
			<head>
				<script
					async
					crossOrigin="anonymous"
					src="//unpkg.com/react-scan/dist/auto.global.js"
				/>
			</head>
			<body
				className={`${geistSans.variable} ${geistMono.variable} antialiased w-full h-screen overflow-hidden`}
			>
				<Toaster />
				{children}
			</body>
		</html>
	);
}
