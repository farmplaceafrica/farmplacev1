// "use client";

// import React, {
// 	createContext,
// 	useContext,
// 	useState,
// 	useEffect,
// 	ReactNode,
// } from "react";
// import { getProductById } from "@/data/productdata";

// interface CartItem {
// 	id: string;
// 	title: string;
// 	price: string;
// 	image: string;
// 	quantity: number;
// }

// interface CartContextType {
// 	cartItems: CartItem[];
// 	addToCart: (productId: string) => void;
// 	removeFromCart: (productId: string) => void;
// 	updateQuantity: (productId: string, quantity: number) => void;
// 	clearCart: () => void;
// }

// const CartContext = createContext<CartContextType | undefined>(undefined);

// export const useCart = () => {
// 	const context = useContext(CartContext);
// 	if (!context) {
// 		throw new Error("useCart must be used within a CartProvider");
// 	}
// 	return context;
// };

// interface CartProviderProps {
// 	children: ReactNode;
// }

// export const CartProvider = ({ children }: CartProviderProps) => {
// 	const [cartItems, setCartItems] = useState<CartItem[]>([]);

// 	// Load cart from localStorage when the component mounts
// 	useEffect(() => {
// 		const savedCart = localStorage.getItem("cart");
// 		if (savedCart) {
// 			try {
// 				setCartItems(JSON.parse(savedCart));
// 			} catch (error) {
// 				console.error("Failed to parse cart data:", error);
// 			}
// 		}
// 	}, []);

// 	// Save cart to localStorage whenever it changes
// 	useEffect(() => {
// 		localStorage.setItem("cart", JSON.stringify(cartItems));
// 	}, [cartItems]);

// 	const addToCart = (productId: string) => {
// 		const product = getProductById(productId);

// 		if (!product) return;

// 		setCartItems((prevItems) => {
// 			// Check if the item is already in the cart
// 			const existingItemIndex = prevItems.findIndex(
// 				(item) => item.id === productId
// 			);

// 			if (existingItemIndex >= 0) {
// 				// If it exists, update the quantity
// 				const updatedItems = [...prevItems];
// 				updatedItems[existingItemIndex].quantity += 1;
// 				return updatedItems;
// 			} else {
// 				// If it doesn't exist, add it to the cart
// 				return [
// 					...prevItems,
// 					{
// 						id: product.id,
// 						title: product.title,
// 						price: product.price,
// 						image: product.image,
// 						quantity: 1,
// 					},
// 				];
// 			}
// 		});
// 	};

// 	const removeFromCart = (productId: string) => {
// 		setCartItems((prevItems) =>
// 			prevItems.filter((item) => item.id !== productId)
// 		);
// 	};

// 	const updateQuantity = (productId: string, quantity: number) => {
// 		if (quantity < 1) return;

// 		setCartItems((prevItems) =>
// 			prevItems.map((item) =>
// 				item.id === productId ? { ...item, quantity } : item
// 			)
// 		);
// 	};

// 	const clearCart = () => {
// 		setCartItems([]);
// 	};

// 	return (
// 		<CartContext.Provider
// 			value={{
// 				cartItems,
// 				addToCart,
// 				removeFromCart,
// 				updateQuantity,
// 				clearCart,
// 			}}>
// 			{children}
// 		</CartContext.Provider>
// 	);
// };

"use client";

import React, {
	createContext,
	useContext,
	useState,
	useEffect,
	ReactNode,
} from "react";
import { getProductById } from "@/data/productdata";

interface CartItem {
	id: string;
	title: string;
	price: string;
	image: string;
	quantity: number;
}

interface CartContextType {
	cartItems: CartItem[];
	addToCart: (productId: string) => void;
	removeFromCart: (productId: string) => void;
	updateQuantity: (productId: string, quantity: number) => void;
	clearCart: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const useCart = () => {
	const context = useContext(CartContext);
	if (!context) {
		throw new Error("useCart must be used within a CartProvider");
	}
	return context;
};

interface CartProviderProps {
	children: ReactNode;
}

export const CartProvider = ({ children }: CartProviderProps) => {
	const [cartItems, setCartItems] = useState<CartItem[]>([]);
	const [isInitialized, setIsInitialized] = useState(false);

	// Load cart from localStorage when the component mounts
	useEffect(() => {
		// Only run this on the client side
		if (typeof window !== "undefined") {
			const savedCart = localStorage.getItem("cart");
			if (savedCart) {
				try {
					setCartItems(JSON.parse(savedCart));
				} catch (error) {
					console.error("Failed to parse cart data:", error);
				}
			}
			setIsInitialized(true);
		}
	}, []);

	// Save cart to localStorage whenever it changes
	useEffect(() => {
		// Skip the initial render and only save on subsequent updates
		if (isInitialized && typeof window !== "undefined") {
			localStorage.setItem("cart", JSON.stringify(cartItems));
			console.log("Cart saved to localStorage:", cartItems);
		}
	}, [cartItems, isInitialized]);

	const addToCart = (productId: string) => {
		console.log("Adding product to cart:", productId);
		const product = getProductById(productId);

		if (!product) {
			console.error("Product not found:", productId);
			return;
		}

		setCartItems((prevItems) => {
			// Check if the item is already in the cart
			const existingItemIndex = prevItems.findIndex(
				(item) => item.id === productId
			);

			if (existingItemIndex >= 0) {
				// If it exists, update the quantity
				const updatedItems = [...prevItems];
				updatedItems[existingItemIndex].quantity += 1;
				console.log("Updated cart items:", updatedItems);
				return updatedItems;
			} else {
				// If it doesn't exist, add it to the cart
				const newItem = {
					id: product.id,
					title: product.title,
					price: product.price,
					image: product.image,
					quantity: 1,
				};
				console.log("New cart item:", newItem);
				return [...prevItems, newItem];
			}
		});
	};

	const removeFromCart = (productId: string) => {
		setCartItems((prevItems) =>
			prevItems.filter((item) => item.id !== productId)
		);
	};

	const updateQuantity = (productId: string, quantity: number) => {
		if (quantity < 1) return;

		setCartItems((prevItems) =>
			prevItems.map((item) =>
				item.id === productId ? { ...item, quantity } : item
			)
		);
	};

	const clearCart = () => {
		setCartItems([]);
	};

	return (
		<CartContext.Provider
			value={{
				cartItems,
				addToCart,
				removeFromCart,
				updateQuantity,
				clearCart,
			}}>
			{children}
		</CartContext.Provider>
	);
};
