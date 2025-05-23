import React from "react";
import {
	Upload,
	DollarSign,
	CheckCircle,
	TrendingUp,
	Calendar,
	Users,
	Leaf,
	BarChart3,
} from "lucide-react";

import ResourcesSection from "@/components/dashboard/resources";
import FarmHeroSection from "@/components/dashboard/farmer-hero";
import Analytics from "@/components/dashboard/analyitics";

// Analytics Chart Component

// Main Dashboard Component
const FarmerDashboard = () => {
	return (
		<div className='min-h-screen bg-gray-50 p-6'>
			<div className='max-w-7xl mx-auto'>
				{/* Header */}
				<FarmHeroSection />

				{/* Stats Cards */}
				<div className='grid grid-cols-1 md:grid-cols-3 gap-6 mb-8'>
					<div className='bg-[#2A602C] rounded-lg p-6 text-white'>
						<div className='flex items-center justify-between'>
							<div>
								<p className='text-green-200 text-sm'>Product Upload</p>
								<p className='text-3xl font-bold'>0</p>
							</div>
							<Upload className='h-8 w-8 text-green-200' />
						</div>
					</div>

					<div className='bg-[#2A602C] rounded-lg p-6 text-white'>
						<div className='flex items-center justify-between'>
							<div>
								<p className='text-green-200 text-sm'>Sales</p>
								<p className='text-3xl font-bold'>0</p>
							</div>
							<DollarSign className='h-8 w-8 text-green-200' />
						</div>
					</div>

					<div className='bg-[#2A602C] rounded-lg p-6 text-white'>
						<div className='flex items-center justify-between'>
							<div>
								<p className='text-green-200 text-sm'>ID Verified</p>
								<p className='text-3xl font-bold'>✓</p>
							</div>
							<CheckCircle className='h-8 w-8 text-green-200' />
						</div>
					</div>
				</div>

				{/* Quick Stats */}
				<div className='grid grid-cols-2 md:grid-cols-4 gap-4 mb-8'>
					<div className='bg-white rounded-lg p-4 text-center shadow-md'>
						<TrendingUp className='h-8 w-8 text-blue-600 mx-auto mb-2' />
						<p className='text-2xl font-bold text-gray-800'>12.5%</p>
						<p className='text-sm text-gray-600'>Growth Rate</p>
					</div>

					<div className='bg-white rounded-lg p-4 text-center shadow-md'>
						<Calendar className='h-8 w-8 text-purple-600 mx-auto mb-2' />
						<p className='text-2xl font-bold text-gray-800'>45</p>
						<p className='text-sm text-gray-600'>Days to Harvest</p>
					</div>

					<div className='bg-white rounded-lg p-4 text-center shadow-md'>
						<Users className='h-8 w-8 text-indigo-600 mx-auto mb-2' />
						<p className='text-2xl font-bold text-gray-800'>124</p>
						<p className='text-sm text-gray-600'>Active Buyers</p>
					</div>

					<div className='bg-white rounded-lg p-4 text-center shadow-md'>
						<BarChart3 className='h-8 w-8 text-green-600 mx-auto mb-2' />
						<p className='text-2xl font-bold text-gray-800'>89%</p>
						<p className='text-sm text-gray-600'>Market Share</p>
					</div>
				</div>
				{/* <Analytizcs /> */}
				{/* Resources Section */}
				<ResourcesSection />
			</div>
		</div>
	);
};

export default FarmerDashboard;
