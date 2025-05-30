"use client";

import React, { useState, useRef } from "react";
import { Upload, X, CheckCircle, AlertCircle } from "lucide-react";

interface ProductImage {
	file: File;
	preview: string;
	id: string;
}

interface ProductFormData {
	productName: string;
	category: string;
	description: string;
	location: string;
	priceNGN: string;
	mainImage: ProductImage | null;
	additionalImages: ProductImage[];
}

interface ProductFormProps {
	onSubmit?: (data: ProductFormData) => Promise<void>;
	onSaveDraft?: (data: ProductFormData) => void;
	initialData?: Partial<ProductFormData>;
	categories?: string[];
	locations?: string[];
}

interface ToastProps {
	type: "success" | "error";
	message: string;
	onClose: () => void;
}

const Toast: React.FC<ToastProps> = ({ type, message, onClose }) => {
	React.useEffect(() => {
		const timer = setTimeout(() => {
			onClose();
		}, 5000);

		return () => clearTimeout(timer);
	}, [onClose]);

	return (
		<div className='fixed top-4 right-4 z-50 animate-in slide-in-from-top-2 duration-300'>
			<div
				className={`flex items-center p-4 rounded-lg shadow-lg max-w-md ${
					type === "success"
						? "bg-green-50 border border-green-200 text-green-800"
						: "bg-red-50 border border-red-200 text-red-800"
				}`}>
				{type === "success" ? (
					<CheckCircle className='w-5 h-5 mr-3 text-green-600' />
				) : (
					<AlertCircle className='w-5 h-5 mr-3 text-red-600' />
				)}
				<p className='flex-1 text-sm font-medium'>{message}</p>
				<button
					onClick={onClose}
					className='ml-3 text-gray-400 hover:text-gray-600'>
					<X className='w-4 h-4' />
				</button>
			</div>
		</div>
	);
};

