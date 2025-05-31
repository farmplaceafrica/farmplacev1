// ===== Product API Service =====
// Create a separate file: /services/productService.ts or include in your existing service file

const API_BASE_URL = "https://farmplace-backend-api.onrender.com/api/v1";
// const API_BASE_URL = "http://localhost/api/v1";

export interface Product {
	_id: string;
	productName: string;
	category: string;
	description: string;
	location: string;
	quantity: number;
	priceNGN: string;
	priceADA?: number;
	images: string[];
	userId: string;
	wallet: string;
	createdAt: string;
	updatedAt: string;
	__v: number;
}

export const productService = {
	// Get all products
	async getAllProducts(): Promise<Product[]> {
		try {
			const token = localStorage.getItem("auth_token");
			const headers: HeadersInit = {
				"Content-Type": "application/json",
			};

			if (token) {
				headers.Authorization = `Bearer ${token}`;
			}

			const response = await fetch(`${API_BASE_URL}/product`, {
				method: "GET",
				headers,
			});

			if (!response.ok) {
				throw new Error(`HTTP error! status: ${response.status}`);
			}

			const result = await response.json();
			// Adjust based on your API response structure
			return result.data || result.products || result || [];
		} catch (error) {
			console.error("Error fetching products:", error);
			throw new Error("Failed to fetch products");
		}
	},

	// Get product by ID
	async getProductById(id: string): Promise<Product | null> {
		try {
			const token = localStorage.getItem("auth_token");
			const headers: HeadersInit = {
				"Content-Type": "application/json",
			};

			if (token) {
				headers.Authorization = `Bearer ${token}`;
			}

			const response = await fetch(`${API_BASE_URL}/product/${id}`, {
				method: "GET",
				headers,
			});

			if (!response.ok) {
				if (response.status === 404) {
					return null;
				}
				throw new Error(`HTTP error! status: ${response.status}`);
			}

			const result = await response.json();
			// Adjust based on your API response structure
			return result.data || result.product || result;
		} catch (error) {
			console.error("Error fetching product:", error);
			throw new Error("Failed to fetch product");
		}
	},

	// Get products by user ID (for user's own products)
	async getProductsByUserId(userId: string): Promise<Product[]> {
		try {
			const token = localStorage.getItem("auth_token");
			const headers: HeadersInit = {
				"Content-Type": "application/json",
			};

			if (token) {
				headers.Authorization = `Bearer ${token}`;
			}

			const response = await fetch(`${API_BASE_URL}/product/user/${userId}`, {
				method: "GET",
				headers,
			});

			if (!response.ok) {
				throw new Error(`HTTP error! status: ${response.status}`);
			}

			const result = await response.json();
			// Adjust based on your API response structure
			return result.data || result.products || result || [];
		} catch (error) {
			console.error("Error fetching user products:", error);
			throw new Error("Failed to fetch user products");
		}
	},
};
