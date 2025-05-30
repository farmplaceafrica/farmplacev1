// "use client";

// import Link from "next/link";
// import { useState } from "react";
// import { Menu, X } from "lucide-react";

// const navLinks = [
// 	{ label: "Home", href: "#" },
// 	{ label: "About Us", href: "#about" },
// 	{ label: "Market Place", href: "/marketplace" },
// 	{ label: "Resources", href: "#resources" },
// ];

// const Navbar = () => {
// 	const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

// 	const toggleMobileMenu = () => setMobileMenuOpen((prev) => !prev);

// 	return (
// 		<nav className='fixed top-0 w-full bg-[#C3E0C44D] shadow-md z-50'>
// 			<div className='max-w-7xl mx-auto flex items-center justify-between px-6 py-4'>
// 				{/* Logo */}
// 				<div className='flex items-center gap-1 text-2xl font-semibold'>
// 					<span className='text-green-600'>Farm</span>
// 					<span className='text-gray-800'>Place</span>
// 				</div>

// 				{/* Desktop Nav Links */}
// 				<ul className='hidden md:flex items-center gap-8 text-[16px] font-medium'>
// 					{navLinks.map((link) => (
// 						<li key={link.label}>
// 							<Link
// 								href={link.href}
// 								className='text-gray-800 hover:text-green-600 transition-colors'>
// 								{link.label}
// 							</Link>
// 						</li>
// 					))}
// 				</ul>

// 				{/* Sign Up Button (Desktop) */}
// 				<div className='hidden md:block'>
// 					<Link href='/auth/register/1'>
// 						<button className='bg-green-600 text-white px-6 py-2 rounded-md'>
// 							Sign Up
// 						</button>
// 					</Link>
// 				</div>

// 				{/* Mobile Menu Toggle */}
// 				<button className='md:hidden' onClick={toggleMobileMenu}>
// 					{mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
// 				</button>
// 			</div>

// 			{/* Mobile Fullscreen Menu */}
// 			{mobileMenuOpen && (
// 				<div className='fixed inset-0 bg-white z-40 flex flex-col items-center px-6 pt-20 pb-8'>
// 					{/* Close Button */}
// 					<button className='absolute top-4 right-6' onClick={toggleMobileMenu}>
// 						<X size={30} className='text-gray-800' />
// 					</button>

// 					{/* Mobile Nav Links */}
// 					<ul className='space-y-6 text-lg font-medium w-full'>
// 						{navLinks.map((link) => (
// 							<li key={link.label} className='w-full'>
// 								<Link href={link.href} onClick={toggleMobileMenu}>
// 									<div className='pb-2 border-b border-gray-300 text-gray-800'>
// 										{link.label}
// 									</div>
// 								</Link>
// 							</li>
// 						))}
// 					</ul>

// 					{/* Bottom Buttons */}
// 					<div className='w-full mt-auto px-4 gap-4'>
// 						<Link href='/auth/register/1' onClick={toggleMobileMenu}>
// 							<button className='w-full py-3 bg-green-600 text-white rounded-md'>
// 								Sign Up
// 							</button>
// 						</Link>
// 					</div>
// 				</div>
// 			)}
// 		</nav>
// 	);
// };

// export default Navbar;

"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X, Leaf, ShoppingBasket, Users, BookOpen } from "lucide-react";

const navLinks = [
	{ label: "Home", href: "#", icon: <Leaf size={18} /> },
	{ label: "About Us", href: "#about", icon: <Users size={18} /> },
	{
		label: "Market Place",
		href: "/marketplace",
		icon: <ShoppingBasket size={18} />,
	},
	{ label: "Resources", href: "#resources", icon: <BookOpen size={18} /> },
];

