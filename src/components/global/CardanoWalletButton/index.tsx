// "use client";
// import { useState, useEffect } from "react";
// import { useWallet, useWalletList } from "@meshsdk/react";
// import { useAddress } from "@meshsdk/react";
// import Image from "next/image";
// import { X } from "lucide-react";

// const ConnectWallet = () => {
// 	const [selectedWallet, setSelectedWallet] = useState<Wallet | null>(null);
// 	const [isDropdownOpen, setIsDropdownOpen] = useState(false);
// 	const { connect, disconnect, connecting } = useWallet();
// 	const wallets = useWalletList();
// 	const address = useAddress();

// 	useEffect(() => {
// 		const storedWallet = localStorage.getItem("selectedWallet");
// 		if (storedWallet) {
// 			setSelectedWallet(JSON.parse(storedWallet));
// 			connect(JSON.parse(storedWallet).name);
// 		}
// 	}, []);

// 	interface Wallet {
// 		name: string;
// 		icon: string;
// 	}

// 	const handleWalletSelection = (wallet: Wallet): void => {
// 		localStorage.setItem("selectedWallet", JSON.stringify(wallet));
// 		setSelectedWallet(wallet);
// 		connect(wallet.name);
// 		setIsDropdownOpen(false);
// 	};

// 	const handleDisconnect = () => {
// 		localStorage.removeItem("selectedWallet");
// 		console.log(address, "has been removed");
// 		disconnect();
// 		setSelectedWallet(null);
// 	};

// 	const toggleDropdown = () => {
// 		if (selectedWallet) return;
// 		setIsDropdownOpen(!isDropdownOpen);
// 	};

// 	return (
// 		<div className='relative'>
// 			{/* Main Button */}
// 			<button
// 				onClick={selectedWallet ? handleDisconnect : toggleDropdown}
// 				className='flex items-center cursor-pointer justify-center gap-2 px-4 py-2 rounded-lg bg-white text-green-900 font-medium transition-colors duration-200 shadow-sm'
// 				disabled={connecting}>
// 				{connecting ? (
// 					<div className='flex items-center gap-2'>
// 						<div className='w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin'></div>
// 						<span>Connecting...</span>
// 					</div>
// 				) : selectedWallet ? (
// 					<div className='flex items-center gap-2'>
// 						<Image
// 							src={selectedWallet.icon}
// 							alt={selectedWallet.name}
// 							width={20}
// 							height={20}
// 							className='rounded-full'
// 						/>
// 						<span className='text-sm truncate max-w-[100px]'>
// 							{selectedWallet.name}
// 						</span>
// 						<span className='text-black'>{address}</span>
// 						<X size={20} onClick={handleDisconnect} />
// 					</div>
// 				) : (
// 					<div className='flex items-center gap-2'>
// 						<svg
// 							xmlns='http://www.w3.org/2000/svg'
// 							width='16'
// 							height='16'
// 							viewBox='0 0 24 24'
// 							fill='none'
// 							stroke='currentColor'
// 							strokeWidth='2'
// 							strokeLinecap='round'
// 							strokeLinejoin='round'>
// 							<rect x='2' y='5' width='20' height='14' rx='2' ry='2'></rect>
// 							<line x1='2' y1='10' x2='22' y2='10'></line>
// 						</svg>
// 						<span>Connect Wallet</span>
// 					</div>
// 				)}
// 			</button>

// 			{/* Dropdown Menu */}
// 			{isDropdownOpen && !selectedWallet && !connecting && (
// 				<div className='absolute mt-2 right-0 w-64 bg-white rounded-lg shadow-lg border border-gray-200 z-50 py-2'>
// 					<div className='px-4 py-2 border-b border-gray-100'>
// 						<h3 className='text-sm font-medium text-gray-700'>
// 							Select a wallet
// 						</h3>
// 					</div>
// 					<ul className='max-h-60 overflow-auto'>
// 						{wallets.map((wallet) => (
// 							<li
// 								key={wallet.name}
// 								onClick={() => handleWalletSelection(wallet)}
// 								className='flex items-center gap-3 px-4 py-3 hover:bg-gray-50 cursor-pointer transition-colors duration-150'>
// 								<Image
// 									src={wallet.icon}
// 									alt={wallet.name}
// 									width={24}
// 									height={24}
// 									className='rounded-full'
// 								/>
// 								<span className='text-sm font-medium text-gray-800'>
// 									{wallet.name}
// 								</span>
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
import { useWallet, useWalletList } from "@meshsdk/react";
import { useAddress } from "@meshsdk/react";
import Image from "next/image";
import { X } from "lucide-react";

interface Wallet {
	name: string;
	icon: string;
}

