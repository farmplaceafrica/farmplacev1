// data.ts - Mock farm data for testing

export interface FarmProduct {
	id: string;
	name: string;
	category: "Vegetables" | "Fruits" | "Grains" | "Livestock" | "Dairy";
	quantity: number;
	unit: "kg" | "tons" | "pieces" | "liters";
	price: number;
	harvestDate: string;
	expiryDate?: string;
}

export interface DashboardData {
	uploadedProducts: number;
	totalSales: number;
	totalRevenue: number;
	productTypes: string[];
	mostBoughtProducts: ProductData[];
	recentProducts: FarmProduct[];
}

export interface ProductData {
	name: string;
	percentage: number;
	color: string;
	quantity: number;
	unit: string;
}

export interface ApiResponse<T> {
	data: T;
	success: boolean;
	message?: string;
}

// Mock farm products database
const mockFarmProducts: FarmProduct[] = [
	{
		id: "1",
		name: "Organic Tomatoes",
		category: "Vegetables",
		quantity: 150,
		unit: "kg",
		price: 3.5,
		harvestDate: "2024-05-20",
		expiryDate: "2024-06-10",
	},
	{
		id: "2",
		name: "Fresh Apples",
		category: "Fruits",
		quantity: 200,
		unit: "kg",
		price: 2.8,
		harvestDate: "2024-05-15",
		expiryDate: "2024-07-15",
	},
	{
		id: "3",
		name: "Free-Range Eggs",
		category: "Livestock",
		quantity: 500,
		unit: "pieces",
		price: 0.25,
		harvestDate: "2024-05-25",
		expiryDate: "2024-06-15",
	},
	{
		id: "4",
		name: "Organic Milk",
		category: "Dairy",
		quantity: 100,
		unit: "liters",
		price: 1.2,
		harvestDate: "2024-05-25",
		expiryDate: "2024-05-30",
	},
	{
		id: "5",
		name: "Wheat Grain",
		category: "Grains",
		quantity: 2,
		unit: "tons",
		price: 250.0,
		harvestDate: "2024-04-10",
		expiryDate: "2024-10-10",
	},
	{
		id: "6",
		name: "Organic Carrots",
		category: "Vegetables",
		quantity: 80,
		unit: "kg",
		price: 2.2,
		harvestDate: "2024-05-18",
		expiryDate: "2024-08-18",
	},
	{
		id: "7",
		name: "Fresh Oranges",
		category: "Fruits",
		quantity: 120,
		unit: "kg",
		price: 3.0,
		harvestDate: "2024-05-12",
		expiryDate: "2024-06-20",
	},
	{
		id: "8",
		name: "Corn",
		category: "Grains",
		quantity: 1.5,
		unit: "tons",
		price: 180.0,
		harvestDate: "2024-04-15",
		expiryDate: "2024-12-15",
	},
];

// Sales data for different time periods
const salesData = {
	daily: {
		today: { sales: 15, revenue: 1250 },
		yesterday: { sales: 12, revenue: 980 },
	},
	weekly: {
		"This week": { sales: 85, revenue: 7200 },
		"Last week": { sales: 72, revenue: 6100 },
	},
	monthly: {
		May: { sales: 320, revenue: 28500 },
		April: { sales: 280, revenue: 24200 },
		March: { sales: 310, revenue: 27800 },
	},
};

