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
// 					<ul className='space-y-6  text-lg font-medium w-full'>
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
// 					<div className=' w-full mt-auto px-4 gap-4'>
// 						<Link href='/auth/register' onClick={toggleMobileMenu}>
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
import { Menu, X } from "lucide-react";

const navLinks = [
	{ label: "Home", href: "#" },
	{ label: "About Us", href: "#about" },
	{ label: "Market Place", href: "/marketplace" },
	{ label: "Resources", href: "#resources" },
];

const Navbar = () => {
	const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

	const toggleMobileMenu = () => setMobileMenuOpen((prev) => !prev);

	return (
		<nav className='fixed top-0 w-full bg-[#C3E0C44D] shadow-md z-50'>
			<div className='max-w-7xl mx-auto flex items-center justify-between px-6 py-4'>
				{/* Logo */}
				<div className='flex items-center gap-1 text-2xl font-semibold'>
					<span className='text-green-600'>Farm</span>
					<span className='text-gray-800'>Place</span>
				</div>

				{/* Desktop Nav Links */}
				<ul className='hidden md:flex items-center gap-8 text-[16px] font-medium'>
					{navLinks.map((link) => (
						<li key={link.label}>
							<Link
								href={link.href}
								className='text-gray-800 hover:text-green-600 transition-colors'>
								{link.label}
							</Link>
						</li>
					))}
				</ul>

				{/* Sign Up Button (Desktop) */}
				<div className='hidden md:block'>
					<Link href='/auth/register/1'>
						<button className='bg-green-600 text-white px-6 py-2 rounded-md'>
							Sign Up
						</button>
					</Link>
				</div>

				{/* Mobile Menu Toggle */}
				<button className='md:hidden' onClick={toggleMobileMenu}>
					{mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
				</button>
			</div>

			{/* Mobile Fullscreen Menu */}
			{mobileMenuOpen && (
				<div className='fixed inset-0 bg-white z-40 flex flex-col items-center px-6 pt-20 pb-8'>
					{/* Close Button */}
					<button className='absolute top-4 right-6' onClick={toggleMobileMenu}>
						<X size={30} className='text-gray-800' />
					</button>

					{/* Mobile Nav Links */}
					<ul className='space-y-6 text-lg font-medium w-full'>
						{navLinks.map((link) => (
							<li key={link.label} className='w-full'>
								<Link href={link.href} onClick={toggleMobileMenu}>
									<div className='pb-2 border-b border-gray-300 text-gray-800'>
										{link.label}
									</div>
								</Link>
							</li>
						))}
					</ul>

					{/* Bottom Buttons */}
					<div className='w-full mt-auto px-4 gap-4'>
						<Link href='/auth/register/1' onClick={toggleMobileMenu}>
							<button className='w-full py-3 bg-green-600 text-white rounded-md'>
								Sign Up
							</button>
						</Link>
					</div>
				</div>
			)}
		</nav>
	);
};

export default Navbar;
