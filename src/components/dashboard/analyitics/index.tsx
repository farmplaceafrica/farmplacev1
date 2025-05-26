// "use client";
// import React, { useState } from "react";
// import { ChevronDown } from "lucide-react";
// import { Cell, PieChart, Pie, ResponsiveContainer } from "recharts";

// interface OverviewCardProps {
// 	title: string;
// 	value: number;
// 	label: string;
// 	productType: string;
// 	timeframe: string;
// 	onTimeframeChange: (value: string) => void;
// 	timeframeOptions: string[];
// }

// interface MostBoughtProductProps {
// 	title: string;
// 	timeframe: string;
// 	onTimeframeChange: (value: string) => void;
// 	timeframeOptions: string[];
// }

// const OverviewCard: React.FC<OverviewCardProps> = ({
// 	title,
// 	value,
// 	label,
// 	productType,
// 	timeframe,
// 	onTimeframeChange,
// 	timeframeOptions,
// }) => {
// 	const [isOpen, setIsOpen] = useState(false);

// 	return (
// 		<div className='bg-white rounded-lg border border-gray-200 p-6'>
// 			<div className='flex justify-between items-center mb-6'>
// 				<h3 className='text-gray-600 font-medium'>{title}</h3>
// 				<div className='relative'>
// 					<button
// 						onClick={() => setIsOpen(!isOpen)}
// 						className='flex items-center gap-1 text-gray-600 text-sm'>
// 						{timeframe}
// 						<ChevronDown className='w-4 h-4' />
// 					</button>
// 					{isOpen && (
// 						<div className='absolute right-0 top-full mt-1 bg-white border border-gray-200 rounded-md shadow-lg z-10'>
// 							{timeframeOptions.map((option) => (
// 								<button
// 									key={option}
// 									onClick={() => {
// 										onTimeframeChange(option);
// 										setIsOpen(false);
// 									}}
// 									className='block w-full text-left px-3 py-2 text-sm text-gray-600 hover:bg-gray-50'>
// 									{option}
// 								</button>
// 							))}
// 						</div>
// 					)}
// 				</div>
// 			</div>

// 			<div className='mb-6'>
// 				<div className='text-3xl font-normal text-gray-900 mb-1'>{value}</div>
// 				<div className='text-gray-500 text-sm'>{label}</div>
// 			</div>

// 			<div>
// 				<div className='text-gray-600 text-sm mb-2'>Product Type</div>
// 				<span className='inline-block bg-green-600 text-white text-xs px-3 py-1 rounded'>
// 					{productType}
// 				</span>
// 			</div>
// 		</div>
// 	);
// };

// const MostBoughtProduct: React.FC<MostBoughtProductProps> = ({
// 	title,
// 	timeframe,
// 	onTimeframeChange,
// 	timeframeOptions,
// }) => {
// 	const [isOpen, setIsOpen] = useState(false);

// 	const data = [
// 		{ name: "Blue", value: 25, color: "#3b82f6" },
// 		{ name: "Light Blue", value: 25, color: "#60a5fa" },
// 		{ name: "Cyan", value: 25, color: "#06b6d4" },
// 		{ name: "Red", value: 25, color: "#ef4444" },
// 	];

// 	const products = [
// 		{ name: "none", color: "#3b82f6", percentage: "0%" },
// 		{ name: "none", color: "#60a5fa", percentage: "0%" },
// 		{ name: "none", color: "#06b6d4", percentage: "0%" },
// 		{ name: "none", color: "#ef4444", percentage: "0%" },
// 	];

// 	return (
// 		<div className='bg-white rounded-lg border border-gray-200 p-6'>
// 			<div className='flex justify-between items-center mb-6'>
// 				<h3 className='text-gray-600 font-medium'>{title}</h3>
// 				<div className='relative'>
// 					<button
// 						onClick={() => setIsOpen(!isOpen)}
// 						className='flex items-center gap-1 text-gray-600 text-sm'>
// 						{timeframe}
// 						<ChevronDown className='w-4 h-4' />
// 					</button>
// 					{isOpen && (
// 						<div className='absolute right-0 top-full mt-1 bg-white border border-gray-200 rounded-md shadow-lg z-10'>
// 							{timeframeOptions.map((option) => (
// 								<button
// 									key={option}
// 									onClick={() => {
// 										onTimeframeChange(option);
// 										setIsOpen(false);
// 									}}
// 									className='block w-full text-left px-3 py-2 text-sm text-gray-600 hover:bg-gray-50'>
// 									{option}
// 								</button>
// 							))}
// 						</div>
// 					)}
// 				</div>
// 			</div>

