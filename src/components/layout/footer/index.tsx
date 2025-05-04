// components/Footer.tsx
import React from "react";
import Link from "next/link";

const Footer = () => {
	return (
		<footer className='bg-green-800 text-white py-12 px-6'>
			<div className='container mx-auto max-w-6xl'>
				<div className='grid grid-cols-1 md:grid-cols-4 gap-8'>
					{/* Brand */}
					<div>
						<h2 className='text-3xl font-bold mb-8'>FarmPlace</h2>
					</div>

					{/* Company Links */}
					<div>
						<h3 className='text-xl font-semibold mb-6'>Company</h3>
						<ul className='space-y-4'>
							<li>
								<Link href='/features' className='hover:underline'>
									Feature
								</Link>
							</li>
							<li>
								<Link href='/contact' className='hover:underline'>
									Contact
								</Link>
							</li>
							<li>
								<Link href='/faqs' className='hover:underline'>
									FAQs
								</Link>
							</li>
						</ul>
					</div>

					{/* Help Links */}
					<div>
						<h3 className='text-xl font-semibold mb-6'>Help</h3>
						<ul className='space-y-4'>
							<li>
								<Link href='/privacy-policy' className='hover:underline'>
									Privacy policy
								</Link>
							</li>
							<li>
								<Link href='/terms' className='hover:underline'>
									Terms & condition
								</Link>
							</li>
						</ul>
					</div>

					{/* Contact Information */}
					<div>
						<h3 className='text-xl font-semibold mb-6'>Contact</h3>
						<ul className='space-y-4'>
							<li>
								<a href='mailto:info@farmplace.com' className='hover:underline'>
									info@farmplace.com
								</a>
							</li>
							<li>
								<a href='tel:08012618932' className='hover:underline'>
									08012618932
								</a>
							</li>
						</ul>
					</div>
				</div>

				{/* Bottom Section with Copyright and Social Icons */}
				<div className='mt-16 flex flex-col md:flex-row justify-between items-center'>
					<div className='mb-4 md:mb-0'>
						<p>Copyright © 2024 FarmPlace All rights reserved</p>
					</div>

					<div className='flex space-x-4'>
						<a
							href='https://linkedin.com'
							target='_blank'
							rel='noopener noreferrer'
							className='bg-white text-green-800 rounded-full w-8 h-8 flex items-center justify-center hover:bg-gray-200 transition-colors'>
							<svg
								className='w-4 h-4'
								xmlns='http://www.w3.org/2000/svg'
								viewBox='0 0 24 24'
								fill='currentColor'>
								<path d='M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z' />
							</svg>
						</a>

						<a
							href='https://facebook.com'
							target='_blank'
							rel='noopener noreferrer'
							className='bg-white text-green-800 rounded-full w-8 h-8 flex items-center justify-center hover:bg-gray-200 transition-colors'>
							<svg
								className='w-4 h-4'
								xmlns='http://www.w3.org/2000/svg'
								viewBox='0 0 24 24'
								fill='currentColor'>
								<path d='M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z' />
							</svg>
						</a>

						<a
							href='https://twitter.com'
							target='_blank'
							rel='noopener noreferrer'
							className='bg-white text-green-800 rounded-full w-8 h-8 flex items-center justify-center hover:bg-gray-200 transition-colors'>
							<svg
								className='w-4 h-4'
								xmlns='http://www.w3.org/2000/svg'
								viewBox='0 0 24 24'
								fill='currentColor'>
								<path d='M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z' />
							</svg>
						</a>
					</div>
				</div>
			</div>
		</footer>
	);
};

export default Footer;
