// // Updated ProductCard component with API integration
// "use client";

// import Image from "next/image";
// import { useRouter } from "next/navigation";
// import toast from "react-hot-toast";
// import { MapPin } from "lucide-react";

// interface ProductCardProps {
// 	id: string;
// 	title: string;
// 	description: string;
// 	location: string;
// 	token?: string;
// 	price: string;
// 	image: string;
// 	onAddToCart: (productId: string) => void;
// }

// const ProductCard = ({
// 	id,
// 	title,
// 	description,
// 	location,
// 	token,
// 	price,
// 	image,
// 	onAddToCart,
// }: ProductCardProps) => {
// 	const router = useRouter();

// 	const handleViewDetails = () => {
// 		// Navigate to the product detail page
// 		router.push(`/marketplace/product-view/${id}`);
// 	};

// 	const handleAddToCart = (e: React.MouseEvent) => {
// 		// Prevent the click from bubbling up to the card
// 		e.stopPropagation();
// 		// Call the onAddToCart function passed from parent
// 		onAddToCart(id);
// 		// Show a toast notification
// 		toast.success(`${title} added to cart!`, {
// 			position: "top-right",
// 			duration: 3000,
// 			style: {
// 				background: "#10B981",
// 				color: "#fff",
// 				fontWeight: "500",
// 			},
// 			iconTheme: {
// 				primary: "#fff",
// 				secondary: "#10B981",
// 			},
// 		});
// 	};

// 	return (
// 		<div
// 			className='bg-white w-full max-w-[350px] shadow-md border border-[#C9E7CB] p-4 m-2 rounded-3xl cursor-pointer'
// 			onClick={handleViewDetails}>
// 			<div className='w-full h-48 relative'>
// 				<Image
// 					src={image}
// 					alt={title}
// 					fill
// 					className='object-cover rounded-xl'
// 					sizes='(max-width: 768px) 100vw, 350px'
// 				/>
// 			</div>
// 			<div>
// 				<h2 className='text-lg font-bold text-[#606060]'>{title}</h2>
// 				<div className='flex text-[#4CAF50] text-[16px] mb-3 justify-between items-center'>
// 					<h2 className='font-semibold'>{price}</h2>
// 					{token && <h2 className=' font-semibold'>{token}</h2>}
// 				</div>
// 				<p className='text-[#777777] text-xs'>{description}</p>

// 				<p className='text-[#606060] flex text-xs items-center'>
// 					{" "}
// 					<MapPin size={14} className='mr-1' />
// 					{location}
// 				</p>
// 			</div>

// 			<button
// 				onClick={handleAddToCart}
// 				className='w-full mt-5 bg-green-900 hover:bg-[#468149] text-lg cursor-pointer text-white py-2 px-4 rounded-xl font-medium transition-colors'>
// 				Add to cart
// 			</button>
// 		</div>
// 	);
// };

// export default ProductCard;

// Updated ProductCard component with API integration
"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { MapPin, Plus, Star, Leaf } from "lucide-react";

interface ProductCardProps {
	id: string;
	title: string;
	description: string;
	location: string;
	ada?: string;
	price: string;
	image: string;
	onAddToCart: (productId: string) => void;
}

