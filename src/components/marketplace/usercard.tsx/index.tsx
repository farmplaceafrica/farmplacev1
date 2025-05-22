"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

interface ProductCardProps {
	id: string;
	title: string;
	description: string;
	location: string;
	token?: string;
	price: string;
	image: string;
	onAddToCart: (productId: string) => void;
}

const ProductCard = ({
	id,
	title,
	description,
	location,
	token,
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
				background: "#10B981",
				color: "#fff",
				fontWeight: "500",
			},
			iconTheme: {
				primary: "#fff",
				secondary: "#10B981",
			},
		});
	};

	return (
		<div
			className='bg-white w-full max-w-[350px] space-y-3 shadow-md border border-[#C9E7CB] p-4 m-2 rounded-3xl cursor-pointer'
			onClick={handleViewDetails}>
			<div className='w-full h-48 relative'>
				<Image
					src={image}
					alt={title}
					fill
					className='object-cover rounded-xl'
					sizes='(max-width: 768px) 100vw, 350px'
				/>
			</div>
			<div>
				<h2 className='text-2xl font-bold'>{title}</h2>
				<p className='text-[#333333]'>{description}</p>
				<p className='text-[#606060]'>{location}</p>
			</div>
			<div className='flex justify-between items-center'>
				<h2 className='text-xl font-semibold'>{price}</h2>
				{token && <h2 className='text-xl font-semibold'>{token}</h2>}
			</div>

			<button
				onClick={handleAddToCart}
				className='w-full bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-xl font-medium transition-colors'>
				Add to cart
			</button>
		</div>
	);
};

export default ProductCard;