const ConnectWallet = () => {
	const [selectedWallet, setSelectedWallet] = useState<Wallet | null>(null);
	const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);
	const { connect, disconnect, connecting } = useWallet();
	const wallets = useWalletList();
	const address = useAddress();

	// Format address for display (first 6 and last 4 characters)
	const formatAddress = (addr: string | null): string => {
		if (!addr) return "";
		return `${addr.slice(0, 6)}...${addr.slice(-4)}`;
	};

	// Check if wallet is ready
	const [isWalletReady, setIsWalletReady] = useState<boolean>(false);

	useEffect(() => {
		// When address becomes available, wallet is ready
		if (address) {
			setIsWalletReady(true);
			console.log("Wallet connected with address:", address);
		}
	}, [address]);

	useEffect(() => {
		// Only try to connect if we're in the browser environment
		if (typeof window !== "undefined") {
			const storedWallet = localStorage.getItem("selectedWallet");
			if (storedWallet) {
				try {
					const wallet = JSON.parse(storedWallet);
					setSelectedWallet(wallet);
					// Slight delay to ensure wallet providers have initialized
					setTimeout(() => {
						connect(wallet.name);
					}, 500);
				} catch (e) {
					console.error("Failed to parse stored wallet:", e);
					localStorage.removeItem("selectedWallet");
				}
			}
		}
	}, [connect]);

	const handleWalletSelection = (wallet: Wallet): void => {
		localStorage.setItem("selectedWallet", JSON.stringify(wallet));
		setSelectedWallet(wallet);
		connect(wallet.name);
		setIsDropdownOpen(false);
	};

	const handleDisconnect = (): void => {
		localStorage.removeItem("selectedWallet");
		if (address) {
			console.log(address, "has been disconnected");
		}
		disconnect();
		setSelectedWallet(null);
	};

	const toggleDropdown = (): void => {
		if (selectedWallet) return;
		setIsDropdownOpen(!isDropdownOpen);
	};

	return (
		<div className='relative'>
			{/* Main Button */}
			<button
				onClick={selectedWallet ? handleDisconnect : toggleDropdown}
				className='flex items-center cursor-pointer justify-center gap-2 px-4 py-2 rounded-lg bg-white text-green-900 font-medium transition-colors duration-200 shadow-sm'
				disabled={connecting}>
				{connecting ? (
					<div className='flex items-center gap-2'>
						<div className='w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin'></div>
						<span>Connecting...</span>
					</div>
				) : selectedWallet ? (
					<div className='flex items-center gap-2'>
						<Image
							src={selectedWallet.icon}
							alt={selectedWallet.name}
							width={20}
							height={20}
							className='rounded-full'
						/>
						<span className='text-sm truncate max-w-[100px]'>
							{selectedWallet.name}
						</span>
						{address && (
							<span className='text-gray-700 text-sm font-mono'>
								{formatAddress(address)}
							</span>
						)}
						<X
							size={20}
							className='text-gray-500 hover:text-red-500'
							onClick={handleDisconnect}
						/>
					</div>
				) : (
					<div className='flex items-center gap-2'>
						<svg
							xmlns='http://www.w3.org/2000/svg'
							width='16'
							height='16'
							viewBox='0 0 24 24'
							fill='none'
							stroke='currentColor'
							strokeWidth='2'
							strokeLinecap='round'
							strokeLinejoin='round'>
							<rect x='2' y='5' width='20' height='14' rx='2' ry='2'></rect>
							<line x1='2' y1='10' x2='22' y2='10'></line>
						</svg>
						<span>Connect Wallet</span>
					</div>
				)}
			</button>

			{/* Wallet Address Display (when connected but button not hovered) */}
			{selectedWallet && address && (
				<div className='mt-2 text-center'>
					<p className='text-sm text-gray-700 font-mono'>
						Connected: {formatAddress(address)}
					</p>
				</div>
			)}

			{/* Dropdown Menu */}
			{isDropdownOpen && !selectedWallet && !connecting && (
				<div className='absolute mt-2 right-0 w-64 bg-white rounded-lg shadow-lg border border-gray-200 z-50 py-2'>
					<div className='px-4 py-2 border-b border-gray-100'>
						<h3 className='text-sm font-medium text-gray-700'>
							Select a wallet
						</h3>
					</div>
					<ul className='max-h-60 overflow-auto'>
						{wallets.map((wallet) => (
							<li
								key={wallet.name}
								onClick={() => handleWalletSelection(wallet)}
								className='flex items-center gap-3 px-4 py-3 hover:bg-gray-50 cursor-pointer transition-colors duration-150'>
								<Image
									src={wallet.icon}
									alt={wallet.name}
									width={24}
									height={24}
									className='rounded-full'
								/>
								<span className='text-sm font-medium text-gray-800'>
									{wallet.name}
								</span>
							</li>
						))}
					</ul>
				</div>
			)}
		</div>
	);
};

export default ConnectWallet;
