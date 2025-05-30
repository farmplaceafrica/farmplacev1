// "use client";
// import React, {
// 	createContext,
// 	useContext,
// 	useState,
// 	useEffect,
// 	ReactNode,
// } from "react";
// import { productService } from "@/service/productService";

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
// 	isLoading: boolean;
// 	error: string | null;
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
// 	const [isLoading, setIsLoading] = useState(false);
// 	const [error, setError] = useState<string | null>(null);

// 	// Load cart from localStorage when the component mounts
// 	useEffect(() => {
// 		if (typeof window !== "undefined") {
// 			try {
// 				const savedCart = localStorage.getItem("cart");
// 				if (savedCart) {
// 					const parsedCart = JSON.parse(savedCart);
// 					setCartItems(Array.isArray(parsedCart) ? parsedCart : []);
// 				}
// 			} catch (error) {
// 				console.error("Failed to parse cart data:", error);
// 				// Clear corrupted cart data
// 				localStorage.removeItem("cart");
// 			}
// 			setIsInitialized(true);
// 		}
// 	}, []);

// 	// Save cart to localStorage whenever it changes
// 	useEffect(() => {
// 		if (isInitialized && typeof window !== "undefined") {
// 			try {
// 				localStorage.setItem("cart", JSON.stringify(cartItems));
// 				console.log("Cart saved to localStorage:", cartItems);
// 			} catch (error) {
// 				console.error("Failed to save cart to localStorage:", error);
// 			}
// 		}
// 	}, [cartItems, isInitialized]);

// 	const addToCart = async (productId: string) => {
// 		console.log("Adding product to cart:", productId);
// 		setIsLoading(true);
// 		setError(null);

// 		try {
// 			// Check if item already exists in cart first
// 			const existingItemIndex = cartItems.findIndex(
// 				(item) => item.id === productId
// 			);

// 			if (existingItemIndex >= 0) {
// 				// If it exists, just update the quantity
// 				setCartItems((prevItems) => {
// 					const updatedItems = [...prevItems];
// 					updatedItems[existingItemIndex].quantity += 1;
// 					console.log(
// 						"Updated existing item quantity:",
// 						updatedItems[existingItemIndex]
// 					);
// 					return updatedItems;
// 				});
// 				return;
// 			}

// 			// Fetch product from API only if it's not in cart
// 			const product = await productService.getProductById(productId);

// 			if (!product) {
// 				throw new Error(`Product with ID ${productId} not found`);
// 			}

// 			// Add new item to cart
// 			const newItem: CartItem = {
// 				id: product._id,
// 				title: product.productName,
// 				price: `₦${product.priceNGN}`,
// 				image: product.images?.[0] || "/placeholder-image.jpg",
// 				quantity: 1,
// 			};

// 			setCartItems((prevItems) => {
// 				const updatedItems = [...prevItems, newItem];
// 				console.log("Added new item to cart:", newItem);
// 				console.log("Full cart after addition:", updatedItems);
// 				return updatedItems;
// 			});
// 		} catch (error) {
// 			const errorMessage =
// 				error instanceof Error
// 					? error.message
// 					: "Failed to add product to cart";
// 			console.error("Error adding product to cart:", error);
// 			setError(errorMessage);
// 		} finally {
// 			setIsLoading(false);
// 		}
// 	};

// 	const removeFromCart = (productId: string) => {
// 		setCartItems((prevItems) => {
// 			const filteredItems = prevItems.filter((item) => item.id !== productId);
// 			console.log("Removed item from cart, new cart:", filteredItems);
// 			return filteredItems;
// 		});
// 	};

// 	const updateQuantity = (productId: string, quantity: number) => {
// 		if (quantity < 1) {
// 			removeFromCart(productId);
// 			return;
// 		}

// 		setCartItems((prevItems) => {
// 			const updatedItems = prevItems.map((item) =>
// 				item.id === productId ? { ...item, quantity } : item
// 			);
// 			console.log("Updated quantity for", productId, "to", quantity);
// 			return updatedItems;
// 		});
// 	};

// 	const clearCart = () => {
// 		setCartItems([]);
// 		console.log("Cart cleared");
// 	};