// 			<div className='flex items-center'>
// 				<div className='flex-1'>
// 					{products.map((product, index) => (
// 						<div key={index} className='flex items-center justify-between mb-3'>
// 							<div className='flex items-center gap-2'>
// 								<div
// 									className='w-3 h-3 rounded-full'
// 									style={{ backgroundColor: product.color }}></div>
// 								<span className='text-gray-600 text-sm'>{product.name}</span>
// 							</div>
// 							<span className='text-gray-600 text-sm'>
// 								{product.percentage}
// 							</span>
// 						</div>
// 					))}
// 				</div>

// 				<div className='w-24 h-24 ml-4'>
// 					<ResponsiveContainer width='100%' height='100%'>
// 						<PieChart>
// 							<Pie
// 								data={data}
// 								cx='50%'
// 								cy='50%'
// 								innerRadius={25}
// 								outerRadius={40}
// 								paddingAngle={2}
// 								dataKey='value'>
// 								{data.map((entry, index) => (
// 									<Cell key={`cell-${index}`} fill={entry.color} />
// 								))}
// 							</Pie>
// 						</PieChart>
// 					</ResponsiveContainer>
// 				</div>
// 			</div>
// 		</div>
// 	);
// };

// const Analytics: React.FC = () => {
// 	const [dailyTimeframes, setDailyTimeframes] = useState({
// 		uploadedProducts: "Today",
// 		salesOverview: "Today",
// 		mostBought: "Today",
// 	});

// 	const [weeklyTimeframes, setWeeklyTimeframes] = useState({
// 		uploadedProducts: "This week",
// 		salesOverview: "This week",
// 		mostBought: "This week",
// 	});

// 	const [monthlyTimeframes, setMonthlyTimeframes] = useState({
// 		productOverview: "May",
// 		salesOverview: "May",
// 		mostBought: "May",
// 	});

// 	const dailyOptions = ["Today", "Yesterday"];
// 	const weeklyOptions = ["This week", "Last week"];
// 	const monthlyOptions = ["May", "April", "March"];

// 	return (
// 		<div className='bg-gray-50 min-h-screen p-8'>
// 			<div className='max-w-7xl mx-auto space-y-8'>
// 				{/* Daily Overview */}
// 				<section className='bg-white border rounded-3xl border-[#DADADA] p-10'>
// 					<h2 className='text-xl font-semibold text-gray-900 mb-6'>
// 						Daily Overview
// 					</h2>
// 					<div className='grid  grid-cols-1 md:grid-cols-3 gap-6'>
// 						<OverviewCard
// 							title='Uploaded Products'
// 							value={0}
// 							label='Products'
// 							productType='None'
// 							timeframe={dailyTimeframes.uploadedProducts}
// 							onTimeframeChange={(value) =>
// 								setDailyTimeframes((prev) => ({
// 									...prev,
// 									uploadedProducts: value,
// 								}))
// 							}
// 							timeframeOptions={dailyOptions}
// 						/>
// 						<OverviewCard
// 							title='Sales overview'
// 							value={0}
// 							label='Total sales'
// 							productType='None'
// 							timeframe={dailyTimeframes.salesOverview}
// 							onTimeframeChange={(value) =>
// 								setDailyTimeframes((prev) => ({
// 									...prev,
// 									salesOverview: value,
// 								}))
// 							}
// 							timeframeOptions={dailyOptions}
// 						/>
// 						<MostBoughtProduct
// 							title='Most Bought product'
// 							timeframe={dailyTimeframes.mostBought}
// 							onTimeframeChange={(value) =>
// 								setDailyTimeframes((prev) => ({ ...prev, mostBought: value }))
// 							}
// 							timeframeOptions={dailyOptions}
// 						/>
// 					</div>
// 				</section>

