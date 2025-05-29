"use client";
import React, { useState } from "react";
import { ChevronDown } from "lucide-react";
import Icons from "@/components/icons";
import Image from "next/image";

// FAQ Accordion Component
const FAQAccordion = () => {
	const [openIndex, setOpenIndex] = useState<number | null>(null);

	const faqs = [
		{
			question: "How do I get started with FarmPlace?",
			answer:
				"Getting started is simple! Click the 'Get Started' button, sign up with your email or connect your wallet, then complete the identity verification process to access all features.",
		},
		{
			question: "What types of loans are available for farmers?",
			answer:
				"We offer various loan types including crop financing, equipment loans, land purchase loans, and seasonal working capital. Each loan is tailored to meet specific agricultural needs with competitive rates.",
		},
		{
			question: "How does the buyer-seller marketplace work?",
			answer:
				"Our marketplace connects farmers directly with buyers, eliminating middlemen. Farmers can list their produce, set prices, and buyers can browse and purchase directly. We facilitate secure transactions and logistics support.",
		},
		{
			question: "What verification is required for account setup?",
			answer:
				"We require basic identity verification including government-issued ID, proof of address, and for farmers, proof of land ownership or farming activities. This ensures platform security and builds trust among users.",
		},
		{
			question: "Are there any fees for using FarmPlace services?",
			answer:
				"We charge minimal transaction fees only when deals are completed successfully. Account creation, browsing, and basic features are completely free. Detailed fee structure is available in our pricing section.",
		},
	];

	const toggleAccordion = (index: number) => {
		setOpenIndex(openIndex === index ? null : index);
	};

	return (
		<div className='max-w-4xl mx-auto px-4 py-16'>
			<h2 className='text-3xl md:text-4xl font-bold text-center text-gray-800 mb-12'>
				FAQs
			</h2>

			<div className='space-y-4'>
				{faqs.map((faq, index) => (
					<div
						key={index}
						className='border border-gray-200 rounded-lg overflow-hidden bg-white shadow-sm'>
						<button
							onClick={() => toggleAccordion(index)}
							className='w-full px-6 py-5 text-left flex justify-between items-center hover:bg-gray-50 transition-colors duration-200'>
							<span className='text-lg font-medium text-gray-800 pr-4'>
								{faq.question}
							</span>
							<ChevronDown
								className={`w-5 h-5 text-gray-600 transition-transform duration-200 flex-shrink-0 ${
									openIndex === index ? "rotate-180" : ""
								}`}
							/>
						</button>

						{openIndex === index && (
							<div className='px-6 pb-5'>
								<div className='pt-2 border-t border-gray-100'>
									<p className='text-gray-600 leading-relaxed'>{faq.answer}</p>
								</div>
							</div>
						)}
					</div>
				))}
			</div>
		</div>
	);
};

// FarmPlace CTA Component
const FarmPlaceCTA = () => {
	return (
		<div className='max-w-6xl mx-auto px-4 py-8'>
			<div className='relative bg-[#2A602C] rounded-3xl overflow-hidden'>
				{/* Background decorative elements */}
				<div className='absolute top-0 left-0 w-32 h-32 '>
					<Image
						src='/assets/images/clover1.png'
						alt='Fresh cherry tomatoes on vine'
						height={272}
						width={350}
						className='object-contain'
					/>
				</div>

				<div className='absolute bottom-0 right-0 w-40 h-40 '>
					<Image
						src='/assets/images/clover2.png'
						alt='Fresh cherry tomatoes on vine'
						height={272}
						width={350}
						className='object-contain'
					/>
				</div>

				{/* Content */}
				<div className='relative z-10 px-8 md:px-12 lg:px-16 py-12 md:py-16 text-center'>
					<h2 className='text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-8 leading-tight'>
						Join FarmPlace now, and have access to
						<br />
						resources and loans
					</h2>

					{/* Category badges */}
					<div className='flex flex-wrap justify-center gap-4 md:gap-6 mb-10'>
						<div className='flex items-center text-white'>
							<Icons.Plus className=' mr-2 text-green-300' />
							<span className='text-sm md:text-base font-medium'>Farmer</span>
						</div>
						<div className='flex items-center text-white'>
							<Icons.Plus className=' mr-2 text-green-300' />
							<span className='text-sm md:text-base font-medium'>Buyers</span>
						</div>
						<div className='flex items-center text-white'>
							<Icons.Plus className=' mr-2 text-green-300' />
							<span className='text-sm md:text-base font-medium'>NGOs</span>
						</div>
					</div>

					{/* CTA Button */}
					<button className='bg-[#4CAF50] cursor-pointer hover:bg-green-400 text-white font-semibold px-10 py-4 rounded-full transition-colors duration-200 text-lg shadow-lg'>
						Get Started
					</button>
				</div>
			</div>
		</div>
	);
};

// Main component combining both
const FAQAndCTA = () => {
	return (
		<div className='bg-gray-50 min-h-screen'>
			<FAQAccordion />
			<FarmPlaceCTA />
		</div>
	);
};

export default FAQAndCTA;
