// "use client";

// import Input from "@/components/global/Input";
// import { useForm } from "react-hook-form";
// import { FormProvider } from "react-hook-form";
// import { ShoppingCart } from "lucide-react";
// import { UserIcon } from "lucide-react";
// import { Search } from "lucide-react";
// import Link from "next/link";
// import Image from "next/image";
// import { useCart } from "@/components/context/CardContext"; // Import the cart context

// const DashboardNavbar = () => {
// 	// Make sure you're using the correct import for useForm
// 	const methods = useForm({
// 		defaultValues: {
// 			search: "",
// 		},
// 	});

// 	// Get cart items from context
// 	const { cartItems } = useCart();

// 	// Calculate total number of items in cart
// 	const cartItemCount = cartItems.reduce(
// 		(total, item) => total + item.quantity,
// 		0
// 	);

// 	return (
// 		<FormProvider {...methods}>
// 			<div className='w-full p-4 flex justify-between fixed mb-10 items-center shadow-sm bg-white z-10'>
// 				<Link href={"/dashboard/marketplace"}>
// 					<div className='flex items-center  gap-4'>
// 						<Image
// 							src='/assets/images/logo.jpeg'
// 							alt=''
// 							width={200}
// 							height={80}
// 						/>
// 					</div>
// 				</Link>
// 				<div className='w-1/3'>
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
// 				</div>
// 				<div className='flex gap-4'>
// 					{/* Cart Icon with Dynamic Count */}
// 					<Link href={"/dashboard/cart-view"} className='relative'>
// 						<ShoppingCart size={40} className='text-green-800' />
// 						{cartItemCount > 0 && (
// 							<span className='absolute top-0 right-0 bg-green-800 text-white text-xs rounded-full px-1'>
// 								{cartItemCount}
// 							</span>
// 						)}
// 					</Link>
// 					{/* User Icon */}
// 					<Link href={""} className='relative'>
// 						<UserIcon size={40} className='text-green-800' />
// 						<span className='absolute top-0 right-0 bg-green-800 text-white text-xs rounded-full px-1'>
// 							1
// 						</span>
// 					</Link>
// 					{/* Add user profile or action buttons here */}
// 				</div>
// 			</div>
// 		</FormProvider>
// 	);
// };

// export default DashboardNavbar;

"use client";

import { useState, useEffect } from "react";
import Input from "@/components/global/Input";
import { useForm } from "react-hook-form";
import { FormProvider } from "react-hook-form";
import { ShoppingCart, UserIcon, Search, Menu, X } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useCart } from "@/components/context/CardContext";