// 				{/* Weekly Overview */}
// 				<section>
// 					<h2 className='text-xl font-semibold text-gray-900 mb-6'>
// 						Weekly Overview
// 					</h2>
// 					<div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
// 						<OverviewCard
// 							title='Uploaded products'
// 							value={0}
// 							label='Products'
// 							productType='None'
// 							timeframe={weeklyTimeframes.uploadedProducts}
// 							onTimeframeChange={(value) =>
// 								setWeeklyTimeframes((prev) => ({
// 									...prev,
// 									uploadedProducts: value,
// 								}))
// 							}
// 							timeframeOptions={weeklyOptions}
// 						/>
// 						<OverviewCard
// 							title='Sales overview'
// 							value={0}
// 							label='Total sales'
// 							productType='None'
// 							timeframe={weeklyTimeframes.salesOverview}
// 							onTimeframeChange={(value) =>
// 								setWeeklyTimeframes((prev) => ({
// 									...prev,
// 									salesOverview: value,
// 								}))
// 							}
// 							timeframeOptions={weeklyOptions}
// 						/>
// 						<MostBoughtProduct
// 							title='Most Bought product'
// 							timeframe={weeklyTimeframes.mostBought}
// 							onTimeframeChange={(value) =>
// 								setWeeklyTimeframes((prev) => ({ ...prev, mostBought: value }))
// 							}
// 							timeframeOptions={weeklyOptions}
// 						/>
// 					</div>
// 				</section>

// 				{/* Monthly Overview */}
// 				<section>
// 					<h2 className='text-xl font-semibold text-gray-900 mb-6'>
// 						Monthly Overview
// 					</h2>
// 					<div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
// 						<OverviewCard
// 							title='Product Overview'
// 							value={0}
// 							label='Products'
// 							productType='None'
// 							timeframe={monthlyTimeframes.productOverview}
// 							onTimeframeChange={(value) =>
// 								setMonthlyTimeframes((prev) => ({
// 									...prev,
// 									productOverview: value,
// 								}))
// 							}
// 							timeframeOptions={monthlyOptions}
// 						/>
// 						<OverviewCard
// 							title='Sales overview'
// 							value={0}
// 							label='Total sales'
// 							productType='None'
// 							timeframe={monthlyTimeframes.salesOverview}
// 							onTimeframeChange={(value) =>
// 								setMonthlyTimeframes((prev) => ({
// 									...prev,
// 									salesOverview: value,
// 								}))
// 							}
// 							timeframeOptions={monthlyOptions}
// 						/>
// 						<MostBoughtProduct
// 							title='Most Bought product'
// 							timeframe={monthlyTimeframes.mostBought}
// 							onTimeframeChange={(value) =>
// 								setMonthlyTimeframes((prev) => ({ ...prev, mostBought: value }))
// 							}
// 							timeframeOptions={monthlyOptions}
// 						/>
// 					</div>
// 				</section>
// 			</div>
// 		</div>
// 	);
// };

// export default Analytics

"use client";

import React, { useState, useEffect } from "react";
import { ChevronDown } from "lucide-react";
import { Cell, PieChart, Pie, ResponsiveContainer } from "recharts";

// Types for API responses
interface DashboardData {
	uploadedProducts: number;
	totalSales: number;
	productTypes: string[];
	mostBoughtProducts: ProductData[];
}

interface ProductData {
	name: string;
	percentage: number;
	color: string;
}

interface ApiResponse<T> {
	data: T;
	success: boolean;
	message?: string;
}

// Component props
interface OverviewCardProps {
	title: string;
	value: number;
	label: string;
	productType: string;
	timeframe: string;
	onTimeframeChange: (value: string) => void;
	timeframeOptions: string[];
	loading?: boolean;
}

interface MostBoughtProductProps {
	title: string;
	timeframe: string;
	onTimeframeChange: (value: string) => void;
	timeframeOptions: string[];
	data: ProductData[];
	loading?: boolean;
}

