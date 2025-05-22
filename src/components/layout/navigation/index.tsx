"use client";
import { useWalletList } from "@meshsdk/react";
import { useState } from "react";
import { ChevronDown, Menu, X } from "lucide-react";
import Button from "@/components/global/Button";

const navLinks = [
	{ label: "Home", href: "#", active: true },
	{ label: "About Us", href: "#about" },
	{ label: "Market Place", href: "/marketplace" },
	{ label: "Resources", href: "#resources" },
];

const countries = [
	{ name: "Nigeria", flag: "🇳🇬" },
	{ name: "Ghana", flag: "🇬🇭" },
	{ name: "Kenya", flag: "🇰🇪" },
	{ name: "South Africa", flag: "🇿🇦" },
];

const Navbar = () => {
	// const wallets = useWalletList();
	const [isDropdownOpen, setIsDropdownOpen] = useState(false);
	const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
	const [selectedCountry, setSelectedCountry] = useState(countries[0]);

	const toggleDropdown = () => setIsDropdownOpen((prev) => !prev);
	const toggleMobileMenu = () => setMobileMenuOpen((prev) => !prev);

	const handleSelectCountry = (country: (typeof countries)[0]) => {
		setSelectedCountry(country);
		setIsDropdownOpen(false);
	};

	return (
		<nav className='bg-[#C3E0C44D] px-6 py-4 shadow-sm'>
			<div className='max-w-7xl mx-auto flex items-center justify-between'>
				{/* Logo */}
				<div className='flex items-center gap-1 text-2xl font-semibold'>
					<span className='text-green-600'>Farm</span>
					<span className='text-gray-800'>Place</span>
				</div>

				{/* Desktop Nav Links */}
				<ul className='hidden md:flex items-center gap-8 text-[16px] font-medium'>
					{navLinks.map((link) => (
						<li
							key={link.label}
							className={`cursor-pointer hover:text-green-600 ${
								link.active ? "text-green-600" : "text-gray-800"
							}`}>
							<a href={link.href}>{link.label}</a>
						</li>
					))}
				</ul>

				{/* Right Side: Button + Dropdown + Mobile Icon */}
				<div className='flex items-center gap-4'>
					{/* Sign Up Button */}
					<div className='hidden md:block'>
						<Button className='w-[160px]'>Sign Up</Button>
					</div>

					{/* <div>
						{wallets.map((wallet, i) => {
							return (
								<p key={i}>
									<img src={wallet.icon} style={{ width: "48px" }} />
									<b>{wallet.name}</b>
								</p>
							);
						})}
					</div> */}

					{/* Dropdown */}
					<div className='relative hidden md:block'>
						<button
							onClick={toggleDropdown}
							className='flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-md shadow-sm hover:shadow-md'>
							<span role='img' aria-label={selectedCountry.name}>
								{selectedCountry.flag}
							</span>
							<span className='text-gray-800'>{selectedCountry.name}</span>
							<ChevronDown size={16} />
						</button>

						{isDropdownOpen && (
							<div className='absolute top-full mt-2 w-40 bg-white border-[#4CAF50] border overflow-hidden rounded-md shadow-lg z-10'>
								<ul>
									{countries.map((country) => (
										<li
											key={country.name}
											onClick={() => handleSelectCountry(country)}
											className='px-4 text-black py-2 hover:bg-gray-100 cursor-pointer flex items-center gap-2'>
											<span>{country.flag}</span>
											<span>{country.name}</span>
										</li>
									))}
								</ul>
							</div>
						)}
					</div>

					{/* Mobile menu toggle */}
					<button className='md:hidden' onClick={toggleMobileMenu}>
						{mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
					</button>
				</div>
			</div>

			{/* Mobile Menu */}
			{mobileMenuOpen && (
				<div className='md:hidden mt-4 space-y-4'>
					<ul className='flex flex-col gap-2'>
						{navLinks.map((link) => (
							<li
								key={link.label}
								className={`px-2 py-2 hover:bg-green-50 rounded ${
									link.active ? "text-green-600" : "text-gray-800"
								}`}>
								<a href={link.href}>{link.label}</a>
							</li>
						))}
					</ul>

					<Button className='w-full'>Sign Up</Button>

					<div className='relative'>
						<button
							onClick={toggleDropdown}
							className='mt-2 flex w-full items-center justify-between px-4 py-2 bg-white border border-gray-200 rounded-md shadow-sm hover:shadow-md'>
							<div className='flex items-center gap-2'>
								<span role='img' aria-label={selectedCountry.name}>
									{selectedCountry.flag}
								</span>
								<span className='text-gray-800'>{selectedCountry.name}</span>
							</div>
							<ChevronDown size={16} />
						</button>

						{isDropdownOpen && (
							<div className='absolute top-full mt-2 w-full bg-white border-[#4CAF50] border overflow-hidden rounded-md shadow-lg z-10'>
								<ul>
									{countries.map((country) => (
										<li
											key={country.name}
											onClick={() => handleSelectCountry(country)}
											className='px-4 text-black py-2 hover:bg-gray-100 cursor-pointer flex items-center gap-2'>
											<span>{country.flag}</span>
											<span>{country.name}</span>
										</li>
									))}
								</ul>
							</div>
						)}
					</div>
				</div>
			)}
		</nav>
	);
};

export default Navbar;
