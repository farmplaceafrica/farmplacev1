// "use client";

// import { useEffect, useState } from "react";
// import { useParams, notFound } from "next/navigation";
// import ProductDetail from "@/components/marketplace/product-details";
// import { productService, Product } from "@/service/productService"; // Adjust import path
// import { CartProvider } from "@/components/context/CardContext";

// export default function ProductDetailPage() {
// 	const { id } = useParams();
// 	const [product, setProduct] = useState<Product | null>(null);
// 	const [isLoading, setIsLoading] = useState(true);
// 	const [error, setError] = useState<string | null>(null);

// 	useEffect(() => {
// 		const fetchProduct = async () => {
// 			if (!id) {
// 				setIsLoading(false);
// 				return;
// 			}

// 			try {
// 				const productId = Array.isArray(id) ? id[0] : id;
// 				const fetchedProduct = await productService.getProductById(productId);

// 				if (fetchedProduct) {
// 					setProduct(fetchedProduct);
// 				} else {
// 					setError("Product not found");
// 				}
// 			} catch (err) {
// 				console.error("Error fetching product:", err);
// 				setError("Failed to load product");
// 			} finally {
// 				setIsLoading(false);
// 			}
// 		};

// 		fetchProduct();
// 	}, [id]);

// 	if (isLoading) {
// 		return (
// 			<main className='min-h-screen flex items-center justify-center'>
// 				<div className='animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500'></div>
// 			</main>
// 		);
// 	}

// 	if (error || !product) {
// 		return notFound();
// 	}

// 	// Transform product data to match your ProductDetail component's expected format
// 	const transformedProduct = {
// 		id: product._id,
// 		title: product.productName,
// 		description: product.description,
// 		location: product.location,
// 		price: product.priceNGN,
// 		image: product.images[0] || "/placeholder-image.jpg",
// 		images: product.images,
// 		category: product.category,
// 		quantity: product.quantity,
// 		// Add any other fields your ProductDetail component expects
// 	};

// 	return (
// 		<CartProvider>
// 			<main className='min-h-screen py-6'>
// 				<ProductDetail product={transformedProduct} />
// 			</main>
// 		</CartProvider>
// 	);
// }

"use client";

import { useEffect, useState } from "react";
import { useParams, notFound } from "next/navigation";
import ProductDetail from "@/components/marketplace/product-details";
import { productService, Product } from "@/service/productService";
import { CartProvider } from "@/components/context/CardContext";

export default function ProductDetailPage() {
	const { id } = useParams();
	const [product, setProduct] = useState<Product | null>(null);
	const [isLoading, setIsLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		const fetchProduct = async () => {
			if (!id) {
				setIsLoading(false);
				return;
			}

			try {
				const productId = Array.isArray(id) ? id[0] : id;
				const fetchedProduct = await productService.getProductById(productId);

				if (fetchedProduct) {
					setProduct(fetchedProduct);
				} else {
					setError("Product not found");
				}
			} catch (err) {
				console.error("Error fetching product:", err);
				setError("Failed to load product");
			} finally {
				setIsLoading(false);
			}
		};

		fetchProduct();
	}, [id]);

	if (isLoading) {
		return (
			<main className='min-h-screen flex items-center justify-center'>
				<div className='animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500'></div>
			</main>
		);
	}

	if (error || !product) {
		return notFound();
	}

	// Transform product data to match ProductDetail component's expected format
	const transformedProduct = {
		id: product._id,
		title: product.productName,
		description: product.description,
		price: product.priceNGN,
		currency: "NGN",

		// Required fields with default values
		rating: 4.5, // You can calculate this from reviews or set a default
		reviewCount: 0, // Set based on actual reviews or default to 0
		availability: product.quantity > 0 ? "In Stock" : "Out of Stock",
		units: `${product.quantity} available`,

		// Transform images array
		images:
			product.images.length > 0
				? product.images.map((imageUrl, index) => ({
						src: imageUrl,
						alt: `${product.productName} - Image ${index + 1}`,
				  }))
				: [
						{
							src: "/placeholder-image.jpg",
							alt: "Product placeholder",
						},
				  ],

		// Default features - you can customize these based on product category
		features: [
			"Fresh and organic",
			"Locally sourced",
			"High quality guarantee",
			"Fast delivery available",
		],

		// Default shipping info - customize as needed
		shipping: {
			courier: "2-3 business days - ₦1,500",
			local: "Same day delivery - ₦800",
			ups: "3-5 business days - ₦2,000",
		},
	};

	return (
		<CartProvider>
			<main className='min-h-screen py-6'>
				<ProductDetail product={transformedProduct} />
			</main>
		</CartProvider>
	);
}
