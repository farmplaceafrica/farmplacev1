"use client";

import { useRouter } from "next/navigation";
import productsData from "@/data/productdata";
import { CartProvider } from "@/components/context/CardContext";
import ProductCard from "@/components/marketplace/usercard.tsx";
import { ShoppingBasket } from "lucide-react";

// Define the product type based on your data structure
type Product = {
	id: string;
	title: string;
	description: string;
	location: string;
	token: string;
	image: string;
	rating: number;
	reviewCount: number;
	availability: string;
	price: string | number;
	shipping: {
		method: string;
		cost: number;
	};
};

const FeaturedProducts = () => {
	const router = useRouter();

	// Get first 3 products from your data
	const featuredProducts = productsData.slice(0, 3).map((product) => ({
		id: product.id,
		title: product.title,
		description: product.description,
		location: product.location,
		token: product.token,
		image: product.image,
		rating: product.rating,
		reviewCount: product.reviewCount,
		availability: product.availability,
		price: product.price.toString(),
		shipping: {
			method: product.shipping.courier || "unknown",
			cost: product.shipping.courier ? parseFloat(product.shipping.courier) : 0,
		},
	})) as Product[];

	const handleGoToMarketplace = () => {
		router.push("/marketplace");
	};

	return (
		<CartProvider>
			<section className='py-16 bg-gray-50'>
				<div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
					{/* Section Header */}
					<div className=' mb-12'>
						<h2 className='text-3xl md:text-4xl font-bold text-gray-800 mb-4'>
							Featured Products
						</h2>
						<p className='text-lg text-gray-600'>
							Discover fresh, quality products from local farmers in our
							marketplace
						</p>
					</div>

					{/* Products Grid */}
					<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12'>
						{featuredProducts.map((product) => (
							<ProductCard
								onAddToCart={handleGoToMarketplace}
								key={product.id}
								{...product}
								price={product.price.toString()}
							/>
						))}
					</div>

					{/* CTA Button */}
					<div className='text-center'>
						<button
							onClick={handleGoToMarketplace}
							className='bg-green-900 flex hover:bg-green-700 text-white font-semibold px-8 py-4 rounded-full transition-colors duration-200 text-lg shadow-lg'>
							<ShoppingBasket className='mr-3' />
							Go to Marketplace
						</button>
					</div>
				</div>
			</section>
		</CartProvider>
	);
};

export default FeaturedProducts;