const OverviewCard: React.FC<OverviewCardProps> = ({
	title,
	value,
	label,
	productType,
	timeframe,
	onTimeframeChange,
	timeframeOptions,
	loading = false,
}) => {
	const [isOpen, setIsOpen] = useState(false);

	return (
		<div className='bg-white rounded-xl border border-[#C9E7CB] p-6'>
			<div className='flex justify-between items-center mb-6'>
				<h3 className='text-gray-600 font-medium'>{title}</h3>
				<div className='relative border border-[#EDF7EE] p-1 rounded-2xl'>
					<button
						onClick={() => setIsOpen(!isOpen)}
						className='flex items-center gap-1 text-gray-600 text-sm'
						disabled={loading}>
						{timeframe}
						<ChevronDown className='w-4 h-4' />
					</button>
					{isOpen && (
						<div className='absolute right-0 top-full mt-1 bg-white border border-gray-200 rounded-md shadow-lg z-10'>
							{timeframeOptions.map((option) => (
								<button
									key={option}
									onClick={() => {
										onTimeframeChange(option);
										setIsOpen(false);
									}}
									className='block w-full text-left px-3 py-2 text-sm text-gray-600 hover:bg-gray-50'>
									{option}
								</button>
							))}
						</div>
					)}
				</div>
			</div>

			<div className='mb-6'>
				{loading ? (
					<div className='animate-pulse'>
						<div className='h-8 bg-gray-200 rounded w-16 mb-2'></div>
						<div className='h-4 bg-gray-200 rounded w-20'></div>
					</div>
				) : (
					<>
						<div className='text-3xl font-normal text-gray-900 mb-1'>
							{value}
						</div>
						<div className='text-gray-500 text-sm'>{label}</div>
					</>
				)}
			</div>

			<div>
				<div className='text-gray-600 text-sm mb-2'>Product Type</div>
				{loading ? (
					<div className='h-6 bg-gray-200 rounded w-16 animate-pulse'></div>
				) : (
					<span className='inline-block bg-green-600 text-white text-xs px-3 py-1 rounded'>
						{productType}
					</span>
				)}
			</div>
		</div>
	);
};

