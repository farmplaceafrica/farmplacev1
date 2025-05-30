// "use client";

// import { useState, useEffect, useMemo } from "react";
// import { ShoppingCart, User, Menu, X, Bell, Heart } from "lucide-react";
// import Link from "next/link";
// import Image from "next/image";
// import { useCart } from "@/components/context/CardContext";
// import ConnectWallet from "@/components/global/CardanoWalletButton";

// const DashboardNavbar = () => {
// 	const { cartItems, cartCount } = useCart(); // Use cartCount from context if available
// 	const [isMenuOpen, setIsMenuOpen] = useState(false);
// 	const [isMobile, setIsMobile] = useState(false);
// 	const [isScrolled, setIsScrolled] = useState(false);

// 	// Memoize cart count calculation to prevent unnecessary recalculations
// 	const cartItemCount = useMemo(() => {
// 		// Use cartCount from context if available, otherwise calculate
// 		if (typeof cartCount === "number") {
// 			return cartCount;
// 		}
// 		return cartItems.reduce((total, item) => total + item.quantity, 0);
// 	}, [cartItems, cartCount]);

// 	// Check screen width and scroll position
// 	useEffect(() => {
// 		const checkScreenSize = () => {
// 			setIsMobile(window.innerWidth < 768);
// 		};

// 		const handleScroll = () => {
// 			setIsScrolled(window.scrollY > 10);
// 		};

// 		checkScreenSize();
// 		handleScroll();

// 		window.addEventListener("resize", checkScreenSize);
// 		window.addEventListener("scroll", handleScroll);

// 		return () => {
// 			window.removeEventListener("resize", checkScreenSize);
// 			window.removeEventListener("scroll", handleScroll);
// 		};
// 	}, []);

// 	const toggleMenu = () => {
// 		setIsMenuOpen(!isMenuOpen);
// 	};

// 	const closeMenu = () => {
// 		setIsMenuOpen(false);
// 	};

// 	// Debug: Log cart changes (remove in production)
// 	useEffect(() => {
// 		console.log("Navbar - Cart items changed:", cartItems);
// 		console.log("Navbar - Cart item count:", cartItemCount);
// 	}, [cartItems, cartItemCount]);

// 	return (
// 		<>
// 			<nav className='shadow-md fixed top-0 left-0 right-0 z-50 bg-white transition-all duration-300 ease-in-out'>
// 				<div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
// 					<div className='flex justify-between items-center h-16 lg:h-20'>
// 						{/* Logo */}
// 						<Link href='/marketplace' className='flex-shrink-0 group'>
// 							<div className='flex items-center transition-transform duration-200 group-hover:scale-105'>
// 								<Image
// 									src='/assets/images/logo.jpeg'
// 									alt='Logo'
// 									width={isMobile ? 120 : 180}
// 									height={isMobile ? 48 : 72}
// 									className='object-contain'
// 									priority
// 								/>
// 							</div>
// 						</Link>

// 						{/* Desktop Navigation */}
// 						{/* <div className='hidden md:flex items-center space-x-8'>
// 							<nav className='flex space-x-6'>
// 								<Link
// 									href='/marketplace'
// 									className='text-gray-700 hover:text-green-600 font-medium transition-colors duration-200 relative group'>
// 									Marketplace
// 									<span className='absolute -bottom-1 left-0 w-0 h-0.5 bg-green-600 transition-all duration-200 group-hover:w-full'></span>
// 								</Link>
// 								<Link
// 									href='/categories'
// 									className='text-gray-700 hover:text-green-600 font-medium transition-colors duration-200 relative group'>
// 									Categories
// 									<span className='absolute -bottom-1 left-0 w-0 h-0.5 bg-green-600 transition-all duration-200 group-hover:w-full'></span>
// 								</Link>
// 								<Link
// 									href='/sellers'
// 									className='text-gray-700 hover:text-green-600 font-medium transition-colors duration-200 relative group'>
// 									Sellers
// 									<span className='absolute -bottom-1 left-0 w-0 h-0.5 bg-green-600 transition-all duration-200 group-hover:w-full'></span>
// 								</Link>
// 							</nav>
// 						</div> */}

