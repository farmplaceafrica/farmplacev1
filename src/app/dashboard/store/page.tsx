"use client";

import React, { useState } from "react";
import Image from "next/image";
import Spinner from "@/components/spinner";

interface StoreFormData {
	storeName: string;
	location: {
		state: string;
		lga: string;
		address: string;
	};
	description: string;
}

interface SuccessModalProps {
	onGoToStore: () => void;
}

const SuccessModal: React.FC<SuccessModalProps> = ({ onGoToStore }) => (
	<div className='fixed inset-0 bg-black/30  bg-opacity-50 flex items-center justify-center z-50'>
		<div className='bg-white rounded-lg p-8 max-w-md w-full mx-4'>
			<div className='text-center'>
				<div className='w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4'>
					<svg
						className='w-8 h-8 text-green-500'
						fill='none'
						stroke='currentColor'
						viewBox='0 0 24 24'>
						<path
							strokeLinecap='round'
							strokeLinejoin='round'
							strokeWidth={2}
							d='M5 13l4 4L19 7'
						/>
					</svg>
				</div>
				<h2 className='text-2xl font-semibold text-gray-800 mb-2'>Success</h2>
				<p className='text-gray-600 mb-6'>
					You've successfully created your
					<br />
					FarmPlace store.
				</p>
				<button
					onClick={onGoToStore}
					className='bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded-lg transition-colors'>
					Go to Store
				</button>
			</div>
		</div>
	</div>
);

interface EmptyStoreProps {
	onAddProduct: () => void;
}

const EmptyStore: React.FC<EmptyStoreProps> = ({ onAddProduct }) => (
	<div className='min-h-screen bg-gray-50'>
		<div className='bg-white shadow-sm'>
			<div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
				<div className='flex justify-between items-center py-4'>
					<h1 className='text-xl font-medium text-gray-900'>
						Welcome to your store
					</h1>
					<button
						onClick={onAddProduct}
						className='bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg transition-colors'>
						Add Product
					</button>
				</div>
			</div>
		</div>

		<div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16'>
			<div className='text-center'>
				<div className='mb-8'>
					<Image
						src='/assets/images/basket.png'
						alt='Empty basket'
						width={120}
						height={120}
						className='mx-auto'
					/>
				</div>
				<h2 className='text-2xl font-medium text-gray-900 mb-4'>
					Your store is empty.
				</h2>
				<p className='text-gray-600'>
					Click on "add product" to add
					<br />
					product to your store
				</p>
			</div>
		</div>
	</div>
);

