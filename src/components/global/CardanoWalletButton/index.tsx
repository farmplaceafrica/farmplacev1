// "use client";
// import { useState, useEffect } from "react";
// import { useWallet, useWalletList, useAddress } from "@meshsdk/react";
// import Image from "next/image";

// interface Wallet {
// 	name: string;
// 	icon: string;
// }

// const ConnectWallet = () => {
// 	const [selectedWallet, setSelectedWallet] = useState<Wallet | null>(null);
// 	const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);
// 	const { connect, disconnect, connecting, connected, wallet } = useWallet();
// 	const wallets = useWalletList();
// 	const address = useAddress();

// 	// Directly get the address from wallet object as an alternative
// 	const [walletAddress, setWalletAddress] = useState<string | null>(null);

// 	useEffect(() => {
// 		console.log("Wallets available:", wallets);
// 		console.log("Connected:", connected);
// 		console.log("Address from useAddress:", address || "Address not available");

// 		// Try to get address directly from the wallet object
// 		if (connected && wallet) {
// 			wallet
// 				.getUsedAddresses()
// 				.then((addresses) => {
// 					if (addresses && addresses.length > 0) {
// 						console.log("Address from wallet.getUsedAddresses:", addresses[0]);
// 						setWalletAddress(addresses[0]);
// 					}
// 				})
// 				.catch((err) => {
// 					console.error("Error getting addresses:", err);
// 				});

// 			// Alternative way to get the address
// 			wallet
// 				.getChangeAddress()
// 				.then((addr) => {
// 					console.log("Address from wallet.getChangeAddress:", addr);
// 					if (!walletAddress) {
// 						setWalletAddress(addr);
// 					}
// 				})
// 				.catch((err) => {
// 					console.error("Error getting change address:", err);
// 				});
// 		}
// 	}, [wallets, connected, address, wallet]);

// 	useEffect(() => {
// 		const storedWallet = localStorage.getItem("selectedWallet");
// 		if (storedWallet) {
// 			const parsedWallet = JSON.parse(storedWallet) as Wallet;
// 			setSelectedWallet(parsedWallet);
// 			connect(parsedWallet.name).catch((err) =>
// 				console.error("Failed to reconnect wallet:", err)
// 			);
// 		}
// 	}, [connect]);

// 	const handleWalletSelection = (wallet: Wallet): void => {
// 		// If we already have a wallet connected, disconnect it first
// 		if (connected && selectedWallet) {
// 			disconnect();
// 			// Small delay to ensure the wallet is fully disconnected before connecting to the new one
// 			setTimeout(() => {
// 				localStorage.setItem("selectedWallet", JSON.stringify(wallet));
// 				setSelectedWallet(wallet);
// 				connect(wallet.name).catch((err) =>
// 					console.error("Wallet connection failed:", err)
// 				);
// 			}, 300);
// 		} else {
// 			localStorage.setItem("selectedWallet", JSON.stringify(wallet));
// 			setSelectedWallet(wallet);
// 			connect(wallet.name).catch((err) =>
// 				console.error("Wallet connection failed:", err)
// 			);
// 		}
// 		setIsDropdownOpen(false);
// 	};

// 	const handleDisconnect = (): void => {
// 		localStorage.removeItem("selectedWallet");
// 		setSelectedWallet(null);
// 		setWalletAddress(null);
// 		disconnect();
// 	};

// 	const toggleDropdown = (): void => {
// 		setIsDropdownOpen(!isDropdownOpen);
// 	};

// 	// Close dropdown if clicked outside
// 	useEffect(() => {
// 		function handleClickOutside(event: MouseEvent) {
// 			if (isDropdownOpen && event.target instanceof Element) {
// 				const dropdown = document.querySelector(".wallet-dropdown");
// 				if (dropdown && !dropdown.contains(event.target)) {
// 					setIsDropdownOpen(false);
// 				}
// 			}
// 		}

// 		document.addEventListener("mousedown", handleClickOutside);
// 		return () => {
// 			document.removeEventListener("mousedown", handleClickOutside);
// 		};
// 	}, [isDropdownOpen]);

// 	// Format address for display (truncate it)
// 	const formatAddress = (addr: string): string => {
// 		if (!addr) return "";
// 		return `${addr.slice(0, 6)}...${addr.slice(-4)}`;
// 	};

