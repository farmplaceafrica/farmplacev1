// "use client";

// import { useState, useEffect } from "react";
// import Input from "@/components/global/Input";
// import { useForm } from "react-hook-form";
// import { FormProvider } from "react-hook-form";
// import { ShoppingCart, UserIcon, Search, Menu, X } from "lucide-react";
// import Link from "next/link";
// import Image from "next/image";
// import { useCart } from "@/components/context/CardContext";
// import { useSearch } from "@/components/context/SearchContext"; // We'll create this
// import ConnectWallet from "@/components/global/CardanoWalletButton";

// const DashboardNavbar = () => {
// 	const methods = useForm({
// 		defaultValues: {
// 			search: "",
// 		},
// 	});

// 	const { cartItems } = useCart();
// 	const { searchTerm, setSearchTerm } = useSearch(); // Use search context
// 	const [isMenuOpen, setIsMenuOpen] = useState(false);
// 	const [isMobile, setIsMobile] = useState(false);

// 	// Calculate total number of items in cart
// 	const cartItemCount = cartItems.reduce(
// 		(total, item) => total + item.quantity,
// 		0
// 	);

// 	// Check screen width on mount and when window resizes
// 	useEffect(() => {
// 		const checkScreenSize = () => {
// 			setIsMobile(window.innerWidth < 768);
// 		};

// 		// Set initial value
// 		checkScreenSize();

// 		// Add event listener for resize
// 		window.addEventListener("resize", checkScreenSize);

// 		// Clean up
// 		return () => {
// 			window.removeEventListener("resize", checkScreenSize);
// 		};
// 	}, []);

// 	// Handle search input with debounce
// 	useEffect(() => {
// 		const subscription = methods.watch((value) => {
// 			const searchValue = value.search || "";

// 			// Debounce the search
// 			const timeoutId = setTimeout(() => {
// 				setSearchTerm(searchValue);
// 			}, 300); // 300ms debounce

// 			return () => clearTimeout(timeoutId);
// 		});

// 		return () => subscription.unsubscribe();
// 	}, [methods, setSearchTerm]);

// 	const toggleMenu = () => {
// 		setIsMenuOpen(!isMenuOpen);
// 	};

// 	const handleSearchSubmit = (data: { search: string }) => {
// 		// Immediately set search term on form submit
// 		setSearchTerm(data.search);
// 	};

// 	return (
// 		<FormProvider {...methods}>
// 			<div className='w-full p-2 md:p-4 flex justify-between fixed  items-center shadow-sm bg-white z-10'>
// 				{/* Logo */}
// 				<Link href={"/marketplace"} className='flex-shrink-0'>
// 					<div className='flex items-center'>
// 						<Image
// 							src='/assets/images/logo.jpeg'
// 							alt='Logo'
// 							width={isMobile ? 120 : 200}
// 							height={isMobile ? 50 : 80}
// 							className='object-contain'
// 						/>
// 					</div>
// 				</Link>

// 				{/* Mobile: Menu Toggle Button */}
// 				<button
// 					className='md:hidden flex items-center'
// 					onClick={toggleMenu}
// 					aria-label='Toggle menu'>
// 					{isMenuOpen ? (
// 						<X size={24} className='text-green-800' />
// 					) : (
// 						<Menu size={24} className='text-green-800' />
// 					)}
// 				</button>

// 				{/* Desktop: Search Bar */}
// 				<form
// 					onSubmit={methods.handleSubmit(handleSearchSubmit)}
// 					className='hidden md:block w-1/3'>
// 					<Input
// 						name='search'
// 						className='border-[1.5px] !h-[45px] rounded-3xl border-green-800'
// 						placeholder='Search for a product'
// 						right={
// 							<button
// 								type='submit'
// 								className='text-xl rounded-full h-8 w-8 flex items-center justify-center mr-1'>
// 								<Search size={20} className='text-green-800' />
// 							</button>
// 						}
// 					/>
// 				</form>

