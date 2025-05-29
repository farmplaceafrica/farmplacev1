import Icons from "@/components/icons";

const KeyFeatures = () => {
	const Features = [
		{
			image: <Icons.Market />,
			title: "Digital Marketplace",
			description:
				"Whether you’re looking to launch a brand or you just need help clarifying your message, we can help you.",
		},
		{
			image: <Icons.Resource />,
			title: "Resource Management",
			description:
				"Whether you’re looking to launch a brand or you just need help clarifying your message, we can help you.",
		},
		// {
		// 	image: <Icons.Ai />,
		// 	title: "AI-Powered",
		// 	description:
		// 		"AI-powered tools for analyzing and optimizing digital assets, including predictive analytics and machine learning.",
		// },
		{
			image: <Icons.Blockchain />,
			title: "Blockchain Integration",
			description:
				"Whether you’re looking to launch a brand or you just need help clarifying your message, we can help you.",
		},
		{
			image: <Icons.Id />,
			title: "Identity Verification",
			description:
				"Identity verification tools for ensuring the authenticity and ownership of digital assets.",
		},
	];

	return (
		<div className='bg-[#EDF6ED]'>
			<div className='flex flex-col items-center justify-center py-10'>
				<h2 className='text-3xl font-bold text-gray-800'>Key Features</h2>
				<p className='mt-4 text-center text-gray-600'>
					Explore the key features that make our platform unique and powerful.
				</p>
				<div className='grid grid-cols-1 md:grid-cols-2  gap-8 mt-8'>
					{Features.map((feature, index) => (
						<div
							key={index}
							className='w-[350px] border border-[#4CAF50] rounded-2xl p-5 '>
							<div className='mb-2'>{feature.image}</div>
							<h3 className='text-2xl font-bold text-gray-800'>
								{feature.title}
							</h3>
							<p className='mt-2 text-gray-600'>{feature.description}</p>
						</div>
					))}
				</div>
			</div>
		</div>
	);
};

export default KeyFeatures;
