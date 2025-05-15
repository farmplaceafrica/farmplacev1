// "use client";

// import { useState } from "react";
// import Image from "next/image";
// import Link from "next/link";
// import { useRouter } from "next/navigation";

// interface ProductImageProps {
// 	src: string;
// 	alt: string;
// }

// interface ProductDetailProps {
// 	id: string;
// 	title: string;
// 	price: string;
// 	currency: string;
// 	rating: number;
// 	reviewCount: number;
// 	availability: string;
// 	units: string;
// 	images: ProductImageProps[];
// 	description: string;
// 	features: string[];
// 	shipping: {
// 		courier: string;
// 		local: string;
// 		ups: string;
// 	};
// }

// const ProductDetail = ({ product }: { product: ProductDetailProps }) => {
// 	const [quantity, setQuantity] = useState(1);
// 	const [selectedImage, setSelectedImage] = useState(0);
// 	const [isAddingToCart, setIsAddingToCart] = useState(false);
// 	const router = useRouter();

// 	const decreaseQuantity = () => {
// 		if (quantity > 1) {
// 			setQuantity(quantity - 1);
// 		}
// 	};

// 	const increaseQuantity = () => {
// 		setQuantity(quantity + 1);
// 	};

// 	const addToCart = () => {
// 		setIsAddingToCart(true);
// 		// Simulate API call or state update
// 		setTimeout(() => {
// 			setIsAddingToCart(false);
// 			router.push("/dashboard/cart-view");
// 		}, 1000);
// 	};

// 	const renderStars = (rating: number) => {
// 		const stars = [];
// 		for (let i = 1; i <= 5; i++) {
// 			stars.push(
// 				<span
// 					key={i}
// 					className={`text-2xl ${
// 						i <= rating ? "text-orange-500" : "text-gray-300"
// 					}`}>
// 					★
// 				</span>
// 			);
// 		}
// 		return stars;
// 	};

// 	const formatPrice = (price: string) => {
// 		return new Intl.NumberFormat("en-NG", {
// 			style: "currency",
// 			currency: product.currency || "NGN",
// 			currencyDisplay: "symbol",
// 		})
// 			.format(Number(price.replace(/[^0-9.-]+/g, "")))
// 			.replace("NGN", "₦");
// 	};

// 	return (
// 		<div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8'>
// 			<div className='flex flex-col md:flex-row gap-8'>
// 				{/* Left column - Product Images */}
// 				<div className='w-full md:w-1/2'>
// 					<div className='mb-4 border border-gray-200 rounded-lg overflow-hidden h-96 relative'>
// 						<Image
// 							src={product.images[selectedImage].src}
// 							alt={product.images[selectedImage].alt}
// 							fill
// 							className='object-cover'
// 							sizes='(max-width: 768px) 100vw, 50vw'
// 							priority
// 						/>
// 						<button
// 							className='absolute top-4 right-4 bg-white p-2 rounded-full shadow-md'
// 							aria-label='Add to wishlist'>
// 							<svg
// 								xmlns='http://www.w3.org/2000/svg'
// 								className='h-6 w-6 text-gray-500'
// 								fill='none'
// 								viewBox='0 0 24 24'
// 								stroke='currentColor'>
// 								<path
// 									strokeLinecap='round'
// 									strokeLinejoin='round'
// 									strokeWidth={2}
// 									d='M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z'
// 								/>
// 							</svg>
// 						</button>
// 					</div>
// 					<div className='flex space-x-2 overflow-x-auto pb-2'>
// 						{product.images.map((image, index) => (
// 							<div
// 								key={index}
// 								className={`border-2 rounded-md cursor-pointer min-w-[80px] h-20 relative ${
// 									selectedImage === index
// 										? "border-green-600"
// 										: "border-gray-200"
// 								}`}
// 								onClick={() => setSelectedImage(index)}>
// 								<Image
// 									src={image.src}
// 									alt={image.alt}
// 									fill
// 									className='object-cover rounded-md'
// 									sizes='80px'
// 								/>
// 							</div>
// 						))}
// 					</div>
// 				</div>

