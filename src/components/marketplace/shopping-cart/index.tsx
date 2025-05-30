// "use client";

// import Image from "next/image";
// import { useRouter } from "next/navigation";
// import { useCart } from "@/components/context/CardContext";

// const ShoppingCart = () => {
// 	const { cartItems, updateQuantity, removeFromCart, clearCart } = useCart();
// 	const router = useRouter();

// 	const formatPrice = (price: string) => {
// 		return new Intl.NumberFormat("en-NG", {
// 			style: "currency",
// 			currency: "NGN",
// 			currencyDisplay: "symbol",
// 		})
// 			.format(parseFloat(price.replace(/[^\d.-]/g, "")))
// 			.replace("NGN", "₦");
// 	};

// 	const calculateSubtotal = () => {
// 		return cartItems.reduce((total, item) => {
// 			const price = parseFloat(item.price.replace(/[^\d.-]/g, ""));
// 			return total + price * item.quantity;
// 		}, 0);
// 	};

// 	const handleCheckout = () => {
// 		router.push("/marketplace/checkout");
// 	};

// 	const handleContinueShopping = () => {
// 		router.push("/marketplace");
// 	};

// 	if (cartItems.length === 0) {
// 		return (
// 			<div className='min-h-screen bg-gray-50 flex items-center justify-center'>
// 				<div className='bg-white rounded-2xl shadow-lg p-12 text-center max-w-md mx-4'>
// 					<div className='w-24 h-24 mx-auto mb-6 bg-gradient-to-br from-green-100 to-green-200 rounded-full flex items-center justify-center'>
// 						<svg
// 							className='w-10 h-10 text-green-600'
// 							fill='none'
// 							stroke='currentColor'
// 							viewBox='0 0 24 24'>
// 							<path
// 								strokeLinecap='round'
// 								strokeLinejoin='round'
// 								strokeWidth={2}
// 								d='M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z'
// 							/>
// 						</svg>
// 					</div>
// 					<h2 className='text-2xl font-bold text-gray-900 mb-4'>
// 						Your cart is empty
// 					</h2>
// 					<p className='text-gray-500 mb-8'>
// 						Add some fresh produce to get started!
// 					</p>
// 					<button
// 						onClick={() => router.push("/marketplace")}
// 						className='bg-gradient-to-r from-green-600 to-green-700 text-white py-3 px-8 rounded-xl font-semibold hover:from-green-700 hover:to-green-800 transition-all duration-200 transform hover:scale-105'>
// 						Start Shopping
// 					</button>
// 				</div>
// 			</div>
// 		);
// 	}

// 	const subtotal = calculateSubtotal();
// 	const shipping = 1000; // Fixed shipping cost in Naira
// 	const total = subtotal + shipping;

// 	return (
// 		<div className='w-full lg:w-[80%] mx-auto p-4 mt-10'>
// 			<h1 className='text-2xl font-bold mb-8'>Shopping Cart</h1>

// 			<div className='flex flex-col lg:flex-row gap-8'>
// 				<div className='lg:w-2/3'>
// 					<div className='bg-white rounded-lg shadow-md overflow-scroll'>
// 						<table className='min-w-full divide-y divide-gray-200'>
// 							<thead className='bg-gray-50'>
// 								<tr>
// 									<th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
// 										Product
// 									</th>
// 									<th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
// 										Price
// 									</th>
// 									<th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
// 										Quantity
// 									</th>
// 									<th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
// 										Total
// 									</th>
// 									<th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
// 										Actions
// 									</th>
// 								</tr>
// 							</thead>
// 							<tbody className='bg-white divide-y divide-gray-200'>
// 								{cartItems.map((item) => {
// 									const itemPrice = parseFloat(
// 										item.price.replace(/[^\d.-]/g, "")
// 									);
// 									const itemTotal = itemPrice * item.quantity;

