"use client";
import Image from "next/image";

const audienceData = [
	{
		title: "Farmers",
		description:
			"FarmPlace empowers African farmers to create their own online marketplace by building digital profiles, listing products, and connecting directly with buyers. The platform uses digital ID verification to ensure secure and trusted transactions. It also features a resource hub with agricultural news, training materials, and funding opportunities, along with an AI-powered chatbot for real-time support.",
		image: "/assets/images/farmers.png", // replace with your local path or external link
		imageLeft: false,
	},
	{
		title: "Buyers",
		description:
			"FarmPlace is a digital platform that empowers African farmers to create their own online marketplace by building digital profiles, listing products, and connecting directly with buyers. The platform uses digital ID verification to ensure secure and trusted transactions. It also features a resource hub with agricultural news, training materials, and funding opportunities, along with an AI-powered chatbot for real-time support.",
		image: "/assets/images/buyers.png",
		imageLeft: false,
	},
	{
		title: "Investors",
		description:
			"FarmPlace is a digital platform that empowers African farmers to create their own online marketplace by building digital profiles, listing products, and connecting directly with buyers. The platform uses digital ID verification to ensure secure and trusted transactions. It also features a resource hub with agricultural news, training materials, and funding opportunities, along with an AI-powered chatbot for real-time support.",
		image: "/assets/images/investors.png",
		imageLeft: true,
	},
	{
		title: "NGOs",
		description:
			"FarmPlace is a digital platform that empowers African farmers to create their own online marketplace by building digital profiles, listing products, and connecting directly with buyers. The platform uses digital ID verification to ensure secure and trusted transactions. It also features a resource hub with agricultural news, training materials, and funding opportunities, along with an AI-powered chatbot for real-time support.",
		image: "/assets/images/ngos.png",
		imageLeft: true,
	},
];

const TargetAudience = () => {
	return (
		<section className='py-12 px-4 w-full lg:w-[1280px] mx-auto'>
			<h2 className='text-3xl md:text-4xl font-semibold mb-12 text-gray-900'>
				Our Target Audience
			</h2>

			{audienceData.map((item, index) => (
				<div
					key={item.title}
					className={`flex flex-col ${
						item.imageLeft ? "md:flex-row-reverse" : "md:flex-row"
					} gap-8 justify-between mb-16 items-center`}>
					{/* Text Content */}
					<div className='w-full lg:w-1/2'>
						<h3 className='text-2xl font-bold mb-3'>{item.title}</h3>
						<p className='text-gray-700 leading-relaxed'>{item.description}</p>
					</div>

					{/* Image */}
					<div className='w-full lg:w-1/2 '>
						<div className='w-full  h-[290px] relative rounded-xl overflow-hidden shadow-md'>
							<Image
								src={item.image}
								alt={item.title}
								fill
								className=''
								priority
							/>
						</div>
					</div>
				</div>
			))}
		</section>
	);
};

export default TargetAudience;
