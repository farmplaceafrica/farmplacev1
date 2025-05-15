import React from "react";
import Image from "next/image";

const OurVision = () => {
	return (
		<section className='w-full bg-[#2A602C]'>
			<div className='max-w-screen-2xl mx-auto flex flex-col md:flex-row'>
				{/* Left side with green background and text */}
				<div className='w-full md:w-1/2  py-16 px-4'>
					<div className='max-w-lg mx-auto md:ml-auto md:mr-16 lg:mr-24'>
						<h2 className='text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6 md:mb-10'>
							Our Vision
						</h2>
						<p className='text-white text-base md:text-lg leading-relaxed'>
							FarmPlace is a digital platform that empowers African farmers to
							create their own online marketplace by building digital profiles,
							listing products, and connecting directly with buyers. The
							platform uses digital ID verification to ensure secure and trusted
							transactions. It also features a resource hub with agricultural
							news, training materials, and funding opportunities, along with an
							AI-powered chatbot for real-time support.
						</p>
					</div>
				</div>

				{/* Right side with the farm image */}
				<div className='w-full md:w-1/2 h-[400px] md:h-auto relative'>
					<div className='absolute inset-0'>
						<Image
							src='/assets/images/farm.png'
							alt='Agricultural field at sunset'
							fill
							style={{ objectFit: "cover" }}
							className='w-full h-full object-cover'
							priority
						/>
					</div>
				</div>
			</div>
		</section>
	);
};

export default OurVision;