// 									return (
// 										<tr key={item.id}>
// 											<td className='px-6 py-4 whitespace-nowrap'>
// 												<div className='flex items-center'>
// 													<div className='h-16 w-16 flex-shrink-0 mr-4 relative'>
// 														<Image
// 															src={item.image}
// 															alt={item.title}
// 															fill
// 															className='object-cover rounded-md'
// 															sizes='64px'
// 														/>
// 													</div>
// 													<div>
// 														<div className='font-medium text-gray-900'>
// 															{item.title}
// 														</div>
// 													</div>
// 												</div>
// 											</td>
// 											<td className='px-6 py-4 whitespace-nowrap text-gray-900'>
// 												{item.price}
// 											</td>
// 											<td className='px-6 py-4 whitespace-nowrap'>
// 												<div className='flex items-center'>
// 													<button
// 														onClick={() =>
// 															updateQuantity(item.id, item.quantity - 1)
// 														}
// 														className='w-8 h-8 bg-gray-100 rounded-md flex items-center justify-center'>
// 														<span className='text-xl font-medium'>−</span>
// 													</button>
// 													<div className='w-10 h-8 bg-gray-100 mx-1 flex items-center justify-center text-lg'>
// 														{item.quantity}
// 													</div>
// 													<button
// 														onClick={() =>
// 															updateQuantity(item.id, item.quantity + 1)
// 														}
// 														className='w-8 h-8 bg-gray-100 rounded-md flex items-center justify-center'>
// 														<span className='text-xl font-medium'>+</span>
// 													</button>
// 												</div>
// 											</td>
// 											<td className='px-6 py-4 whitespace-nowrap text-gray-900 font-medium'>
// 												{formatPrice(itemTotal.toString())}
// 											</td>
// 											<td className='px-6 py-4 whitespace-nowrap text-right text-sm font-medium'>
// 												<button
// 													onClick={() => removeFromCart(item.id)}
// 													className='text-red-600 cursor-pointer hover:text-red-900'>
// 													<svg
// 														xmlns='http://www.w3.org/2000/svg'
// 														className='h-5 w-5'
// 														viewBox='0 0 20 20'
// 														fill='currentColor'>
// 														<path
// 															fillRule='evenodd'
// 															d='M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z'
// 															clipRule='evenodd'
// 														/>
// 													</svg>
// 												</button>
// 											</td>
// 										</tr>
// 									);
// 								})}
// 							</tbody>
// 						</table>
// 					</div>

// 					<div className='mt-6 flex justify-between'>
// 						<button
// 							onClick={handleContinueShopping}
// 							className='bg-white border border-gray-300 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-50 transition-colors'>
// 							Continue Shopping
// 						</button>
// 						<button
// 							onClick={clearCart}
// 							className='bg-white border border-red-500 text-red-500 py-2 px-4 rounded-lg hover:bg-red-50 transition-colors'>
// 							Clear Cart
// 						</button>
// 					</div>
// 				</div>

// 				<div className='lg:w-1/3'>
// 					<div className='bg-white rounded-lg shadow-md p-6'>
// 						<h2 className='text-lg font-bold mb-4'>Order Summary</h2>
// 						<div className='flex justify-between py-2 border-b border-gray-200'>
// 							<span className='text-gray-600'>Subtotal</span>
// 							<span className='font-medium'>
// 								{formatPrice(subtotal.toString())}
// 							</span>
// 						</div>
// 						<div className='flex justify-between py-2 border-b border-gray-200'>
// 							<span className='text-gray-600'>Shipping</span>
// 							<span className='font-medium'>
// 								{formatPrice(shipping.toString())}
// 							</span>
// 						</div>
// 						<div className='flex justify-between py-2 mt-2'>
// 							<span className='text-lg font-bold'>Total</span>
// 							<span className='text-lg font-bold'>
// 								{formatPrice(total.toString())}
// 							</span>
// 						</div>

// 						<button
// 							onClick={handleCheckout}
// 							className='w-full bg-green-600 text-white py-3 px-4 rounded-lg mt-6 hover:bg-green-700 transition-colors font-medium'>
// 							Proceed to Checkout
// 						</button>

// 						<div className='mt-4'>
// 							<div className='flex items-center text-gray-500 text-sm mb-1'>
// 								<svg
// 									xmlns='http://www.w3.org/2000/svg'
// 									className='h-4 w-4 mr-1'
// 									fill='none'
// 									viewBox='0 0 24 24'
// 									stroke='currentColor'>
// 									<path
// 										strokeLinecap='round'
// 										strokeLinejoin='round'
// 										strokeWidth={2}
// 										d='M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z'
// 									/>
// 								</svg>
// 								Secure payment
// 							</div>
// 							<div className='flex items-center text-gray-500 text-sm'>
// 								<svg
// 									xmlns='http://www.w3.org/2000/svg'
// 									className='h-4 w-4 mr-1'
// 									fill='none'
// 									viewBox='0 0 24 24'
// 									stroke='currentColor'>
// 									<path
// 										strokeLinecap='round'
// 										strokeLinejoin='round'
// 										strokeWidth={2}
// 										d='M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z'
// 									/>
// 								</svg>
// 								We accept all major credit cards
// 							</div>
// 						</div>
// 					</div>
// 				</div>
// 			</div>
// 		</div>
// 	);
// };

