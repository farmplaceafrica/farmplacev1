"use client";

import Input from "@/components/global/Input";
import { useForm } from "react-hook-form";
import { FormProvider } from "react-hook-form";
import { ShoppingCart } from "lucide-react";
import { UserIcon } from "lucide-react";
import { Search } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useCart } from "@/components/context/CardContext"; // Import the cart context

const DashboardNavbar = () => {
	// Make sure you're using the correct import for useForm
	const methods = useForm({
		defaultValues: {
			search: "",
		},
	});

	// Get cart items from context
	const { cartItems } = useCart();

	// Calculate total number of items in cart
	const cartItemCount = cartItems.reduce(
		(total, item) => total + item.quantity,
		0
	);

	return (
		<FormProvider {...methods}>
			<div className='w-full p-4 flex justify-between fixed mb-10 items-center shadow-sm bg-white z-10'>
				<Link href={"/dashboard/marketplace"}>
					<div className='flex items-center  gap-4'>
						<Image
							src='/assets/images/logo.jpeg'
							alt=''
							width={200}
							height={80}
						/>
					</div>
				</Link>
				<div className='w-1/3'>
					<Input
						name='search'
						className='border-[1.5px] !h-[45px] rounded-3xl border-green-800'
						placeholder='Search for a product'
						right={
							<button
								type='submit'
								className='text-xl rounded-full h-8 w-8 flex items-center justify-center mr-1'>
								<Search size={20} className='text-green-800' />
							</button>
						}
					/>
				</div>
				<div className='flex gap-4'>
					{/* Cart Icon with Dynamic Count */}
					<Link href={"/dashboard/cart-view"} className='relative'>
						<ShoppingCart size={40} className='text-green-800' />
						{cartItemCount > 0 && (
							<span className='absolute top-0 right-0 bg-green-800 text-white text-xs rounded-full px-1'>
								{cartItemCount}
							</span>
						)}
					</Link>
					{/* User Icon */}
					<Link href={""} className='relative'>
						<UserIcon size={40} className='text-green-800' />
						<span className='absolute top-0 right-0 bg-green-800 text-white text-xs rounded-full px-1'>
							1
						</span>
					</Link>
					{/* Add user profile or action buttons here */}
				</div>
			</div>
		</FormProvider>
	);
};

export default DashboardNavbar;