// 				{/* Desktop: Icons */}
// 				<div className='hidden md:flex gap-4'>
// 					<ConnectWallet />
// 					<Link href={"/marketplace/cart-view"} className='relative'>
// 						<ShoppingCart size={40} className='text-green-800' />
// 						{cartItemCount > 0 && (
// 							<span className='absolute top-0 right-0 bg-green-800 text-white text-xs rounded-full px-1'>
// 								{cartItemCount}
// 							</span>
// 						)}
// 					</Link>
// 					<Link href={""} className='relative'>
// 						<UserIcon size={40} className='text-green-800' />
// 						<span className='absolute top-0 right-0 bg-green-800 text-white text-xs rounded-full px-1'>
// 							1
// 						</span>
// 					</Link>
// 				</div>

// 				{/* Mobile: Icons (always visible) */}
// 				<div className='hidden gap-2'>
// 					<Link href={"/marketplace/cart-view"} className='relative'>
// 						<ShoppingCart size={28} className='text-green-800' />
// 						{cartItemCount > 0 && (
// 							<span className='absolute -top-1 -right-1 bg-green-800 text-white text-xs rounded-full px-1 min-w-[18px] h-[18px] flex items-center justify-center'>
// 								{cartItemCount}
// 							</span>
// 						)}
// 					</Link>
// 					<Link href={""} className='hidden lg:relative'>
// 						<UserIcon size={28} className='text-green-800' />
// 						<span className='absolute -top-1 -right-1 bg-green-800 text-white text-xs rounded-full px-1 min-w-[18px] h-[18px] flex items-center justify-center'>
// 							1
// 						</span>
// 					</Link>
// 				</div>
// 			</div>

// 			{/* Mobile: Slide-down Menu */}
// 			{isMenuOpen && (
// 				<div className='fixed top-[60px] left-0 right-0 bg-white shadow-md z-[9] p-4 md:hidden'>
// 					<form
// 						onSubmit={methods.handleSubmit(handleSearchSubmit)}
// 						className='mb-4'>
// 						<Input
// 							name='search'
// 							className='border-[1.5px] !h-[40px] rounded-3xl border-green-800'
// 							placeholder='Search for a product'
// 							right={
// 								<button
// 									type='submit'
// 									className='text-xl rounded-full h-8 w-8 flex items-center justify-center mr-1'>
// 									<Search size={18} className='text-green-800' />
// 								</button>
// 							}
// 						/>
// 					</form>
// 					<div className='flex flex-col gap-2'>
// 						<ConnectWallet />
// 						<Link
// 							href='/marketplace'
// 							className='flex items-center gap-2 p-2 hover:bg-gray-100 rounded'
// 							onClick={() => setIsMenuOpen(false)}>
// 							<ShoppingCart size={18} className='text-green-800' />
// 							<span>Marketplace</span>
// 						</Link>
// 						<Link
// 							href='/marketplace/cart-view'
// 							className='flex items-center relative gap-2 p-2 hover:bg-gray-100 rounded'
// 							onClick={() => setIsMenuOpen(false)}>
// 							<ShoppingCart size={18} className='text-green-800' />
// 							{cartItemCount > 0 && (
// 								<span className='absolute -top-1 -right-1 bg-green-800 text-white text-xs rounded-full px-1 min-w-[18px] h-[18px] flex items-center justify-center'>
// 									{cartItemCount}
// 								</span>
// 							)}
// 							<span>Cart</span>
// 						</Link>
// 						<Link
// 							href='/account'
// 							className='flex items-center gap-2 p-2 hover:bg-gray-100 rounded'
// 							onClick={() => setIsMenuOpen(false)}>
// 							<UserIcon size={18} className='text-green-800' />
// 							<span>Account</span>
// 						</Link>
// 					</div>
// 				</div>
// 			)}

// 			{/* Spacer to prevent content from being hidden under the navbar */}
// 			<div className='h-16 md:h-20'></div>
// 		</FormProvider>
// 	);
// };

// export default DashboardNavbar;

"use client";

import { useState, useEffect } from "react";
import { ShoppingCart, User, Menu, X, Bell, Heart } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useCart } from "@/components/context/CardContext";
import ConnectWallet from "@/components/global/CardanoWalletButton";

