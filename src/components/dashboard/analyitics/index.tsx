"use client";

import React, { useState, useEffect } from "react";
import {
	ChevronDown,
	Download,
	FileText,
	Database,
	FileSpreadsheet,
} from "lucide-react";
import { Cell, PieChart, Pie, ResponsiveContainer } from "recharts";
import {
	mockApiService,
	DashboardData,
	ProductData,
	ApiResponse,
	FarmProduct,
} from "./data";

// Component props - using imported types
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

interface DownloadButtonProps {
	dailyData: DashboardData;
	weeklyData: DashboardData;
	monthlyData: DashboardData;
	dailyTimeframes: any;
	weeklyTimeframes: any;
	monthlyTimeframes: any;
}

// Download utilities
const downloadUtils = {
	// Convert data to CSV format
	convertToCSV: (data: any[], headers: string[]): string => {
		const csvContent = [
			headers.join(","),
			...data.map((row) =>
				headers
					.map((header) =>
						typeof row[header] === "string" && row[header].includes(",")
							? `"${row[header]}"`
							: row[header]
					)
					.join(",")
			),
		].join("\n");
		return csvContent;
	},

	// Download file
	downloadFile: (content: string, filename: string, contentType: string) => {
		const blob = new Blob([content], { type: contentType });
		const url = window.URL.createObjectURL(blob);
		const link = document.createElement("a");
		link.href = url;
		link.download = filename;
		document.body.appendChild(link);
		link.click();
		document.body.removeChild(link);
		window.URL.revokeObjectURL(url);
	},

	// Generate comprehensive dashboard report
	generateDashboardReport: (
		dailyData: DashboardData,
		weeklyData: DashboardData,
		monthlyData: DashboardData,
		timeframes: any
	) => {
		const timestamp = new Date().toISOString().split("T")[0];

		return {
			exportDate: timestamp,
			summary: {
				daily: {
					timeframe: timeframes.daily,
					uploadedProducts: dailyData.uploadedProducts,
					totalSales: dailyData.totalSales,
					totalRevenue: dailyData.totalRevenue,
					productTypes: dailyData.productTypes,
				},
				weekly: {
					timeframe: timeframes.weekly,
					uploadedProducts: weeklyData.uploadedProducts,
					totalSales: weeklyData.totalSales,
					totalRevenue: weeklyData.totalRevenue,
					productTypes: weeklyData.productTypes,
				},
				monthly: {
					timeframe: timeframes.monthly,
					uploadedProducts: monthlyData.uploadedProducts,
					totalSales: monthlyData.totalSales,
					totalRevenue: monthlyData.totalRevenue,
					productTypes: monthlyData.productTypes,
				},
			},
			mostBoughtProducts: {
				daily: dailyData.mostBoughtProducts,
				weekly: weeklyData.mostBoughtProducts,
				monthly: monthlyData.mostBoughtProducts,
			},
			recentProducts: {
				daily: dailyData.recentProducts,
				weekly: weeklyData.recentProducts,
				monthly: monthlyData.recentProducts,
			},
		};
	},
};