const ProductForm: React.FC<ProductFormProps> = ({
	onSubmit,
	onSaveDraft,
	initialData,
	categories = ["Grains", "Vegetables", "Fruits", "Dairy", "Meat", "Spices"],
	locations = ["Calabar", "Lagos", "Abuja", "Kano", "Port Harcourt", "Ibadan"],
}) => {
	const [formData, setFormData] = useState<ProductFormData>({
		productName: initialData?.productName || "",
		category: initialData?.category || "Grains",
		description: initialData?.description || "",
		location: initialData?.location || "Calabar",
		priceNGN: initialData?.priceNGN || "",
		mainImage: initialData?.mainImage || null,
		additionalImages: initialData?.additionalImages || [],
	});

	const [isSubmitting, setIsSubmitting] = useState(false);
	const [toast, setToast] = useState<{
		type: "success" | "error";
		message: string;
	} | null>(null);

	const mainImageRef = useRef<HTMLInputElement>(null);
	const additionalImagesRef = useRef<HTMLInputElement>(null);

	const showToast = (type: "success" | "error", message: string) => {
		setToast({ type, message });
	};

	const closeToast = () => {
		setToast(null);
	};

	const handleInputChange = (
		e: React.ChangeEvent<
			HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
		>
	) => {
		const { name, value } = e.target;
		setFormData((prev) => ({
			...prev,
			[name]: value,
		}));
	};

	const createImagePreview = (file: File): ProductImage => ({
		file,
		preview: URL.createObjectURL(file),
		id: Math.random().toString(36).substr(2, 9),
	});

	const handleMainImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0];
		if (
			file &&
			(file.type === "image/jpeg" || file.type === "image/png") &&
			file.size <= 50 * 1024 * 1024
		) {
			if (formData.mainImage) {
				URL.revokeObjectURL(formData.mainImage.preview);
			}
			setFormData((prev) => ({
				...prev,
				mainImage: createImagePreview(file),
			}));
		} else {
			showToast("error", "Please select a JPEG or PNG file under 50MB");
		}
	};

	const handleAdditionalImagesUpload = (
		e: React.ChangeEvent<HTMLInputElement>
	) => {
		const files = Array.from(e.target.files || []);
		const validFiles = files.filter(
			(file) =>
				(file.type === "image/jpeg" || file.type === "image/png") &&
				file.size <= 50 * 1024 * 1024
		);

		if (validFiles.length !== files.length) {
			showToast(
				"error",
				"Some files were skipped. Please select only JPEG or PNG files under 50MB"
			);
		}

		const newImages = validFiles.map(createImagePreview);
		const totalImages = formData.additionalImages.length + newImages.length;

		if (totalImages > 3) {
			showToast("error", "You can only upload up to 3 additional images");
			return;
		}

		setFormData((prev) => ({
			...prev,
			additionalImages: [...prev.additionalImages, ...newImages],
		}));
	};

	const removeMainImage = () => {
		if (formData.mainImage) {
			URL.revokeObjectURL(formData.mainImage.preview);
			setFormData((prev) => ({ ...prev, mainImage: null }));
		}
	};

	const removeAdditionalImage = (id: string) => {
		const imageToRemove = formData.additionalImages.find(
			(img) => img.id === id
		);
		if (imageToRemove) {
			URL.revokeObjectURL(imageToRemove.preview);
		}
		setFormData((prev) => ({
			...prev,
			additionalImages: prev.additionalImages.filter((img) => img.id !== id),
		}));
	};

	const validateForm = () => {
		if (!formData.productName.trim()) {
			showToast("error", "Product name is required");
			return false;
		}
		if (!formData.description.trim()) {
			showToast("error", "Description is required");
			return false;
		}
		if (!formData.priceNGN.trim()) {
			showToast("error", "NGN price is required");
			return false;
		}

		if (!formData.mainImage) {
			showToast("error", "Main product image is required");
			return false;
		}
		return true;
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();

		if (!validateForm()) {
			return;
		}

		setIsSubmitting(true);

		try {
			await onSubmit?.(formData);
		} catch (error) {
			console.error("Form submission error:", error);
		} finally {
			setIsSubmitting(false);
		}
	};

	const handleSaveDraft = () => {
		onSaveDraft?.(formData);
		showToast("success", "Draft saved successfully!");
	};

	const getCharacterCount = () => {
		return formData.description.length;
	};

	return (
		<div className='min-h-screen bg-gray-100 p-0 lg:p-6'>
			{toast && (
				<Toast type={toast.type} message={toast.message} onClose={closeToast} />
			)}

			<div className=' w-full lg:max-w-6xl mx-auto'>
				{/* Header */}
				<div className='flex justify-between items-center mb-8'>
					<h1 className='text-4xl font-bold text-gray-900'>Add Product</h1>
					<div className='flex flex-col gap-4'>
						<button
							type='button'
							onClick={handleSaveDraft}
							disabled={isSubmitting}
							className='px-6 py-2 text-sm text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed'>
							Save as Draft
						</button>
						<button
							type='submit'
							form='product-form'
							disabled={isSubmitting}
							className='px-2 py-2 text-white text-sm bg-green-600 rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed'>
							{isSubmitting ? "Uploading..." : "Upload Product"}
						</button>
					</div>
				</div>

				{/* Form */}
				<form id='product-form' onSubmit={handleSubmit}>
					<div className='bg-white rounded-lg p-8 shadow-sm'>
						<h2 className='text-xl font-semibold text-gray-900 mb-6'>
							Product details
						</h2>

						<div className='grid grid-cols-1 lg:grid-cols-2 gap-8'>
							{/* Left Column */}
							<div className='space-y-6'>
								{/* Product Name */}
								<div>
									<label className='block text-sm font-medium text-gray-700 mb-2'>
										Product Name
									</label>
									<input
										type='text'
										name='productName'
										value={formData.productName}
										onChange={handleInputChange}
										placeholder='Rice'
										className='w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none'
										required
									/>
								</div>

								{/* Category */}
								<div>
									<label className='block text-sm font-medium text-gray-700 mb-2'>
										Category
									</label>
									<div className='relative'>
										<select
											name='category'
											value={formData.category}
											onChange={handleInputChange}
											className='w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none appearance-none bg-white'
											required>
											{categories.map((category) => (
												<option key={category} value={category}>
													{category}
												</option>
											))}
										</select>
										<div className='absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none'>
											<svg
												className='w-4 h-4 text-gray-400'
												fill='none'
												stroke='currentColor'
												viewBox='0 0 24 24'>
												<path
													strokeLinecap='round'
													strokeLinejoin='round'
													strokeWidth={2}
													d='M19 9l-7 7-7-7'
												/>
											</svg>
										</div>
									</div>
								</div>

								{/* Description */}
								<div>
									<div className='flex justify-between items-center mb-2'>
										<label className='block text-sm font-medium text-gray-700'>
											Description
										</label>
										<span className='text-sm text-gray-500'>
											{getCharacterCount()}/50
										</span>
									</div>
									<textarea
										name='description'
										value={formData.description}
										onChange={handleInputChange}
										placeholder='Lorem ipsum dolor sit amet consectetur. Molestie vulputate lobortis id eu nisl est.Lorem ipsum dolor sit amet consectetur.'
										maxLength={50}
										rows={4}
										className='w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none resize-none'
										required
									/>
								</div>

								{/* Price */}
								<div>
									<label className='block text-sm font-medium text-gray-700 mb-2'>
										Price
									</label>
									<div className='grid grid-cols-2 gap-4'>
										<input
											type='text'
											name='priceNGN'
											value={formData.priceNGN}
											onChange={handleInputChange}
											placeholder='NGN 0.0'
											className='w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none'
											required
										/>
									</div>
								</div>
							</div>

							{/* Right Column */}
							<div className='space-y-6'>
								{/* Location */}
								<div>
									<label className='block text-sm font-medium text-gray-700 mb-2'>
										Location
									</label>
									<div className='relative'>
										<select
											name='location'
											value={formData.location}
											onChange={handleInputChange}
											className='w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none appearance-none bg-white'
											required>
											{locations.map((location) => (
												<option key={location} value={location}>
													{location}
												</option>
											))}
										</select>
										<div className='absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none'>
											<svg
												className='w-4 h-4 text-gray-400'
												fill='none'
												stroke='currentColor'
												viewBox='0 0 24 24'>
												<path
													strokeLinecap='round'
													strokeLinejoin='round'
													strokeWidth={2}
													d='M19 9l-7 7-7-7'
												/>
											</svg>
										</div>
									</div>
								</div>

								{/* Main Product Image */}
								<div>
									<label className='block text-sm font-medium text-gray-700 mb-2'>
										Main Product Image
									</label>
									<div className='border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-gray-400 transition-colors'>
										{formData.mainImage ? (
											<div className='relative'>
												<img
													src={formData.mainImage.preview}
													alt='Main product'
													className='w-full h-48 object-cover rounded-lg'
												/>
												<button
													type='button'
													onClick={removeMainImage}
													className='absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors'>
													<X className='w-4 h-4' />
												</button>
											</div>
										) : (
											<div
												className='relative cursor-pointer'
												onClick={() => mainImageRef.current?.click()}>
												<Upload className='w-12 h-12 text-gray-400 mx-auto mb-4' />
												<p className='text-gray-600 font-medium mb-2'>
													Click to upload a photo
												</p>
												<p className='text-sm text-gray-500'>
													Maximum of 50MB file. Only jpeg and png files
												</p>
												<input
													type='file'
													ref={mainImageRef}
													onChange={handleMainImageUpload}
													accept='image/jpeg,image/png'
													className='hidden'
												/>
											</div>
										)}
									</div>
								</div>

								{/* Additional Product Images */}
								<div>
									<label className='block text-sm font-medium text-gray-700 mb-2'>
										Additional Product Images (up to 3)
									</label>
									<div className='space-y-4'>
										{/* Image Upload Area */}
										{formData.additionalImages.length < 3 && (
											<div
												className='border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-gray-400 transition-colors cursor-pointer'
												onClick={() => additionalImagesRef.current?.click()}>
												<Upload className='w-8 h-8 text-gray-400 mx-auto mb-2' />
												<p className='text-sm text-gray-600 mb-1'>
													Click to upload additional photos
												</p>
												<p className='text-xs text-gray-500'>
													Maximum of 50MB file. Only jpeg and png files
												</p>
												<input
													type='file'
													ref={additionalImagesRef}
													onChange={handleAdditionalImagesUpload}
													accept='image/jpeg,image/png'
													multiple
													className='hidden'
												/>
											</div>
										)}

										{/* Preview Additional Images */}
										{formData.additionalImages.length > 0 && (
											<div className='grid grid-cols-3 gap-4'>
												{formData.additionalImages.map((image) => (
													<div key={image.id} className='relative'>
														<img
															src={image.preview}
															alt='Additional product'
															className='w-full h-24 object-cover rounded-lg'
														/>
														<button
															type='button'
															onClick={() => removeAdditionalImage(image.id)}
															className='absolute top-1 right-1 p-1 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors'>
															<X className='w-3 h-3' />
														</button>
													</div>
												))}
											</div>
										)}
									</div>
								</div>
							</div>
						</div>
					</div>
				</form>

				{/* Bottom Upload Button */}
				<div className='flex justify-center mt-8'>
					<button
						type='submit'
						form='product-form'
						disabled={isSubmitting}
						className='px-12 py-3 text-white bg-green-600 rounded-lg hover:bg-green-700 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed'>
						{isSubmitting ? "Uploading Product..." : "Upload Product"}
					</button>
				</div>
			</div>
		</div>
	);
};

export default ProductForm;
