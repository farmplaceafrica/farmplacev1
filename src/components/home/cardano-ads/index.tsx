import React from "react";

const CardanoSection = () => {
	return (
		<div
			className='relative rounded-3xl h-[600px] container mx-auto inset-0 bg-cover bg-center'
			style={{
				backgroundImage: `url("/assets/images/cardanobanner.png")`,
			}}>
			{/* Dark Overlay */}
			{/* <div className='absolute inset-0 bg-black/30 overflow-hidden bg-opacity-50'></div> */}

			{/* Content */}
			<div className='absolute inset-0 flex flex-col justify-end px-6 lg:px-8 pb-8'>
				<h1 className='text-white text-sm lg:text-xl font-bold mb-2'>
					FarmPlace
				</h1>
				<h2 className='text-white text-xl lg:text-5xl font-semibold'>
					Powered By The Cardano Network
				</h2>
			</div>
		</div>
	);
};

export default CardanoSection;