// 				{/* Right column - Product Info */}
// 				<div className='w-full md:w-1/2'>
// 					<div className='flex items-center mb-2'>
// 						<div className='flex mr-2'>{renderStars(product.rating)}</div>
// 						<span className='text-gray-600'>
// 							{product.rating} Star Rating ({product.reviewCount} User feedback)
// 						</span>
// 					</div>

// 					<h1 className='text-3xl font-bold text-gray-900 mb-4'>
// 						{product.title}
// 					</h1>

// 					<div className='flex justify-between items-center mb-4'>
// 						<div>
// 							<span className='text-gray-600'>Availability:</span>{" "}
// 							<span className='text-green-600 font-medium'>
// 								{product.availability}
// 							</span>
// 						</div>
// 						<div>
// 							<span className='text-gray-600'>Units:</span>{" "}
// 							<span className='text-gray-900'>{product.units}</span>
// 						</div>
// 					</div>

// 					<div className='flex items-center mb-4'>
// 						<svg
// 							xmlns='http://www.w3.org/2000/svg'
// 							className='h-5 w-5 text-gray-500 mr-2'
// 							fill='none'
// 							viewBox='0 0 24 24'
// 							stroke='currentColor'>
// 							<path
// 								strokeLinecap='round'
// 								strokeLinejoin='round'
// 								strokeWidth={2}
// 								d='M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4'
// 							/>
// 						</svg>
// 						<span className='text-gray-600'>
// 							Shipping calculated at checkout
// 						</span>
// 						<button className='ml-auto text-green-600 font-medium'>
// 							Add address
// 						</button>
// 					</div>

// 					<div className='border-t border-b border-gray-200 py-4 my-4'>
// 						<div className='mb-2 text-gray-600'>Price:</div>
// 						<div className='text-3xl font-bold text-gray-900 mb-4'>
// 							{formatPrice(product.price)}
// 						</div>

// 						<div className='mb-2 text-gray-600'>Quantity:</div>
// 						<div className='flex items-center mb-6'>
// 							<button
// 								onClick={decreaseQuantity}
// 								className='w-10 h-10 bg-gray-100 rounded-md flex items-center justify-center'>
// 								<span className='text-2xl font-medium'>−</span>
// 							</button>
// 							<div className='w-16 h-10 bg-gray-100 mx-2 flex items-center justify-center text-xl'>
// 								{quantity}
// 							</div>
// 							<button
// 								onClick={increaseQuantity}
// 								className='w-10 h-10 bg-gray-100 rounded-md flex items-center justify-center'>
// 								<span className='text-2xl font-medium'>+</span>
// 							</button>
// 						</div>

// 						<div className='grid grid-cols-2 gap-4'>
// 							<button
// 								className='h-12 px-6 border border-green-600 text-green-600 rounded-md flex items-center justify-center font-medium'
// 								disabled={isAddingToCart}>
// 								{isAddingToCart ? (
// 									<svg
// 										className='animate-spin h-5 w-5 mr-3'
// 										viewBox='0 0 24 24'>
// 										<circle
// 											className='opacity-25'
// 											cx='12'
// 											cy='12'
// 											r='10'
// 											stroke='currentColor'
// 											strokeWidth='4'></circle>
// 										<path
// 											className='opacity-75'
// 											fill='currentColor'
// 											d='M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z'></path>
// 									</svg>
// 								) : (
// 									"Add to Cart"
// 								)}
// 							</button>
// 							<button
// 								onClick={addToCart}
// 								className='h-12 px-6 bg-green-600 text-white rounded-md flex items-center justify-center font-medium'
// 								disabled={isAddingToCart}>
// 								Buy Now
// 							</button>
// 						</div>
// 					</div>
// 				</div>
// 			</div>

