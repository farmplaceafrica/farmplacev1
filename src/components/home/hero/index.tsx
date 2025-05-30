"use client";
import React from "react";
import Image from "next/image";
import Button from "@/components/global/Button";
import { useRouter } from "next/navigation";
const Hero = () => {
	const router = useRouter();

	const handleGetStarted = () => {
		router.push("auth/register/1");
	};

	return (
		<>
			{/* <div className='bg-[#4A7C59] relative overflow-hidden rounded-3xl mx-4 my-8 h-[690px]'> */}
			{/* Main Hero Section */}

			<div className='container px-8 py-20 mt-20 relative mx-auto overflow-hidden rounded-3xl h-[690px] flex items-center justify-center'>
				{/* For Mobile */}
				<div
					className='absolute inset-0 lg:hidden bg-cover bg-center'
					style={{
						backgroundImage: `url("/assets/images/cardanobanner.png")`,
					}}></div>

				{/* For Desktop */}
				<div className='hidden lg:block absolute inset-0 bg-[#2A602C]'></div>

				<div className='flex flex-col items-center justify-center text-center max-w-4xl mx-auto relative z-10'>
					<h1 className='text-3xl md:text-5xl lg:text-6xl text-white font-bold leading-tight mb-4'>
						Empowering African farmers through technology.
					</h1>

					<p className='text-sm md:text-xl text-white/90 max-w-2xl leading-relaxed mb-8'>
						FarmPlace is a digital platform that empowers African farmers to
						create their own online marketplace by building digital profiles,
						listing products, and connecting directly with buyers.
					</p>

					<Button
						onClick={handleGetStarted}
						className='bg-[#7CB342] hover:bg-[#689F38] text-white px-8 py-4 rounded-full text-lg font-semibold transition-colors duration-300'>
						Get Started
					</Button>
				</div>

				{/* Positioned Images - Hidden on Mobile */}
				<div className='hidden lg:block absolute top-0 left-0 z-20'>
					<Image
						src='/assets/images/landtomato.png'
						alt='Fresh cherry tomatoes on vine'
						height={272}
						width={350}
						className='object-contain'
					/>
				</div>

				<div className='hidden lg:block absolute bottom-0 left-0 z-20'>
					<Image
						src='/assets/images/landfarmer.png'
						alt='African farmer working in cornfield'
						height={272}
						width={350}
						className='object-contain'
					/>
				</div>

				<div className='hidden lg:block absolute top-0 right-0 z-20'>
					<Image
						src='/assets/images/landcabbage.png'
						alt='Fresh green cabbage'
						height={272}
						width={350}
						className='object-contain'
					/>
				</div>
			</div>

			{/* </div> */}

			{/* Stats Section */}
			<div className='bg-[#C3E0C4] container mx-auto my-4 rounded-3xl'>
				<div className='container mx-auto px-8 py-12'>
					<div className='grid grid-cols-2 md:grid-cols-4 gap-8 items-center text-center'>
						{/* Farmers Stat */}
						<div>
							<div className='text-3xl md:text-4xl font-bold text-[#2D5016] mb-2'>
								500+
							</div>
							<div className='text-[#4A7C59] text-sm md:text-base font-medium'>
								Farmers
							</div>
						</div>

						{/* Buyers Stat */}
						<div>
							<div className='text-3xl md:text-4xl font-bold text-[#2D5016] mb-2'>
								500+
							</div>
							<div className='text-[#4A7C59] text-sm md:text-base font-medium'>
								Buyers
							</div>
						</div>

						{/* Products Stat */}
						<div>
							<div className='text-3xl md:text-4xl font-bold text-[#2D5016] mb-2'>
								1000+
							</div>
							<div className='text-[#4A7C59] text-sm md:text-base font-medium'>
								Products
							</div>
						</div>

						{/* Cardano Support */}
						<div className='flex flex-col items-center'>
							<div className='flex items-center justify-center mb-2'>
								<div className='w-8 h-8 bg-[#0033AD] rounded-full flex items-center justify-center mr-2'>
									<span className='text-white text-xs font-bold'>₳</span>
								</div>
								<span className='text-[#0033AD] font-bold text-lg'>
									CARDANO
								</span>
							</div>
							<div className='text-[#4A7C59] text-sm md:text-base font-medium'>
								Supported by
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default Hero;
