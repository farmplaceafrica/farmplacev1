"use client";

import React, { useState } from "react";
import { User, Edit2, Save, X } from "lucide-react";
import FarmHeroSection from "@/components/dashboard/farmer-hero";

export default function ProfilePage() {
	// Initial farmer data - this would come from your API later
	const initialData = {
		legalName: "Precious Cletus Eyo",
		birthDate: "1998-12-20", // Using ISO format for input[type="date"]
		gender: "Female",
		mobileNumber: "09087654327",
		emailAddress: "farmplace001@gmail.com",
		location: "",
		farmersId: "FP0001",
	};

	const [farmerData, setFarmerData] = useState(initialData);
	const [isEditing, setIsEditing] = useState(false);
	const [tempData, setTempData] = useState(initialData);
	const [isLoading, setIsLoading] = useState(false);

	const handleEdit = () => {
		setTempData(farmerData);
		setIsEditing(true);
	};

	const handleCancel = () => {
		setTempData(farmerData);
		setIsEditing(false);
	};

	const handleSave = async () => {
		setIsLoading(true);

		try {
			// This is where you'll make your API call later
			// const response = await updateFarmerProfile(tempData);

			// Simulate API call delay
			await new Promise((resolve) => setTimeout(resolve, 1000));

			setFarmerData(tempData);
			setIsEditing(false);

			// You can add success notification here
			console.log("Profile updated successfully");
		} catch (error) {
			console.error("Error updating profile:", error);
			// Handle error - show notification, etc.
		} finally {
			setIsLoading(false);
		}
	};

	const handleInputChange = (field: string, value: string) => {
		setTempData((prev) => ({
			...prev,
			[field]: value,
		}));
	};

	const formatDisplayDate = (isoDate: string | number | Date) => {
		if (!isoDate) return "-";
		const date = new Date(isoDate);
		return date.toLocaleDateString("en-GB"); // DD/MM/YYYY format
	};

	return (
		<div className='max-w-6xl mx-auto'>
			{/* Hero Section */}
			<FarmHeroSection />

			{/* Personal Information */}
			<div className='bg-white rounded-lg shadow-sm p-6'>
				<div className='flex items-center justify-between mb-6'>
					<div className='flex items-center space-x-2'>
						<User className='text-green-600' size={20} />
						<h3 className='text-lg font-semibold text-gray-900'>
							Personal Information
						</h3>
					</div>

					<div className='flex space-x-2'>
						{!isEditing ? (
							<button
								onClick={handleEdit}
								className='flex items-center space-x-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors'>
								<Edit2 size={16} />
								<span>Edit Profile</span>
							</button>
						) : (
							<div className='flex space-x-2'>
								<button
									onClick={handleCancel}
									className='flex items-center space-x-2 px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors'
									disabled={isLoading}>
									<X size={16} />
									<span>Cancel</span>
								</button>
								<button
									onClick={handleSave}
									disabled={isLoading}
									className='flex items-center space-x-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed'>
									<Save size={16} />
									<span>{isLoading ? "Saving..." : "Save Changes"}</span>
								</button>
							</div>
						)}
					</div>
				</div>

				<div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
					{/* Legal Name */}
					<div>
						<label className='block text-sm font-medium text-gray-700 mb-1'>
							Legal Name
						</label>
						{isEditing ? (
							<input
								type='text'
								value={tempData.legalName}
								onChange={(e) => handleInputChange("legalName", e.target.value)}
								className='w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none'
								placeholder='Enter your legal name'
							/>
						) : (
							<p className='text-gray-900'>{farmerData.legalName || "-"}</p>
						)}
					</div>

					{/* Birth Date */}
					<div>
						<label className='block text-sm font-medium text-gray-700 mb-1'>
							Birth Date
						</label>
						{isEditing ? (
							<input
								type='date'
								value={tempData.birthDate}
								onChange={(e) => handleInputChange("birthDate", e.target.value)}
								className='w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none'
							/>
						) : (
							<p className='text-gray-900'>
								{formatDisplayDate(farmerData.birthDate)}
							</p>
						)}
					</div>

					{/* Gender */}
					<div>
						<label className='block text-sm font-medium text-gray-700 mb-1'>
							Gender
						</label>
						{isEditing ? (
							<select
								value={tempData.gender}
								onChange={(e) => handleInputChange("gender", e.target.value)}
								className='w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none'>
								<option value=''>Select Gender</option>
								<option value='Male'>Male</option>
								<option value='Female'>Female</option>
								<option value='Other'>Other</option>
								<option value='Prefer not to say'>Prefer not to say</option>
							</select>
						) : (
							<p className='text-gray-900'>{farmerData.gender || "-"}</p>
						)}
					</div>

					{/* Mobile Number */}
					<div>
						<label className='block text-sm font-medium text-gray-700 mb-1'>
							Mobile Number
						</label>
						{isEditing ? (
							<input
								type='tel'
								value={tempData.mobileNumber}
								onChange={(e) =>
									handleInputChange("mobileNumber", e.target.value)
								}
								className='w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none'
								placeholder='Enter your mobile number'
							/>
						) : (
							<p className='text-gray-900'>{farmerData.mobileNumber || "-"}</p>
						)}
					</div>

					{/* Email Address */}
					<div>
						<label className='block text-sm font-medium text-gray-700 mb-1'>
							Email Address
						</label>
						{isEditing ? (
							<input
								type='email'
								value={tempData.emailAddress}
								onChange={(e) =>
									handleInputChange("emailAddress", e.target.value)
								}
								className='w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none'
								placeholder='Enter your email address'
							/>
						) : (
							<p className='text-gray-900'>{farmerData.emailAddress || "-"}</p>
						)}
					</div>

					{/* Location */}
					<div>
						<label className='block text-sm font-medium text-gray-700 mb-1'>
							Location
						</label>
						{isEditing ? (
							<input
								type='text'
								value={tempData.location}
								onChange={(e) => handleInputChange("location", e.target.value)}
								className='w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none'
								placeholder='Enter your location'
							/>
						) : (
							<p className='text-gray-900'>{farmerData.location || "-"}</p>
						)}
					</div>

					{/* Farmers ID Number - Usually not editable */}
					<div>
						<label className='block text-sm font-medium text-gray-700 mb-1'>
							Farmers ID Number
						</label>
						<p className='text-gray-900 bg-gray-50 px-3 py-2 rounded-lg'>
							{farmerData.farmersId || "-"}
						</p>
						{isEditing && (
							<p className='text-xs text-gray-500 mt-1'>
								ID number cannot be modified
							</p>
						)}
					</div>
				</div>
			</div>
		</div>
	);
}
