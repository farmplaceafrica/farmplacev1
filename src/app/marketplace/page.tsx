"use client";

import { useEffect } from "react";
import ProductsGrid from "@/components/marketplace/product-grid";
import productsData from "@/data/productdata";
import { CartProvider } from "@/components/context/CardContext";

export default function ProductsPage() {
	return (
		<CartProvider>
			<main className='min-h-screen py-12'>
				<div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
					<h1 className='text-3xl font-bold text-center mb-12'>Our Products</h1>
					<ProductsGrid products={productsData} />
				</div>
			</main>
		</CartProvider>
	);
}