const DashboardNavbar = () => {
	const methods = useForm({
		defaultValues: {
			search: "",
		},
	});

	const { cartItems } = useCart();
	const [isMenuOpen, setIsMenuOpen] = useState(false);
	const [isMobile, setIsMobile] = useState(false);

	// Calculate total number of items in cart
	const cartItemCount = cartItems.reduce(
		(total, item) => total + item.quantity,
		0
	);

	// Check screen width on mount and when window resizes
	useEffect(() => {
		const checkScreenSize = () => {
			setIsMobile(window.innerWidth < 768);
		};

		// Set initial value
		checkScreenSize();

		// Add event listener for resize
		window.addEventListener("resize", checkScreenSize);

		// Clean up
		return () => {
			window.removeEventListener("resize", checkScreenSize);
		};
	}, []);

	const toggleMenu = () => {
		setIsMenuOpen(!isMenuOpen);
	};

	return (
		<FormProvider {...methods}>
			<div className='w-full p-2 md:p-4 flex justify-between fixed mb-10 items-center shadow-sm bg-white z-10'>
				{/* Logo */}
				<Link href={"/dashboard/marketplace"} className='flex-shrink-0'>
					<div className='flex items-center'>
						<Image
							src='/assets/images/logo.jpeg'
							alt='Logo'
							width={isMobile ? 120 : 200}
							height={isMobile ? 50 : 80}
							className='object-contain'
						/>
					</div>
				</Link>

				{/* Mobile: Menu Toggle Button */}
				<button
					className='md:hidden flex items-center'
					onClick={toggleMenu}
					aria-label='Toggle menu'>
					{isMenuOpen ? (
						<X size={24} className='text-green-800' />
					) : (
						<Menu size={24} className='text-green-800' />
					)}
				</button>

				{/* Desktop: Search Bar */}
				<div className='hidden md:block w-1/3'>
					<Input
						name='search'
						className='border-[1.5px] !h-[45px] rounded-3xl border-green-800'
						placeholder='Search for a product'
						right={
							<button
								type='submit'
								className='text-xl rounded-full h-8 w-8 flex items-center justify-center mr-1'>
								<Search size={20} className='text-green-800' />
							</button>
						}
					/>
				</div>

				{/* Desktop: Icons */}
				<div className='hidden md:flex gap-4'>
					<Link href={"/dashboard/cart-view"} className='relative'>
						<ShoppingCart size={40} className='text-green-800' />
						{cartItemCount > 0 && (
							<span className='absolute top-0 right-0 bg-green-800 text-white text-xs rounded-full px-1'>
								{cartItemCount}
							</span>
						)}
					</Link>
					<Link href={""} className='relative'>
						<UserIcon size={40} className='text-green-800' />
						<span className='absolute top-0 right-0 bg-green-800 text-white text-xs rounded-full px-1'>
							1
						</span>
					</Link>
				</div>

				{/* Mobile: Icons (always visible) */}
				<div className='hidden gap-2'>
					<Link href={"/dashboard/cart-view"} className='relative'>
						<ShoppingCart size={28} className='text-green-800' />
						{cartItemCount > 0 && (
							<span className='absolute -top-1 -right-1 bg-green-800 text-white text-xs rounded-full px-1 min-w-[18px] h-[18px] flex items-center justify-center'>
								{cartItemCount}
							</span>
						)}
					</Link>
					<Link href={""} className='hidden lg:relative'>
						<UserIcon size={28} className='text-green-800' />
						<span className='absolute -top-1 -right-1 bg-green-800 text-white text-xs rounded-full px-1 min-w-[18px] h-[18px] flex items-center justify-center'>
							1
						</span>
					</Link>
				</div>
			</div>

			{/* Mobile: Slide-down Menu */}
			{isMenuOpen && (
				<div className='fixed top-[60px] left-0 right-0 bg-white shadow-md z-[9] p-4 md:hidden'>
					<div className='mb-4'>
						<Input
							name='search'
							className='border-[1.5px] !h-[40px] rounded-3xl border-green-800'
							placeholder='Search for a product'
							right={
								<button
									type='submit'
									className='text-xl rounded-full h-8 w-8 flex items-center justify-center mr-1'>
									<Search size={18} className='text-green-800' />
								</button>
							}
						/>
					</div>
					<div className='flex flex-col gap-2'>
						<Link
							href='/dashboard/marketplace'
							className='flex items-center gap-2 p-2 hover:bg-gray-100 rounded'
							onClick={() => setIsMenuOpen(false)}>
							<ShoppingCart size={18} className='text-green-800' />
							<span>Marketplace</span>
						</Link>
						<Link
							href='/dashboard/cart-view'
							className='flex items-center relative gap-2 p-2 hover:bg-gray-100 rounded'
							onClick={() => setIsMenuOpen(false)}>
							<ShoppingCart size={18} className='text-green-800' />
							{cartItemCount > 0 && (
								<span className='absolute -top-1 -right-1 bg-green-800 text-white text-xs rounded-full px-1 min-w-[18px] h-[18px] flex items-center justify-center'>
									{cartItemCount}
								</span>
							)}
							<span>Cart</span>
						</Link>
						<Link
							href='/account'
							className='flex items-center gap-2 p-2 hover:bg-gray-100 rounded'
							onClick={() => setIsMenuOpen(false)}>
							<UserIcon size={18} className='text-green-800' />
							<span>Account</span>
						</Link>
					</div>
				</div>
			)}

			{/* Spacer to prevent content from being hidden under the navbar */}
			<div className='h-16 md:h-20'></div>
		</FormProvider>
	);
};

export default DashboardNavbar;
