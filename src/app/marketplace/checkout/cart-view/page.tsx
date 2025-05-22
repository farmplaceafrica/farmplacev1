"use client";

import ShoppingCart from "@/components/marketplace/shopping-cart";
import { CartProvider } from "@/components/context/CardContext";
export default function CartPage() {
	return (
		<CartProvider>
			<main className='min-h-screen py-6'>
				<ShoppingCart />
			</main>
		</CartProvider>
	);
}