// 	// Button text based on connection state
// 	const getButtonText = (): string => {
// 		if (connecting) {
// 			return "Connecting...";
// 		} else if (connected) {
// 			// Try to use any available address source
// 			const displayAddress = address || walletAddress;
// 			if (displayAddress) {
// 				return `${selectedWallet?.name}: ${formatAddress(displayAddress)}`;
// 			}
// 			return `${selectedWallet?.name}: Connected`;
// 		} else if (selectedWallet) {
// 			return `Disconnect ${selectedWallet.name}`;
// 		} else {
// 			return "Connect Wallet";
// 		}
// 	};

// 	return (
// 		<div className='relative'>
// 			<button
// 				onClick={selectedWallet ? handleDisconnect : toggleDropdown}
// 				className='px-4 py-2 bg-green-600 text-white rounded-lg'>
// 				{getButtonText()}
// 			</button>

// 			{isDropdownOpen && !selectedWallet && !connecting && (
// 				<div className='absolute bg-white border rounded-lg shadow-lg p-4'>
// 					<h3>Select a Wallet</h3>
// 					<ul>
// 						{wallets.map((wallet) => (
// 							<li
// 								key={wallet.name}
// 								className='cursor-pointer p-2 hover:bg-gray-100'
// 								onClick={() => handleWalletSelection(wallet)}>
// 								<Image
// 									src={wallet.icon}
// 									alt={wallet.name}
// 									width={24}
// 									height={24}
// 									className='inline-block mr-2'
// 								/>
// 								{wallet.name}
// 							</li>
// 						))}
// 					</ul>
// 				</div>
// 			)}
// 		</div>
// 	);
// };

// export default ConnectWallet;

"use client";
import { useState, useEffect } from "react";
import { useWallet, useWalletList, useAddress } from "@meshsdk/react";
import Image from "next/image";

interface Wallet {
	name: string;
	icon: string;
	downloadUrl?: string;
}

// Default wallet download URLs
const WALLET_DOWNLOAD_URLS = {
	eternl: "https://eternl.io/app/mainnet/welcome",
	yoroi: "https://yoroi-wallet.com",
	nami: "https://namiwallet.io",
	flint: "https://flint-wallet.com",
	typhon: "https://typhonwallet.io",
	gerowallet: "https://gerowallet.io",
	lace: "https://www.lace.io",
};