// Mock API functions
export const mockApiService = {
	// Get dashboard data for daily view
	getDailyData: async (
		timeframe: string
	): Promise<ApiResponse<DashboardData>> => {
		// Simulate API delay
		await new Promise((resolve) => setTimeout(resolve, 800));

		const todayProducts = mockFarmProducts.filter(
			(product) =>
				new Date(product.harvestDate).toDateString() ===
				new Date().toDateString()
		);

		const sales =
			salesData.daily[timeframe as keyof typeof salesData.daily] ||
			salesData.daily.today;

		const mostBoughtProducts: ProductData[] = [
			{
				name: "Organic Tomatoes",
				percentage: 35,
				color: "#10b981",
				quantity: 50,
				unit: "kg",
			},
			{
				name: "Fresh Apples",
				percentage: 25,
				color: "#3b82f6",
				quantity: 30,
				unit: "kg",
			},
			{
				name: "Free-Range Eggs",
				percentage: 25,
				color: "#f59e0b",
				quantity: 100,
				unit: "pieces",
			},
			{
				name: "Organic Milk",
				percentage: 15,
				color: "#ef4444",
				quantity: 20,
				unit: "liters",
			},
		];

		return {
			data: {
				uploadedProducts: todayProducts.length,
				totalSales: sales.sales,
				totalRevenue: sales.revenue,
				productTypes: ["Vegetables", "Fruits", "Dairy", "Livestock"],
				mostBoughtProducts,
				recentProducts: todayProducts,
			},
			success: true,
			message: `Daily data for ${timeframe}`,
		};
	},

	// Get dashboard data for weekly view
	getWeeklyData: async (
		timeframe: string
	): Promise<ApiResponse<DashboardData>> => {
		await new Promise((resolve) => setTimeout(resolve, 1000));

		const weekProducts = mockFarmProducts.filter((product) => {
			const productDate = new Date(product.harvestDate);
			const weekAgo = new Date();
			weekAgo.setDate(weekAgo.getDate() - 7);
			return productDate >= weekAgo;
		});

		const sales =
			salesData.weekly[timeframe as keyof typeof salesData.weekly] ||
			salesData.weekly["This week"];

		const mostBoughtProducts: ProductData[] = [
			{
				name: "Wheat Grain",
				percentage: 40,
				color: "#8b5cf6",
				quantity: 1.2,
				unit: "tons",
			},
			{
				name: "Organic Tomatoes",
				percentage: 30,
				color: "#10b981",
				quantity: 180,
				unit: "kg",
			},
			{
				name: "Fresh Apples",
				percentage: 20,
				color: "#3b82f6",
				quantity: 120,
				unit: "kg",
			},
			{
				name: "Organic Carrots",
				percentage: 10,
				color: "#f97316",
				quantity: 60,
				unit: "kg",
			},
		];

		return {
			data: {
				uploadedProducts: weekProducts.length,
				totalSales: sales.sales,
				totalRevenue: sales.revenue,
				productTypes: ["Grains", "Vegetables", "Fruits"],
				mostBoughtProducts,
				recentProducts: weekProducts,
			},
			success: true,
			message: `Weekly data for ${timeframe}`,
		};
	},

	// Get dashboard data for monthly view
	getMonthlyData: async (
		timeframe: string
	): Promise<ApiResponse<DashboardData>> => {
		await new Promise((resolve) => setTimeout(resolve, 1200));

		const monthProducts = mockFarmProducts;
		const sales =
			salesData.monthly[timeframe as keyof typeof salesData.monthly] ||
			salesData.monthly["May"];

		const mostBoughtProducts: ProductData[] = [
			{
				name: "Wheat Grain",
				percentage: 35,
				color: "#8b5cf6",
				quantity: 8,
				unit: "tons",
			},
			{
				name: "Corn",
				percentage: 25,
				color: "#eab308",
				quantity: 6,
				unit: "tons",
			},
			{
				name: "Organic Tomatoes",
				percentage: 22,
				color: "#10b981",
				quantity: 650,
				unit: "kg",
			},
			{
				name: "Fresh Apples",
				percentage: 18,
				color: "#3b82f6",
				quantity: 480,
				unit: "kg",
			},
		];

		return {
			data: {
				uploadedProducts: monthProducts.length,
				totalSales: sales.sales,
				totalRevenue: sales.revenue,
				productTypes: ["Grains", "Vegetables", "Fruits", "Dairy", "Livestock"],
				mostBoughtProducts,
				recentProducts: monthProducts,
			},
			success: true,
			message: `Monthly data for ${timeframe}`,
		};
	},

	// Get all farm products
	getAllProducts: async (): Promise<ApiResponse<FarmProduct[]>> => {
		await new Promise((resolve) => setTimeout(resolve, 500));

		return {
			data: mockFarmProducts,
			success: true,
			message: "All farm products retrieved successfully",
		};
	},

	// Add new farm product
	addProduct: async (
		product: Omit<FarmProduct, "id">
	): Promise<ApiResponse<FarmProduct>> => {
		await new Promise((resolve) => setTimeout(resolve, 800));

		const newProduct: FarmProduct = {
			id: Date.now().toString(),
			...product,
		};

		mockFarmProducts.push(newProduct);

		return {
			data: newProduct,
			success: true,
			message: "Product added successfully",
		};
	},

	// Get products by category
	getProductsByCategory: async (
		category: FarmProduct["category"]
	): Promise<ApiResponse<FarmProduct[]>> => {
		await new Promise((resolve) => setTimeout(resolve, 600));

		const categoryProducts = mockFarmProducts.filter(
			(product) => product.category === category
		);

		return {
			data: categoryProducts,
			success: true,
			message: `${category} products retrieved successfully`,
		};
	},
};

