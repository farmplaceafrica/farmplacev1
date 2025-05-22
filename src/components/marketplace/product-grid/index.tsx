"use client";

import { useState, useEffect } from "react";
import ProductCard from "../usercard.tsx";
import { useCart } from "@/components/context/CardContext"; // Import useCart hook

interface Product {
	id: string;
	title: string;
	description: string;
	location: string;
	token?: string;
	price: string;
	image: string;
}

interface ProductsGridProps {
	products: Product[];
	title?: string;
}

const ProductsGrid = ({ products, title }: ProductsGridProps) => {
	const [isLoading, setIsLoading] = useState(true);
	const { addToCart } = useCart(); // Access the addToCart function from context

	useEffect(() => {
		// Simulate loading state
		const timer = setTimeout(() => {
			setIsLoading(false);
		}, 500);

		return () => clearTimeout(timer);
	}, []);

	const handleAddToCart = (productId: string) => {
		addToCart(productId); // Use the actual addToCart function from context
		console.log(`Product ${productId} added to cart`);
	};

	return (
		<div className='mt-10 px-4 sm:px-6 lg:px-8'>
			{title && (
				<h2 className='text-2xl font-bold text-gray-900 mb-6'>{title}</h2>
			)}

			{isLoading ? (
				<div className='w-full lg:w-[80%] mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6'>
					{[...Array(6)].map((_, index) => (
						<div
							key={index}
							className='bg-white w-full max-w-[350px] h-[400px] space-y-3 shadow-md animate-pulse p-4 m-2 rounded-3xl'>
							<div className='w-full h-48 bg-gray-200 rounded-xl'></div>
							<div className='h-6 bg-gray-200 rounded w-3/4'></div>
							<div className='flex justify-between items-center'>
								<div className='h-6 bg-gray-200 rounded w-1/3'></div>
								<div className='h-6 bg-gray-200 rounded w-1/3'></div>
							</div>
							<div className='h-4 bg-gray-200 rounded w-full'></div>
							<div className='h-4 bg-gray-200 rounded w-2/3'></div>
							<div className='h-10 bg-gray-200 rounded-xl w-full'></div>
						</div>
					))}
				</div>
			) : (
				<div className='w-full lg:max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6'>
					{products.map((product) => (
						<ProductCard
							key={product.id}
							id={product.id}
							title={product.title}
							description={product.description}
							location={product.location}
							token={product.token}
							price={product.price}
							image={product.image}
							onAddToCart={handleAddToCart} // Pass the handler function
						/>
					))}
				</div>
			)}
		</div>
	);
};

export default ProductsGrid;
