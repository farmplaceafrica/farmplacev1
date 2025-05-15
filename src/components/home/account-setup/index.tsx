// // AccountSetup.tsx
// "use client";

// import { useState } from "react";
// import Image from "next/image";

// interface StepProps {

// }

// const Step: React.FC<StepProps> = ({

// }) => {
// 	return (
// 		<div className='flex flex-col items-center w-full max-w-sm'>
// 			<div
// 				className={`flex items-center justify-center w-12 h-12 rounded-full border-2 mb-4 ${
// 					isCompleted
// 						? "bg-green-500 border-green-500 text-white"
// 						: isActive
// 						? "border-blue-500 text-blue-500"
// 						: "border-gray-300 text-gray-400"
// 				}`}>
// 				{isCompleted ? (
// 					<svg
// 						className='w-6 h-6'
// 						fill='none'
// 						stroke='currentColor'
// 						viewBox='0 0 24 24'
// 						xmlns='http://www.w3.org/2000/svg'>
// 						<path
// 							strokeLinecap='round'
// 							strokeLinejoin='round'
// 							strokeWidth={2}
// 							d='M5 13l4 4L19 7'
// 						/>
// 					</svg>
// 				) : (
// 					<span className='text-lg font-semibold'>{number}</span>
// 				)}
// 			</div>
// 			<h3
// 				className={`text-lg font-semibold mb-2 ${
// 					isActive ? "text-blue-600" : "text-gray-800"
// 				}`}>
// 				{title}
// 			</h3>
// 			<p className='text-gray-600 text-center'>{description}</p>
// 		</div>
// 	);
// };

// const AccountSetup = () => {
// 	const [currentStep, setCurrentStep] = useState(1);

// 	const steps = [
// 		{
// 			number: 1,
// 			title: "Click on Get Started",
// 			description:
// 				'Begin your journey by clicking the "Get Started" button to initiate the account creation process.',
// 		},
// 		{
// 			number: 2,
// 			title: "Sign up with email or Google",
// 			description:
// 				"Choose your preferred signup method using your email address, Google account, or connect your digital wallet.",
// 		},
// 		{
// 			number: 3,
// 			title: "Add your ID to confirm identity",
// 			description:
// 				"Complete the verification process by providing your identification to secure your account and access all features.",
// 		},
// 	];

// 	return (
// 		<div className='bg-gray-50 min-h-screen flex flex-col items-center py-12 px-4'>
// 			<div className='max-w-4xl w-full bg-white rounded-lg shadow-lg p-8'>
// 				<h1 className='text-3xl font-bold text-gray-800 mb-8 text-center'>
// 					Setup your account in just few minutes
// 				</h1>

// 				<div className='flex flex-col md:flex-row justify-between items-start md:items-center mb-12'>
// 					{steps.map((step, index) => (
// 						<div
// 							key={step.number}
// 							className='flex flex-col items-center w-full'>
// 							<Step
// 								number={step.number}
// 								title={step.title}
// 								description={step.description}
// 								isActive={currentStep === step.number}
// 								isCompleted={currentStep > step.number}
// 							/>

// 							{index < steps.length - 1 && (
// 								<div className='hidden md:block w-full h-0.5 bg-gray-200 mt-6'>
// 									<div
// 										className='h-full bg-blue-500'
// 										style={{ width: currentStep > index + 1 ? "100%" : "0%" }}
// 									/>
// 								</div>
// 							)}
// 						</div>
// 					))}
// 				</div>

// 				<div className='flex justify-center mt-8'>
// 					{currentStep > 1 && (
// 						<button
// 							className='px-6 py-2 mr-4 border border-blue-500 text-blue-500 rounded-md hover:bg-blue-50 transition-colors'
// 							onClick={() => setCurrentStep((prev) => Math.max(1, prev - 1))}>
// 							Back
// 						</button>
// 					)}

// 			</div>
// 		</div>
// 	);
// };

// export default AccountSetup;

// AccountSetupSteps.tsx
import React from "react";
import Image from "next/image";

const AccountSetupSteps = () => {
	return (
		<div className='w-full max-w-6xl mx-auto px-4 py-8'>
			<div className='flex justify-center mb-12'>
				<div className='relative w-full max-w-md'>
					<Image
						src='/assets/images/BG.png'
						alt='Account setup illustration'
						width={600}
						height={400}
						className='rounded-lg'
					/>
				</div>
			</div>
			{/* Step indicators with connecting lines */}
			<div className='flex items-center justify-between mb-12'>
				<div className='flex items-center w-full'>
					{/* Step 1 */}
					<div className='flex flex-col items-center'>
						<div className='w-14 h-14 rounded-full border-2 border-blue-500 flex items-center justify-center text-blue-500 font-semibold text-xl'>
							1
						</div>
					</div>

					{/* Line between 1 and 2 */}
					<div className='flex-1 h-0.5 bg-blue-500'></div>

					{/* Step 2 */}
					<div className='flex flex-col items-center'>
						<div className='w-14 h-14 rounded-full border-2 border-blue-500 flex items-center justify-center text-blue-500 font-semibold text-xl'>
							2
						</div>
					</div>

					{/* Line between 2 and 3 */}
					<div className='flex-1 h-0.5 bg-blue-500'></div>

					{/* Step 3 */}
					<div className='flex flex-col items-center'>
						<div className='w-14 h-14 rounded-full border-2 border-blue-500 flex items-center justify-center text-blue-500 font-semibold text-xl'>
							3
						</div>
					</div>
				</div>
			</div>

			{/* Step content */}
			<div className='grid grid-cols-1 md:grid-cols-3 gap-8'>
				{/* Step 1 content */}
				<div>
					<h3 className='text-2xl font-bold text-gray-800 mb-4'>
						Click on Get started
					</h3>
					<p className='text-gray-600'>
						Lorem ipsum dolor sit amet consectetur. Molestie vulputate lobortis
						id eu nisi est.
					</p>
				</div>

				{/* Step 2 content */}
				<div>
					<h3 className='text-2xl font-bold text-gray-800 mb-4'>
						Sign up with email or google or connect wallet
					</h3>
					<p className='text-gray-600'>
						Lorem ipsum dolor sit amet consectetur. Molestie vulputate lobortis
						id eu nisi est.
					</p>
				</div>

				{/* Step 3 content */}
				<div>
					<h3 className='text-2xl font-bold text-gray-800 mb-4'>
						Add you ID to confirm identity
					</h3>
					<p className='text-gray-600'>
						Lorem ipsum dolor sit amet consectetur. Molestie vulputate lobortis
						id eu nisi est.
					</p>
				</div>
			</div>
		</div>
	);
};

export default AccountSetupSteps;
