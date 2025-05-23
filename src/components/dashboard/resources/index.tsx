// Resource Component
interface ResourceCardProps {
	title: string;
	description: string;
	timeAgo: string;
	image: string;
}

const ResourceCard = ({
	title,
	description,
	timeAgo,
	image,
}: ResourceCardProps) => (
	<div className='bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300'>
		<div className='h-48 overflow-hidden'>
			<img
				src={image}
				alt={title}
				className='w-full h-full object-cover hover:scale-105 transition-transform duration-300'
			/>
		</div>
		<div className='p-4'>
			<h3 className='font-semibold text-gray-800 mb-2 line-clamp-2'>{title}</h3>
			<p className='text-sm text-gray-600 mb-3 line-clamp-3'>{description}</p>
			<p className='text-xs text-gray-400'>{timeAgo}</p>
		</div>
	</div>
);

const ResourcesSection = () => {
	const resources = [
		{
			title: "How to prevent pest from eating your rice",
			description:
				"Lorem ipsum dolor sit amet consectetur. Molestiae vulputate lobortis id eu nisl est...",
			timeAgo: "2 hours ago",
			image:
				"https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=400&h=300&fit=crop",
		},
		{
			title: "Best practices for organic farming",
			description:
				"Lorem ipsum dolor sit amet consectetur. Molestiae vulputate lobortis id eu nisl est...",
			timeAgo: "4 hours ago",
			image:
				"https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=400&h=300&fit=crop",
		},
		{
			title: "Seasonal crop rotation techniques",
			description:
				"Lorem ipsum dolor sit amet consectetur. Molestiae vulputate lobortis id eu nisl est...",
			timeAgo: "1 day ago",
			image:
				"https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=400&h=300&fit=crop",
		},
		{
			title: "Water management for better yields",
			description:
				"Lorem ipsum dolor sit amet consectetur. Molestiae vulputate lobortis id eu nisl est...",
			timeAgo: "2 days ago",
			image:
				"https://images.unsplash.com/photo-1464207687429-7505649dae38?w=400&h=300&fit=crop",
		},
		{
			title: "Modern harvesting equipment guide",
			description:
				"Lorem ipsum dolor sit amet consectetur. Molestiae vulputate lobortis id eu nisl est...",
			timeAgo: "3 days ago",
			image:
				"https://images.unsplash.com/photo-1500937386664-56d1dfef3854?w=400&h=300&fit=crop",
		},
		{
			title: "Soil health and fertilization tips",
			description:
				"Lorem ipsum dolor sit amet consectetur. Molestiae vulputate lobortis id eu nisl est...",
			timeAgo: "1 week ago",
			image:
				"https://images.unsplash.com/photo-1530836369250-ef72a3f5cda8?w=400&h=300&fit=crop",
		},
	];

	return (
		<div className='mb-8'>
			<h2 className='text-2xl font-bold text-gray-800 mb-6'>
				Recent Resources
			</h2>
			<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
				{resources.map((resource, index) => (
					<ResourceCard key={index} {...resource} />
				))}
			</div>
		</div>
	);
};

export default ResourcesSection;
