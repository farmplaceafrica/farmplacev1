import React from "react";
import Image from "next/image";
import Button from "@/components/global/Button";
const Hero = () => {
	return (
		<div className='bg-[#C3E0C44D]'>
			<div className='flex text-center px-2 lg:px-0 w-full flex-col lg:w-[945px] mx-auto items-center justify-center h-screen '>
				<h1 className=' text-4xl lg:text-[56px]  text-[#333333] font-semibold'>
					Empowering African farmers through technology.
				</h1>
				<p className='mt-4 text-xs  lg:text-xl text-[#4A4A4A] text-center'>
					FarmPlace is a digital platform that empowers African farmers to
					create their own online marketplace by building digital profiles,
					listing products, and connecting directly with buyers.{" "}
				</p>
				<Button className='mt-8' size='lg' theme='primary'>
					Get Started
				</Button>
				<div>
					<Image
						src='/assets/images/hero-bg.png'
						alt='Hero Image'
						width={848}
						height={388}
						className='mt-8'
					/>
				</div>
			</div>
		</div>
	);
};
export default Hero;
