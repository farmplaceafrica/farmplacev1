"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { MapPin } from "lucide-react";

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
			className='bg-white w-full max-w-[350px]  shadow-md border border-[#C9E7CB] p-4 m-2 rounded-3xl cursor-pointer'
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
				<h2 className='text-lg font-bold text-[#606060]'>{title}</h2>
				<div className='flex text-[#4CAF50] text-[16px] mb-3 justify-between items-center'>
					<h2 className='font-semibold'>{price}</h2>
					{token && <h2 className=' font-semibold'>{token}</h2>}
				</div>
				<p className='text-[#777777] text-xs'>{description}</p>

				<p className='text-[#606060] flex text-xs items-center'>
					{" "}
					<MapPin size={14} className='mr-1' />
					{location}
				</p>
			</div>

			<button
				onClick={handleAddToCart}
				className='w-full  mt-5  bg-green-900 hover:bg-[#468149] text-lg  cursor-pointer text-white py-2 px-4 rounded-xl font-medium transition-colors'>
				Add to cart
			</button>
		</div>
	);
};

export default ProductCard;
