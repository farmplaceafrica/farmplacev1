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
// 	const [isInitialized, setIsInitialized] = useState(false);

// 	// Load cart from localStorage when the component mounts
// 	useEffect(() => {
// 		// Only run this on the client side
// 		if (typeof window !== "undefined") {
// 			const savedCart = localStorage.getItem("cart");
// 			if (savedCart) {
// 				try {
// 					setCartItems(JSON.parse(savedCart));
// 				} catch (error) {
// 					console.error("Failed to parse cart data:", error);
// 				}
// 			}
// 			setIsInitialized(true);
// 		}
// 	}, []);

// 	// Save cart to localStorage whenever it changes
// 	useEffect(() => {
// 		// Skip the initial render and only save on subsequent updates
// 		if (isInitialized && typeof window !== "undefined") {
// 			localStorage.setItem("cart", JSON.stringify(cartItems));
// 			console.log("Cart saved to localStorage:", cartItems);
// 		}
// 	}, [cartItems, isInitialized]);

// 	const addToCart = (productId: string) => {
// 		console.log("Adding product to cart:", productId);
// 		const product = getProductById(productId);

// 		if (!product) {
// 			console.error("Product not found:", productId);
// 			return;
// 		}

// 		setCartItems((prevItems) => {
// 			// Check if the item is already in the cart
// 			const existingItemIndex = prevItems.findIndex(
// 				(item) => item.id === productId
// 			);

// 			if (existingItemIndex >= 0) {
// 				// If it exists, update the quantity
// 				const updatedItems = [...prevItems];
// 				updatedItems[existingItemIndex].quantity += 1;
// 				console.log("Updated cart items:", updatedItems);
// 				return updatedItems;
// 			} else {
// 				// If it doesn't exist, add it to the cart
// 				const newItem = {
// 					id: product.id,
// 					title: product.title,
// 					price: product.price,
// 					image: product.image,
// 					quantity: 1,
// 				};
// 				console.log("New cart item:", newItem);
// 				return [...prevItems, newItem];
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
import { productService } from "@/service/productService";

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
	isLoading: boolean;
	error: string | null;
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
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);

	// Load cart from localStorage when the component mounts
	useEffect(() => {
		if (typeof window !== "undefined") {
			try {
				const savedCart = localStorage.getItem("cart");
				if (savedCart) {
					const parsedCart = JSON.parse(savedCart);
					setCartItems(Array.isArray(parsedCart) ? parsedCart : []);
				}
			} catch (error) {
				console.error("Failed to parse cart data:", error);
				// Clear corrupted cart data
				localStorage.removeItem("cart");
			}
			setIsInitialized(true);
		}
	}, []);

	// Save cart to localStorage whenever it changes
	useEffect(() => {
		if (isInitialized && typeof window !== "undefined") {
			try {
				localStorage.setItem("cart", JSON.stringify(cartItems));
				console.log("Cart saved to localStorage:", cartItems);
			} catch (error) {
				console.error("Failed to save cart to localStorage:", error);
			}
		}
	}, [cartItems, isInitialized]);

	const addToCart = async (productId: string) => {
		console.log("Adding product to cart:", productId);
		setIsLoading(true);
		setError(null);

		try {
			// Check if item already exists in cart first
			const existingItemIndex = cartItems.findIndex(
				(item) => item.id === productId
			);

			if (existingItemIndex >= 0) {
				// If it exists, just update the quantity
				setCartItems((prevItems) => {
					const updatedItems = [...prevItems];
					updatedItems[existingItemIndex].quantity += 1;
					console.log(
						"Updated existing item quantity:",
						updatedItems[existingItemIndex]
					);
					return updatedItems;
				});
				return;
			}

			// Fetch product from API only if it's not in cart
			const product = await productService.getProductById(productId);

			if (!product) {
				throw new Error(`Product with ID ${productId} not found`);
			}

			// Add new item to cart
			const newItem: CartItem = {
				id: product._id,
				title: product.productName,
				price: `₦${product.priceNGN}`,
				image: product.images?.[0] || "/placeholder-image.jpg",
				quantity: 1,
			};

			setCartItems((prevItems) => {
				const updatedItems = [...prevItems, newItem];
				console.log("Added new item to cart:", newItem);
				console.log("Full cart after addition:", updatedItems);
				return updatedItems;
			});
		} catch (error) {
			const errorMessage =
				error instanceof Error
					? error.message
					: "Failed to add product to cart";
			console.error("Error adding product to cart:", error);
			setError(errorMessage);
		} finally {
			setIsLoading(false);
		}
	};

	const removeFromCart = (productId: string) => {
		setCartItems((prevItems) => {
			const filteredItems = prevItems.filter((item) => item.id !== productId);
			console.log("Removed item from cart, new cart:", filteredItems);
			return filteredItems;
		});
	};

	const updateQuantity = (productId: string, quantity: number) => {
		if (quantity < 1) {
			removeFromCart(productId);
			return;
		}

		setCartItems((prevItems) => {
			const updatedItems = prevItems.map((item) =>
				item.id === productId ? { ...item, quantity } : item
			);
			console.log("Updated quantity for", productId, "to", quantity);
			return updatedItems;
		});
	};

	const clearCart = () => {
		setCartItems([]);
		console.log("Cart cleared");
	};

	return (
		<CartContext.Provider
			value={{
				cartItems,
				addToCart,
				removeFromCart,
				updateQuantity,
				clearCart,
				isLoading,
				error,
			}}>
			{children}
		</CartContext.Provider>
	);
};