// 						{/* Desktop Actions */}
// 						<div className='hidden md:flex items-center space-x-4'>
// 							<ConnectWallet />

// 							{/* Wishlist */}
// 							<Link
// 								href='/wishlist'
// 								className='relative p-2 text-gray-600 hover:text-green-600 transition-colors duration-200 group'>
// 								<Heart
// 									size={24}
// 									className='group-hover:scale-110 transition-transform duration-200'
// 								/>
// 								<span className='absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full min-w-[18px] h-[18px] flex items-center justify-center transform scale-90'>
// 									3
// 								</span>
// 							</Link>

// 							{/* Notifications */}
// 							<button className='relative p-2 text-gray-600 hover:text-green-600 transition-colors duration-200 group'>
// 								<Bell
// 									size={24}
// 									className='group-hover:scale-110 transition-transform duration-200'
// 								/>
// 								<span className='absolute -top-1 -right-1 bg-blue-500 text-white text-xs rounded-full min-w-[18px] h-[18px] flex items-center justify-center transform scale-90'>
// 									2
// 								</span>
// 							</button>

// 							{/* Cart with enhanced animation */}
// 							<Link
// 								href='/marketplace/cart-view'
// 								className='relative p-2 text-gray-600 hover:text-green-600 transition-colors duration-200 group'>
// 								<ShoppingCart
// 									size={24}
// 									className='group-hover:scale-110 transition-transform duration-200'
// 								/>
// 								{cartItemCount > 0 && (
// 									<span
// 										key={cartItemCount} // Add key to force re-render with animation
// 										className='absolute -top-1 -right-1 bg-green-600 text-white text-xs rounded-full min-w-[18px] h-[18px] flex items-center justify-center transform animate-bounce'>
// 										{cartItemCount}
// 									</span>
// 								)}
// 							</Link>

// 							{/* Profile */}
// 							<Link
// 								href='/profile'
// 								className='relative p-2 text-gray-600 hover:text-green-600 transition-colors duration-200 group'>
// 								<User
// 									size={24}
// 									className='group-hover:scale-110 transition-transform duration-200'
// 								/>
// 							</Link>
// 						</div>

// 						{/* Mobile Menu Button */}
// 						<button
// 							onClick={toggleMenu}
// 							className='md:hidden relative p-2 text-gray-600 hover:text-green-600 transition-colors duration-200'
// 							aria-label='Toggle menu'>
// 							<div className='relative w-6 h-6'>
// 								<Menu
// 									size={24}
// 									className={`absolute inset-0 transition-all duration-300 ${
// 										isMenuOpen ? "rotate-90 opacity-0" : "rotate-0 opacity-100"
// 									}`}
// 								/>
// 								<X
// 									size={24}
// 									className={`absolute inset-0 transition-all duration-300 ${
// 										isMenuOpen ? "rotate-0 opacity-100" : "-rotate-90 opacity-0"
// 									}`}
// 								/>
// 							</div>
// 						</button>
// 					</div>
// 				</div>

// 				{/* Mobile Menu */}
// 				<div
// 					className={`md:hidden transition-all duration-300 ease-in-out ${
// 						isMenuOpen
// 							? "max-h-screen opacity-100"
// 							: "max-h-0 opacity-0 overflow-hidden"
// 					}`}>
// 					<div className='bg-white border-t border-gray-100 shadow-lg'>
// 						<div className='px-4 py-6 space-y-4'>
// 							{/* Mobile Navigation Links */}
// 							<div className='space-y-3'>
// 								<Link
// 									href='/marketplace'
// 									onClick={closeMenu}
// 									className='flex items-center px-4 py-3 text-gray-700 hover:text-green-600 hover:bg-green-50 rounded-lg transition-all duration-200 group'>
// 									<span className='font-medium'>Marketplace</span>
// 								</Link>
// 								<Link
// 									href='/categories'
// 									onClick={closeMenu}
// 									className='flex items-center px-4 py-3 text-gray-700 hover:text-green-600 hover:bg-green-50 rounded-lg transition-all duration-200'>
// 									<span className='font-medium'>Categories</span>
// 								</Link>
// 								<Link
// 									href='/sellers'
// 									onClick={closeMenu}
// 									className='flex items-center px-4 py-3 text-gray-700 hover:text-green-600 hover:bg-green-50 rounded-lg transition-all duration-200'>
// 									<span className='font-medium'>Sellers</span>
// 								</Link>
// 							</div>

