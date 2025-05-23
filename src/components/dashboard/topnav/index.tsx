"use client";

import React from "react";
import Link from "next/link";
import {
	LayoutDashboard,
	Store,
	Menu,
	Bell,
	Search,
	MessageSquare,
} from "lucide-react";

interface TopNavigationProps {
	onMenuClick: () => void;
}

const TopNavigation = ({ onMenuClick }: TopNavigationProps) => {
	return (
		<header className='bg-white border-b border-gray-200 px-4 lg:px-6 py-4'>
			<div className='flex items-center justify-between'>
				{/* Left Section */}
				<div className='flex items-center space-x-4'>
					<button
						onClick={onMenuClick}
						className='lg:hidden p-2 hover:bg-gray-100 rounded-lg'>
						<Menu size={20} />
					</button>

					{/* Navigation Links */}
					<nav className='hidden md:flex items-center space-x-6'>
						<Link
							href='/marketplace'
							className='flex items-center space-x-2 text-gray-600 hover:text-gray-900 font-medium'>
							<Store size={18} />
							<span>Market Place</span>
						</Link>
						<Link
							href='/dashboard'
							className='flex items-center space-x-2 text-green-600 hover:text-green-700 font-medium'>
							<LayoutDashboard size={18} />
							<span>Dashboard</span>
						</Link>
					</nav>
				</div>

				{/* Right Section */}
				<div className='flex items-center space-x-4'>
					{/* Search */}
					<button className='hidden sm:flex p-2 hover:bg-gray-100 rounded-lg'>
						<Search size={20} className='text-gray-500' />
					</button>

					{/* Messages */}
					<button className='p-2 hover:bg-gray-100 rounded-lg relative'>
						<MessageSquare size={20} className='text-gray-500' />
						<span className='absolute -top-1 -right-1 w-5 h-5 bg-green-500 text-white text-xs rounded-full flex items-center justify-center'>
							2
						</span>
					</button>

					{/* Notifications */}
					<button className='p-2 hover:bg-gray-100 rounded-lg'>
						<Bell size={20} className='text-gray-500' />
					</button>

					{/* Profile */}
					<Link
						href='/dashboard/profile'
						className='flex items-center space-x-2'>
						<div className='w-8 h-8 bg-green-500 rounded-full flex items-center justify-center'>
							<span className='text-white font-medium text-sm'>P</span>
						</div>
						<span className='hidden sm:block text-sm font-medium text-gray-700'>
							P
						</span>
					</Link>
				</div>
			</div>
		</header>
	);
};

export default TopNavigation;
