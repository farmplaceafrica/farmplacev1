import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import ClientMeshProvider from "@/components/context/CustomMeshProvider";

const geistSans = Geist({
	variable: "--font-geist-sans",
	subsets: ["latin"],
});

const geistMono = Geist_Mono({
	variable: "--font-geist-mono",
	subsets: ["latin"],
});

export const metadata: Metadata = {
	title: "FarmPlace Africa - Empowering African Farmers Through Technology",
	description:
		"FarmPlace Africa is a digital platform empowering African farmers to create their own online marketplace with secure transactions, resources, and AI-powered support.",
	keywords:
		"FarmPlace, African farmers, digital marketplace, agriculture, digital ID, mobile-first design, farming news, AI chatbot, secure transactions, agricultural development, Africa tech, sustainable agriculture",
	authors: { name: "FarmPlace Africa" },
	openGraph: {
		title: "FarmPlace Africa - Empowering African Farmers Through Technology",
		description:
			"FarmPlace Africa helps African farmers by providing a digital platform to build their marketplace, access resources, and connect with buyers, while ensuring secure transactions and sustainable agricultural practices.",
		url: "https://www.farmplaceafrica.com",
		siteName: "FarmPlace Africa",
		images: [
			{
				url: "URL_TO_IMAGE",
				width: 1200,
				height: 630,
				alt: "FarmPlace Africa",
			},
		],
		type: "website",
	},
	twitter: {
		card: "summary_large_image",
		title: "FarmPlace Africa - Empowering African Farmers Through Technology",
		description:
			"FarmPlace Africa offers African farmers a platform to build digital stores, access farming resources, and connect with buyers. Features include secure ID verification, AI support, and mobile-first design.",
		images: "URL_TO_IMAGE", // Replace with actual URL of your image
	},
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang='en'>
			<ClientMeshProvider>
				{/* <CustomMeshProvider> */}
				<body
					className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
					{children}
				</body>
				{/* </CustomMeshProvider> */}
			</ClientMeshProvider>
		</html>
	);
}
