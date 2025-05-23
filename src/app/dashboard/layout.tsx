"use client";

import React, { useState } from "react";
import Sidebar from "@/components/dashboard/sidenav";
import TopNavigation from "@/components/dashboard/topnav";

export default function DashboardLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	const [sidebarOpen, setSidebarOpen] = useState(false);

	const handleMenuClick = () => {
		setSidebarOpen(true);
	};

	const handleSidebarClose = () => {
		setSidebarOpen(false);
	};

	return (
		<div className='min-h-screen flex bg-gray-50'>
			{/* Sidebar */}
			<Sidebar isOpen={sidebarOpen} onClose={handleSidebarClose} />

			{/* Main Content */}
			<div className=' w-full ml-0 lg:ml-64'>
				{/* Top Navigation */}
				<TopNavigation onMenuClick={handleMenuClick} />

				{/* Page Content */}
				<main className='p-4 lg:p-6'>{children}</main>
			</div>
		</div>
	);
}