const DownloadButton: React.FC<DownloadButtonProps> = ({
	dailyData,
	weeklyData,
	monthlyData,
	dailyTimeframes,
	weeklyTimeframes,
	monthlyTimeframes,
}) => {
	const [isOpen, setIsOpen] = useState(false);
	const [isDownloading, setIsDownloading] = useState(false);

	const handleDownload = async (format: "csv" | "json" | "pdf") => {
		setIsDownloading(true);
		const timestamp = new Date().toISOString().split("T")[0];

		try {
			if (format === "csv") {
				// Generate comprehensive CSV data
				const summaryData = [
					{
						Period: "Daily",
						Timeframe: dailyTimeframes.uploadedProducts,
						UploadedProducts: dailyData.uploadedProducts,
						TotalSales: dailyData.totalSales,
						TotalRevenue: dailyData.totalRevenue,
						ProductTypes: dailyData.productTypes.join("; "),
					},
					{
						Period: "Weekly",
						Timeframe: weeklyTimeframes.uploadedProducts,
						UploadedProducts: weeklyData.uploadedProducts,
						TotalSales: weeklyData.totalSales,
						TotalRevenue: weeklyData.totalRevenue,
						ProductTypes: weeklyData.productTypes.join("; "),
					},
					{
						Period: "Monthly",
						Timeframe: monthlyTimeframes.productOverview,
						UploadedProducts: monthlyData.uploadedProducts,
						TotalSales: monthlyData.totalSales,
						TotalRevenue: monthlyData.totalRevenue,
						ProductTypes: monthlyData.productTypes.join("; "),
					},
				];

				const summaryHeaders = [
					"Period",
					"Timeframe",
					"UploadedProducts",
					"TotalSales",
					"TotalRevenue",
					"ProductTypes",
				];
				let csvContent = "FARM DASHBOARD SUMMARY\n";
				csvContent += downloadUtils.convertToCSV(summaryData, summaryHeaders);

				// Add most bought products section
				csvContent += "\n\nMOST BOUGHT PRODUCTS\n";
				const allMostBought = [
					...dailyData.mostBoughtProducts.map((p) => ({
						...p,
						period: "Daily",
					})),
					...weeklyData.mostBoughtProducts.map((p) => ({
						...p,
						period: "Weekly",
					})),
					...monthlyData.mostBoughtProducts.map((p) => ({
						...p,
						period: "Monthly",
					})),
				];
				const productHeaders = [
					"period",
					"name",
					"percentage",
					"quantity",
					"unit",
				];
				csvContent += downloadUtils.convertToCSV(allMostBought, productHeaders);

				downloadUtils.downloadFile(
					csvContent,
					`farm-dashboard-${timestamp}.csv`,
					"text/csv"
				);
			} else if (format === "json") {
				const reportData = downloadUtils.generateDashboardReport(
					dailyData,
					weeklyData,
					monthlyData,
					{
						daily: dailyTimeframes.uploadedProducts,
						weekly: weeklyTimeframes.uploadedProducts,
						monthly: monthlyTimeframes.productOverview,
					}
				);

				const jsonContent = JSON.stringify(reportData, null, 2);
				downloadUtils.downloadFile(
					jsonContent,
					`farm-dashboard-${timestamp}.json`,
					"application/json"
				);
			} else if (format === "pdf") {
				// Generate HTML content for PDF-like report
				const htmlContent = `
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>Farm Dashboard Report</title>
    <style>
        body { font-family: Arial, sans-serif; margin: 20px; color: #333; }
        .header { text-align: center; margin-bottom: 30px; border-bottom: 2px solid #10b981; padding-bottom: 20px; }
        .section { margin-bottom: 30px; }
        .period-title { color: #10b981; font-size: 18px; font-weight: bold; margin-bottom: 15px; }
        .metric-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 15px; margin-bottom: 20px; }
        .metric-card { background: #f8f9fa; padding: 15px; border-radius: 8px; border-left: 4px solid #10b981; }
        .metric-value { font-size: 24px; font-weight: bold; color: #1f2937; }
        .metric-label { color: #6b7280; font-size: 14px; }
        .products-section { margin-top: 20px; }
        .product-item { display: flex; justify-content: space-between; padding: 8px 0; border-bottom: 1px solid #e5e7eb; }
        .export-info { text-align: center; margin-top: 40px; color: #6b7280; font-size: 12px; }
    </style>
</head>
<body>
    <div class="header">
        <h1>🌾 Farm Dashboard Report</h1>
        <p>Generated on ${new Date().toLocaleDateString()}</p>
    </div>

    <div class="section">
        <div class="period-title">📅 Daily Overview (${
					dailyTimeframes.uploadedProducts
				})</div>
        <div class="metric-grid">
            <div class="metric-card">
                <div class="metric-value">${dailyData.uploadedProducts}</div>
                <div class="metric-label">Uploaded Products</div>
            </div>
            <div class="metric-card">
                <div class="metric-value">${dailyData.totalSales}</div>
                <div class="metric-label">Total Sales</div>
            </div>
            <div class="metric-card">
                <div class="metric-value">$${dailyData.totalRevenue.toLocaleString()}</div>
                <div class="metric-label">Total Revenue</div>
            </div>
        </div>
        <div class="products-section">
            <h4>Most Bought Products</h4>
            ${dailyData.mostBoughtProducts
							.map(
								(product) => `
                <div class="product-item">
                    <span>${product.name}</span>
                    <span>${product.percentage}% (${product.quantity} ${product.unit})</span>
                </div>
            `
							)
							.join("")}
        </div>
    </div>

    <div class="section">
        <div class="period-title">📊 Weekly Overview (${
					weeklyTimeframes.uploadedProducts
				})</div>
        <div class="metric-grid">
            <div class="metric-card">
                <div class="metric-value">${weeklyData.uploadedProducts}</div>
                <div class="metric-label">Uploaded Products</div>
            </div>
            <div class="metric-card">
                <div class="metric-value">${weeklyData.totalSales}</div>
                <div class="metric-label">Total Sales</div>
            </div>
            <div class="metric-card">
                <div class="metric-value">$${weeklyData.totalRevenue.toLocaleString()}</div>
                <div class="metric-label">Total Revenue</div>
            </div>
        </div>
        <div class="products-section">
            <h4>Most Bought Products</h4>
            ${weeklyData.mostBoughtProducts
							.map(
								(product) => `
                <div class="product-item">
                    <span>${product.name}</span>
                    <span>${product.percentage}% (${product.quantity} ${product.unit})</span>
                </div>
            `
							)
							.join("")}
        </div>
    </div>

    <div class="section">
        <div class="period-title">📈 Monthly Overview (${
					monthlyTimeframes.productOverview
				})</div>
        <div class="metric-grid">
            <div class="metric-card">
                <div class="metric-value">${monthlyData.uploadedProducts}</div>
                <div class="metric-label">Uploaded Products</div>
            </div>
            <div class="metric-card">
                <div class="metric-value">${monthlyData.totalSales}</div>
                <div class="metric-label">Total Sales</div>
            </div>
            <div class="metric-card">
                <div class="metric-value">$${monthlyData.totalRevenue.toLocaleString()}</div>
                <div class="metric-label">Total Revenue</div>
            </div>
        </div>
        <div class="products-section">
            <h4>Most Bought Products</h4>
            ${monthlyData.mostBoughtProducts
							.map(
								(product) => `
                <div class="product-item">
                    <span>${product.name}</span>
                    <span>${product.percentage}% (${product.quantity} ${product.unit})</span>
                </div>
            `
							)
							.join("")}
        </div>
    </div>

    <div class="export-info">
        <p>This report contains farm dashboard data exported on ${timestamp}</p>
        <p>For best results, print this document or save as PDF using your browser's print function</p>
    </div>
</body>
</html>`;

				downloadUtils.downloadFile(
					htmlContent,
					`farm-dashboard-${timestamp}.html`,
					"text/html"
				);
			}
		} catch (error) {
			console.error("Download failed:", error);
		} finally {
			setIsDownloading(false);
			setIsOpen(false);
		}
	};

	return (
		<div className='relative'>
			<button
				onClick={() => setIsOpen(!isOpen)}
				disabled={isDownloading}
				className='bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors disabled:opacity-50'>
				<Download className='w-4 h-4' />
				{isDownloading ? "Downloading..." : "Download"}
			</button>

			{isOpen && (
				<div className='absolute right-0 top-full mt-2 bg-white border border-gray-200 rounded-lg shadow-lg z-50 min-w-48'>
					<div className='p-2'>
						<div className='text-sm font-medium text-gray-700 px-3 py-2 border-b border-gray-100'>
							Export Dashboard Data
						</div>
						<button
							onClick={() => handleDownload("csv")}
							disabled={isDownloading}
							className='flex items-center gap-3 w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded transition-colors'>
							<FileSpreadsheet className='w-4 h-4 text-green-600' />
							<div>
								<div className='font-medium'>CSV Format</div>
								<div className='text-xs text-gray-500'>
									Spreadsheet compatible
								</div>
							</div>
						</button>
						<button
							onClick={() => handleDownload("json")}
							disabled={isDownloading}
							className='flex items-center gap-3 w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded transition-colors'>
							<Database className='w-4 h-4 text-blue-600' />
							<div>
								<div className='font-medium'>JSON Format</div>
								<div className='text-xs text-gray-500'>Developer friendly</div>
							</div>
						</button>
						<button
							onClick={() => handleDownload("pdf")}
							disabled={isDownloading}
							className='flex items-center gap-3 w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded transition-colors'>
							<FileText className='w-4 h-4 text-red-600' />
							<div>
								<div className='font-medium'>Report (HTML)</div>
								<div className='text-xs text-gray-500'>Print-ready format</div>
							</div>
						</button>
					</div>
				</div>
			)}
		</div>
	);
};

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
		<div className='bg-white  rounded-2xl border border-[#C9E7CB] p-6'>
			<div className='flex justify-between items-center mb-6'>
				<h3 className='text-gray-600 font-medium'>{title}</h3>
				<div className='relative rounded-2xl  px-2 border border-[#C9E7CB]'>
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
		<div className='bg-white rounded-2xl border border-[#C9E7CB] p-6'>
			<div className='flex justify-between items-center mb-6'>
				<h3 className='text-gray-600 font-medium'>{title}</h3>
				<div className='relative rounded-2xl  px-2 border border-[#C9E7CB]'>
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
									<div className='text-right'>
										<div className='text-gray-600 text-sm'>
											{product.percentage}%
										</div>
										<div className='text-gray-400 text-xs'>
											{product.quantity} {product.unit}
										</div>
									</div>
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

	// State for API data - using imported types
	const [dailyData, setDailyData] = useState<DashboardData>({
		uploadedProducts: 0,
		totalSales: 0,
		totalRevenue: 0,
		productTypes: ["None"],
		mostBoughtProducts: [],
		recentProducts: [],
	});

	const [weeklyData, setWeeklyData] = useState<DashboardData>({
		uploadedProducts: 0,
		totalSales: 0,
		totalRevenue: 0,
		productTypes: ["None"],
		mostBoughtProducts: [],
		recentProducts: [],
	});

	const [monthlyData, setMonthlyData] = useState<DashboardData>({
		uploadedProducts: 0,
		totalSales: 0,
		totalRevenue: 0,
		productTypes: ["None"],
		mostBoughtProducts: [],
		recentProducts: [],
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

	// API functions using mock service
	const fetchDailyData = async (timeframe: string) => {
		setLoading((prev) => ({ ...prev, daily: true }));
		try {
			const result = await mockApiService.getDailyData(timeframe);
			if (result.success) {
				setDailyData(result.data);
				console.log("Daily data loaded:", result.data);
			}
		} catch (error) {
			console.error("Error fetching daily data:", error);
		} finally {
			setLoading((prev) => ({ ...prev, daily: false }));
		}
	};

	const fetchWeeklyData = async (timeframe: string) => {
		setLoading((prev) => ({ ...prev, weekly: true }));
		try {
			const result = await mockApiService.getWeeklyData(timeframe);
			if (result.success) {
				setWeeklyData(result.data);
				console.log("Weekly data loaded:", result.data);
			}
		} catch (error) {
			console.error("Error fetching weekly data:", error);
		} finally {
			setLoading((prev) => ({ ...prev, weekly: false }));
		}
	};

	const fetchMonthlyData = async (timeframe: string) => {
		setLoading((prev) => ({ ...prev, monthly: true }));
		try {
			const result = await mockApiService.getMonthlyData(timeframe);
			if (result.success) {
				setMonthlyData(result.data);
				console.log("Monthly data loaded:", result.data);
			}
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
		<div className='bg-gray-50 min-h-screen p-0 lg:p-8'>
			<div className='w-[90%] lg:max-w-7xl mx-auto space-y-8'>
				{/* Header with Download Button */}
				<div className='flex justify-between items-center'>
					<div>
						<h1 className='text-2xl font-bold text-gray-900'>
							🌾 Farm Dashboard Overview
						</h1>
						<p className='text-gray-600'>
							Overview of products daily, weekly, monthly, and your activities
						</p>
					</div>
					<DownloadButton
						dailyData={dailyData}
						weeklyData={weeklyData}
						monthlyData={monthlyData}
						dailyTimeframes={dailyTimeframes}
						weeklyTimeframes={weeklyTimeframes}
						monthlyTimeframes={monthlyTimeframes}
					/>
				</div>
				{/* Daily Overview */}
				<section className='bg-white p-5 border border-[#DADADA] rounded-3xl'>
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
							value={dailyData.totalSales}
							label='Total sales'
							productType={dailyData.productTypes[0] || "None"}
							timeframe={dailyTimeframes.salesOverview}
							onTimeframeChange={(value) =>
								handleDailyTimeframeChange("salesOverview", value)
							}
							timeframeOptions={dailyOptions}
							loading={loading.daily}
						/>
						<MostBoughtProduct
							title='Most Bought product'
							timeframe={dailyTimeframes.mostBought}
							onTimeframeChange={(value) =>
								handleDailyTimeframeChange("mostBought", value)
							}
							timeframeOptions={dailyOptions}
							data={dailyData.mostBoughtProducts}
							loading={loading.daily}
						/>
					</div>
				</section>

				{/* Weekly Overview */}
				<section className='bg-white p-5 border border-[#DADADA] rounded-3xl'>
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
				<section className='bg-white p-5 border border-[#DADADA] rounded-3xl'>
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
							value={0}
							label='Total sales'
							productType='None'
							timeframe={monthlyTimeframes.salesOverview}
							onTimeframeChange={(value) =>
								setMonthlyTimeframes((prev) => ({
									...prev,
									salesOverview: value,
								}))
							}
							timeframeOptions={monthlyOptions}
						/>
						<MostBoughtProduct
							title='Most Bought product'
							timeframe={monthlyTimeframes.mostBought}
							onTimeframeChange={(value) =>
								setMonthlyTimeframes((prev) => ({ ...prev, mostBought: value }))
							}
							timeframeOptions={monthlyOptions}
							data={monthlyData.mostBoughtProducts}
						/>
					</div>
				</section>
			</div>
		</div>
	);
};

export default DashboardOverview;
