"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useCart } from "@/components/context/CardContext";

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
		router.push("/dashboard/checkout");
	};

	const handleContinueShopping = () => {
		router.push("/dashboard/marketplace");
	};

	if (cartItems.length === 0) {
		return (
			<div className='max-w-6xl mx-auto p-4 mt-10'>
				<h1 className='text-2xl font-bold mb-8'>Shopping Cart</h1>
				<div className='bg-white rounded-lg shadow-md p-8 text-center'>
					<div className='text-gray-500 mb-4 text-lg'>Your cart is empty</div>
					<button
						onClick={handleContinueShopping}
						className='bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition-colors'>
						Continue Shopping
					</button>
				</div>
			</div>
		);
	}

	const subtotal = calculateSubtotal();
	const shipping = 1000; // Fixed shipping cost in Naira
	const total = subtotal + shipping;

	return (
		<div className='max-w-6xl mx-auto p-4 mt-10'>
			<h1 className='text-2xl font-bold mb-8'>Shopping Cart</h1>

			<div className='flex flex-col lg:flex-row gap-8'>
				<div className='lg:w-2/3'>
					<div className='bg-white rounded-lg shadow-md overflow-hidden'>
						<table className='min-w-full divide-y divide-gray-200'>
							<thead className='bg-gray-50'>
								<tr>
									<th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
										Product
									</th>
									<th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
										Price
									</th>
									<th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
										Quantity
									</th>
									<th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
										Total
									</th>
									<th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
										Actions
									</th>
								</tr>
							</thead>
							<tbody className='bg-white divide-y divide-gray-200'>
								{cartItems.map((item) => {
									const itemPrice = parseFloat(
										item.price.replace(/[^\d.-]/g, "")
									);
									const itemTotal = itemPrice * item.quantity;

									return (
										<tr key={item.id}>
											<td className='px-6 py-4 whitespace-nowrap'>
												<div className='flex items-center'>
													<div className='h-16 w-16 flex-shrink-0 mr-4 relative'>
														<Image
															src={item.image}
															alt={item.title}
															fill
															className='object-cover rounded-md'
															sizes='64px'
														/>
													</div>
													<div>
														<div className='font-medium text-gray-900'>
															{item.title}
														</div>
													</div>
												</div>
											</td>
											<td className='px-6 py-4 whitespace-nowrap text-gray-900'>
												{item.price}
											</td>
											<td className='px-6 py-4 whitespace-nowrap'>
												<div className='flex items-center'>
													<button
														onClick={() =>
															updateQuantity(item.id, item.quantity - 1)
														}
														className='w-8 h-8 bg-gray-100 rounded-md flex items-center justify-center'>
														<span className='text-xl font-medium'>−</span>
													</button>
													<div className='w-10 h-8 bg-gray-100 mx-1 flex items-center justify-center text-lg'>
														{item.quantity}
													</div>
													<button
														onClick={() =>
															updateQuantity(item.id, item.quantity + 1)
														}
														className='w-8 h-8 bg-gray-100 rounded-md flex items-center justify-center'>
														<span className='text-xl font-medium'>+</span>
													</button>
												</div>
											</td>
											<td className='px-6 py-4 whitespace-nowrap text-gray-900 font-medium'>
												{formatPrice(itemTotal.toString())}
											</td>
											<td className='px-6 py-4 whitespace-nowrap text-right text-sm font-medium'>
												<button
													onClick={() => removeFromCart(item.id)}
													className='text-red-600 hover:text-red-900'>
													<svg
														xmlns='http://www.w3.org/2000/svg'
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

					<div className='mt-6 flex justify-between'>
						<button
							onClick={handleContinueShopping}
							className='bg-white border border-gray-300 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-50 transition-colors'>
							Continue Shopping
						</button>
						<button
							onClick={clearCart}
							className='bg-white border border-red-500 text-red-500 py-2 px-4 rounded-lg hover:bg-red-50 transition-colors'>
							Clear Cart
						</button>
					</div>
				</div>

				<div className='lg:w-1/3'>
					<div className='bg-white rounded-lg shadow-md p-6'>
						<h2 className='text-lg font-bold mb-4'>Order Summary</h2>
						<div className='flex justify-between py-2 border-b border-gray-200'>
							<span className='text-gray-600'>Subtotal</span>
							<span className='font-medium'>
								{formatPrice(subtotal.toString())}
							</span>
						</div>
						<div className='flex justify-between py-2 border-b border-gray-200'>
							<span className='text-gray-600'>Shipping</span>
							<span className='font-medium'>
								{formatPrice(shipping.toString())}
							</span>
						</div>
						<div className='flex justify-between py-2 mt-2'>
							<span className='text-lg font-bold'>Total</span>
							<span className='text-lg font-bold'>
								{formatPrice(total.toString())}
							</span>
						</div>

						<button
							onClick={handleCheckout}
							className='w-full bg-green-600 text-white py-3 px-4 rounded-lg mt-6 hover:bg-green-700 transition-colors font-medium'>
							Proceed to Checkout
						</button>

						<div className='mt-4'>
							<div className='flex items-center text-gray-500 text-sm mb-1'>
								<svg
									xmlns='http://www.w3.org/2000/svg'
									className='h-4 w-4 mr-1'
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
								Secure payment
							</div>
							<div className='flex items-center text-gray-500 text-sm'>
								<svg
									xmlns='http://www.w3.org/2000/svg'
									className='h-4 w-4 mr-1'
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
								We accept all major credit cards
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default ShoppingCart;