// 			{/* Tabs */}
// 			<div className='mt-12'>
// 				<div className='border-b border-gray-200'>
// 					<nav className='flex -mb-px'>
// 						<button className='border-b-2 border-green-600 py-4 px-6 text-sm font-medium text-green-600'>
// 							DESCRIPTION
// 						</button>
// 						<button className='border-b-2 border-transparent py-4 px-6 text-sm font-medium text-gray-500 hover:text-gray-700'>
// 							ADDITIONAL INFORMATION
// 						</button>
// 						<button className='border-b-2 border-transparent py-4 px-6 text-sm font-medium text-gray-500 hover:text-gray-700'>
// 							REVIEW
// 						</button>
// 					</nav>
// 				</div>

// 				<div className='py-6 grid grid-cols-1 md:grid-cols-3 gap-8'>
// 					<div className='col-span-1 md:col-span-1'>
// 						<h3 className='text-lg font-medium text-gray-900 mb-4'>
// 							Description
// 						</h3>
// 						<p className='text-gray-600'>{product.description}</p>
// 					</div>

// 					<div className='col-span-1 md:col-span-1'>
// 						<h3 className='text-lg font-medium text-gray-900 mb-4'>Feature</h3>
// 						<ul className='space-y-4'>
// 							{product.features.map((feature, index) => (
// 								<li key={index} className='flex items-start'>
// 									<div className='flex-shrink-0 h-5 w-5 mt-1'>
// 										<svg
// 											className='h-5 w-5 text-green-600'
// 											fill='none'
// 											viewBox='0 0 24 24'
// 											stroke='currentColor'>
// 											<path
// 												strokeLinecap='round'
// 												strokeLinejoin='round'
// 												strokeWidth={2}
// 												d='M5 13l4 4L19 7'
// 											/>
// 										</svg>
// 									</div>
// 									<span className='ml-2 text-gray-600'>{feature}</span>
// 								</li>
// 							))}
// 						</ul>
// 					</div>

// 					<div className='col-span-1 md:col-span-1'>
// 						<h3 className='text-lg font-medium text-gray-900 mb-4'>
// 							Shipping Information
// 						</h3>
// 						<ul className='space-y-3'>
// 							<li className='text-gray-600'>
// 								Courier: {product.shipping.courier}
// 							</li>
// 							<li className='text-gray-600'>
// 								Local Shipping: {product.shipping.local}
// 							</li>
// 							<li className='text-gray-600'>
// 								UPS Ground Shipping: {product.shipping.ups}
// 							</li>
// 						</ul>
// 					</div>
// 				</div>
// 			</div>
// 		</div>
// 	);
// };

// export default ProductDetail;

"use client";
"use client";

import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useCart } from "@/components/context/CardContext";

interface ProductImageProps {
	src: string;
	alt: string;
}

interface ProductDetailProps {
	id: string;
	title: string;
	price: string;
	currency?: string;
	rating: number;
	reviewCount: number;
	availability: string;
	units: string;
	images: ProductImageProps[];
	description: string;
	features: string[];
	shipping: {
		courier: string;
		local: string;
		ups: string;
	};
}

