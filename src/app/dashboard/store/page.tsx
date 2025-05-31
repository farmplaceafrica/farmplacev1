"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Spinner from "@/components/spinner";
import { useRouter } from "next/navigation";
import Icons from "@/components/icons";

interface ProductImage {
	file: File;
	preview: string;
	id: string;
}

interface StoreFormData {
	storeName: string;
	location: {
		state: string;
		lga: string;
		address: string;
	};
	description: string;
}

interface Store {
	id: string;
	storeName: string;
	location: {
		state: string;
		lga: string;
		address: string;
	};
	description: string;
}

interface Product {
	id: string;
	productName: string;
	description: string;
	location: string;
	priceNGN: string;
	priceADA: number;
	mainImage: ProductImage | null;
}

interface SuccessModalProps {
	onGoToStore: () => void;
}

interface UploadedProductCardProps {
	id: string;
	productName: string;
	description: string;
	location: string;
	priceNGN: string;
	priceADA: Number;
	mainImage: ProductImage | null;
	onAddToCart?: (productId: string) => void;
}

const UploadedProductCard: React.FC<UploadedProductCardProps> = ({
	id,
	productName,
	description,
	location,
	priceNGN,
	priceADA,
	mainImage,
	onAddToCart,
}) => {
	// price !== undefined && price !== null ? price.toLocaleString() : "0";
	return (
		<div className='bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow'>
			<div className='relative h-48 w-full'>
				{mainImage && (
					<Image
						src={mainImage.preview}
						alt={productName}
						fill
						className='object-cover'
					/>
				)}
			</div>
			<div className='p-4'>
				<h3 className='font-semibold text-gray-900 mb-2 text-lg'>
					{productName}
				</h3>
				<p className='text-gray-600 text-sm mb-2 line-clamp-2'>{description}</p>
				<div className='flex items-center text-gray-500 text-sm mb-3'>
					<svg
						className='w-4 h-4 mr-1'
						fill='none'
						stroke='currentColor'
						viewBox='0 0 24 24'>
						<path
							strokeLinecap='round'
							strokeLinejoin='round'
							strokeWidth={2}
							d='M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z'
						/>
						<path
							strokeLinecap='round'
							strokeLinejoin='round'
							strokeWidth={2}
							d='M15 11a3 3 0 11-6 0 3 3 0 016 0z'
						/>
					</svg>
					{location}
				</div>
				<div className='flex items-center justify-between'>
					<span className='text-2xl font-bold text-green-600'>₦{priceNGN}</span>
					<Icons.Swap className='inline-block mx-2 text-gray-400' />
					<span className='text-2xl font-bold text-green-600'>
						{priceADA.toString()}
					</span>
				</div>
			</div>
		</div>
	);
};

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
	storeName?: string;
}

