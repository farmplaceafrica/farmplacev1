"use client";

import { useEffect } from "react";
import ProductsGrid from "@/components/marketplace/product-grid";
import productsData from "@/data/productdata";
import { CartProvider } from "@/components/context/CardContext";

export default function ProductsPage() {
	return (
		<CartProvider>
			<main className=''>
				<div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
					<ProductsGrid products={productsData} />
				</div>
			</main>
		</CartProvider>
	);
}
