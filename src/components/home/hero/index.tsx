import React from "react";
import Image from "next/image";
import Button from "@/components/global/Button";

const Hero = () => {
	return (
		<section className='bg-[#C3E0C44D] py-16'>
			<div className='container mx-auto px-4'>
				<div className='flex flex-col items-center justify-center text-center max-w-4xl mx-auto'>
					<h1 className='text-4xl md:text-5xl lg:text-6xl text-[#333333] font-semibold leading-tight'>
						Empowering African farmers through technology.
					</h1>

					<p className='mt-6 text-sm md:text-lg lg:text-xl text-[#4A4A4A] max-w-3xl'>
						FarmPlace is a digital platform that empowers African farmers to
						create their own online marketplace by building digital profiles,
						listing products, and connecting directly with buyers.
					</p>

					<Button className='mt-8' size='lg' theme='primary'>
						Get Started
					</Button>

					<div className='mt-12 w-full max-w-4xl'>
						<Image
							src='/assets/images/hero-bg.png'
							alt='Hero Image'
							width={848}
							height={388}
							className='w-full h-auto'
							priority
						/>
					</div>
				</div>
			</div>
		</section>
	);
};

export default Hero;
