"use client";

import { useEffect, useState } from "react";
import { useParams, notFound } from "next/navigation";
import ProductDetail from "@/components/dashboard/product-details";
import { getProductById } from "@/data/productdata";
import { CartProvider } from "@/components/context/CardContext";

export default function ProductDetailPage() {
	const { id } = useParams();
	const [product, setProduct] = useState<any>(null);
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		if (id) {
			const productId = Array.isArray(id) ? id[0] : id;
			const foundProduct = getProductById(productId);

			if (foundProduct) {
				setProduct(foundProduct);
			}

			setIsLoading(false);
		}
	}, [id]);

	if (isLoading) {
		return (
			<main className='min-h-screen flex items-center justify-center'>
				<div className='animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500'></div>
			</main>
		);
	}

	if (!product) {
		return notFound();
	}

	return (
		<CartProvider>
			<main className='min-h-screen py-6'>
				<ProductDetail product={product} />
			</main>
		</CartProvider>
	);
}
