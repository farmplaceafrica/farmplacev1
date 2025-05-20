"use client";

import { PrivyProvider } from "@privy-io/react-auth";

export default function Providers({ children }: { children: React.ReactNode }) {
	return (
		<PrivyProvider
			appId='cmavo5aqs00qbl50nssafkvnh'
			// clientId='1750810399-5cbfenspufd700fj40qhf4ctppbp42p5.apps.googleusercontent.com'
			config={{
				// Create embedded wallets for users who don't have a wallet
				embeddedWallets: {
					createOnLogin: "users-without-wallets",
				},
			}}>
			{children}
		</PrivyProvider>
	);
}
