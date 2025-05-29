import React from "react";

const AccountSetup = () => {
	const steps = [
		{
			number: 1,
			title: "Click on Get started",
			description:
				"Begin your journey by clicking the Get Started button to initiate the account creation process.",
		},
		{
			number: 2,
			title: "Sign up with email or google or connect wallet",
			description:
				"Choose your preferred method to create an account - use your email, Google account, or connect your existing wallet.",
		},
		{
			number: 3,
			title: "Add you ID to confirm identity",
			description:
				"Complete the verification process by uploading your identification documents to confirm your identity.",
		},
	];

	return (
		<div className='p-4 md:p-8'>
			<div className='max-w-7xl mx-auto bg-[#F9DCAD] rounded-4xl'>
				<div className='p-8 md:p-12 lg:p-16'>
					{/* Header */}
					<div className='mb-16 md:mb-24'>
						<h1 className='text-4xl md:text-5xl lg:text-6xl font-bold text-green-800 leading-tight'>
							Setup your account in just
							<br />
							few steps
						</h1>
					</div>

					{/* Steps Container */}
					<div className='relative mb-16 md:mb-24'>
						{/* Progress Line - Desktop only */}
						<div
							className='hidden lg:block absolute top-8 left-8 right-8 h-px bg-green-700'
							style={{ width: "calc(100% - 4rem)" }}></div>

						{/* Steps */}
						<div className='grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-8'>
							{steps.map((step, index) => (
								<div key={step.number} className='relative'>
									{/* Step Number Circle */}
									<div className='w-16 h-16 bg-green-700 rounded-full flex items-center justify-center mb-8 relative z-10'>
										<span className='text-white font-bold text-xl'>
											{step.number}
										</span>
									</div>

									{/* Mobile connecting line */}
									{index < steps.length - 1 && (
										<div className='lg:hidden absolute left-8 top-16 w-px h-12 bg-green-700'></div>
									)}

									{/* Content */}
									<div className='max-w-md'>
										<h3 className='text-xl md:text-2xl font-bold text-green-800 mb-4 leading-tight'>
											{step.title}
										</h3>
										<p className='text-gray-700 text-base md:text-lg leading-relaxed'>
											{step.description}
										</p>
									</div>
								</div>
							))}
						</div>
					</div>

					{/* Get Started Button */}
					<div className='flex justify-center lg:justify-end'>
						<button className='bg-green-700 hover:bg-green-800 text-white font-semibold px-12 py-4 rounded-full transition-colors duration-200 text-lg shadow-lg'>
							Get Started
						</button>
					</div>
				</div>
			</div>
		</div>
	);
};

export default AccountSetup;
