"use client";

import React, { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useCart } from "@/components/context/CardContext";

const Checkout = () => {
	const { cartItems, clearCart } = useCart();
	const router = useRouter();
	const [couponCode, setCouponCode] = useState("");
	const [discountAmount, setDiscountAmount] = useState(0);
	const [appliedDiscount, setAppliedDiscount] = useState(false);
	const [paymentMethod, setPaymentMethod] = useState<string | null>(null);

	// Payment form
	const [shippingData, setShippingData] = useState({
		firstName: "",
		lastName: "",
		address: "",
		apartment: "",
		city: "",
		state: "",
		zipCode: "",
		phone: "",
	});

	const formatPrice = (price: number | string) => {
		if (typeof price === "string") {
			price = parseFloat(price.replace(/[^\d.-]/g, ""));
		}

		return new Intl.NumberFormat("en-NG", {
			style: "currency",
			currency: "NGN",
			currencyDisplay: "symbol",
		})
			.format(price)
			.replace("NGN", "₦");
	};

	const calculateSubtotal = () => {
		return cartItems.reduce((total, item) => {
			const price = parseFloat(item.price.replace(/[^\d.-]/g, ""));
			return total + price * item.quantity;
		}, 0);
	};

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		setShippingData((prev) => ({
			...prev,
			[name]: value,
		}));
	};

	const handleApplyCoupon = () => {
		// Simple mock implementation for coupon
		if (couponCode.toLowerCase() === "discount10") {
			const discount = calculateSubtotal() * 0.1;
			setDiscountAmount(discount);
			setAppliedDiscount(true);
		} else {
			setDiscountAmount(0);
			setAppliedDiscount(false);
		}
	};

	const handleBack = () => {
		router.push("/dashboard/cart-view");
	};

	const handleNextStep = () => {
		if (!paymentMethod) {
			setPaymentMethod("card");
		} else {
			// Process payment and complete order
			// For demonstration, we'll just clear the cart and redirect
			alert("Order placed successfully!");
			clearCart();
			router.push("/dashboard/marketplace");
		}
	};

	if (cartItems.length === 0) {
		return (
			<div className='max-w-6xl mx-auto p-4 '>
				<h1 className='text-2xl font-bold mb-8'>Checkout</h1>
				<div className='bg-white rounded-lg shadow-md p-8 text-center'>
					<div className='text-gray-500 mb-4 text-lg'>Your cart is empty</div>
					<button
						onClick={() => router.push("/dashboard/marketplace")}
						className='bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition-colors'>
						Continue Shopping
					</button>
				</div>
			</div>
		);
	}

	const subtotal = calculateSubtotal();
	const shipping = 5000; // Default shipping cost
	const total = subtotal + shipping - discountAmount;

	return (
		<div className='w-[80%] mx-auto p-4 mt-6'>
			<button
				onClick={handleBack}
				className='flex cursor-pointer items-center mb-8 text-gray-600 hover:text-gray-900 transition-colors'>
				<svg
					xmlns='http://www.w3.org/2000/svg'
					className='h-5 w-5 mr-1'
					viewBox='0 0 20 20'
					fill='currentColor'>
					<path
						fillRule='evenodd'
						d='M9.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L7.414 9H15a1 1 0 110 2H7.414l2.293 2.293a1 1 0 010 1.414z'
						clipRule='evenodd'
					/>
				</svg>
				Back
			</button>

			<div className='flex flex-col lg:flex-row gap-8'>
				{/* Left Section - Customer Details */}
				<div className='lg:w-2/3'>
					<div className='bg-white p-6 rounded-lg shadow-md mb-6'>
						<h2 className='text-xl font-semibold mb-4'>Your Details</h2>

						<div className='mb-4'>
							<p className='text-gray-700'>
								<span className='font-medium'>Name:</span> Ubuntu Farms
							</p>
							<p className='text-gray-700'>
								<span className='font-medium'>Email:</span>{" "}
								ubuntufarms@gmail.com
							</p>
						</div>
					</div>

					<div className='bg-white p-6 rounded-lg shadow-md mb-6'>
						<h2 className='text-xl font-semibold mb-4'>Delivery Information</h2>

						<div className='mb-4'>
							<label className='block text-gray-700 mb-2'>Country/Region</label>
							<div className='relative'>
								<div className='flex items-center border rounded-md p-2 bg-gray-50'>
									<div className='flex items-center'>
										<span className='mr-2'>
											<div className='w-6 h-4 bg-green-600 relative'>
												<div className='absolute inset-0 flex items-center justify-center'>
													<div className='w-1/2 h-full bg-white'></div>
												</div>
											</div>
										</span>
										<span>Nigeria</span>
									</div>
									<svg
										className='w-4 h-4 ml-auto'
										viewBox='0 0 20 20'
										fill='currentColor'>
										<path
											fillRule='evenodd'
											d='M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z'
											clipRule='evenodd'
										/>
									</svg>
								</div>
							</div>
						</div>

						<div className='grid grid-cols-1 md:grid-cols-2 gap-4 mb-4'>
							<div>
								<label className='block text-gray-700 mb-2'>First Name</label>
								<input
									type='text'
									name='firstName'
									value={shippingData.firstName || "Ubuntu"}
									onChange={handleInputChange}
									className='w-full border rounded-md p-2'
								/>
							</div>
							<div>
								<label className='block text-gray-700 mb-2'>Last Name</label>
								<input
									type='text'
									name='lastName'
									value={shippingData.lastName || "Farms"}
									onChange={handleInputChange}
									className='w-full border rounded-md p-2'
								/>
							</div>
						</div>

						<div className='mb-4'>
							<label className='block text-gray-700 mb-2'>Address</label>
							<input
								type='text'
								name='address'
								value={shippingData.address || "No. 33b Lorem Ipsum Dolor"}
								onChange={handleInputChange}
								className='w-full border rounded-md p-2'
							/>
						</div>

						<div className='mb-4'>
							<button className='flex items-center text-green-600 hover:text-green-700'>
								<svg
									xmlns='http://www.w3.org/2000/svg'
									className='h-5 w-5 mr-1'
									viewBox='0 0 20 20'
									fill='currentColor'>
									<path
										fillRule='evenodd'
										d='M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z'
										clipRule='evenodd'
									/>
								</svg>
								Add apartment, suites, etc.
							</button>
						</div>

						<div className='grid grid-cols-1 md:grid-cols-3 gap-4 mb-4'>
							<div>
								<label className='block text-gray-700 mb-2'>City</label>
								<input
									type='text'
									name='city'
									value={shippingData.city || "Lorem Ipsum"}
									onChange={handleInputChange}
									className='w-full border rounded-md p-2'
								/>
							</div>
							<div>
								<label className='block text-gray-700 mb-2'>State</label>
								<div className='relative'>
									<select
										name='state'
										className='w-full border rounded-md p-2 appearance-none bg-white pr-8'>
										<option>Lorem Ipsum</option>
									</select>
									<div className='absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none'>
										<svg
											className='w-4 h-4'
											viewBox='0 0 20 20'
											fill='currentColor'>
											<path
												fillRule='evenodd'
												d='M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z'
												clipRule='evenodd'
											/>
										</svg>
									</div>
								</div>
							</div>
							<div>
								<label className='block text-gray-700 mb-2'>Zip Code</label>
								<input
									type='text'
									name='zipCode'
									value={shippingData.zipCode || "123445"}
									onChange={handleInputChange}
									className='w-full border rounded-md p-2'
								/>
							</div>
						</div>

						<div className='mb-4'>
							<label className='block text-gray-700 mb-2'>Phone number</label>
							<div className='relative'>
								<input
									type='text'
									name='phone'
									value={shippingData.phone || "+234 812 345 6789"}
									onChange={handleInputChange}
									className='w-full border rounded-md p-2 pl-10'
								/>
								<div className='absolute right-2 top-1/2 transform -translate-y-1/2'>
									<svg
										xmlns='http://www.w3.org/2000/svg'
										className='h-5 w-5 text-gray-400'
										viewBox='0 0 20 20'
										fill='currentColor'>
										<path
											fillRule='evenodd'
											d='M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z'
											clipRule='evenodd'
										/>
									</svg>
								</div>
							</div>
						</div>
					</div>

					<div className='bg-white p-6 rounded-lg shadow-md mb-6'>
						<h2 className='text-xl font-semibold mb-4'>Shipping Method</h2>

						<div className='space-y-3'>
							<label className='flex items-center justify-between p-3 border rounded-md'>
								<div className='flex items-center'>
									<input
										type='radio'
										name='shipping'
										value='economy'
										defaultChecked
										className='h-4 w-4 text-green-600'
									/>
									<span className='ml-2'>Economy</span>
								</div>
								<span>{formatPrice(5000)}</span>
							</label>

							<label className='flex items-center justify-between p-3 border rounded-md'>
								<div className='flex items-center'>
									<input
										type='radio'
										name='shipping'
										value='standard'
										className='h-4 w-4 text-green-600'
									/>
									<span className='ml-2'>Standard</span>
								</div>
								<span>{formatPrice(10000)}</span>
							</label>
						</div>
					</div>

					<div className='mt-6'>
						<button
							onClick={handleNextStep}
							className='w-full bg-green-600 text-white py-3 px-4 rounded-lg hover:bg-green-700 transition-colors font-medium'>
							Next - Select Payment Method
						</button>
					</div>
				</div>

				{/* Right Section - Order Summary */}
				<div className='lg:w-1/3'>
					<div className='bg-white p-6 rounded-lg shadow-md'>
						<h2 className='text-xl font-semibold mb-4'>Order Summary</h2>

						<div className='mb-4'>
							{cartItems.map((item) => (
								<div
									key={item.id}
									className='flex mb-4 pb-4 border-b border-gray-200'>
									<div className='h-16 w-16 flex-shrink-0 mr-4 relative'>
										<Image
											src={item.image}
											alt={item.title}
											fill
											className='object-cover rounded-md'
											sizes='64px'
										/>
									</div>
									<div className='flex-1'>
										<div className='flex justify-between'>
											<h3 className='font-medium text-gray-900'>
												{item.title}
											</h3>
											<p className='text-gray-900 font-medium'>
												{formatPrice(
													parseFloat(item.price.replace(/[^\d.-]/g, "")) *
														item.quantity
												)}
											</p>
										</div>
										<p className='text-gray-500'>Quantity: {item.quantity}</p>
									</div>
								</div>
							))}
						</div>

						<div className='mb-4'>
							<div className='flex gap-3 items-center'>
								<input
									type='text'
									placeholder='Got a discount code or coupon? Enter it'
									value={couponCode}
									onChange={(e) => setCouponCode(e.target.value)}
									className='flex-1 border rounded-l-md p-2'
								/>
								<button
									onClick={handleApplyCoupon}
									className='bg-green-600 text-white py-2 px-4 rounded hover:bg-green-700 transition-colors'>
									Apply
								</button>
							</div>
						</div>

						<div className='space-y-2 pb-4 border-b border-gray-200'>
							<div className='flex justify-between'>
								<span className='text-gray-600'>Subtotal</span>
								<span className='font-medium'>{formatPrice(subtotal)}</span>
							</div>
							<div className='flex justify-between'>
								<span className='text-gray-600'>Shipping</span>
								<span className='font-medium'>{formatPrice(shipping)}</span>
							</div>
							<div className='flex justify-between text-red-500'>
								<span>Discount</span>
								<span>
									{appliedDiscount
										? `- ${formatPrice(discountAmount)}`
										: "- 0.00"}
								</span>
							</div>
						</div>

						<div className='flex justify-between py-4 font-bold text-lg'>
							<span>Total:</span>
							<span>{formatPrice(total)}</span>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Checkout;