const FarmPlaceStoreCreation: React.FC = () => {
	const [currentStep, setCurrentStep] = useState<
		"initial" | "form" | "success" | "store"
	>("initial");
	const [formData, setFormData] = useState<StoreFormData>({
		storeName: "",
		location: {
			state: "",
			lga: "",
			address: "",
		},
		description: "",
	});
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);

	// const handleInputChange = (
	// 	e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
	// ) => {
	// 	const { name, value } = e.target;
	// 	setFormData((prev) => ({
	// 		...prev,
	// 		[name]: value,
	// 	}));
	// };

	const handleInputChange = (
		e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
	) => {
		const { name, value } = e.target;

		// Check if it's a location field
		if (name === "state" || name === "lga" || name === "address") {
			setFormData((prev) => ({
				...prev,
				location: {
					...prev.location,
					[name]: value,
				},
			}));
		} else {
			// Handle other fields normally
			setFormData((prev) => ({
				...prev,
				[name]: value,
			}));
		}
	};

	const token = localStorage.getItem("auth_token");

	const handleCreateStore = async () => {
		setIsLoading(true);
		setError(null);

		try {
			const response = await fetch(
				"https://farmplace-backend-api.onrender.com/api/v1/farmstore",
				{
					method: "POST",
					headers: {
						"Content-Type": "application/json",
						// Add authorization header if needed
						Authorization: `Bearer ${token}`,
					},
					body: JSON.stringify({
						storeName: formData.storeName,
						location: {
							state: formData.location.state,
							lga: formData.location.lga,
							address: formData.location.address,
						},
						description: formData.description,
					}),
				}
			);

			if (!response.ok) {
				throw new Error("Failed to create store");
			}

			const result = await response.json();
			console.log("Store created successfully:", result);
			setCurrentStep("success");
		} catch (err) {
			setError(err instanceof Error ? err.message : "An error occurred");
		} finally {
			setIsLoading(false);
		}
	};

	const isFormValid =
		formData.storeName.trim() !== "" &&
		formData.location.state.trim() !== "" &&
		formData.location.lga.trim() !== "" &&
		formData.location.address.trim() !== "" &&
		formData.description.trim().length <= 50;

	if (currentStep === "store") {
		return (
			<EmptyStore onAddProduct={() => console.log("Add product clicked")} />
		);
	}

	return (
		<div className='min-h-screen bg-gray-50'>
			{/* Header */}
			<div className=''>
				<div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
					<div className='flex justify-end py-4'>
						{currentStep === "initial" && (
							<button
								onClick={() => setCurrentStep("form")}
								className='bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded-lg transition-colors'>
								Create Store
							</button>
						)}
					</div>
				</div>
			</div>

			{/* Main Content */}
			<div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16'>
				{currentStep === "initial" && (
					<div className='text-center'>
						<div className=' rounded-lg p-12 max-w-md mx-auto'>
							<div className='mb-4'>
								<Image
									src='/assets/images/basket.png'
									alt='Create store basket'
									width={100}
									height={100}
									className='mx-auto'
								/>
							</div>

							<h2 className='text-xl font-medium text-gray-900 mb-2'>
								Create Your Store
							</h2>
							<p className='text-gray-600 mb-6'>Create your FarmPlace store</p>
						</div>
					</div>
				)}

				{currentStep === "form" && (
					<div className='max-w-2xl mx-auto'>
						<div className='bg-white rounded-lg shadow-sm p-8'>
							<h1 className='text-2xl font-medium text-gray-900 text-center mb-8'>
								Create Your Store
							</h1>

							{error && (
								<div className='bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-6'>
									{error}
								</div>
							)}

							<div className='space-y-6'>
								<div>
									<label className='block text-sm font-medium text-gray-700 mb-2'>
										Store Name
									</label>
									<input
										type='text'
										name='storeName'
										value={formData.storeName}
										onChange={handleInputChange}
										placeholder='A name for your store'
										className='w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent'
									/>
								</div>

								<div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
									<div>
										<input
											type='text'
											name='state'
											value={formData.location.state}
											onChange={handleInputChange}
											placeholder='State Of Resident'
											className='w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent'
										/>
									</div>
									<div>
										<input
											type='text'
											name='lga'
											value={formData.location.lga}
											onChange={handleInputChange}
											placeholder='LGA Of Resident'
											className='w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent'
										/>
									</div>
								</div>

								<div>
									<input
										type='text'
										name='address'
										value={formData.location.address}
										onChange={handleInputChange}
										placeholder='Your Address'
										className='w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent'
									/>
								</div>

								<div>
									<div className='flex justify-between items-center mb-2'>
										<label className='block text-sm font-medium text-gray-700'>
											Description
										</label>
										<span className='text-sm text-gray-500'>
											{formData.description.length}/50
										</span>
									</div>
									<textarea
										name='description'
										value={formData.description}
										onChange={handleInputChange}
										placeholder='A brief description of what you sell'
										maxLength={50}
										rows={4}
										className='w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent'
									/>
								</div>

								<div className='pt-4'>
									<button
										onClick={handleCreateStore}
										disabled={!isFormValid || isLoading}
										className='w-full bg-[#4CAF50] h-[50px] text-white py-3 rounded-lg transition-colors font-medium'>
										{isLoading ? <Spinner /> : "Create Store"}
									</button>
								</div>
							</div>
						</div>
					</div>
				)}
			</div>

			{/* Success Modal */}
			{currentStep === "success" && (
				<SuccessModal onGoToStore={() => setCurrentStep("store")} />
			)}
		</div>
	);
};

export default FarmPlaceStoreCreation;