const ConnectWallet = () => {
	const [selectedWallet, setSelectedWallet] = useState<Wallet | null>(null);
	const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);
	const { connect, disconnect, connecting, connected, wallet } = useWallet();
	const wallets = useWalletList();
	const address = useAddress();
	const [walletAddress, setWalletAddress] = useState<string | null>(null);
	const [showNoWalletsMessage, setShowNoWalletsMessage] =
		useState<boolean>(false);

	// Enhanced wallet list with download URLs
	const enhancedWallets = wallets.map((wallet) => ({
		...wallet,
		downloadUrl:
			WALLET_DOWNLOAD_URLS[
				wallet.name.toLowerCase() as keyof typeof WALLET_DOWNLOAD_URLS
			],
	}));

	// Check if wallets are available
	useEffect(() => {
		if (wallets.length === 0) {
			setShowNoWalletsMessage(true);
		} else {
			setShowNoWalletsMessage(false);
		}
	}, [wallets]);

	useEffect(() => {
		console.log("Wallets available:", wallets);
		console.log("Connected:", connected);
		console.log("Address from useAddress:", address || "Address not available");

		// Try to get address directly from the wallet object
		if (connected && wallet) {
			wallet
				.getUsedAddresses()
				.then((addresses) => {
					if (addresses && addresses.length > 0) {
						console.log("Address from wallet.getUsedAddresses:", addresses[0]);
						setWalletAddress(addresses[0]);
					}
				})
				.catch((err) => {
					console.error("Error getting addresses:", err);
				});

			// Alternative way to get the address
			wallet
				.getChangeAddress()
				.then((addr) => {
					console.log("Address from wallet.getChangeAddress:", addr);
					if (!walletAddress) {
						setWalletAddress(addr);
					}
				})
				.catch((err) => {
					console.error("Error getting change address:", err);
				});
		}
	}, [wallets, connected, address, wallet, walletAddress]);

	useEffect(() => {
		const storedWallet = localStorage.getItem("selectedWallet");
		if (storedWallet) {
			const parsedWallet = JSON.parse(storedWallet) as Wallet;
			setSelectedWallet(parsedWallet);
			connect(parsedWallet.name).catch((err) =>
				console.error("Failed to reconnect wallet:", err)
			);
		}
	}, [connect]);

	const handleWalletSelection = (wallet: Wallet): void => {
		// If we already have a wallet connected, disconnect it first
		if (connected && selectedWallet) {
			disconnect();
			// Small delay to ensure the wallet is fully disconnected before connecting to the new one
			setTimeout(() => {
				localStorage.setItem("selectedWallet", JSON.stringify(wallet));
				setSelectedWallet(wallet);
				connect(wallet.name).catch((err) =>
					console.error("Wallet connection failed:", err)
				);
			}, 300);
		} else {
			localStorage.setItem("selectedWallet", JSON.stringify(wallet));
			setSelectedWallet(wallet);
			connect(wallet.name).catch((err) =>
				console.error("Wallet connection failed:", err)
			);
		}
		setIsDropdownOpen(false);
	};

	const handleDisconnect = (): void => {
		localStorage.removeItem("selectedWallet");
		setSelectedWallet(null);
		setWalletAddress(null);
		disconnect();
	};

	const toggleDropdown = (): void => {
		setIsDropdownOpen(!isDropdownOpen);
	};

	// Close dropdown if clicked outside
	useEffect(() => {
		function handleClickOutside(event: MouseEvent) {
			if (isDropdownOpen && event.target instanceof Element) {
				const dropdown = document.querySelector(".wallet-dropdown");
				if (dropdown && !dropdown.contains(event.target)) {
					setIsDropdownOpen(false);
				}
			}
		}

		document.addEventListener("mousedown", handleClickOutside);
		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
		};
	}, [isDropdownOpen]);

	// Format address for display (truncate it)
	const formatAddress = (addr: string): string => {
		if (!addr) return "";
		return `${addr.slice(0, 6)}...${addr.slice(-4)}`;
	};

	// Button text based on connection state
	const getButtonText = (): string => {
		if (connecting) {
			return "Connecting...";
		} else if (connected) {
			// Try to use any available address source
			const displayAddress = address || walletAddress;
			if (displayAddress) {
				return formatAddress(displayAddress);
			}
			return "Connected";
		} else if (selectedWallet) {
			return `Disconnect ${selectedWallet.name}`;
		} else {
			return "Connect Wallet";
		}
	};

	const getButtonIcon = () => {
		if (connected && selectedWallet) {
			return (
				<Image
					src={selectedWallet.icon}
					alt={selectedWallet.name}
					width={20}
					height={20}
					className='mr-2'
				/>
			);
		}
		return null;
	};

	return (
		<div className='relative font-sans'>
			{/* Main wallet button */}
			<button
				onClick={connected ? handleDisconnect : toggleDropdown}
				className='px-4 py-2 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white rounded-lg shadow-md transition-all duration-200 flex items-center justify-center min-w-[160px]'>
				{connecting && (
					<svg
						className='animate-spin -ml-1 mr-2 h-4 w-4 text-white'
						xmlns='http://www.w3.org/2000/svg'
						fill='none'
						viewBox='0 0 24 24'>
						<circle
							className='opacity-25'
							cx='12'
							cy='12'
							r='10'
							stroke='currentColor'
							strokeWidth='4'></circle>
						<path
							className='opacity-75'
							fill='currentColor'
							d='M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z'></path>
					</svg>
				)}
				{getButtonIcon()}
				<span>{getButtonText()}</span>
				{!connecting && !connected && (
					<svg
						className='ml-2 h-4 w-4'
						fill='none'
						stroke='currentColor'
						viewBox='0 0 24 24'
						xmlns='http://www.w3.org/2000/svg'>
						<path
							strokeLinecap='round'
							strokeLinejoin='round'
							strokeWidth={2}
							d='M19 9l-7 7-7-7'
						/>
					</svg>
				)}
			</button>

			{/* Connected wallet info - shows below the button when connected */}
			{/* {connected && selectedWallet && (
				<div className='mt-2 bg-white border border-green-100 rounded-lg p-2 text-xs text-gray-600 shadow-sm'>
					<div className='flex items-center mb-1'>
						<Image
							src={selectedWallet.icon}
							alt={selectedWallet.name}
							width={16}
							height={16}
							className='mr-1'
						/>
						<span className='font-medium'>{selectedWallet.name}</span>
					</div>
					<div className='truncate max-w-[200px]'>
						{address || walletAddress || "Address not available"}
					</div>
				</div>
			)} */}

			{/* Wallet selection dropdown */}
			{isDropdownOpen && (
				<div className='absolute mt-2 bg-white border border-gray-200 rounded-lg shadow-lg p-4 z-10 wallet-dropdown w-[280px] animate-fadeIn'>
					<h3 className='text-lg font-semibold text-gray-800 border-b pb-2 mb-3'>
						Select a Wallet
					</h3>

					{enhancedWallets.length > 0 ? (
						<ul className='mt-2 space-y-1'>
							{enhancedWallets.map((wallet) => (
								<li
									key={wallet.name}
									className={`cursor-pointer p-3 hover:bg-gray-50 rounded-md flex items-center ${
										selectedWallet?.name === wallet.name
											? "bg-green-50 border border-green-100"
											: ""
									} transition-all duration-200`}
									onClick={() => handleWalletSelection(wallet)}>
									<Image
										src={wallet.icon}
										alt={wallet.name}
										width={28}
										height={28}
										className='mr-3'
									/>
									<div>
										<div className='font-medium text-gray-800'>
											{wallet.name}
										</div>
										<div className='text-xs text-gray-500'>
											Click to connect
										</div>
									</div>
								</li>
							))}
						</ul>
					) : (
						<div className='py-4 text-center'>
							<div className='text-amber-500 mb-2'>
								<svg
									xmlns='http://www.w3.org/2000/svg'
									className='h-12 w-12 mx-auto'
									fill='none'
									viewBox='0 0 24 24'
									stroke='currentColor'>
									<path
										strokeLinecap='round'
										strokeLinejoin='round'
										strokeWidth={2}
										d='M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z'
									/>
								</svg>
							</div>
							<h4 className='text-lg font-medium mb-2'>No Wallets Found</h4>
							<p className='text-gray-600 mb-4'>
								To use this application, you need to install a Cardano wallet
								extension.
							</p>
							<div className='space-y-2'>
								<a
									href='https://eternl.io/app/mainnet/welcome'
									target='_blank'
									rel='noopener noreferrer'
									className='block bg-blue-50 hover:bg-blue-100 text-blue-700 px-4 py-2 rounded border border-blue-200 transition-colors'>
									Install Eternl Wallet
								</a>
								<a
									href='https://yoroi-wallet.com'
									target='_blank'
									rel='noopener noreferrer'
									className='block bg-orange-50 hover:bg-orange-100 text-orange-700 px-4 py-2 rounded border border-orange-200 transition-colors'>
									Install Yoroi Wallet
								</a>
							</div>
						</div>
					)}

					{/* Wallet recommendation section */}
					{enhancedWallets.length > 0 && (
						<div className='mt-4 pt-3 border-t border-gray-100'>
							<p className='text-xs text-gray-500 mb-2'>
								Don't have a wallet yet? We recommend:
							</p>
							<div className='flex space-x-2'>
								<a
									href='https://eternl.io/app/mainnet/welcome'
									target='_blank'
									rel='noopener noreferrer'
									className='flex-1 text-center text-xs bg-gray-50 hover:bg-gray-100 text-gray-700 px-2 py-1 rounded border border-gray-200 transition-colors'>
									Eternl
								</a>
								<a
									href='https://yoroi-wallet.com'
									target='_blank'
									rel='noopener noreferrer'
									className='flex-1 text-center text-xs bg-gray-50 hover:bg-gray-100 text-gray-700 px-2 py-1 rounded border border-gray-200 transition-colors'>
									Yoroi
								</a>
								<a
									href='https://namiwallet.io'
									target='_blank'
									rel='noopener noreferrer'
									className='flex-1 text-center text-xs bg-gray-50 hover:bg-gray-100 text-gray-700 px-2 py-1 rounded border border-gray-200 transition-colors'>
									Nami
								</a>
							</div>
						</div>
					)}
				</div>
			)}

			{/* No wallets message - shows when no wallets are detected and dropdown isn't open */}
			{showNoWalletsMessage && !isDropdownOpen && (
				<div className='absolute mt-2 bg-amber-50 border border-amber-200 rounded-lg p-3 shadow-md text-sm text-amber-800 w-[280px]'>
					<p className='mb-2'>
						<span className='font-medium'>No Cardano wallets detected!</span>{" "}
						Install a wallet to continue.
					</p>
					<button
						onClick={toggleDropdown}
						className='text-blue-600 hover:text-blue-800 text-xs font-medium underline'>
						View recommended wallets
					</button>
				</div>
			)}
		</div>
	);
};

export default ConnectWallet;