// 	return (
// 		<CartContext.Provider
// 			value={{
// 				cartItems,
// 				addToCart,
// 				removeFromCart,
// 				updateQuantity,
// 				clearCart,
// 				isLoading,
// 				error,
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
	useCallback,
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
	addToCart: (productId: string) => Promise<void>;
	removeFromCart: (productId: string) => void;
	updateQuantity: (productId: string, quantity: number) => void;
	clearCart: () => void;
	isLoading: boolean;
	error: string | null;
	cartCount: number;
	cartTotal: number;
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

	// Calculate derived values that will trigger re-renders
	const cartCount = cartItems.reduce((total, item) => total + item.quantity, 0);
	const cartTotal = cartItems.reduce((total, item) => {
		const price = parseFloat(item.price.replace("₦", "").replace(",", ""));
		return total + price * item.quantity;
	}, 0);

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
				localStorage.removeItem("cart");
			}
			setIsInitialized(true);
		}
	}, []);

	// Save cart to localStorage whenever it changes (with better error handling)
	useEffect(() => {
		if (isInitialized && typeof window !== "undefined") {
			try {
				localStorage.setItem("cart", JSON.stringify(cartItems));
				console.log("Cart saved to localStorage:", cartItems);
			} catch (error) {
				console.error("Failed to save cart to localStorage:", error);
				setError("Failed to save cart data");
			}
		}
	}, [cartItems, isInitialized]);

	// Use useCallback to prevent unnecessary re-renders of components using these functions
	const addToCart = useCallback(
		async (productId: string) => {
			console.log("Adding product to cart:", productId);
			setIsLoading(true);
			setError(null);

			try {
				// Use functional update to ensure we have the latest state
				setCartItems((prevItems) => {
					const existingItemIndex = prevItems.findIndex(
						(item) => item.id === productId
					);

					if (existingItemIndex >= 0) {
						// If it exists, update the quantity
						const updatedItems = [...prevItems];
						updatedItems[existingItemIndex] = {
							...updatedItems[existingItemIndex],
							quantity: updatedItems[existingItemIndex].quantity + 1,
						};
						console.log(
							"Updated existing item quantity:",
							updatedItems[existingItemIndex]
						);
						return updatedItems;
					}

					// If item doesn't exist, we'll need to fetch it
					// But we can't do async operations inside setState, so we'll handle this separately
					return prevItems;
				});

				// Check if we need to fetch the product (item not in cart)
				const existingItem = cartItems.find((item) => item.id === productId);
				if (!existingItem) {
					// Fetch product from API
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
						// Double-check the item wasn't added while we were fetching
						const stillNotExists = !prevItems.find(
							(item) => item.id === productId
						);
						if (stillNotExists) {
							const updatedItems = [...prevItems, newItem];
							console.log("Added new item to cart:", newItem);
							console.log("Full cart after addition:", updatedItems);
							return updatedItems;
						}
						return prevItems;
					});
				}
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
		},
		[cartItems]
	);

	const removeFromCart = useCallback((productId: string) => {
		setCartItems((prevItems) => {
			const filteredItems = prevItems.filter((item) => item.id !== productId);
			console.log("Removed item from cart, new cart:", filteredItems);
			return filteredItems;
		});
		setError(null); // Clear any errors when successfully removing items
	}, []);

	const updateQuantity = useCallback(
		(productId: string, quantity: number) => {
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
			setError(null); // Clear any errors when successfully updating
		},
		[removeFromCart]
	);

	const clearCart = useCallback(() => {
		setCartItems([]);
		setError(null);
		console.log("Cart cleared");
	}, []);

	// Clear errors after a timeout
	useEffect(() => {
		if (error) {
			const timer = setTimeout(() => {
				setError(null);
			}, 5000);
			return () => clearTimeout(timer);
		}
	}, [error]);

	const contextValue = {
		cartItems,
		addToCart,
		removeFromCart,
		updateQuantity,
		clearCart,
		isLoading,
		error,
		cartCount,
		cartTotal,
	};

	return (
		<CartContext.Provider value={contextValue}>{children}</CartContext.Provider>
	);
};