// export default ShoppingCart;

"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useCart } from "@/components/context/CardContext";
import Link from "next/link";

const ShoppingCart = () => {
	const { cartItems, updateQuantity, removeFromCart, clearCart } = useCart();
	const router = useRouter();

	const formatPrice = (price: string) => {
		return new Intl.NumberFormat("en-NG", {
			style: "currency",
			currency: "NGN",
			currencyDisplay: "symbol",
		})
			.format(parseFloat(price.replace(/[^\d.-]/g, "")))
			.replace("NGN", "₦");
	};

	const calculateSubtotal = () => {
		return cartItems.reduce((total, item) => {
			const price = parseFloat(item.price.replace(/[^\d.-]/g, ""));
			return total + price * item.quantity;
		}, 0);
	};

	const handleCheckout = () => {
		router.push("/marketplace/checkout");
	};

	const handleContinueShopping = () => {
		router.push("/marketplace");
	};

	if (cartItems.length === 0) {
		return (
			<div className='min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 flex items-center justify-center px-4'>
				<div className='bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl border border-green-100 p-12 text-center max-w-lg mx-4 relative overflow-hidden'>
					{/* Fresh Produce Icon */}
					<div className='relative w-32 h-32 mx-auto mb-8 bg-gradient-to-br from-green-400 via-emerald-500 to-green-600 rounded-full flex items-center justify-center shadow-lg transform rotate-3'>
						<div className='bg-white/20 backdrop-blur-sm rounded-full p-4'>
							<svg
								className='w-12 h-12 text-white'
								fill='none'
								stroke='currentColor'
								viewBox='0 0 24 24'>
								<path
									strokeLinecap='round'
									strokeLinejoin='round'
									strokeWidth={2}
									d='M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z'
								/>
							</svg>
						</div>
						{/* Floating leaves */}
						<div className='absolute -top-2 -right-2 w-6 h-6 bg-green-400 rounded-full opacity-60 animate-pulse'></div>
						<div className='absolute -bottom-1 -left-1 w-4 h-4 bg-emerald-300 rounded-full opacity-40 animate-pulse delay-700'></div>
					</div>

					<h2 className='text-3xl font-bold bg-gradient-to-r from-green-700 to-emerald-600 bg-clip-text text-transparent mb-4'>
						Your basket is empty
					</h2>
					<p className='text-gray-600 mb-8 text-lg leading-relaxed'>
						Fill your basket with fresh, locally grown produce
						<br />
						<span className='text-sm text-green-600 font-medium'>
							🌱 Farm to table in 24 hours
						</span>
					</p>
					<Link
						href={"/marketplace"}
						className='text-green-600  cursor-pointer underline mb-4'>
						<button className='group bg-gradient-to-r from-green-600 via-emerald-600 to-green-700 text-white py-4 px-10 rounded-2xl font-semibold hover:from-green-700 hover:via-emerald-700 hover:to-green-800 transition-all duration-300 transform hover:scale-105 hover:shadow-xl shadow-lg'>
							<span className='flex items-center justify-center gap-2'>
								🛒 Start Shopping
								<svg
									className='w-5 h-5 transition-transform group-hover:translate-x-1'
									fill='none'
									stroke='currentColor'
									viewBox='0 0 24 24'>
									<path
										strokeLinecap='round'
										strokeLinejoin='round'
										strokeWidth={2}
										d='M17 8l4 4m0 0l-4 4m4-4H3'
									/>
								</svg>
							</span>
						</button>
					</Link>
				</div>
			</div>
		);
	}

	const subtotal = calculateSubtotal();
	const shipping = 1000;
	const total = subtotal + shipping;

	return (
		<div className='min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50'>
			<div className='w-full lg:w-[85%] xl:w-[80%] mx-auto p-6 pt-12'>
				{/* Header Section */}
				<div className='mb-10'>
					<div className='flex items-center gap-3 mb-2'>
						<div className='w-8 h-8 bg-gradient-to-r from-green-500 to-emerald-500 rounded-lg flex items-center justify-center'>
							<svg
								className='w-5 h-5 text-white'
								fill='none'
								stroke='currentColor'
								viewBox='0 0 24 24'>
								<path
									strokeLinecap='round'
									strokeLinejoin='round'
									strokeWidth={2}
									d='M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z'
								/>
							</svg>
						</div>
						<h1 className='text-3xl font-bold bg-gradient-to-r from-green-700 to-emerald-600 bg-clip-text text-transparent'>
							Your Fresh Basket
						</h1>
					</div>
					<p className='text-gray-600 ml-11'>
						{cartItems.length} {cartItems.length === 1 ? "item" : "items"} •
						Ready for checkout
					</p>
				</div>

				<div className='flex flex-col xl:flex-row gap-8'>
					{/* Cart Items Section */}
					<div className='xl:w-2/3'>
						<div className='bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-green-100 overflow-hidden'>
							{/* Mobile Card View */}
							<div className='block md:hidden'>
								{cartItems.map((item) => {
									const itemPrice = parseFloat(
										item.price.replace(/[^\d.-]/g, "")
									);
									const itemTotal = itemPrice * item.quantity;

									return (
										<div
											key={item.id}
											className='p-6 border-b border-green-100 last:border-b-0'>
											<div className='flex gap-4'>
												<div className='relative w-20 h-20 rounded-xl overflow-hidden shadow-lg'>
													<Image
														src={item.image}
														alt={item.title}
														fill
														className='object-cover'
														sizes='80px'
													/>
												</div>
												<div className='flex-1'>
													<h3 className='font-semibold text-gray-900 mb-1'>
														{item.title}
													</h3>
													<p className='text-green-600 font-medium mb-3'>
														{item.price}
													</p>

													{/* Quantity Controls */}
													<div className='flex items-center justify-between'>
														<div className='flex items-center bg-gray-50 rounded-xl p-1'>
															<button
																onClick={() =>
																	updateQuantity(item.id, item.quantity - 1)
																}
																className='w-8 h-8 bg-white rounded-lg flex items-center justify-center shadow-sm hover:shadow-md transition-all'>
																<span className='text-lg font-medium text-gray-600'>
																	−
																</span>
															</button>
															<div className='w-12 h-8 flex items-center justify-center text-lg font-semibold'>
																{item.quantity}
															</div>
															<button
																onClick={() =>
																	updateQuantity(item.id, item.quantity + 1)
																}
																className='w-8 h-8 bg-white rounded-lg flex items-center justify-center shadow-sm hover:shadow-md transition-all'>
																<span className='text-lg font-medium text-gray-600'>
																	+
																</span>
															</button>
														</div>

														<div className='flex items-center gap-3'>
															<span className='font-bold text-gray-900'>
																{formatPrice(itemTotal.toString())}
															</span>
															<button
																onClick={() => removeFromCart(item.id)}
																className='w-8 h-8 bg-red-50 rounded-lg flex items-center justify-center text-red-500 hover:bg-red-100 transition-colors'>
																<svg
																	className='h-4 w-4'
																	viewBox='0 0 20 20'
																	fill='currentColor'>
																	<path
																		fillRule='evenodd'
																		d='M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z'
																		clipRule='evenodd'
																	/>
																</svg>
															</button>
														</div>
													</div>
												</div>
											</div>
										</div>
									);
								})}
							</div>

							{/* Desktop Table View */}
							<div className='hidden md:block overflow-x-auto'>
								<table className='min-w-full'>
									<thead className='bg-gradient-to-r from-green-50 to-emerald-50 border-b border-green-100'>
										<tr>
											<th className='px-8 py-4 text-left text-sm font-semibold text-green-800 uppercase tracking-wider'>
												Product
											</th>
											<th className='px-6 py-4 text-left text-sm font-semibold text-green-800 uppercase tracking-wider'>
												Price
											</th>
											<th className='px-6 py-4 text-left text-sm font-semibold text-green-800 uppercase tracking-wider'>
												Quantity
											</th>
											<th className='px-6 py-4 text-left text-sm font-semibold text-green-800 uppercase tracking-wider'>
												Total
											</th>
											<th className='px-6 py-4 text-center text-sm font-semibold text-green-800 uppercase tracking-wider'>
												Remove
											</th>
										</tr>
									</thead>
									<tbody className='bg-white divide-y divide-green-50'>
										{cartItems.map((item) => {
											const itemPrice = parseFloat(
												item.price.replace(/[^\d.-]/g, "")
											);
											const itemTotal = itemPrice * item.quantity;

											return (
												<tr
													key={item.id}
													className='hover:bg-green-25 transition-colors'>
													<td className='px-8 py-6'>
														<div className='flex items-center'>
															<div className='relative w-16 h-16 rounded-xl overflow-hidden shadow-lg mr-4'>
																<Image
																	src={item.image}
																	alt={item.title}
																	fill
																	className='object-cover'
																	sizes='64px'
																/>
															</div>
															<div>
																<div className='font-semibold text-gray-900 text-lg'>
																	{item.title}
																</div>
																<div className='text-sm text-green-600 mt-1'>
																	🌱 Fresh & Local
																</div>
															</div>
														</div>
													</td>
													<td className='px-6 py-6 text-green-600 font-semibold text-lg'>
														{item.price}
													</td>
													<td className='px-6 py-6'>
														<div className='flex items-center bg-gray-50 rounded-xl p-1 w-fit'>
															<button
																onClick={() =>
																	updateQuantity(item.id, item.quantity - 1)
																}
																className='w-10 h-10 bg-white rounded-lg flex items-center justify-center shadow-sm hover:shadow-md transition-all'>
																<span className='text-xl font-medium text-gray-600'>
																	−
																</span>
															</button>
															<div className='w-14 h-10 flex items-center justify-center text-lg font-semibold'>
																{item.quantity}
															</div>
															<button
																onClick={() =>
																	updateQuantity(item.id, item.quantity + 1)
																}
																className='w-10 h-10 bg-white rounded-lg flex items-center justify-center shadow-sm hover:shadow-md transition-all'>
																<span className='text-xl font-medium text-gray-600'>
																	+
																</span>
															</button>
														</div>
													</td>
													<td className='px-6 py-6 text-gray-900 font-bold text-lg'>
														{formatPrice(itemTotal.toString())}
													</td>
													<td className='px-6 py-6 text-center'>
														<button
															onClick={() => removeFromCart(item.id)}
															className='w-10 h-10 bg-red-50 rounded-xl flex items-center justify-center text-red-500 hover:bg-red-100 transition-all hover:scale-105 mx-auto'>
															<svg
																className='h-5 w-5'
																viewBox='0 0 20 20'
																fill='currentColor'>
																<path
																	fillRule='evenodd'
																	d='M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z'
																	clipRule='evenodd'
																/>
															</svg>
														</button>
													</td>
												</tr>
											);
										})}
									</tbody>
								</table>
							</div>
						</div>

						{/* Action Buttons */}
						<div className='mt-8 flex flex-col sm:flex-row justify-between gap-4'>
							<button
								onClick={handleContinueShopping}
								className='group bg-white/80 backdrop-blur-sm border-2 border-green-200 text-green-700 py-3 px-6 rounded-xl font-semibold hover:bg-green-50 hover:border-green-300 transition-all hover:scale-105 shadow-lg'>
								<span className='flex items-center justify-center gap-2'>
									<svg
										className='w-5 h-5 transition-transform group-hover:-translate-x-1'
										fill='none'
										stroke='currentColor'
										viewBox='0 0 24 24'>
										<path
											strokeLinecap='round'
											strokeLinejoin='round'
											strokeWidth={2}
											d='M7 16l-4-4m0 0l4-4m-4 4h18'
										/>
									</svg>
									Continue Shopping
								</span>
							</button>
							<button
								onClick={clearCart}
								className='bg-white/80 backdrop-blur-sm border-2 border-red-200 text-red-600 py-3 px-6 rounded-xl font-semibold hover:bg-red-50 hover:border-red-300 transition-all hover:scale-105 shadow-lg'>
								🗑️ Clear Basket
							</button>
						</div>
					</div>

					{/* Order Summary Section */}
					<div className='xl:w-1/3'>
						<div className='bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-green-100 p-8 sticky top-6'>
							<div className='flex items-center gap-3 mb-6'>
								<div className='w-8 h-8 bg-gradient-to-r from-emerald-500 to-green-500 rounded-lg flex items-center justify-center'>
									<svg
										className='w-5 h-5 text-white'
										fill='none'
										stroke='currentColor'
										viewBox='0 0 24 24'>
										<path
											strokeLinecap='round'
											strokeLinejoin='round'
											strokeWidth={2}
											d='M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z'
										/>
									</svg>
								</div>
								<h2 className='text-xl font-bold text-gray-900'>
									Order Summary
								</h2>
							</div>

							<div className='space-y-4 mb-6'>
								<div className='flex justify-between py-3 border-b border-green-100'>
									<span className='text-gray-600 font-medium'>Subtotal</span>
									<span className='font-semibold text-gray-900 text-lg'>
										{formatPrice(subtotal.toString())}
									</span>
								</div>
								<div className='flex justify-between py-3 border-b border-green-100'>
									<div className='flex items-center gap-2'>
										<svg
											className='w-4 h-4 text-green-600'
											fill='none'
											stroke='currentColor'
											viewBox='0 0 24 24'>
											<path
												strokeLinecap='round'
												strokeLinejoin='round'
												strokeWidth={2}
												d='M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z'
											/>
										</svg>
										<span className='text-gray-600 font-medium'>Delivery</span>
									</div>
									<span className='font-semibold text-gray-900 text-lg'>
										{formatPrice(shipping.toString())}
									</span>
								</div>
								<div className='flex justify-between py-4 mt-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl px-4'>
									<span className='text-xl font-bold text-green-800'>
										Total
									</span>
									<span className='text-xl font-bold text-green-800'>
										{formatPrice(total.toString())}
									</span>
								</div>
							</div>

							<button
								onClick={handleCheckout}
								className='w-full bg-gradient-to-r from-green-600 via-emerald-600 to-green-700 text-white py-4 px-6 rounded-xl font-semibold hover:from-green-700 hover:via-emerald-700 hover:to-green-800 transition-all hover:scale-105 shadow-lg hover:shadow-xl mb-6'>
								<span className='flex items-center justify-center gap-2'>
									🛒 Proceed to Checkout
									<svg
										className='w-5 h-5'
										fill='none'
										stroke='currentColor'
										viewBox='0 0 24 24'>
										<path
											strokeLinecap='round'
											strokeLinejoin='round'
											strokeWidth={2}
											d='M17 8l4 4m0 0l-4 4m4-4H3'
										/>
									</svg>
								</span>
							</button>

							{/* Trust Indicators */}
							<div className='space-y-3 pt-4 border-t border-green-100'>
								<div className='flex items-center text-gray-600 text-sm'>
									<div className='w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center mr-3'>
										<svg
											className='h-4 w-4 text-green-600'
											fill='none'
											viewBox='0 0 24 24'
											stroke='currentColor'>
											<path
												strokeLinecap='round'
												strokeLinejoin='round'
												strokeWidth={2}
												d='M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z'
											/>
										</svg>
									</div>
									<span className='font-medium'>Secure SSL payment</span>
								</div>
								<div className='flex items-center text-gray-600 text-sm'>
									<div className='w-8 h-8 bg-emerald-100 rounded-lg flex items-center justify-center mr-3'>
										<svg
											className='h-4 w-4 text-emerald-600'
											fill='none'
											viewBox='0 0 24 24'
											stroke='currentColor'>
											<path
												strokeLinecap='round'
												strokeLinejoin='round'
												strokeWidth={2}
												d='M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z'
											/>
										</svg>
									</div>
									<span className='font-medium'>All major cards accepted</span>
								</div>
								<div className='flex items-center text-gray-600 text-sm'>
									<div className='w-8 h-8 bg-teal-100 rounded-lg flex items-center justify-center mr-3'>
										<svg
											className='h-4 w-4 text-teal-600'
											fill='none'
											viewBox='0 0 24 24'
											stroke='currentColor'>
											<path
												strokeLinecap='round'
												strokeLinejoin='round'
												strokeWidth={2}
												d='M8 7V3a4 4 0 118 0v4M5 9h14l1 12H4L5 9z'
											/>
										</svg>
									</div>
									<span className='font-medium'>24hr freshness guarantee</span>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default ShoppingCart;
