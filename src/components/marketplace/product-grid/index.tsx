"use client";

import { useState, useEffect, useMemo } from "react";
import ProductCard from "../usercard.tsx";
import { useCart } from "@/components/context/CardContext";
import { useSearch } from "@/components/context/SearchContext";

interface Product {
	id: string;
	title: string;
	description: string;
	location: string;
	ada: string;
	price: string;
	image: string;
}

interface ProductsGridProps {
	products: Product[];
	title?: string;
}

const ProductsGrid = ({ products, title }: ProductsGridProps) => {
	const [isLoading, setIsLoading] = useState(true);
	const { addToCart } = useCart();
	const { searchTerm } = useSearch();

	useEffect(() => {
		// Simulate loading state
		const timer = setTimeout(() => {
			setIsLoading(false);
		}, 500);

		return () => clearTimeout(timer);
	}, []);

	// Filter products based on search term
	const filteredProducts = useMemo(() => {
		if (!searchTerm.trim()) {
			return products;
		}

		const searchLower = searchTerm.toLowerCase();
		return products.filter((product) => {
			return (
				product.title.toLowerCase().includes(searchLower) ||
				product.description.toLowerCase().includes(searchLower) ||
				product.location.toLowerCase().includes(searchLower)
			);
		});
	}, [products, searchTerm]);

	const handleAddToCart = (productId: string) => {
		addToCart(productId);
		console.log(`Product ${productId} added to cart`);
	};

	return (
		<div className=' px-4 sm:px-6 lg:px-8'>
			<div className='flex items-center justify-between mb-6'>
				{title && <h2 className='text-2xl font-bold text-gray-900'>{title}</h2>}
				{searchTerm && (
					<div className='flex items-center gap-2'>
						<span className='text-gray-600'>
							Showing {filteredProducts.length} result
							{filteredProducts.length !== 1 ? "s" : ""} for "{searchTerm}"
						</span>
						{filteredProducts.length === 0 && (
							<span className='text-red-500 text-sm'>No products found</span>
						)}
					</div>
				)}
			</div>

			{isLoading ? (
				<div className='w-full lg:w-[80%] mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
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
				<>
					{filteredProducts.length === 0 && searchTerm ? (
						<div className='flex flex-col items-center justify-center py-16'>
							<div className='text-gray-400 mb-4'>
								<svg
									className='w-16 h-16 mx-auto'
									fill='none'
									stroke='currentColor'
									viewBox='0 0 24 24'>
									<path
										strokeLinecap='round'
										strokeLinejoin='round'
										strokeWidth={2}
										d='M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z'
									/>
								</svg>
							</div>
							<h3 className='text-xl font-semibold text-gray-600 mb-2'>
								No products found
							</h3>
							<p className='text-gray-500 text-center max-w-md'>
								We couldn't find any products matching "{searchTerm}". Try
								adjusting your search terms or browse our available products.
							</p>
						</div>
					) : (
						<div className='w-full lg:max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
							{filteredProducts.map((product) => (
								<ProductCard
									key={product.id}
									id={product.id}
									title={product.title}
									description={product.description}
									location={product.location}
									price={product.price}
									ada={product.ada}
									image={product.image}
									onAddToCart={handleAddToCart}
								/>
							))}
						</div>
					)}
				</>
			)}
		</div>
	);
};

export default ProductsGrid;