const DashboardNavbar = () => {
	const { cartItems } = useCart();
	const [isMenuOpen, setIsMenuOpen] = useState(false);
	const [isMobile, setIsMobile] = useState(false);
	const [isScrolled, setIsScrolled] = useState(false);

	// Calculate total number of items in cart
	const cartItemCount = cartItems.reduce(
		(total, item) => total + item.quantity,
		0
	);

	// Check screen width and scroll position
	useEffect(() => {
		const checkScreenSize = () => {
			setIsMobile(window.innerWidth < 768);
		};

		const handleScroll = () => {
			setIsScrolled(window.scrollY > 10);
		};

		checkScreenSize();
		handleScroll();

		window.addEventListener("resize", checkScreenSize);
		window.addEventListener("scroll", handleScroll);

		return () => {
			window.removeEventListener("resize", checkScreenSize);
			window.removeEventListener("scroll", handleScroll);
		};
	}, []);

	const toggleMenu = () => {
		setIsMenuOpen(!isMenuOpen);
	};

	const closeMenu = () => {
		setIsMenuOpen(false);
	};

	return (
		<>
			<nav className='shadow-md fixed top-0 left-0 right-0 z-50 bg-white transition-all duration-300 ease-in-out'>
				<div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
					<div className='flex justify-between items-center h-16 lg:h-20'>
						{/* Logo */}
						<Link href='/marketplace' className='flex-shrink-0 group'>
							<div className='flex items-center transition-transform duration-200 group-hover:scale-105'>
								<Image
									src='/assets/images/logo.jpeg'
									alt='Logo'
									width={isMobile ? 120 : 180}
									height={isMobile ? 48 : 72}
									className='object-contain'
									priority
								/>
							</div>
						</Link>

						{/* Desktop Navigation */}
						<div className='hidden md:flex items-center space-x-8'>
							<nav className='flex space-x-6'>
								<Link
									href='/marketplace'
									className='text-gray-700 hover:text-green-600 font-medium transition-colors duration-200 relative group'>
									Marketplace
									<span className='absolute -bottom-1 left-0 w-0 h-0.5 bg-green-600 transition-all duration-200 group-hover:w-full'></span>
								</Link>
								<Link
									href='/categories'
									className='text-gray-700 hover:text-green-600 font-medium transition-colors duration-200 relative group'>
									Categories
									<span className='absolute -bottom-1 left-0 w-0 h-0.5 bg-green-600 transition-all duration-200 group-hover:w-full'></span>
								</Link>
								<Link
									href='/sellers'
									className='text-gray-700 hover:text-green-600 font-medium transition-colors duration-200 relative group'>
									Sellers
									<span className='absolute -bottom-1 left-0 w-0 h-0.5 bg-green-600 transition-all duration-200 group-hover:w-full'></span>
								</Link>
							</nav>
						</div>

						{/* Desktop Actions */}
						<div className='hidden md:flex items-center space-x-4'>
							<ConnectWallet />

							{/* Wishlist */}
							<Link
								href='/wishlist'
								className='relative p-2 text-gray-600 hover:text-green-600 transition-colors duration-200 group'>
								<Heart
									size={24}
									className='group-hover:scale-110 transition-transform duration-200'
								/>
								<span className='absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full min-w-[18px] h-[18px] flex items-center justify-center transform scale-90'>
									3
								</span>
							</Link>

							{/* Notifications */}
							<button className='relative p-2 text-gray-600 hover:text-green-600 transition-colors duration-200 group'>
								<Bell
									size={24}
									className='group-hover:scale-110 transition-transform duration-200'
								/>
								<span className='absolute -top-1 -right-1 bg-blue-500 text-white text-xs rounded-full min-w-[18px] h-[18px] flex items-center justify-center transform scale-90'>
									2
								</span>
							</button>

							{/* Cart */}
							<Link
								href='/marketplace/cart-view'
								className='relative p-2 text-gray-600 hover:text-green-600 transition-colors duration-200 group'>
								<ShoppingCart
									size={24}
									className='group-hover:scale-110 transition-transform duration-200'
								/>
								{cartItemCount > 0 && (
									<span className='absolute -top-1 -right-1 bg-green-600 text-white text-xs rounded-full min-w-[18px] h-[18px] flex items-center justify-center transform scale-90 animate-pulse'>
										{cartItemCount}
									</span>
								)}
							</Link>

							{/* Profile */}
							<Link
								href='/profile'
								className='relative p-2 text-gray-600 hover:text-green-600 transition-colors duration-200 group'>
								<User
									size={24}
									className='group-hover:scale-110 transition-transform duration-200'
								/>
							</Link>
						</div>

						{/* Mobile Menu Button */}
						<button
							onClick={toggleMenu}
							className='md:hidden relative p-2 text-gray-600 hover:text-green-600 transition-colors duration-200'
							aria-label='Toggle menu'>
							<div className='relative w-6 h-6'>
								<Menu
									size={24}
									className={`absolute inset-0 transition-all duration-300 ${
										isMenuOpen ? "rotate-90 opacity-0" : "rotate-0 opacity-100"
									}`}
								/>
								<X
									size={24}
									className={`absolute inset-0 transition-all duration-300 ${
										isMenuOpen ? "rotate-0 opacity-100" : "-rotate-90 opacity-0"
									}`}
								/>
							</div>
						</button>
					</div>
				</div>

				{/* Mobile Menu */}
				<div
					className={`md:hidden transition-all duration-300 ease-in-out ${
						isMenuOpen
							? "max-h-screen opacity-100"
							: "max-h-0 opacity-0 overflow-hidden"
					}`}>
					<div className='bg-white border-t border-gray-100 shadow-lg'>
						<div className='px-4 py-6 space-y-4'>
							{/* Mobile Navigation Links */}
							<div className='space-y-3'>
								<Link
									href='/marketplace'
									onClick={closeMenu}
									className='flex items-center px-4 py-3 text-gray-700 hover:text-green-600 hover:bg-green-50 rounded-lg transition-all duration-200 group'>
									<span className='font-medium'>Marketplace</span>
								</Link>
								<Link
									href='/categories'
									onClick={closeMenu}
									className='flex items-center px-4 py-3 text-gray-700 hover:text-green-600 hover:bg-green-50 rounded-lg transition-all duration-200'>
									<span className='font-medium'>Categories</span>
								</Link>
								<Link
									href='/sellers'
									onClick={closeMenu}
									className='flex items-center px-4 py-3 text-gray-700 hover:text-green-600 hover:bg-green-50 rounded-lg transition-all duration-200'>
									<span className='font-medium'>Sellers</span>
								</Link>
							</div>

							<div className='border-t border-gray-200 pt-4'>
								<div className='px-4 mb-4'>
									<ConnectWallet />
								</div>

								{/* Mobile Action Items */}
								<div className='space-y-2'>
									<Link
										href='/wishlist'
										onClick={closeMenu}
										className='flex items-center justify-between px-4 py-3 text-gray-700 hover:text-green-600 hover:bg-green-50 rounded-lg transition-all duration-200'>
										<div className='flex items-center space-x-3'>
											<Heart size={20} />
											<span className='font-medium'>Wishlist</span>
										</div>
										<span className='bg-red-100 text-red-600 text-xs px-2 py-1 rounded-full'>
											3
										</span>
									</Link>

									<Link
										href='/marketplace/cart-view'
										onClick={closeMenu}
										className='flex items-center justify-between px-4 py-3 text-gray-700 hover:text-green-600 hover:bg-green-50 rounded-lg transition-all duration-200'>
										<div className='flex items-center space-x-3'>
											<ShoppingCart size={20} />
											<span className='font-medium'>Cart</span>
										</div>
										{cartItemCount > 0 && (
											<span className='bg-green-100 text-green-600 text-xs px-2 py-1 rounded-full'>
												{cartItemCount}
											</span>
										)}
									</Link>

									<button className='flex items-center justify-between w-full px-4 py-3 text-gray-700 hover:text-green-600 hover:bg-green-50 rounded-lg transition-all duration-200'>
										<div className='flex items-center space-x-3'>
											<Bell size={20} />
											<span className='font-medium'>Notifications</span>
										</div>
										<span className='bg-blue-100 text-blue-600 text-xs px-2 py-1 rounded-full'>
											2
										</span>
									</button>

									<Link
										href='/profile'
										onClick={closeMenu}
										className='flex items-center px-4 py-3 text-gray-700 hover:text-green-600 hover:bg-green-50 rounded-lg transition-all duration-200'>
										<div className='flex items-center space-x-3'>
											<User size={20} />
											<span className='font-medium'>Profile</span>
										</div>
									</Link>
								</div>
							</div>
						</div>
					</div>
				</div>
			</nav>

			{/* Spacer to prevent content overlap */}
			<div className='h-16 lg:h-20'></div>
		</>
	);
};

export default DashboardNavbar;