const Navbar = () => {
	const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

	const toggleMobileMenu = () => setMobileMenuOpen((prev) => !prev);

	return (
		<nav className='fixed top-0 w-full bg-white/80 backdrop-blur-md shadow-lg border-b border-green-100 z-50'>
			<div className='max-w-7xl mx-auto flex items-center justify-between px-6 py-4'>
				{/* Logo */}
				<div className='flex items-center gap-2'>
					<div className='w-10 h-10 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl flex items-center justify-center shadow-lg transform rotate-12'>
						<Leaf size={20} className='text-white transform -rotate-12' />
					</div>
					<div className='flex items-center gap-1 text-2xl font-bold'>
						<span className='bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent'>
							Farm
						</span>
						<span className='text-gray-800'>Place</span>
					</div>
				</div>

				{/* Desktop Nav Links */}
				<ul className='hidden lg:flex items-center gap-1 text-[16px] font-medium'>
					{navLinks.map((link) => (
						<li key={link.label}>
							<Link
								href={link.href}
								className='group flex items-center gap-2 px-4 py-2 rounded-xl text-gray-700 hover:text-green-600 hover:bg-green-50 transition-all duration-200 relative overflow-hidden'>
								<div className='absolute inset-0 bg-gradient-to-r from-green-50 to-emerald-50 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left rounded-xl'></div>
								<span className='relative z-10 text-green-600 group-hover:scale-110 transition-transform duration-200'>
									{link.icon}
								</span>
								<span className='relative z-10'>{link.label}</span>
							</Link>
						</li>
					))}
				</ul>

				{/* Sign Up Button (Desktop) */}
				<div className='hidden lg:block'>
					<Link href='/auth/register/1'>
						<button className='group bg-gradient-to-r from-green-600 via-emerald-600 to-green-700 hover:from-green-700 hover:via-emerald-700 hover:to-green-800 text-white px-8 py-3 rounded-2xl font-semibold transition-all duration-300 hover:scale-105 hover:shadow-xl shadow-lg relative overflow-hidden'>
							{/* Button shine effect */}
							<div className='absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700'></div>
							<span className='relative z-10 flex items-center gap-2'>
								🌱 Join FarmPlace
							</span>
						</button>
					</Link>
				</div>

				{/* Mobile Menu Toggle */}
				<button
					className='lg:hidden w-10 h-10 bg-green-50 hover:bg-green-100 rounded-xl flex items-center justify-center transition-colors duration-200'
					onClick={toggleMobileMenu}>
					{mobileMenuOpen ? (
						<X size={24} className='text-green-600' />
					) : (
						<Menu size={24} className='text-green-600' />
					)}
				</button>
			</div>

			{/* Mobile Fullscreen Menu */}
			{mobileMenuOpen && (
				<div className='fixed h-screen inset-0 bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 z-40 flex flex-col'>
					{/* Mobile Header */}
					<div className='flex items-center justify-between px-6 py-6 bg-white/80 backdrop-blur-md border-b border-green-100'>
						<div className='flex items-center gap-2'>
							<div className='w-8 h-8 bg-gradient-to-br from-green-500 to-emerald-600 rounded-lg flex items-center justify-center transform rotate-12'>
								<Leaf size={16} className='text-white transform -rotate-12' />
							</div>
							<div className='flex items-center gap-1 text-xl font-bold'>
								<span className='bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent'>
									Farm
								</span>
								<span className='text-gray-800'>Place</span>
							</div>
						</div>
						<button
							className='w-10 h-10 bg-red-50 hover:bg-red-100 rounded-xl flex items-center justify-center transition-colors duration-200'
							onClick={toggleMobileMenu}>
							<X size={24} className='text-red-500' />
						</button>
					</div>

					{/* Mobile Nav Links */}
					<div className='flex-1 px-6 py-8 overflow-y-auto'>
						<ul className='space-y-2'>
							{navLinks.map((link, index) => (
								<li key={link.label} className='w-full'>
									<Link
										href={link.href}
										onClick={toggleMobileMenu}
										className='group block w-full'>
										<div className='flex items-center gap-4 p-4 bg-white/60 backdrop-blur-sm hover:bg-white/80 rounded-2xl border border-green-100 hover:border-green-200 transition-all duration-300 hover:scale-[1.02] hover:shadow-lg'>
											<div className='w-12 h-12 bg-gradient-to-br from-green-400 to-emerald-500 rounded-xl flex items-center justify-center text-white shadow-lg group-hover:scale-110 transition-transform duration-200'>
												{link.icon}
											</div>
											<div className='flex-1'>
												<span className='text-lg font-semibold text-gray-800 group-hover:text-green-600 transition-colors duration-200'>
													{link.label}
												</span>
												<div className='text-sm text-gray-500 mt-1'>
													{index === 0 && "Discover fresh produce"}
													{index === 1 && "Learn our story"}
													{index === 2 && "Shop fresh groceries"}
													{index === 3 && "Farming guides & tips"}
												</div>
											</div>
											<div className='w-8 h-8 bg-green-50 rounded-lg flex items-center justify-center group-hover:bg-green-100 transition-colors duration-200'>
												<svg
													className='w-4 h-4 text-green-600'
													fill='none'
													stroke='currentColor'
													viewBox='0 0 24 24'>
													<path
														strokeLinecap='round'
														strokeLinejoin='round'
														strokeWidth={2}
														d='M9 5l7 7-7 7'
													/>
												</svg>
											</div>
										</div>
									</Link>
								</li>
							))}
						</ul>
					</div>

					{/* Mobile Bottom Section */}
					<div className='px-6 py-6 bg-white/80 backdrop-blur-md border-t border-green-100'>
						<Link href='/auth/register/1' onClick={toggleMobileMenu}>
							<button className='w-full bg-gradient-to-r from-green-600 via-emerald-600 to-green-700 text-white py-4 rounded-2xl font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-300 active:scale-[0.98] relative overflow-hidden group'>
								{/* Button background animation */}
								<div className='absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700'></div>
								<span className='relative z-10 flex items-center justify-center gap-2'>
									🌱 Join Our Farm Community
								</span>
							</button>
						</Link>

						{/* Trust indicators */}
						<div className='flex items-center justify-center gap-6 mt-4 text-sm text-gray-500'>
							<div className='flex items-center gap-1'>
								<div className='w-2 h-2 bg-green-400 rounded-full'></div>
								<span>Fresh Daily</span>
							</div>
							<div className='flex items-center gap-1'>
								<div className='w-2 h-2 bg-blue-400 rounded-full'></div>
								<span>Local Farms</span>
							</div>
							<div className='flex items-center gap-1'>
								<div className='w-2 h-2 bg-yellow-400 rounded-full'></div>
								<span>Organic</span>
							</div>
						</div>
					</div>
				</div>
			)}
		</nav>
	);
};

export default Navbar;