const ProductDetail = ({ product }: { product: ProductDetailProps }) => {
	const [quantity, setQuantity] = useState(1);
	const [selectedImage, setSelectedImage] = useState(0);
	const [isAddingToCart, setIsAddingToCart] = useState(false);
	const router = useRouter();
	const { addToCart } = useCart();

	const decreaseQuantity = () => {
		if (quantity > 1) {
			setQuantity(quantity - 1);
		}
	};

	const increaseQuantity = () => {
		setQuantity(quantity + 1);
	};

	const handleAddToCart = () => {
		setIsAddingToCart(true);

		// Add to cart multiple times based on quantity
		for (let i = 0; i < quantity; i++) {
			addToCart(product.id);
		}

		// Simulate API call delay
		setTimeout(() => {
			setIsAddingToCart(false);
		}, 500);
	};

	const handleBuyNow = () => {
		// Add to cart first
		handleAddToCart();

		// Navigate to cart page
		setTimeout(() => {
			router.push("/dashboard/cart-view");
		}, 600);
	};

	const renderStars = (rating: number) => {
		const stars = [];
		for (let i = 1; i <= 5; i++) {
			stars.push(
				<span
					key={i}
					className={`text-2xl ${
						i <= rating ? "text-orange-500" : "text-gray-300"
					}`}>
					★
				</span>
			);
		}
		return stars;
	};

	const formatPrice = (price: string) => {
		return new Intl.NumberFormat("en-NG", {
			style: "currency",
			currency: product.currency || "NGN",
			currencyDisplay: "symbol",
		})
			.format(Number(price.replace(/[^0-9.-]+/g, "")))
			.replace("NGN", "₦");
	};

	return (
		<div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8'>
			<div className='flex flex-col md:flex-row gap-8'>
				{/* Left column - Product Images */}
				<div className='w-full md:w-1/2'>
					<div className='mb-4 border border-gray-200 rounded-lg overflow-hidden h-96 relative'>
						<Image
							src={product.images[selectedImage].src}
							alt={product.images[selectedImage].alt}
							fill
							className='object-cover'
							sizes='(max-width: 768px) 100vw, 50vw'
							priority
						/>
						<button
							className='absolute top-4 right-4 bg-white p-2 rounded-full shadow-md'
							aria-label='Add to wishlist'>
							<svg
								xmlns='http://www.w3.org/2000/svg'
								className='h-6 w-6 text-gray-500'
								fill='none'
								viewBox='0 0 24 24'
								stroke='currentColor'>
								<path
									strokeLinecap='round'
									strokeLinejoin='round'
									strokeWidth={2}
									d='M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z'
								/>
							</svg>
						</button>
					</div>
					<div className='flex space-x-2 overflow-x-auto pb-2'>
						{product.images.map((image, index) => (
							<div
								key={index}
								className={`border-2 rounded-md cursor-pointer min-w-[80px] h-20 relative ${
									selectedImage === index
										? "border-green-600"
										: "border-gray-200"
								}`}
								onClick={() => setSelectedImage(index)}>
								<Image
									src={image.src}
									alt={image.alt}
									fill
									className='object-cover rounded-md'
									sizes='80px'
								/>
							</div>
						))}
					</div>
				</div>

				{/* Right column - Product Info */}
				<div className='w-full md:w-1/2'>
					<div className='flex items-center mb-2'>
						<div className='flex mr-2'>{renderStars(product.rating)}</div>
						<span className='text-gray-600'>
							{product.rating} Star Rating ({product.reviewCount} User feedback)
						</span>
					</div>

					<h1 className='text-3xl font-bold text-gray-900 mb-4'>
						{product.title}
					</h1>

					<div className='flex justify-between items-center mb-4'>
						<div>
							<span className='text-gray-600'>Availability:</span>{" "}
							<span className='text-green-600 font-medium'>
								{product.availability}
							</span>
						</div>
						<div>
							<span className='text-gray-600'>Units:</span>{" "}
							<span className='text-gray-900'>{product.units}</span>
						</div>
					</div>

					<div className='flex items-center mb-4'>
						<svg
							xmlns='http://www.w3.org/2000/svg'
							className='h-5 w-5 text-gray-500 mr-2'
							fill='none'
							viewBox='0 0 24 24'
							stroke='currentColor'>
							<path
								strokeLinecap='round'
								strokeLinejoin='round'
								strokeWidth={2}
								d='M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4'
							/>
						</svg>
						<span className='text-gray-600'>
							Shipping calculated at checkout
						</span>
						<button className='ml-auto text-green-600 font-medium'>
							Add address
						</button>
					</div>

					<div className='border-t border-b border-gray-200 py-4 my-4'>
						<div className='mb-2 text-gray-600'>Price:</div>
						<div className='text-3xl font-bold text-gray-900 mb-4'>
							{formatPrice(product.price)}
						</div>

						<div className='mb-2 text-gray-600'>Quantity:</div>
						<div className='flex items-center mb-6'>
							<button
								onClick={decreaseQuantity}
								className='w-10 h-10 bg-gray-100 rounded-md flex items-center justify-center'>
								<span className='text-2xl font-medium'>−</span>
							</button>
							<div className='w-16 h-10 bg-gray-100 mx-2 flex items-center justify-center text-xl'>
								{quantity}
							</div>
							<button
								onClick={increaseQuantity}
								className='w-10 h-10 bg-gray-100 rounded-md flex items-center justify-center'>
								<span className='text-2xl font-medium'>+</span>
							</button>
						</div>

						<div className='grid grid-cols-2 gap-4'>
							<button
								onClick={handleAddToCart}
								className='h-12 px-6 border border-green-600 text-green-600 rounded-md flex items-center justify-center font-medium'
								disabled={isAddingToCart}>
								{isAddingToCart ? (
									<svg
										className='animate-spin h-5 w-5 mr-3'
										viewBox='0 0 24 24'>
										<circle
											className='opacity-25'
											cx='12'
											cy='12'
											r='10'
											stroke='currentColor'
											strokeWidth='4'></circle>
										<path
											className='opacity-75'
											fill='currentColor'
											d='M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z'></path>
									</svg>
								) : (
									"Add to Cart"
								)}
							</button>
							<button
								onClick={handleBuyNow}
								className='h-12 px-6 bg-green-600 text-white rounded-md flex items-center justify-center font-medium'
								disabled={isAddingToCart}>
								Buy Now
							</button>
						</div>
					</div>
				</div>
			</div>

			{/* Tabs */}
			<div className='mt-12'>
				<div className='border-b border-gray-200'>
					<nav className='flex -mb-px'>
						<button className='border-b-2 border-green-600 py-4 px-6 text-sm font-medium text-green-600'>
							DESCRIPTION
						</button>
						<button className='border-b-2 border-transparent py-4 px-6 text-sm font-medium text-gray-500 hover:text-gray-700'>
							ADDITIONAL INFORMATION
						</button>
						<button className='border-b-2 border-transparent py-4 px-6 text-sm font-medium text-gray-500 hover:text-gray-700'>
							REVIEW
						</button>
					</nav>
				</div>

				<div className='py-6 grid grid-cols-1 md:grid-cols-3 gap-8'>
					<div className='col-span-1 md:col-span-1'>
						<h3 className='text-lg font-medium text-gray-900 mb-4'>
							Description
						</h3>
						<p className='text-gray-600'>{product.description}</p>
					</div>

					<div className='col-span-1 md:col-span-1'>
						<h3 className='text-lg font-medium text-gray-900 mb-4'>Feature</h3>
						<ul className='space-y-4'>
							{product.features.map((feature, index) => (
								<li key={index} className='flex items-start'>
									<div className='flex-shrink-0 h-5 w-5 mt-1'>
										<svg
											className='h-5 w-5 text-green-600'
											fill='none'
											viewBox='0 0 24 24'
											stroke='currentColor'>
											<path
												strokeLinecap='round'
												strokeLinejoin='round'
												strokeWidth={2}
												d='M5 13l4 4L19 7'
											/>
										</svg>
									</div>

									<span className='ml-2 text-gray-600'>{feature}</span>
								</li>
							))}
						</ul>
					</div>
					<div className='col-span-1 md:col-span-1'>
						<h3 className='text-lg font-medium text-gray-900 mb-4'>
							Shipping Information
						</h3>
						<ul className='space-y-3'>
							<li className='text-gray-600'>
								Courier: {product.shipping.courier}
							</li>
							<li className='text-gray-600'>
								Local Shipping: {product.shipping.local}
							</li>
							<li className='text-gray-600'>
								UPS Ground Shipping: {product.shipping.ups}
							</li>
						</ul>
					</div>
				</div>
			</div>
		</div>
	);
};

export default ProductDetail;