// 							<div className='border-t border-gray-200 pt-4'>
// 								<div className='px-4 mb-4'>
// 									<ConnectWallet />
// 								</div>

// 								{/* Mobile Action Items */}
// 								<div className='space-y-2'>
// 									<Link
// 										href='/wishlist'
// 										onClick={closeMenu}
// 										className='flex items-center justify-between px-4 py-3 text-gray-700 hover:text-green-600 hover:bg-green-50 rounded-lg transition-all duration-200'>
// 										<div className='flex items-center space-x-3'>
// 											<Heart size={20} />
// 											<span className='font-medium'>Wishlist</span>
// 										</div>
// 										<span className='bg-red-100 text-red-600 text-xs px-2 py-1 rounded-full'>
// 											3
// 										</span>
// 									</Link>

// 									<Link
// 										href='/marketplace/cart-view'
// 										onClick={closeMenu}
// 										className='flex items-center justify-between px-4 py-3 text-gray-700 hover:text-green-600 hover:bg-green-50 rounded-lg transition-all duration-200'>
// 										<div className='flex items-center space-x-3'>
// 											<ShoppingCart size={20} />
// 											<span className='font-medium'>Cart</span>
// 										</div>
// 										{cartItemCount > 0 && (
// 											<span
// 												key={cartItemCount} // Add key for mobile too
// 												className='bg-green-100 text-green-600 text-xs px-2 py-1 rounded-full animate-pulse'>
// 												{cartItemCount}
// 											</span>
// 										)}
// 									</Link>

// 									<button className='flex items-center justify-between w-full px-4 py-3 text-gray-700 hover:text-green-600 hover:bg-green-50 rounded-lg transition-all duration-200'>
// 										<div className='flex items-center space-x-3'>
// 											<Bell size={20} />
// 											<span className='font-medium'>Notifications</span>
// 										</div>
// 										<span className='bg-blue-100 text-blue-600 text-xs px-2 py-1 rounded-full'>
// 											2
// 										</span>
// 									</button>

// 									<Link
// 										href='/profile'
// 										onClick={closeMenu}
// 										className='flex items-center px-4 py-3 text-gray-700 hover:text-green-600 hover:bg-green-50 rounded-lg transition-all duration-200'>
// 										<div className='flex items-center space-x-3'>
// 											<User size={20} />
// 											<span className='font-medium'>Profile</span>
// 										</div>
// 									</Link>
// 								</div>
// 							</div>
// 						</div>
// 					</div>
// 				</div>
// 			</nav>

// 			{/* Spacer to prevent content overlap */}
// 			<div className='h-16 lg:h-20'></div>
// 		</>
// 	);
// };

// export default DashboardNavbar;

"use client";

import { useState, useEffect, useMemo, useRef } from "react";
import {
	ShoppingCart,
	User,
	Menu,
	X,
	Bell,
	Heart,
	ChevronDown,
	LogOut,
	Settings,
	BarChart3,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useCart } from "@/components/context/CardContext";
import ConnectWallet from "@/components/global/CardanoWalletButton";

