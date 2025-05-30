"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
	LayoutDashboard,
	User,
	BarChart3,
	Wallet,
	Plus,
	BookOpen,
	Settings,
	LogOut,
	X,
	ShoppingBag,
} from "lucide-react";

interface SidebarProps {
	isOpen: boolean;
	onClose: () => void;
}

const Sidebar = ({ isOpen, onClose }: SidebarProps) => {
	const pathname = usePathname();

	const menuItems = [
		{ icon: LayoutDashboard, label: "Dashboard", path: "/dashboard" },
		{ icon: User, label: "Profile", path: "/dashboard/profile" },
		{ icon: BarChart3, label: "Analytics", path: "/dashboard/analytics" },
		{ icon: Wallet, label: "Wallet", path: "/dashboard/wallet" },
		{ icon: Plus, label: "Add Product", path: "/dashboard/add-product" },
		{ icon: BookOpen, label: "Resources", path: "/dashboard/resources" },
		{ icon: ShoppingBag, label: "My Store", path: "/dashboard/store" },
	];

	return (
		<>
			{/* Mobile Overlay */}
			{isOpen && (
				<div
					className='fixed inset-0 bg-black/20 bg-opacity-10 z-40 lg:hidden'
					onClick={onClose}
				/>
			)}

			{/* Sidebar */}
			<div
				className={`
        fixed h-full w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out z-50
        ${isOpen ? "translate-x-0" : "-translate-x-full"}
        lg:translate-x-0 l lg:shadow-none
      `}>
				{/* Logo */}
				<div className='p-6 border-b'>
					<div className='flex items-center justify-between'>
						<Link href='/dashboard' className='flex items-center space-x-2'>
							<div className='w-8 h-8 bg-green-500 rounded-lg flex items-center justify-center'>
								<span className='text-white font-bold text-sm'>F</span>
							</div>
							<span className='text-xl font-semibold'>
								<span className='text-green-600'>Farm</span>Place
							</span>
						</Link>
						<button
							onClick={onClose}
							className='lg:hidden p-1 hover:bg-gray-100 rounded'>
							<X size={20} />
						</button>
					</div>
				</div>

				{/* Navigation */}
				<nav className='mt-6 px-4'>
					<ul className='space-y-2'>
						{menuItems.map((item, index) => {
							const isActive = pathname === item.path;
							return (
								<li key={index}>
									<Link
										href={item.path}
										className={`
                      flex items-center space-x-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors
                      ${
												isActive
													? "bg-[#459F49] text-white "
													: "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
											}
                    `}>
										<item.icon size={20} />
										<span>{item.label}</span>
									</Link>
								</li>
							);
						})}
					</ul>
				</nav>

				{/* Bottom Section */}
				<div className='absolute bottom-0 left-0 right-0 p-4 border-t'>
					<div className='space-y-2'>
						<Link
							href='/dashboard/settings'
							className='flex items-center space-x-3 px-4 py-3 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-50 hover:text-gray-900 transition-colors'>
							<Settings size={20} />
							<span>Settings</span>
						</Link>
						<Link href='/auth/login'>
							<button className='w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-sm font-medium text-red-600 hover:bg-red-50 transition-colors'>
								<LogOut size={20} />
								<span>Log out</span>
							</button>
						</Link>
					</div>
				</div>
			</div>
		</>
	);
};

export default Sidebar;
