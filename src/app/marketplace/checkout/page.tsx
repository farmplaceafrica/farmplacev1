"use client";

import React, { useState, useEffect } from "react";
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
	const [isLoading, setIsLoading] = useState(true);
	const [shippingMethod, setShippingMethod] = useState("economy");

	// Contact information
	const [contactData, setContactData] = useState({
		email: "",
		phone: "",
	});

	// Shipping form
	const [shippingData, setShippingData] = useState({
		firstName: "",
		lastName: "",
		address: "",
		apartment: "",
		city: "",
		state: "",
		zipCode: "",
	});

	// Add useEffect to handle loading state
	useEffect(() => {
		const timer = setTimeout(() => {
			setIsLoading(false);
		}, 100);
		return () => clearTimeout(timer);
	}, []);

	const formatPrice = (price: number | string) => {
		if (typeof price === "string") {
			price = parseFloat(price.replace(/[^\d.-]/g, ""));
		}
		if (isNaN(price)) price = 0;

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
			const validPrice = isNaN(price) ? 0 : price;
			return total + validPrice * item.quantity;
		}, 0);
	};

	const handleContactChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		setContactData((prev) => ({ ...prev, [name]: value }));
	};

	const handleShippingChange = (
		e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
	) => {
		const { name, value } = e.target;
		setShippingData((prev) => ({ ...prev, [name]: value }));
	};

	const handleApplyCoupon = () => {
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
		router.push("/marketplace/cart-view");
	};

	const handlePlaceOrder = () => {
		alert("Order placed successfully!");
		clearCart();
		router.push("/marketplace");
	};

	if (isLoading) {
		return (
			<div className='min-h-screen bg-gray-50 flex items-center justify-center'>
				<div className='animate-spin rounded-full h-12 w-12 border-b-2 border-green-600'></div>
			</div>
		);
	}

	if (!cartItems || cartItems.length === 0) {
		return (
			<div className='min-h-screen bg-gray-50 flex items-center justify-center'>
				<div className='bg-white rounded-2xl shadow-lg p-12 text-center max-w-md mx-4'>
					<div className='w-24 h-24 mx-auto mb-6 bg-gradient-to-br from-green-100 to-green-200 rounded-full flex items-center justify-center'>
						<svg
							className='w-10 h-10 text-green-600'
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
					<h2 className='text-2xl font-bold text-gray-900 mb-4'>
						Your cart is empty
					</h2>
					<p className='text-gray-500 mb-8'>
						Add some fresh produce to get started!
					</p>
					<button
						onClick={() => router.push("/marketplace")}
						className='bg-gradient-to-r from-green-600 to-green-700 text-white py-3 px-8 rounded-xl font-semibold hover:from-green-700 hover:to-green-800 transition-all duration-200 transform hover:scale-105'>
						Start Shopping
					</button>
				</div>
			</div>
		);
	}

	const subtotal = calculateSubtotal();
	const shippingCost = shippingMethod === "standard" ? 10000 : 5000;
	const total = subtotal + shippingCost - discountAmount;

	return (
		<div className='min-h-screen bg-gray-50'>
			{/* Header */}
			<div className='bg-white shadow-sm border-b'>
				<div className='max-w-7xl mx-auto px-4 py-6'>
					<button
						onClick={handleBack}
						className='flex items-center text-gray-600 hover:text-gray-900 transition-colors group mb-4'>
						<svg
							className='h-5 w-5 mr-2 group-hover:-translate-x-1 transition-transform'
							fill='none'
							stroke='currentColor'
							viewBox='0 0 24 24'>
							<path
								strokeLinecap='round'
								strokeLinejoin='round'
								strokeWidth={2}
								d='M15 19l-7-7 7-7'
							/>
						</svg>
						Back to Cart
					</button>
					<h1 className='text-3xl font-bold text-gray-900'>Checkout</h1>
					<p className='text-gray-600 mt-2'>
						Complete your order in just a few steps
					</p>
				</div>
			</div>

			<div className='max-w-7xl mx-auto px-4 py-8'>
				<div className='grid grid-cols-1 lg:grid-cols-3 gap-8'>
					{/* Left Section - Forms */}
					<div className='lg:col-span-2 space-y-8'>
						{/* Contact Information */}
						<div className='bg-white rounded-2xl shadow-sm border p-8'>
							<div className='flex items-center mb-6'>
								<div className='w-8 h-8 bg-green-600 text-white rounded-full flex items-center justify-center text-sm font-semibold mr-3'>
									1
								</div>
								<h2 className='text-xl font-semibold text-gray-900'>
									Contact Information
								</h2>
							</div>

							<div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
								<div className='space-y-2'>
									<label className='text-sm font-medium text-gray-700'>
										Email Address *
									</label>
									<input
										type='email'
										name='email'
										value={contactData.email}
										onChange={handleContactChange}
										placeholder='Enter your email'
										className='w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200 placeholder-gray-400'
									/>
								</div>
								<div className='space-y-2'>
									<label className='text-sm font-medium text-gray-700'>
										Phone Number *
									</label>
									<input
										type='tel'
										name='phone'
										value={contactData.phone}
										onChange={handleContactChange}
										placeholder='+234 xxx xxx xxxx'
										className='w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200 placeholder-gray-400'
									/>
								</div>
							</div>
						</div>

						{/* Delivery Information */}
						<div className='bg-white rounded-2xl shadow-sm border p-8'>
							<div className='flex items-center mb-6'>
								<div className='w-8 h-8 bg-green-600 text-white rounded-full flex items-center justify-center text-sm font-semibold mr-3'>
									2
								</div>
								<h2 className='text-xl font-semibold text-gray-900'>
									Delivery Address
								</h2>
							</div>

							<div className='space-y-6'>
								<div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
									<div className='space-y-2'>
										<label className='text-sm font-medium text-gray-700'>
											First Name *
										</label>
										<input
											type='text'
											name='firstName'
											value={shippingData.firstName}
											onChange={handleShippingChange}
											placeholder='Enter first name'
											className='w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200 placeholder-gray-400'
										/>
									</div>
									<div className='space-y-2'>
										<label className='text-sm font-medium text-gray-700'>
											Last Name *
										</label>
										<input
											type='text'
											name='lastName'
											value={shippingData.lastName}
											onChange={handleShippingChange}
											placeholder='Enter last name'
											className='w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200 placeholder-gray-400'
										/>
									</div>
								</div>

								<div className='space-y-2'>
									<label className='text-sm font-medium text-gray-700'>
										Street Address *
									</label>
									<input
										type='text'
										name='address'
										value={shippingData.address}
										onChange={handleShippingChange}
										placeholder='Enter your street address'
										className='w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200 placeholder-gray-400'
									/>
								</div>

								<div className='space-y-2'>
									<label className='text-sm font-medium text-gray-700'>
										Apartment, suite, etc. (optional)
									</label>
									<input
										type='text'
										name='apartment'
										value={shippingData.apartment}
										onChange={handleShippingChange}
										placeholder='Apartment, suite, unit, building, floor, etc.'
										className='w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200 placeholder-gray-400'
									/>
								</div>

								<div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
									<div className='space-y-2'>
										<label className='text-sm font-medium text-gray-700'>
											City *
										</label>
										<input
											type='text'
											name='city'
											value={shippingData.city}
											onChange={handleShippingChange}
											placeholder='Enter city'
											className='w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200 placeholder-gray-400'
										/>
									</div>
									<div className='space-y-2'>
										<label className='text-sm font-medium text-gray-700'>
											State *
										</label>
										<select
											name='state'
											value={shippingData.state}
											onChange={handleShippingChange}
											className='w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200 appearance-none bg-white'>
											<option value=''>Select state</option>
											<option value='lagos'>Lagos</option>
											<option value='abuja'>Abuja</option>
											<option value='kano'>Kano</option>
											<option value='ogun'>Ogun</option>
											<option value='rivers'>Rivers</option>
										</select>
									</div>
									<div className='space-y-2'>
										<label className='text-sm font-medium text-gray-700'>
											Zip Code
										</label>
										<input
											type='text'
											name='zipCode'
											value={shippingData.zipCode}
											onChange={handleShippingChange}
											placeholder='Enter zip code'
											className='w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200 placeholder-gray-400'
										/>
									</div>
								</div>
							</div>
						</div>

						{/* Shipping Method */}
						<div className='bg-white rounded-2xl shadow-sm border p-8'>
							<div className='flex items-center mb-6'>
								<div className='w-8 h-8 bg-green-600 text-white rounded-full flex items-center justify-center text-sm font-semibold mr-3'>
									3
								</div>
								<h2 className='text-xl font-semibold text-gray-900'>
									Shipping Method
								</h2>
							</div>

							<div className='space-y-4'>
								<label
									className={`flex items-center justify-between p-4 border-2 rounded-xl cursor-pointer transition-all duration-200 ${
										shippingMethod === "economy"
											? "border-green-500 bg-green-50"
											: "border-gray-200 hover:border-gray-300"
									}`}>
									<div className='flex items-center'>
										<input
											type='radio'
											name='shipping'
											value='economy'
											checked={shippingMethod === "economy"}
											onChange={(e) => setShippingMethod(e.target.value)}
											className='h-4 w-4 text-green-600 focus:ring-green-500'
										/>
										<div className='ml-4'>
											<span className='font-medium text-gray-900'>
												Economy Delivery
											</span>
											<p className='text-sm text-gray-500'>5-7 business days</p>
										</div>
									</div>
									<span className='font-semibold text-gray-900'>
										{formatPrice(5000)}
									</span>
								</label>

								<label
									className={`flex items-center justify-between p-4 border-2 rounded-xl cursor-pointer transition-all duration-200 ${
										shippingMethod === "standard"
											? "border-green-500 bg-green-50"
											: "border-gray-200 hover:border-gray-300"
									}`}>
									<div className='flex items-center'>
										<input
											type='radio'
											name='shipping'
											value='standard'
											checked={shippingMethod === "standard"}
											onChange={(e) => setShippingMethod(e.target.value)}
											className='h-4 w-4 text-green-600 focus:ring-green-500'
										/>
										<div className='ml-4'>
											<span className='font-medium text-gray-900'>
												Standard Delivery
											</span>
											<p className='text-sm text-gray-500'>2-3 business days</p>
										</div>
									</div>
									<span className='font-semibold text-gray-900'>
										{formatPrice(10000)}
									</span>
								</label>
							</div>
						</div>
					</div>

					{/* Right Section - Order Summary */}
					<div className='lg:col-span-1'>
						<div className='bg-white rounded-2xl shadow-sm border p-8 sticky top-8'>
							<h2 className='text-xl font-semibold text-gray-900 mb-6'>
								Order Summary
							</h2>

							{/* Cart Items */}
							<div className='space-y-4 mb-6'>
								{cartItems.map((item, index) => (
									<div
										key={`${item.id}-${index}`}
										className='flex items-center space-x-4 p-4 bg-gray-50 rounded-xl'>
										<div className='relative h-16 w-16 flex-shrink-0'>
											<Image
												src={item.image || "/placeholder-image.jpg"}
												alt={item.title || "Product"}
												fill
												className='object-cover rounded-lg'
												sizes='64px'
											/>
											<span className='absolute -top-2 -right-2 bg-green-600 text-white text-xs rounded-full h-6 w-6 flex items-center justify-center font-medium'>
												{item.quantity}
											</span>
										</div>
										<div className='flex-1 min-w-0'>
											<h3 className='font-medium text-gray-900 truncate'>
												{item.title}
											</h3>
											<p className='text-sm text-gray-500'>
												Qty: {item.quantity}
											</p>
										</div>
										<div className='text-right'>
											<p className='font-semibold text-gray-900'>
												{formatPrice(
													parseFloat(item.price.replace(/[^\d.-]/g, "")) *
														item.quantity
												)}
											</p>
										</div>
									</div>
								))}
							</div>

							{/* Coupon */}
							<div className='mb-6'>
								<div className='flex gap-2'>
									<input
										type='text'
										placeholder='Enter coupon code'
										value={couponCode}
										onChange={(e) => setCouponCode(e.target.value)}
										className='flex-1 px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200 placeholder-gray-400'
									/>
									<button
										onClick={handleApplyCoupon}
										className='px-6 py-3 bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200 transition-colors font-medium'>
										Apply
									</button>
								</div>
								{appliedDiscount && (
									<p className='text-sm text-green-600 mt-2 flex items-center'>
										<svg
											className='w-4 h-4 mr-1'
											fill='none'
											stroke='currentColor'
											viewBox='0 0 24 24'>
											<path
												strokeLinecap='round'
												strokeLinejoin='round'
												strokeWidth={2}
												d='M5 13l4 4L19 7'
											/>
										</svg>
										Coupon applied successfully!
									</p>
								)}
							</div>

							{/* Price Breakdown */}
							<div className='space-y-3 py-4 border-t border-gray-200'>
								<div className='flex justify-between text-gray-600'>
									<span>Subtotal</span>
									<span>{formatPrice(subtotal)}</span>
								</div>
								<div className='flex justify-between text-gray-600'>
									<span>Shipping</span>
									<span>{formatPrice(shippingCost)}</span>
								</div>
								{appliedDiscount && (
									<div className='flex justify-between text-green-600'>
										<span>Discount</span>
										<span>-{formatPrice(discountAmount)}</span>
									</div>
								)}
							</div>

							<div className='flex justify-between py-4 border-t border-gray-200 text-lg font-bold text-gray-900'>
								<span>Total</span>
								<span>{formatPrice(total)}</span>
							</div>

							<button
								onClick={handlePlaceOrder}
								className='w-full bg-gradient-to-r from-green-600 to-green-700 text-white py-4 px-6 rounded-xl font-semibold hover:from-green-700 hover:to-green-800 transition-all duration-200 transform hover:scale-[1.02] shadow-lg'>
								Complete Order
							</button>

							<div className='flex items-center justify-center mt-4 text-sm text-gray-500'>
								<svg
									className='w-4 h-4 mr-2'
									fill='none'
									stroke='currentColor'
									viewBox='0 0 24 24'>
									<path
										strokeLinecap='round'
										strokeLinejoin='round'
										strokeWidth={2}
										d='M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z'
									/>
								</svg>
								Secure and encrypted checkout
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Checkout;