const MostBoughtProduct: React.FC<MostBoughtProductProps> = ({
	title,
	timeframe,
	onTimeframeChange,
	timeframeOptions,
	data = [],
	loading = false,
}) => {
	const [isOpen, setIsOpen] = useState(false);

	const chartData = data.map((item) => ({
		name: item.name,
		value: item.percentage,
		color: item.color,
	}));

	return (
		<div className='bg-white rounded-xl border border-[#C9E7CB] p-6'>
			<div className='flex justify-between items-center mb-6'>
				<h3 className='text-gray-600 font-medium'>{title}</h3>
				<div className='relative  border border-[#EDF7EE] p-1 rounded-2xl'>
					<button
						onClick={() => setIsOpen(!isOpen)}
						className='flex items-center gap-1 text-gray-600 text-sm'
						disabled={loading}>
						{timeframe}
						<ChevronDown className='w-4 h-4' />
					</button>
					{isOpen && (
						<div className='absolute right-0 top-full mt-1 bg-white border border-gray-200 rounded-md shadow-lg z-10'>
							{timeframeOptions.map((option) => (
								<button
									key={option}
									onClick={() => {
										onTimeframeChange(option);
										setIsOpen(false);
									}}
									className='block w-full text-left px-3 py-2 text-sm text-gray-600 hover:bg-gray-50'>
									{option}
								</button>
							))}
						</div>
					)}
				</div>
			</div>

			<div className='flex items-center'>
				<div className='flex-1'>
					{loading
						? Array.from({ length: 4 }).map((_, index) => (
								<div
									key={index}
									className='flex items-center justify-between mb-3'>
									<div className='flex items-center gap-2'>
										<div className='w-3 h-3 bg-gray-200 rounded-full animate-pulse'></div>
										<div className='h-4 bg-gray-200 rounded w-12 animate-pulse'></div>
									</div>
									<div className='h-4 bg-gray-200 rounded w-8 animate-pulse'></div>
								</div>
						  ))
						: data.length > 0
						? data.map((product, index) => (
								<div
									key={index}
									className='flex items-center justify-between mb-3'>
									<div className='flex items-center gap-2'>
										<div
											className='w-3 h-3 rounded-full'
											style={{ backgroundColor: product.color }}></div>
										<span className='text-gray-600 text-sm'>
											{product.name}
										</span>
									</div>
									<span className='text-gray-600 text-sm'>
										{product.percentage}%
									</span>
								</div>
						  ))
						: Array.from({ length: 4 }).map((_, index) => (
								<div
									key={index}
									className='flex items-center justify-between mb-3'>
									<div className='flex items-center gap-2'>
										<div
											className='w-3 h-3 rounded-full'
											style={{
												backgroundColor: [
													"#3b82f6",
													"#60a5fa",
													"#06b6d4",
													"#ef4444",
												][index],
											}}></div>
										<span className='text-gray-600 text-sm'>none</span>
									</div>
									<span className='text-gray-600 text-sm'>0%</span>
								</div>
						  ))}
				</div>

				<div className='w-24 h-24 ml-4'>
					{loading ? (
						<div className='w-full h-full bg-gray-200 rounded-full animate-pulse'></div>
					) : (
						<ResponsiveContainer width='100%' height='100%'>
							<PieChart>
								<Pie
									data={
										chartData.length > 0
											? chartData
											: [
													{ name: "Blue", value: 25, color: "#3b82f6" },
													{ name: "Light Blue", value: 25, color: "#60a5fa" },
													{ name: "Cyan", value: 25, color: "#06b6d4" },
													{ name: "Red", value: 25, color: "#ef4444" },
											  ]
									}
									cx='50%'
									cy='50%'
									innerRadius={25}
									outerRadius={40}
									paddingAngle={2}
									dataKey='value'>
									{(chartData.length > 0
										? chartData
										: [
												{ name: "Blue", value: 25, color: "#3b82f6" },
												{ name: "Light Blue", value: 25, color: "#60a5fa" },
												{ name: "Cyan", value: 25, color: "#06b6d4" },
												{ name: "Red", value: 25, color: "#ef4444" },
										  ]
									).map((entry, index) => (
										<Cell key={`cell-${index}`} fill={entry.color} />
									))}
								</Pie>
							</PieChart>
						</ResponsiveContainer>
					)}
				</div>
			</div>
		</div>
	);
};