const DashboardNavbar = () => {
	const { cartItems, cartCount } = useCart(); // Use cartCount from context if available
	const [isMenuOpen, setIsMenuOpen] = useState(false);
	const [isMobile, setIsMobile] = useState(false);
	const [isScrolled, setIsScrolled] = useState(false);
	const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
	const profileDropdownRef = useRef<HTMLDivElement>(null);

	// Get user data from localStorage
	const [user, setUser] = useState({
		name: "",
		email: "",
		role: "",
		avatar: "/assets/images/avatar-placeholder.jpg",
		isLoggedIn: false,
		verified: false,
		location: "",
		phone: "",
	});

	// Load user data from localStorage
	useEffect(() => {
		if (typeof window !== "undefined") {
			try {
				const userData = localStorage.getItem("user_data");
				if (userData) {
					const parsedUser = JSON.parse(userData);
					setUser({
						name: parsedUser.fullname || "",
						email: parsedUser.email || "",
						role: parsedUser.usertype || "",
						avatar: "/assets/images/avatar-placeholder.jpg", // Add avatar URL if available in your data
						isLoggedIn: true,
						verified: parsedUser.verified || false,
						location: parsedUser.location || "",
						phone: parsedUser.phone || "",
					});
				}
			} catch (error) {
				console.error("Failed to parse user data:", error);
				// Clear corrupted user data
				localStorage.removeItem("user_data");
			}
		}
	}, []);

	// Memoize cart count calculation to prevent unnecessary recalculations
	const cartItemCount = useMemo(() => {
		// Use cartCount from context if available, otherwise calculate
		if (typeof cartCount === "number") {
			return cartCount;
		}
		return cartItems.reduce((total, item) => total + item.quantity, 0);
	}, [cartItems, cartCount]);

	// Check screen width and scroll position
	useEffect(() => {
		const checkScreenSize = () => {
			setIsMobile(window.innerWidth < 768);
		};

		const handleScroll = () => {
			setIsScrolled(window.scrollY > 10);
		};

		const handleClickOutside = (event: MouseEvent): void => {
			if (
				profileDropdownRef.current &&
				!profileDropdownRef.current.contains(event.target as Node)
			) {
				setIsProfileDropdownOpen(false);
			}
		};

		checkScreenSize();
		handleScroll();

		window.addEventListener("resize", checkScreenSize);
		window.addEventListener("scroll", handleScroll);
		document.addEventListener("mousedown", handleClickOutside);

		return () => {
			window.removeEventListener("resize", checkScreenSize);
			window.removeEventListener("scroll", handleScroll);
			document.removeEventListener("mousedown", handleClickOutside);
		};
	}, []);

	const toggleMenu = () => {
		setIsMenuOpen(!isMenuOpen);
	};

	const closeMenu = () => {
		setIsMenuOpen(false);
	};

	const toggleProfileDropdown = () => {
		setIsProfileDropdownOpen(!isProfileDropdownOpen);
	};

	const handleLogout = () => {
		// Clear user data from localStorage
		localStorage.removeItem("user_data");
		// Clear any other auth-related data
		localStorage.removeItem("auth_token"); // if you have auth tokens
		localStorage.removeItem("cart"); // optional: clear cart on logout

		// Reset user state
		setUser({
			name: "",
			email: "",
			role: "",
			avatar: "/assets/images/avatar-placeholder.jpg",
			isLoggedIn: false,
			verified: false,
			location: "",
			phone: "",
		});

		setIsProfileDropdownOpen(false);
		console.log("User logged out successfully");

		// Redirect to login page
		// window.location.href = "/login"; // or use your router
	};

	// Debug: Log cart changes (remove in production)
	useEffect(() => {
		console.log("Navbar - Cart items changed:", cartItems);
		console.log("Navbar - Cart item count:", cartItemCount);
	}, [cartItems, cartItemCount]);

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

							{/* Cart with enhanced animation */}
							<Link
								href='/marketplace/cart-view'
								className='relative p-2 text-gray-600 hover:text-green-600 transition-colors duration-200 group'>
								<ShoppingCart
									size={24}
									className='group-hover:scale-110 transition-transform duration-200'
								/>
								{cartItemCount > 0 && (
									<span
										key={cartItemCount} // Add key to force re-render with animation
										className='absolute -top-1 -right-1 bg-green-600 text-white text-xs rounded-full min-w-[18px] h-[18px] flex items-center justify-center transform animate-bounce'>
										{cartItemCount}
									</span>
								)}
							</Link>

							{/* Profile Dropdown */}
							<div className='relative' ref={profileDropdownRef}>
								<button
									onClick={toggleProfileDropdown}
									className='flex items-center space-x-2 p-2 text-gray-600 hover:text-green-600 transition-colors duration-200 group'>
									{user.avatar ? (
										<Image
											src={user.avatar}
											alt='Profile'
											width={28}
											height={28}
											className='rounded-full object-cover'
										/>
									) : (
										<User
											size={24}
											className='group-hover:scale-110 transition-transform duration-200'
										/>
									)}
									<ChevronDown
										size={16}
										className={`transition-transform duration-200 ${
											isProfileDropdownOpen ? "rotate-180" : ""
										}`}
									/>
								</button>

								{/* Desktop Dropdown Menu */}
								{isProfileDropdownOpen && (
									<div className='absolute right-0 mt-2 w-64 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50'>
										{/* User Info */}
										<div className='px-4 py-3 border-b border-gray-100'>
											<div className='flex items-center space-x-3'>
												{user.avatar ? (
													<Image
														src={user.avatar || "/assets/images/me.jpg"}
														alt='Profile'
														width={40}
														height={40}
														className='rounded-full object-cover'
													/>
												) : (
													<div className='w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center'>
														<User size={20} className='text-gray-600' />
													</div>
												)}
												<div>
													<p className='font-medium text-gray-900'>
														{user.name}
													</p>
													<p className='text-sm text-gray-500'>{user.email}</p>
													<span className='inline-block px-2 py-1 text-xs bg-green-100 text-green-800 rounded-full mt-1 capitalize'>
														{user.role}
													</span>
												</div>
											</div>
										</div>

										{/* Menu Items */}
										<div className='py-2'>
											{user.role === "farmer" && (
												<Link
													href='/dashboard'
													onClick={() => setIsProfileDropdownOpen(false)}
													className='flex items-center px-4 py-2 text-gray-700 hover:bg-green-50 hover:text-green-600 transition-colors duration-200'>
													<BarChart3 size={18} className='mr-3' />
													<span>Farmer Dashboard</span>
												</Link>
											)}

											<button
												onClick={() => setIsProfileDropdownOpen(false)}
												className='flex items-center px-4 py-2 text-gray-700 hover:bg-green-50 hover:text-green-600 transition-colors duration-200'>
												<Settings size={18} className='mr-3' />
												<span>Profile Settings</span>
											</button>

											<hr className='my-2 border-gray-100' />

											<button
												onClick={handleLogout}
												className='flex items-center w-full px-4 py-2 text-gray-700 hover:bg-red-50 hover:text-red-600 transition-colors duration-200'>
												<LogOut size={18} className='mr-3' />
												<span>Logout</span>
											</button>
										</div>
									</div>
								)}
							</div>
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
											<span
												key={cartItemCount} // Add key for mobile too
												className='bg-green-100 text-green-600 text-xs px-2 py-1 rounded-full animate-pulse'>
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

									{user.role === "farmer" && (
										<Link
											href='/farmer/dashboard'
											onClick={closeMenu}
											className='flex items-center px-4 py-3 text-gray-700 hover:text-green-600 hover:bg-green-50 rounded-lg transition-all duration-200'>
											<div className='flex items-center space-x-3'>
												<BarChart3 size={20} />
												<span className='font-medium'>Farmer Dashboard</span>
											</div>
										</Link>
									)}

									<Link
										href='/profile'
										onClick={closeMenu}
										className='flex items-center px-4 py-3 text-gray-700 hover:text-green-600 hover:bg-green-50 rounded-lg transition-all duration-200'>
										<div className='flex items-center space-x-3'>
											<User size={20} />
											<span className='font-medium'>Profile Settings</span>
										</div>
									</Link>

									<button
										onClick={handleLogout}
										className='flex items-center w-full px-4 py-3 text-gray-700 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all duration-200'>
										<div className='flex items-center space-x-3'>
											<LogOut size={20} />
											<span className='font-medium'>Logout</span>
										</div>
									</button>
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
