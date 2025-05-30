// "use client";

// import { useEffect, useState } from "react";
// import ProductsGrid from "@/components/marketplace/product-grid"; // Adjust import path
// import { productService, Product } from "@/service/productService"; // Adjust import path
// import { SearchProvider } from "@/components/context/SearchContext"; // Add SearchContext import
// import { CartProvider } from "@/components/context/CardContext"; // Adjust import path

// // Transform Product to match ProductsGrid interface
// interface GridProduct {
// 	id: string;
// 	title: string;
// 	description: string;
// 	location: string;
// 	token?: string;
// 	price: string;
// 	image: string;
// }

// export default function MarketplacePage() {
// 	const [products, setProducts] = useState<GridProduct[]>([]);
// 	const [isLoading, setIsLoading] = useState(true);
// 	const [error, setError] = useState<string | null>(null);

// 	useEffect(() => {
// 		const fetchProducts = async () => {
// 			try {
// 				const fetchedProducts = await productService.getAllProducts();

// 				// Transform products to match ProductsGrid interface
// 				const transformedProducts: GridProduct[] = fetchedProducts.map(
// 					(product: Product) => ({
// 						id: product._id,
// 						title: product.productName,
// 						description: product.description,
// 						location: product.location,
// 						price: `₦${product.priceNGN}`,
// 						image: product.images[0] || "/placeholder-image.jpg",
// 						// Add token if available in your Product interface
// 						// token: product.token || undefined,
// 					})
// 				);

// 				setProducts(transformedProducts);
// 			} catch (err) {
// 				console.error("Error fetching products:", err);
// 				setError("Failed to load products");
// 			} finally {
// 				setIsLoading(false);
// 			}
// 		};

// 		fetchProducts();
// 	}, []);

// 	if (isLoading) {
// 		return (
// 			<main className='min-h-screen flex items-center justify-center'>
// 				<div className='animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500'></div>
// 			</main>
// 		);
// 	}

// 	if (error) {
// 		return (
// 			<main className='min-h-screen flex items-center justify-center'>
// 				<div className='text-center'>
// 					<h2 className='text-xl font-semibold text-red-600 mb-2'>Error</h2>
// 					<p className='text-gray-600'>{error}</p>
// 					<button
// 						onClick={() => window.location.reload()}
// 						className='mt-4 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600'>
// 						Try Again
// 					</button>
// 				</div>
// 			</main>
// 		);
// 	}

// 	return (
// 		<CartProvider>
// 			<SearchProvider>
// 				<main className='min-h-screen py-6'>
// 					<div className='max-w-7xl mx-auto'>
// 						<div className='px-4 sm:px-6 lg:px-8 mb-8'>
// 							<h1 className='text-3xl font-bold text-gray-900'>Marketplace</h1>
// 						</div>

// 						{!isLoading && products.length === 0 && !error ? (
// 							<div className='text-center py-12'>
// 								<h2 className='text-xl font-semibold text-gray-600 mb-2'>
// 									No Products Available
// 								</h2>
// 								<p className='text-gray-500'>
// 									Check back later for new products!
// 								</p>
// 							</div>
// 						) : (
// 							<ProductsGrid
// 								products={products}
// 								title='' // Empty since we already have the main title
// 							/>
// 						)}
// 					</div>
// 				</main>
// 			</SearchProvider>
// 		</CartProvider>
// 	);
// }

"use client";

import { useEffect, useState } from "react";
import {
	Search,
	Filter,
	Grid,
	List,
	SlidersHorizontal,
	MapPin,
	Star,
	Heart,
	ShoppingCart,
	X,
	ChevronDown,
} from "lucide-react";
import ProductsGrid from "@/components/marketplace/product-grid";
import { productService, Product } from "@/service/productService";
import { SearchProvider } from "@/components/context/SearchContext";
import { CartProvider } from "@/components/context/CardContext";

// Transform Product to match ProductsGrid interface
interface GridProduct {
	id: string;
	title: string;
	description: string;
	location: string;
	token?: string;
	price: string;
	image: string;
	category?: string;
	rating?: number;
	priceValue?: number; // For sorting
}