const EmptyStore: React.FC<EmptyStoreProps> = ({ onAddProduct, storeName }) => (
	<div className='min-h-screen bg-gray-50'>
		<div className='bg-white shadow-sm'>
			<div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
				<div className='flex justify-between items-center py-4'>
					<h1 className='text-xl font-medium text-gray-900'>
						Welcome to {storeName ? `${storeName}` : "your store"}
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

interface StoreWithProductsProps {
	onAddProduct: () => void;
	storeName?: string;
	products: Product[];
	isLoadingProducts: boolean;
}

const StoreWithProducts: React.FC<StoreWithProductsProps> = ({
	onAddProduct,
	storeName,
	products,
	isLoadingProducts,
}) => {
	const handleAddToCart = (productId: string) => {
		// Implement add to cart functionality
		console.log("Adding product to cart:", productId);
	};

	return (
		<div className='min-h-screen bg-gray-50'>
			<div className='bg-white shadow-sm'>
				<div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
					<div className='flex justify-between items-center py-4'>
						<h1 className='text-xl font-medium text-gray-900'>
							{storeName ? `${storeName}` : "Your Store"}
						</h1>
						<button
							onClick={onAddProduct}
							className='bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg transition-colors'>
							Add Product
						</button>
					</div>
				</div>
			</div>

			<div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8'>
				{isLoadingProducts ? (
					<div className='flex justify-center items-center h-64'>
						<Spinner />
					</div>
				) : products.length === 0 ? (
					<div className='text-center py-16'>
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
				) : (
					<div>
						<div className='mb-6'>
							<h2 className='text-2xl font-semibold text-gray-900'>
								Your Products
							</h2>
							<p className='text-gray-600 mt-1'>
								{products.length} product{products.length !== 1 ? "s" : ""} in
								your store
							</p>
						</div>
						<div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'>
							{products.map((product) => (
								<UploadedProductCard
									key={product.id}
									id={product.id}
									productName={product.productName}
									description={product.description}
									location={product.location}
									priceNGN={product.priceNGN}
									priceADA={product.priceADA}
									mainImage={product.mainImage}
									onAddToCart={handleAddToCart}
								/>
							))}
						</div>
					</div>
				)}
			</div>
		</div>
	);
};

const FarmPlaceStoreCreation: React.FC = () => {
	const router = useRouter();

	const [currentStep, setCurrentStep] = useState<
		"initial" | "form" | "success" | "store" | "loading"
	>("loading");
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
	const [existingStore, setExistingStore] = useState<Store | null>(null);
	const [products, setProducts] = useState<Product[]>([]);
	const [isLoadingProducts, setIsLoadingProducts] = useState(false);

	// Check if user has an existing store on component mount
	useEffect(() => {
		const checkExistingStore = async () => {
			const token = localStorage.getItem("auth_token");
			const userData = localStorage.getItem("user_data");

			if (!token || !userData) {
				setCurrentStep("initial");
				return;
			}

			try {
				// Parse the user data and get the ID
				const parsedUserData = JSON.parse(userData);
				const ownerId = parsedUserData._id;
				console.log("User ID:", ownerId);
				console.log("Token:", token);

				const response = await fetch(
					`https://farmplace-backend-api.onrender.com/api/v1/farmstore/owner/${ownerId}`,
					{
						method: "GET",
						headers: {
							"Content-Type": "application/json",
							// Ensure "Bearer" is included
						},
					}
				);

				if (response.ok) {
					const result = await response.json();

					// Check if the response contains store data
					// Adjust this based on your API response structure
					if (
						result &&
						(result.data ||
							result.store ||
							(Array.isArray(result) && result.length > 0))
					) {
						const store = result.data || result.store || result[0];
						console.log("Existing store found:", store);

						const storeId = store._id;
						setExistingStore(store);
						setCurrentStep("store");

						// Fetch products for this store owner
						await fetchProducts(storeId);
					} else {
						setCurrentStep("initial");
					}
				} else {
					// If response is not ok (e.g., 404 for no store found), show initial screen
					setCurrentStep("initial");
				}
			} catch (err) {
				console.error("Error checking existing store:", err);
				setCurrentStep("initial");
			}
		};

		checkExistingStore();
	}, []);

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

	const handleCreateStore = async () => {
		const token = localStorage.getItem("auth_token");

		if (!token) {
			setError("Authentication token not found. Please log in again.");
			return;
		}

		setIsLoading(true);
		setError(null);

		try {
			const response = await fetch(
				"https://farmplace-backend-api.onrender.com/api/v1/farmstore",
				{
					method: "POST",
					headers: {
						"Content-Type": "application/json",
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

			// Save the created store data
			const createdStore = result.data || result.store || result;
			setExistingStore(createdStore);

			setCurrentStep("success");
		} catch (err) {
			setError(err instanceof Error ? err.message : "An error occurred");
		} finally {
			setIsLoading(false);
		}
	};

	// Fetch products for the store owner
	const fetchProducts = async (storeId: string) => {
		setIsLoadingProducts(true);
		try {
			const response = await fetch(
				`https://farmplace-backend-api.onrender.com/api/v1/farmstore/owner/${storeId}/products`,
				{
					method: "GET",
					headers: {
						"Content-Type": "application/json",
					},
				}
			);

			if (response.ok) {
				const result = await response.json();
				// Adjust based on your API response structure
				const productsData = result.data || result.products || result || [];
				setProducts(Array.isArray(productsData) ? productsData : []);
			} else {
				console.error("Failed to fetch products");
				setProducts([]);
			}
		} catch (err) {
			console.error("Error fetching products:", err);
			setProducts([]);
		} finally {
			setIsLoadingProducts(false);
		}
	};

	const handleGoToStore = async () => {
		setCurrentStep("store");

		// Fetch products when going to store
		const userData = localStorage.getItem("user_data");
		if (userData) {
			const parsedUserData = JSON.parse(userData);
			const ownerId = parsedUserData._id;
			await fetchProducts(ownerId);
		}
	};

	const isFormValid =
		formData.storeName.trim() !== "" &&
		formData.location.state.trim() !== "" &&
		formData.location.lga.trim() !== "" &&
		formData.location.address.trim() !== "" &&
		formData.description.trim().length <= 50;

	// Show loading spinner while checking for existing store
	if (currentStep === "loading") {
		return (
			<div className='min-h-screen bg-gray-50 flex items-center justify-center'>
				<Spinner />
			</div>
		);
	}

	if (currentStep === "store") {
		return (
			<StoreWithProducts
				onAddProduct={() => router.push("/dashboard/add-product")}
				storeName={existingStore?.storeName}
				products={products}
				isLoadingProducts={isLoadingProducts}
			/>
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
				<SuccessModal onGoToStore={handleGoToStore} />
			)}
		</div>
	);
};

export default FarmPlaceStoreCreation;
