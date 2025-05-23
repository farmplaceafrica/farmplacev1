import React from "react";
import { User } from "lucide-react";
import FarmHeroSection from "@/components/dashboard/farmer-hero";

export default function ProfilePage() {
	return (
		<div className='max-w-6xl mx-auto'>
			{/* Hero Section */}
			<FarmHeroSection />
			{/* Personal Information */}
			<div className='bg-white rounded-lg shadow-sm p-6'>
				<div className='flex items-center space-x-2 mb-6'>
					<User className='text-green-600' size={20} />
					<h3 className='text-lg font-semibold text-gray-900'>
						Personal Information
					</h3>
				</div>

				<div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
					<div>
						<label className='block text-sm font-medium text-gray-700 mb-1'>
							Legal Name
						</label>
						<p className='text-gray-900'>Precious Cletus Eyo</p>
					</div>
					<div>
						<label className='block text-sm font-medium text-gray-700 mb-1'>
							Birth Date
						</label>
						<p className='text-gray-900'>20/12/1998</p>
					</div>
					<div>
						<label className='block text-sm font-medium text-gray-700 mb-1'>
							Gender
						</label>
						<p className='text-gray-900'>Female</p>
					</div>
					<div>
						<label className='block text-sm font-medium text-gray-700 mb-1'>
							Mobile Number
						</label>
						<p className='text-gray-900'>09087654327</p>
					</div>
					<div>
						<label className='block text-sm font-medium text-gray-700 mb-1'>
							Email Address
						</label>
						<p className='text-gray-900'>farmplace001@gmail.com</p>
					</div>
					<div>
						<label className='block text-sm font-medium text-gray-700 mb-1'>
							Location
						</label>
						<p className='text-gray-900'>-</p>
					</div>
					<div>
						<label className='block text-sm font-medium text-gray-700 mb-1'>
							Farmers ID Number
						</label>
						<p className='text-gray-900'>FP0001</p>
					</div>
				</div>
			</div>
		</div>
	);
}