export default function MarketplacePage() {
	const [products, setProducts] = useState<GridProduct[]>([]);
	const [filteredProducts, setFilteredProducts] = useState<GridProduct[]>([]);
	const [isLoading, setIsLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);

	// Filter states
	const [searchTerm, setSearchTerm] = useState("");
	const [selectedCategory, setSelectedCategory] = useState("all");
	const [priceRange, setPriceRange] = useState({ min: 0, max: 1000000 });
	const [selectedLocation, setSelectedLocation] = useState("all");
	const [sortBy, setSortBy] = useState("newest");
	const [showFilters, setShowFilters] = useState(false);
	const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

	// Derived data
	const [categories, setCategories] = useState<string[]>([]);
	const [locations, setLocations] = useState<string[]>([]);
	const [maxPrice, setMaxPrice] = useState(1000000);

	useEffect(() => {
		const fetchProducts = async () => {
			try {
				const fetchedProducts = await productService.getAllProducts();

				// Transform products to match ProductsGrid interface
				const transformedProducts: GridProduct[] = fetchedProducts.map(
					(product: Product) => ({
						id: product._id,
						title: product.productName,
						description: product.description,
						location: product.location,
						price: `₦${product.priceNGN?.toLocaleString()}`,
						priceValue: Number(product.priceNGN) || 0,
						image: product.images[0] || "/placeholder-image.jpg",
						category: product.category || "Other",
						rating: Math.random() * 2 + 3, // Mock rating for demo
					})
				);

				setProducts(transformedProducts);
				setFilteredProducts(transformedProducts);

				// Extract unique categories and locations
				const uniqueCategories = [
					...new Set(
						transformedProducts
							.map((p) => p.category)
							.filter((category): category is string => !!category)
					),
				];
				const uniqueLocations = [
					...new Set(
						transformedProducts.map((p) => p.location).filter(Boolean)
					),
				];
				const maxPriceValue = Math.max(
					...transformedProducts.map((p) => p.priceValue || 0)
				);

				setCategories(uniqueCategories);
				setLocations(uniqueLocations);
				setMaxPrice(maxPriceValue);
				setPriceRange({ min: 0, max: maxPriceValue });
			} catch (err) {
				console.error("Error fetching products:", err);
				setError("Failed to load products");
			} finally {
				setIsLoading(false);
			}
		};

		fetchProducts();
	}, []);

	// Filter products whenever filters change
	useEffect(() => {
		let filtered = [...products];

		// Search filter
		if (searchTerm.trim()) {
			const searchLower = searchTerm.toLowerCase();
			filtered = filtered.filter(
				(product) =>
					product.title.toLowerCase().includes(searchLower) ||
					product.description.toLowerCase().includes(searchLower) ||
					product.location.toLowerCase().includes(searchLower)
			);
		}

		// Category filter
		if (selectedCategory !== "all") {
			filtered = filtered.filter(
				(product) => product.category === selectedCategory
			);
		}

		// Location filter
		if (selectedLocation !== "all") {
			filtered = filtered.filter(
				(product) => product.location === selectedLocation
			);
		}

		// Price range filter
		filtered = filtered.filter((product) => {
			const price = product.priceValue || 0;
			return price >= priceRange.min && price <= priceRange.max;
		});

		// Sort products
		switch (sortBy) {
			case "price-low":
				filtered.sort((a, b) => (a.priceValue || 0) - (b.priceValue || 0));
				break;
			case "price-high":
				filtered.sort((a, b) => (b.priceValue || 0) - (a.priceValue || 0));
				break;
			case "rating":
				filtered.sort((a, b) => (b.rating || 0) - (a.rating || 0));
				break;
			case "name":
				filtered.sort((a, b) => a.title.localeCompare(b.title));
				break;
			default: // newest
				// Keep original order (newest first)
				break;
		}

		setFilteredProducts(filtered);
	}, [
		products,
		searchTerm,
		selectedCategory,
		selectedLocation,
		priceRange,
		sortBy,
	]);

	const clearFilters = () => {
		setSearchTerm("");
		setSelectedCategory("all");
		setSelectedLocation("all");
		setPriceRange({ min: 0, max: maxPrice });
		setSortBy("newest");
	};

	const activeFiltersCount = [
		searchTerm.trim() !== "",
		selectedCategory !== "all",
		selectedLocation !== "all",
		priceRange.min > 0 || priceRange.max < maxPrice,
	].filter(Boolean).length;

	if (isLoading) {
		return (
			<main className=' flex items-center justify-center bg-gray-50'>
				<div className='text-center'>
					<div className='animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500 mx-auto mb-4'></div>
					<p className='text-gray-600'>Loading marketplace...</p>
				</div>
			</main>
		);
	}

	if (error) {
		return (
			<main className=' flex items-center justify-center bg-gray-50'>
				<div className='text-center bg-white p-8 rounded-lg shadow-md'>
					<h2 className='text-xl font-semibold text-red-600 mb-2'>Error</h2>
					<p className='text-gray-600 mb-4'>{error}</p>
					<button
						onClick={() => window.location.reload()}
						className='px-6 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors'>
						Try Again
					</button>
				</div>
			</main>
		);
	}

	return (
		<CartProvider>
			<SearchProvider>
				<main className=' bg-gray-50'>
					{/* Header Section */}
					<div className=' '>
						<div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6'>
							<div className='flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4'>
								<div>
									<h1 className='text-3xl font-bold text-gray-900'>
										Marketplace
									</h1>
									<p className='text-gray-600 mt-1'>
										Discover amazing products from local sellers
									</p>
								</div>

								{/* Search Bar */}
								<div className='relative max-w-md w-full'>
									<Search
										className='absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400'
										size={20}
									/>
									<input
										type='text'
										placeholder='Search products...'
										value={searchTerm}
										onChange={(e) => setSearchTerm(e.target.value)}
										className='w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition-all'
									/>
									{searchTerm && (
										<button
											onClick={() => setSearchTerm("")}
											className='absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600'>
											<X size={18} />
										</button>
									)}
								</div>
							</div>
						</div>
					</div>

					{/* Filters and Controls */}
					<div className=''>
						<div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4'>
							<div className='flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4'>
								{/* Filter Controls */}
								<div className='flex items-center gap-4 flex-wrap'>
									<button
										onClick={() => setShowFilters(!showFilters)}
										className={`flex items-center gap-2 px-4 py-2 rounded-lg border transition-all ${
											showFilters || activeFiltersCount > 0
												? "bg-green-50 border-green-200 text-green-700"
												: "bg-white border-gray-200 text-gray-700 hover:bg-gray-50"
										}`}>
										<Filter size={18} />
										<span>Filters</span>
										{activeFiltersCount > 0 && (
											<span className='bg-green-500 text-white text-xs rounded-full px-2 py-1 min-w-[20px] h-[20px] flex items-center justify-center'>
												{activeFiltersCount}
											</span>
										)}
									</button>

									{/* Quick Filters */}
									<select
										value={selectedCategory}
										onChange={(e) => setSelectedCategory(e.target.value)}
										className='px-3 py-2 border border-gray-200 rounded-lg bg-white text-sm focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none'>
										<option value='all'>All Categories</option>
										{categories.map((category) => (
											<option key={category} value={category}>
												{category}
											</option>
										))}
									</select>

									<select
										value={sortBy}
										onChange={(e) => setSortBy(e.target.value)}
										className='px-3 py-2 border border-gray-200 rounded-lg bg-white text-sm focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none'>
										<option value='newest'>Newest First</option>
										<option value='price-low'>Price: Low to High</option>
										<option value='price-high'>Price: High to Low</option>
										<option value='rating'>Highest Rated</option>
										<option value='name'>A to Z</option>
									</select>

									{activeFiltersCount > 0 && (
										<button
											onClick={clearFilters}
											className='text-sm text-gray-600 hover:text-red-600 transition-colors'>
											Clear all filters
										</button>
									)}
								</div>

								{/* View Mode and Results */}
								<div className='flex items-center gap-4'>
									<span className='text-sm text-gray-600'>
										{filteredProducts.length} product
										{filteredProducts.length !== 1 ? "s" : ""}
									</span>

									<div className='flex items-center bg-gray-100 rounded-lg p-1'>
										<button
											onClick={() => setViewMode("grid")}
											className={`p-2 rounded-md transition-all ${
												viewMode === "grid"
													? "bg-white text-green-600 shadow-sm"
													: "text-gray-600"
											}`}>
											<Grid size={18} />
										</button>
										<button
											onClick={() => setViewMode("list")}
											className={`p-2 rounded-md transition-all ${
												viewMode === "list"
													? "bg-white text-green-600 shadow-sm"
													: "text-gray-600"
											}`}>
											<List size={18} />
										</button>
									</div>
								</div>
							</div>

							{/* Expanded Filters */}
							{showFilters && (
								<div className='mt-4 p-4 bg-gray-50 rounded-lg border'>
									<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4'>
										{/* Location Filter */}
										<div>
											<label className='block text-sm font-medium text-gray-700 mb-2'>
												<MapPin size={16} className='inline mr-1' />
												Location
											</label>
											<select
												value={selectedLocation}
												onChange={(e) => setSelectedLocation(e.target.value)}
												className='w-full px-3 py-2 border border-gray-200 rounded-lg bg-white text-sm focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none'>
												<option value='all'>All Locations</option>
												{locations.map((location) => (
													<option key={location} value={location}>
														{location}
													</option>
												))}
											</select>
										</div>

										{/* Price Range */}
										<div>
											<label className='block text-sm font-medium text-gray-700 mb-2'>
												Price Range
											</label>
											<div className='space-y-2'>
												<div className='flex gap-2'>
													<input
														type='number'
														placeholder='Min'
														value={priceRange.min}
														onChange={(e) =>
															setPriceRange((prev) => ({
																...prev,
																min: Number(e.target.value) || 0,
															}))
														}
														className='w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none'
													/>
													<input
														type='number'
														placeholder='Max'
														value={priceRange.max}
														onChange={(e) =>
															setPriceRange((prev) => ({
																...prev,
																max: Number(e.target.value) || maxPrice,
															}))
														}
														className='w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none'
													/>
												</div>
												<div className='text-xs text-gray-500'>
													₦{priceRange.min.toLocaleString()} - ₦
													{priceRange.max.toLocaleString()}
												</div>
											</div>
										</div>

										{/* Additional filters can be added here */}
										<div className='md:col-span-2 flex items-end'>
											<button
												onClick={() => setShowFilters(false)}
												className='px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors'>
												Apply Filters
											</button>
										</div>
									</div>
								</div>
							)}
						</div>
					</div>

					{/* Products Section */}
					<div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8'>
						{filteredProducts.length === 0 ? (
							<div className='text-center py-16'>
								<div className='text-gray-400 mb-4'>
									<Search className='w-16 h-16 mx-auto' />
								</div>
								<h3 className='text-xl font-semibold text-gray-600 mb-2'>
									{searchTerm || activeFiltersCount > 0
										? "No products found"
										: "No products available"}
								</h3>
								<p className='text-gray-500 max-w-md mx-auto'>
									{searchTerm || activeFiltersCount > 0
										? `We couldn't find any products matching your criteria. Try adjusting your filters or search terms.`
										: "Check back later for new products!"}
								</p>
								{(searchTerm || activeFiltersCount > 0) && (
									<button
										onClick={clearFilters}
										className='mt-4 px-6 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors'>
										Clear Filters
									</button>
								)}
							</div>
						) : (
							<div className={viewMode === "grid" ? "" : "space-y-4"}>
								<ProductsGrid products={filteredProducts} />
							</div>
						)}
					</div>
				</main>
			</SearchProvider>
		</CartProvider>
	);
}
