import {
	Upload,
	DollarSign,
	CheckCircle,
	TrendingUp,
	Calendar,
	Users,
	Leaf,
	BarChart3,
} from "lucide-react";
import {
	LineChart,
	Line,
	XAxis,
	YAxis,
	CartesianGrid,
	Tooltip,
	ResponsiveContainer,
	BarChart,
	Bar,
	PieChart,
	Pie,
	Cell,
} from "recharts";

// Sample data
const salesData = [
	{ month: "Jan", sales: 4000, products: 240 },
	{ month: "Feb", sales: 3000, products: 139 },
	{ month: "Mar", sales: 2000, products: 980 },
	{ month: "Apr", sales: 2780, products: 390 },
	{ month: "May", sales: 1890, products: 480 },
	{ month: "Jun", sales: 2390, products: 380 },
];

const cropData = [
	{ name: "Rice", value: 40, color: "#10B981" },
	{ name: "Wheat", value: 30, color: "#F59E0B" },
	{ name: "Corn", value: 20, color: "#EF4444" },
	{ name: "Vegetables", value: 10, color: "#8B5CF6" },
];

const recentActivities = [
	{ id: 1, action: "Harvested 50kg of rice", time: "2 hours ago", icon: Leaf },
	{
		id: 2,
		action: "Sold products worth $1,200",
		time: "4 hours ago",
		icon: DollarSign,
	},
	{ id: 3, action: "Added new crop variety", time: "1 day ago", icon: Upload },
	{
		id: 4,
		action: "Pest control applied",
		time: "2 days ago",
		icon: CheckCircle,
	},
];

const AnalyticsChart = ({
	title,
	children,
	className = "",
}: {
	title: string;
	children: React.ReactNode;
	className?: string;
}) => (
	<div className={`bg-white rounded-lg shadow-md p-6 ${className}`}>
		<h3 className='text-lg font-semibold text-gray-800 mb-4'>{title}</h3>
		{children}
	</div>
);

const Analytics = () => {
	return (
		<>
			<div className='grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8'>
				<AnalyticsChart title='Sales Analytics'>
					<ResponsiveContainer width='100%' height={300}>
						<LineChart data={salesData}>
							<CartesianGrid strokeDasharray='3 3' />
							<XAxis dataKey='month' />
							<YAxis />
							<Tooltip />
							<Line
								type='monotone'
								dataKey='sales'
								stroke='#10B981'
								strokeWidth={3}
								dot={{ fill: "#10B981", strokeWidth: 2, r: 4 }}
							/>
						</LineChart>
					</ResponsiveContainer>
				</AnalyticsChart>

				<AnalyticsChart title='Product Performance'>
					<ResponsiveContainer width='100%' height={300}>
						<BarChart data={salesData}>
							<CartesianGrid strokeDasharray='3 3' />
							<XAxis dataKey='month' />
							<YAxis />
							<Tooltip />
							<Bar dataKey='products' fill='#F59E0B' radius={[4, 4, 0, 0]} />
						</BarChart>
					</ResponsiveContainer>
				</AnalyticsChart>
			</div>
			;
			<div className='grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8'>
				{/* Crop Distribution */}
				<AnalyticsChart title='Crop Distribution' className='lg:col-span-1'>
					<ResponsiveContainer width='100%' height={250}>
						<PieChart>
							<Pie
								data={cropData}
								cx='50%'
								cy='50%'
								innerRadius={60}
								outerRadius={100}
								paddingAngle={5}
								dataKey='value'>
								{cropData.map((entry, index) => (
									<Cell key={`cell-${index}`} fill={entry.color} />
								))}
							</Pie>
							<Tooltip />
						</PieChart>
					</ResponsiveContainer>
					<div className='mt-4 space-y-2'>
						{cropData.map((crop, index) => (
							<div key={index} className='flex items-center justify-between'>
								<div className='flex items-center'>
									<div
										className='w-3 h-3 rounded-full mr-2'
										style={{ backgroundColor: crop.color }}></div>
									<span className='text-sm text-gray-600'>{crop.name}</span>
								</div>
								<span className='text-sm font-semibold'>{crop.value}%</span>
							</div>
						))}
					</div>
				</AnalyticsChart>

				{/* Recent Activities */}
				<div className='bg-white rounded-lg shadow-md p-6 lg:col-span-2'>
					<h3 className='text-lg font-semibold text-gray-800 mb-4'>
						Recent Activities
					</h3>
					<div className='space-y-4'>
						{recentActivities.map((activity) => {
							const IconComponent = activity.icon;
							return (
								<div
									key={activity.id}
									className='flex items-center space-x-3 p-3 bg-gray-50 rounded-lg'>
									<div className='flex-shrink-0'>
										<IconComponent className='h-5 w-5 text-green-600' />
									</div>
									<div className='flex-1 min-w-0'>
										<p className='text-sm font-medium text-gray-900'>
											{activity.action}
										</p>
										<p className='text-xs text-gray-500'>{activity.time}</p>
									</div>
								</div>
							);
						})}
					</div>
				</div>
			</div>
			;
		</>
	);
};

export default Analytics;
