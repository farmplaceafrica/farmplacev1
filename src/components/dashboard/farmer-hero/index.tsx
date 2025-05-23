import React from "react";

const FarmHeroSection = () => {
	return (
		<div className='relative h-48 lg:h-64 rounded-lg overflow-hidden mb-6'>
			{/* Background Image */}
			<div
				className='absolute inset-0 bg-cover bg-center'
				style={{
					backgroundImage: `url("/assets/images/farmhero.png")`,
				}}>
				{/* Dark Overlay */}
				<div className='absolute inset-0 '></div>

				{/* Content */}
				<div className='absolute inset-0 flex flex-col justify-center px-6 lg:px-8'>
					<h1 className='text-white text-2xl lg:text-3xl font-bold mb-2'>
						Welcome to your dashboard,
					</h1>
					<h2 className='text-white text-xl lg:text-2xl font-semibold'>
						Farmer Precious!
					</h2>
				</div>
			</div>

			{/* Edit Profile Button
			<button className='absolute top-4 right-4 bg-white hover:bg-gray-50 px-4 py-2 rounded-lg text-sm font-medium shadow-sm transition-colors'>
				Edit Profile
			</button> */}
		</div>
	);
};

export default FarmHeroSection;