const ProductCard = ({
	id,
	title,
	description,
	location,
	ada,
	price,
	image,
	onAddToCart,
}: ProductCardProps) => {
	const router = useRouter();

	const handleViewDetails = () => {
		// Navigate to the product detail page
		router.push(`/marketplace/product-view/${id}`);
	};

	const handleAddToCart = (e: React.MouseEvent) => {
		// Prevent the click from bubbling up to the card
		e.stopPropagation();
		// Call the onAddToCart function passed from parent
		onAddToCart(id);
		// Show a toast notification
		toast.success(`${title} added to cart!`, {
			position: "top-right",
			duration: 3000,
			style: {
				background: "linear-gradient(135deg, #10B981 0%, #059669 100%)",
				color: "#fff",
				fontWeight: "500",
				borderRadius: "12px",
				padding: "16px 20px",
				fontSize: "14px",
				boxShadow: "0 10px 25px rgba(16, 185, 129, 0.3)",
			},
			iconTheme: {
				primary: "#fff",
				secondary: "#10B981",
			},
		});
	};

	return (
		<div
			className='group bg-white/80 backdrop-blur-sm w-full max-w-[350px] shadow-lg hover:shadow-2xl border border-green-100 hover:border-green-200 p-6 m-2 rounded-3xl cursor-pointer transition-all duration-300 hover:scale-[1.02] hover:-translate-y-1 relative overflow-hidden'
			onClick={handleViewDetails}>
			{/* Background Pattern Overlay */}
			<div className='absolute inset-0 opacity-[0.02] pointer-events-none'>
				<svg className='w-full h-full' viewBox='0 0 100 100' fill='none'>
					<defs>
						<pattern
							id={`grain-${id}`}
							patternUnits='userSpaceOnUse'
							width='20'
							height='20'>
							<circle cx='10' cy='10' r='0.8' fill='#10B981' />
						</pattern>
					</defs>
					<rect width='100' height='100' fill={`url(#grain-${id})`} />
				</svg>
			</div>

			{/* Fresh Badge */}
			<div className='absolute top-4 right-4 z-10 bg-gradient-to-r from-green-500 to-emerald-500 text-white px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1 shadow-lg'>
				<Leaf size={12} />
				Fresh
			</div>

			{/* Image Container */}
			<div className='w-full h-48 relative mb-4 rounded-2xl overflow-hidden shadow-md group-hover:shadow-lg transition-shadow duration-300'>
				<Image
					src={image}
					alt={title}
					fill
					className='object-cover group-hover:scale-105 transition-transform duration-300'
					sizes='(max-width: 768px) 100vw, 350px'
				/>
				{/* Gradient Overlay on Hover */}
				<div className='absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300'></div>
			</div>

			{/* Content Section */}
			<div className='space-y-3'>
				{/* Title and Rating */}
				<div className='flex items-start justify-between'>
					<h2 className='text-xl font-bold text-gray-800 leading-tight group-hover:text-green-700 transition-colors duration-200 flex-1 pr-2'>
						{title}
					</h2>
					<div className='flex items-center gap-1 bg-yellow-50 px-2 py-1 rounded-lg'>
						<Star size={12} className='text-yellow-500 fill-current' />
						<span className='text-xs font-medium text-yellow-700'>4.8</span>
					</div>
				</div>

				{/* Price and Token */}
				<div className='flex items-center justify-between mb-3'>
					<div className='flex items-baseline gap-2'>
						<h3 className='text-2xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent'>
							{price}
						</h3>
					</div>
					<div className='text-xs text-gray-500 bg-gray-50 px-2 py-1 rounded-lg'>
						{ada ? (
							<span className='text-2xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent'>
								{ada}
							</span>
						) : (
							<span className='text-gray-400'>No token</span>
						)}
					</div>
				</div>

				{/* Description */}
				<p className='text-gray-600 text-sm leading-relaxed line-clamp-2 group-hover:text-gray-700 transition-colors duration-200'>
					{description}
				</p>

				{/* Location */}
				<div className='flex items-center gap-2 text-gray-500'>
					<div className='w-6 h-6 bg-green-50 rounded-lg flex items-center justify-center'>
						<MapPin size={14} className='text-green-600' />
					</div>
					<span className='text-sm font-medium'>{location}</span>
					<div className='flex-1'></div>
					<div className='text-xs text-green-600 bg-green-50 px-2 py-1 rounded-lg'>
						🚚 Same day delivery
					</div>
				</div>

				{/* Trust Indicators */}
				<div className='flex items-center gap-4 pt-2 border-t border-green-50'>
					<div className='flex items-center gap-1 text-xs text-gray-500'>
						<div className='w-2 h-2 bg-green-400 rounded-full'></div>
						<span>Organic</span>
					</div>
					<div className='flex items-center gap-1 text-xs text-gray-500'>
						<div className='w-2 h-2 bg-blue-400 rounded-full'></div>
						<span>Local Farm</span>
					</div>
					<div className='flex items-center gap-1 text-xs text-gray-500'>
						<div className='w-2 h-2 bg-yellow-400 rounded-full'></div>
						<span>Pesticide Free</span>
					</div>
				</div>
			</div>

			{/* Add to Cart Button */}
			<button
				onClick={handleAddToCart}
				className='group/btn w-full mt-6 bg-gradient-to-r from-green-600 via-emerald-600 to-green-700 hover:from-green-700 hover:via-emerald-700 hover:to-green-800 text-white py-3 px-4 rounded-2xl font-semibold transition-all duration-300 hover:scale-[1.02] hover:shadow-xl shadow-lg active:scale-[0.98] relative overflow-hidden'>
				{/* Button Background Animation */}
				<div className='absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 translate-x-[-100%] group-hover/btn:translate-x-[100%] transition-transform duration-700'></div>

				<span className='flex items-center justify-center gap-2 relative z-10'>
					<div className='w-5 h-5 bg-white/20 rounded-lg flex items-center justify-center group-hover/btn:scale-110 transition-transform duration-200'>
						<Plus size={14} className='text-white' />
					</div>
					Add to Cart
					<svg
						className='w-4 h-4 opacity-0 group-hover/btn:opacity-100 transition-all duration-200 transform translate-x-[-8px] group-hover/btn:translate-x-0'
						fill='none'
						stroke='currentColor'
						viewBox='0 0 24 24'>
						<path
							strokeLinecap='round'
							strokeLinejoin='round'
							strokeWidth={2}
							d='M17 8l4 4m0 0l-4 4m4-4H3'
						/>
					</svg>
				</span>
			</button>
		</div>
	);
};

export default ProductCard;