// Helper functions for testing
export const testHelpers = {
	// Generate random farm product
	generateRandomProduct: (): Omit<FarmProduct, "id"> => {
		const categories: FarmProduct["category"][] = [
			"Vegetables",
			"Fruits",
			"Grains",
			"Livestock",
			"Dairy",
		];
		const names = {
			Vegetables: ["Organic Lettuce", "Spinach", "Kale", "Broccoli", "Cabbage"],
			Fruits: ["Strawberries", "Blueberries", "Grapes", "Peaches", "Pears"],
			Grains: ["Rice", "Barley", "Oats", "Quinoa", "Rye"],
			Livestock: ["Chicken", "Beef", "Pork", "Lamb", "Turkey"],
			Dairy: ["Cheese", "Butter", "Yogurt", "Cream", "Buttermilk"],
		};

		const category = categories[Math.floor(Math.random() * categories.length)];
		const name =
			names[category][Math.floor(Math.random() * names[category].length)];

		return {
			name,
			category,
			quantity: Math.floor(Math.random() * 500) + 10,
			unit:
				category === "Grains"
					? "tons"
					: category === "Livestock"
					? "pieces"
					: category === "Dairy"
					? "liters"
					: "kg",
			price: Math.round((Math.random() * 10 + 1) * 100) / 100,
			harvestDate: new Date().toISOString().split("T")[0],
			expiryDate: new Date(
				Date.now() + Math.random() * 90 * 24 * 60 * 60 * 1000
			)
				.toISOString()
				.split("T")[0],
		};
	},

	// Test all API endpoints
	runTests: async () => {
		console.log("🧪 Testing Farm Data API...\n");

		try {
			// Test daily data
			console.log("📅 Testing Daily Data...");
			const dailyData = await mockApiService.getDailyData("Today");
			console.log("✅ Daily data:", dailyData);

			// Test weekly data
			console.log("\n📊 Testing Weekly Data...");
			const weeklyData = await mockApiService.getWeeklyData("This week");
			console.log("✅ Weekly data:", weeklyData);

			// Test monthly data
			console.log("\n📈 Testing Monthly Data...");
			const monthlyData = await mockApiService.getMonthlyData("May");
			console.log("✅ Monthly data:", monthlyData);

			// Test all products
			console.log("\n🌾 Testing All Products...");
			const allProducts = await mockApiService.getAllProducts();
			console.log("✅ All products:", allProducts);

			// Test add product
			console.log("\n➕ Testing Add Product...");
			const newProduct = testHelpers.generateRandomProduct();
			const addedProduct = await mockApiService.addProduct(newProduct);
			console.log("✅ Added product:", addedProduct);

			// Test products by category
			console.log("\n🥬 Testing Products by Category...");
			const vegetableProducts = await mockApiService.getProductsByCategory(
				"Vegetables"
			);
			console.log("✅ Vegetable products:", vegetableProducts);

			console.log("\n🎉 All tests completed successfully!");
		} catch (error) {
			console.error("❌ Test failed:", error);
		}
	},
};
