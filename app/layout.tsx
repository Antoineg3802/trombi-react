import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ModalProvider } from "@/components/providers/ModalProvider";

const geistSans = Geist({
	variable: "--font-geist-sans",
	subsets: ["latin"],
});

const geistMono = Geist_Mono({
	variable: "--font-geist-mono",
	subsets: ["latin"],
});

export const metadata: Metadata = {
	title: "My Trombi",
	description: "Créer un trombinoscope",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body
				className={`w-dvw h-dvh bg-background ${geistSans.variable} ${geistMono.variable} antialiased bg-gradient-to-r from-blue-50 to-indigo-50 text-black font-medium relative`}
			>
				<ModalProvider>{children}</ModalProvider>
			</body>
		</html>
	);
}