const DashboardOverview: React.FC = () => {
	// State for timeframes
	const [dailyTimeframes, setDailyTimeframes] = useState({
		uploadedProducts: "Today",
		salesOverview: "Today",
		mostBought: "Today",
	});

	const [weeklyTimeframes, setWeeklyTimeframes] = useState({
		uploadedProducts: "This week",
		salesOverview: "This week",
		mostBought: "This week",
	});

	const [monthlyTimeframes, setMonthlyTimeframes] = useState({
		productOverview: "May",
		salesOverview: "May",
		mostBought: "May",
	});

	// State for API data
	const [dailyData, setDailyData] = useState<DashboardData>({
		uploadedProducts: 0,
		totalSales: 0,
		productTypes: ["None"],
		mostBoughtProducts: [],
	});

	const [weeklyData, setWeeklyData] = useState<DashboardData>({
		uploadedProducts: 0,
		totalSales: 0,
		productTypes: ["None"],
		mostBoughtProducts: [],
	});

	const [monthlyData, setMonthlyData] = useState<DashboardData>({
		uploadedProducts: 0,
		totalSales: 0,
		productTypes: ["None"],
		mostBoughtProducts: [],
	});

	// Loading states
	const [loading, setLoading] = useState({
		daily: false,
		weekly: false,
		monthly: false,
	});

	const dailyOptions = ["Today", "Yesterday"];
	const weeklyOptions = ["This week", "Last week"];
	const monthlyOptions = ["May", "April", "March"];

	// API functions (to be implemented)
	const fetchDailyData = async (timeframe: string) => {
		setLoading((prev) => ({ ...prev, daily: true }));
		try {
			// Replace with your actual API call
			// const response = await fetch(`/api/dashboard/daily?timeframe=${timeframe}`);
			// const result: ApiResponse<DashboardData> = await response.json();
			// setDailyData(result.data);

			// Mock delay for demonstration
			await new Promise((resolve) => setTimeout(resolve, 1000));
		} catch (error) {
			console.error("Error fetching daily data:", error);
		} finally {
			setLoading((prev) => ({ ...prev, daily: false }));
		}
	};

	const fetchWeeklyData = async (timeframe: string) => {
		setLoading((prev) => ({ ...prev, weekly: true }));
		try {
			// Replace with your actual API call
			// const response = await fetch(`/api/dashboard/weekly?timeframe=${timeframe}`);
			// const result: ApiResponse<DashboardData> = await response.json();
			// setWeeklyData(result.data);

			// Mock delay for demonstration
			await new Promise((resolve) => setTimeout(resolve, 1000));
		} catch (error) {
			console.error("Error fetching weekly data:", error);
		} finally {
			setLoading((prev) => ({ ...prev, weekly: false }));
		}
	};

	const fetchMonthlyData = async (timeframe: string) => {
		setLoading((prev) => ({ ...prev, monthly: true }));
		try {
			// Replace with your actual API call
			// const response = await fetch(`/api/dashboard/monthly?timeframe=${timeframe}`);
			// const result: ApiResponse<DashboardData> = await response.json();
			// setMonthlyData(result.data);

			// Mock delay for demonstration
			await new Promise((resolve) => setTimeout(resolve, 1000));
		} catch (error) {
			console.error("Error fetching monthly data:", error);
		} finally {
			setLoading((prev) => ({ ...prev, monthly: false }));
		}
	};

	// Effect hooks for initial data loading
	useEffect(() => {
		fetchDailyData(dailyTimeframes.uploadedProducts);
		fetchWeeklyData(weeklyTimeframes.uploadedProducts);
		fetchMonthlyData(monthlyTimeframes.productOverview);
	}, []);

	// Handlers for timeframe changes
	const handleDailyTimeframeChange = (
		key: keyof typeof dailyTimeframes,
		value: string
	) => {
		setDailyTimeframes((prev) => ({ ...prev, [key]: value }));
		fetchDailyData(value);
	};

	const handleWeeklyTimeframeChange = (
		key: keyof typeof weeklyTimeframes,
		value: string
	) => {
		setWeeklyTimeframes((prev) => ({ ...prev, [key]: value }));
		fetchWeeklyData(value);
	};

	const handleMonthlyTimeframeChange = (
		key: keyof typeof monthlyTimeframes,
		value: string
	) => {
		setMonthlyTimeframes((prev) => ({ ...prev, [key]: value }));
		fetchMonthlyData(value);
	};

	return (
		<div className='bg-gray-50 min-h-screen p-8'>
			<div className='max-w-7xl mx-auto space-y-8'>
				{/* Daily Overview */}
				<section className='bg-white border border-[#DADADA] p-5 rounded-3xl'>
					<h2 className='text-xl font-semibold text-gray-900 mb-6'>
						Daily Overview
					</h2>
					<div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
						<OverviewCard
							title='Uploaded Products'
							value={dailyData.uploadedProducts}
							label='Products'
							productType={dailyData.productTypes[0] || "None"}
							timeframe={dailyTimeframes.uploadedProducts}
							onTimeframeChange={(value) =>
								handleDailyTimeframeChange("uploadedProducts", value)
							}
							timeframeOptions={dailyOptions}
							loading={loading.daily}
						/>
						<OverviewCard
							title='Sales overview'
							value={monthlyData.totalSales}
							label='Total sales'
							productType={monthlyData.productTypes[0] || "None"}
							timeframe={monthlyTimeframes.salesOverview}
							onTimeframeChange={(value) =>
								handleMonthlyTimeframeChange("salesOverview", value)
							}
							timeframeOptions={monthlyOptions}
							loading={loading.monthly}
						/>
						<MostBoughtProduct
							title='Most Bought product'
							timeframe={monthlyTimeframes.mostBought}
							onTimeframeChange={(value) =>
								handleMonthlyTimeframeChange("mostBought", value)
							}
							timeframeOptions={monthlyOptions}
							data={monthlyData.mostBoughtProducts}
							loading={loading.monthly}
						/>
					</div>
				</section>

				{/* Weekly Overview */}
				<section className='bg-white border border-[#DADADA] p-5 rounded-3xl'>
					<h2 className='text-xl font-semibold text-gray-900 mb-6'>
						Weekly Overview
					</h2>
					<div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
						<OverviewCard
							title='Uploaded products'
							value={weeklyData.uploadedProducts}
							label='Products'
							productType={weeklyData.productTypes[0] || "None"}
							timeframe={weeklyTimeframes.uploadedProducts}
							onTimeframeChange={(value) =>
								handleWeeklyTimeframeChange("uploadedProducts", value)
							}
							timeframeOptions={weeklyOptions}
							loading={loading.weekly}
						/>
						<OverviewCard
							title='Sales overview'
							value={weeklyData.totalSales}
							label='Total sales'
							productType={weeklyData.productTypes[0] || "None"}
							timeframe={weeklyTimeframes.salesOverview}
							onTimeframeChange={(value) =>
								handleWeeklyTimeframeChange("salesOverview", value)
							}
							timeframeOptions={weeklyOptions}
							loading={loading.weekly}
						/>
						<MostBoughtProduct
							title='Most Bought product'
							timeframe={weeklyTimeframes.mostBought}
							onTimeframeChange={(value) =>
								handleWeeklyTimeframeChange("mostBought", value)
							}
							timeframeOptions={weeklyOptions}
							data={weeklyData.mostBoughtProducts}
							loading={loading.weekly}
						/>
					</div>
				</section>

				{/* Monthly Overview */}
				<section className='bg-white border border-[#DADADA] p-5 rounded-3xl'>
					<h2 className='text-xl font-semibold text-gray-900 mb-6'>
						Monthly Overview
					</h2>
					<div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
						<OverviewCard
							title='Product Overview'
							value={monthlyData.uploadedProducts}
							label='Products'
							productType={monthlyData.productTypes[0] || "None"}
							timeframe={monthlyTimeframes.productOverview}
							onTimeframeChange={(value) =>
								handleMonthlyTimeframeChange("productOverview", value)
							}
							timeframeOptions={monthlyOptions}
							loading={loading.monthly}
						/>
						<OverviewCard
							title='Sales overview'
							value={monthlyData.totalSales}
							label='Total sales'
							productType={monthlyData.productTypes[0] || "None"}
							timeframe={monthlyTimeframes.salesOverview}
							onTimeframeChange={(value) =>
								handleMonthlyTimeframeChange("salesOverview", value)
							}
							timeframeOptions={monthlyOptions}
							loading={loading.monthly}
						/>
						<MostBoughtProduct
							title='Most Bought product'
							timeframe={monthlyTimeframes.mostBought}
							onTimeframeChange={(value) =>
								handleMonthlyTimeframeChange("mostBought", value)
							}
							timeframeOptions={monthlyOptions}
							data={monthlyData.mostBoughtProducts}
							loading={loading.monthly}
						/>
					</div>
				</section>
			</div>
		</div>
		//          title="Sales overview"
		//           value={0}
		//           label="Total sales"
		//           productType="None"
		//           timeframe={monthlyTimeframes.salesOverview}
		//           onTimeframeChange={(value) => setMonthlyTimeframes(prev => ({ ...prev, salesOverview: value }))}
		//           timeframeOptions={monthlyOptions}
		//         />
		//         <MostBoughtProduct
		//           title="Most Bought product"
		//           timeframe={monthlyTimeframes.mostBought}
		//           onTimeframeChange={(value) => setMonthlyTimeframes(prev => ({ ...prev, mostBought: value }))}
		//           timeframeOptions={monthlyOptions}
		//         />
		//       </div>
		//     </section>
		//   </div>
		// </div>
	);
};

export default DashboardOverview;
