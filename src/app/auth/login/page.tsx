// "use client";
// import { useRouter } from "next/navigation";
// import { useState } from "react";
// import {
// 	Eye,
// 	EyeOff,
// 	Mail,
// 	Lock,
// 	User,
// 	CheckCircle,
// 	AlertCircle,
// 	X,
// } from "lucide-react";

// interface LoginData {
// 	email: string;
// 	password: string;
// }

// interface Toast {
// 	id: string;
// 	type: "success" | "error";
// 	title: string;
// 	message: string;
// }

// const LoginScreen = () => {
// 	const router = useRouter();

// 	const [formData, setFormData] = useState<LoginData>({
// 		email: "",
// 		password: "",
// 	});

// 	const [showPassword, setShowPassword] = useState(false);
// 	const [errors, setErrors] = useState<Record<string, string>>({});
// 	const [isLoading, setIsLoading] = useState(false);
// 	const [toasts, setToasts] = useState<Toast[]>([]);

// 	// Toast functions
// 	const addToast = (
// 		type: "success" | "error",
// 		title: string,
// 		message: string
// 	) => {
// 		const id = Math.random().toString(36).substr(2, 9);
// 		const newToast = { id, type, title, message };

// 		setToasts((prev) => [...prev, newToast]);

// 		// Auto remove toast after 5 seconds
// 		setTimeout(() => {
// 			removeToast(id);
// 		}, 5000);
// 	};

// 	const removeToast = (id: string) => {
// 		setToasts((prev) => prev.filter((toast) => toast.id !== id));
// 	};

// 	const updateFormData = (field: keyof LoginData, value: string) => {
// 		setFormData((prev) => ({ ...prev, [field]: value }));
// 		// Clear error when user starts typing
// 		if (errors[field]) {
// 			setErrors((prev) => ({ ...prev, [field]: "" }));
// 		}
// 	};

// 	const validateForm = () => {
// 		const newErrors: Record<string, string> = {};

// 		if (!formData.email.trim()) {
// 			newErrors.email = "Email is required";
// 		} else if (!/\S+@\S+\.\S+/.test(formData.email)) {
// 			newErrors.email = "Please enter a valid email";
// 		}

// 		if (!formData.password) {
// 			newErrors.password = "Password is required";
// 		}

// 		setErrors(newErrors);
// 		return Object.keys(newErrors).length === 0;
// 	};

// 	const handleLogin = async (e: React.FormEvent) => {
// 		e.preventDefault();

// 		if (!validateForm()) {
// 			addToast("error", "Validation Error", "Please fix the errors below");
// 			return;
// 		}

// 		setIsLoading(true);

// 		// Clear any previous API errors
// 		setErrors((prev) => ({ ...prev, api: "" }));

// 		try {
// 			const response = await fetch(
// 				"https://farmplace-backend-api.onrender.com/api/v1/auth/login",
// 				{
// 					method: "POST",
// 					headers: {
// 						"Content-Type": "application/json",
// 					},
// 					body: JSON.stringify({
// 						email: formData.email.trim().toLowerCase(),
// 						password: formData.password,
// 					}),
// 				}
// 			);

// 			const result = await response.json();

// 			if (response.ok) {
// 				// Login successful
// 				console.log("Login successful:", result);

// 				// Store authentication data if provided
// 				if (result.token) {
// 					localStorage.setItem("auth_token", result.token);
// 				}
// 				if (result.user) {
// 					localStorage.setItem("user_data", JSON.stringify(result.user));
// 				}

// 				addToast(
// 					"success",
// 					"Login Successful",
// 					"Welcome back! Redirecting to dashboard..."
// 				);

// 				// Redirect after a short delay to show the success message
// 				setTimeout(() => {
// 					router.push("/marketplace");
// 				}, 1500);
// 			} else {
// 				// Handle API errors
// 				console.log("API Error:", result);
// 				const errorMessage =
// 					result.message || "Login failed. Please try again.";
// 				setErrors({ api: errorMessage });
// 				addToast("error", "Login Failed", errorMessage);
// 			}
// 		} catch (error) {
// 			console.error("Login error:", error);
// 			const errorMessage =
// 				"Network error. Please check your connection and try again.";
// 			setErrors({ api: errorMessage });
// 			addToast("error", "Connection Error", errorMessage);
// 		} finally {
// 			setIsLoading(false);
// 		}
// 	};

// 	const handleForgotPassword = () => {
// 		// You can implement forgot password functionality here
// 		addToast(
// 			"success",
// 			"Password Reset",
// 			"Password reset functionality coming soon!"
// 		);
// 	};

// 	return (
// 		<div className='min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-purple-50 flex items-center justify-center p-4'>
// 			{/* Toast Container */}
// 			<div className='fixed top-4 right-4 z-50 space-y-2'>
// 				{toasts.map((toast) => (
// 					<div
// 						key={toast.id}
// 						className={`max-w-sm w-full bg-white shadow-lg rounded-lg pointer-events-auto ring-1 ring-black ring-opacity-5 transform transition-all duration-300 ease-in-out ${
// 							toast.type === "success"
// 								? "border-l-4 border-green-500"
// 								: "border-l-4 border-red-500"
// 						}`}>
// 						<div className='p-4'>
// 							<div className='flex items-start'>
// 								<div className='flex-shrink-0'>
// 									{toast.type === "success" ? (
// 										<CheckCircle className='h-6 w-6 text-green-400' />
// 									) : (
// 										<AlertCircle className='h-6 w-6 text-red-400' />
// 									)}
// 								</div>
// 								<div className='ml-3 w-0 flex-1 pt-0.5'>
// 									<p className='text-sm font-medium text-gray-900'>
// 										{toast.title}
// 									</p>
// 									<p className='mt-1 text-sm text-gray-500'>{toast.message}</p>
// 								</div>
// 								<div className='ml-4 flex-shrink-0 flex'>
// 									<button
// 										className='bg-white rounded-md inline-flex text-gray-400 hover:text-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
// 										onClick={() => removeToast(toast.id)}>
// 										<X className='h-5 w-5' />
// 									</button>
// 								</div>
// 							</div>
// 						</div>
// 					</div>
// 				))}
// 			</div>

// 			<div className='max-w-md w-full'>
// 				<div className='bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 p-8'>
// 					<div className='text-center mb-8'>
// 						<div className='w-16 h-16 bg-gradient-to-r from-green-600 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-4'>
// 							<User className='w-8 h-8 text-white' />
// 						</div>
// 						<h1 className='text-3xl font-bold text-gray-900 mb-2'>
// 							Welcome Back
// 						</h1>
// 						<p className='text-gray-600 text-lg'>Sign in to your account</p>
// 					</div>

// 					<form onSubmit={handleLogin} className='space-y-6'>
// 						<div>
// 							<label className='block text-sm font-semibold text-gray-700 mb-2'>
// 								<Mail className='inline w-4 h-4 mr-2' />
// 								Email Address
// 							</label>
// 							<input
// 								type='email'
// 								value={formData.email}
// 								onChange={(e) => updateFormData("email", e.target.value)}
// 								placeholder='Enter your email'
// 								className={`w-full px-4 py-3 border-2 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all duration-200 ${
// 									errors.email
// 										? "border-red-500 bg-red-50"
// 										: "border-gray-200 hover:border-gray-300"
// 								}`}
// 								disabled={isLoading}
// 							/>
// 							{errors.email && (
// 								<p className='text-red-500 text-sm mt-1 flex items-center'>
// 									<span className='mr-1'>⚠</span>
// 									{errors.email}
// 								</p>
// 							)}
// 						</div>

// 						<div>
// 							<label className='block text-sm font-semibold text-gray-700 mb-2'>
// 								<Lock className='inline w-4 h-4 mr-2' />
// 								Password
// 							</label>
// 							<div className='relative'>
// 								<input
// 									type={showPassword ? "text" : "password"}
// 									value={formData.password}
// 									onChange={(e) => updateFormData("password", e.target.value)}
// 									placeholder='Enter your password'
// 									className={`w-full px-4 py-3 border-2 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all duration-200 pr-12 ${
// 										errors.password
// 											? "border-red-500 bg-red-50"
// 											: "border-gray-200 hover:border-gray-300"
// 									}`}
// 									disabled={isLoading}
// 								/>
// 								<button
// 									type='button'
// 									onClick={() => setShowPassword(!showPassword)}
// 									className='absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors'
// 									disabled={isLoading}>
// 									{showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
// 								</button>
// 							</div>
// 							{errors.password && (
// 								<p className='text-red-500 text-sm mt-1 flex items-center'>
// 									<span className='mr-1'>⚠</span>
// 									{errors.password}
// 								</p>
// 							)}
// 						</div>

// 						<div className='flex items-center justify-between'>
// 							<label className='flex items-center'>
// 								<input
// 									type='checkbox'
// 									className='w-4 h-4 text-green-600 bg-gray-100 border-gray-300 rounded focus:ring-green-500 focus:ring-2'
// 								/>
// 								<span className='ml-2 text-sm text-gray-600'>Remember me</span>
// 							</label>
// 							<button
// 								type='button'
// 								onClick={handleForgotPassword}
// 								className='text-sm text-green-600 hover:text-green-700 font-medium'
// 								disabled={isLoading}>
// 								Forgot password?
// 							</button>
// 						</div>

// 						{errors.api && (
// 							<div className='bg-red-50 border-2 border-red-200 rounded-xl p-4'>
// 								<div className='flex items-center'>
// 									<AlertCircle className='w-5 h-5 text-red-500 mr-2' />
// 									<p className='text-red-600 text-sm font-medium'>
// 										{errors.api}
// 									</p>
// 								</div>
// 							</div>
// 						)}

// 						<button
// 							type='submit'
// 							disabled={isLoading}
// 							className='w-full px-8 py-3 bg-gradient-to-r from-green-600 to-blue-600 text-white rounded-xl font-semibold hover:from-green-700 hover:to-blue-700 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-105 disabled:hover:scale-100'>
// 							{isLoading ? (
// 								<span className='flex items-center justify-center'>
// 									<div className='w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2'></div>
// 									Signing In...
// 								</span>
// 							) : (
// 								"Sign In"
// 							)}
// 						</button>

// 						<div className='text-center pt-4'>
// 							<span className='text-gray-600'>Don't have an account? </span>
// 							<button
// 								type='button'
// 								onClick={() => router.push("/auth/register/1")}
// 								className='text-green-600 hover:text-green-700 font-semibold'
// 								disabled={isLoading}>
// 								Create Account
// 							</button>
// 						</div>
// 					</form>
// 				</div>

// 				{/* Additional Info */}
// 				<div className='text-center mt-6'>
// 					<p className='text-sm text-gray-500'>
// 						By signing in, you agree to our{" "}
// 						<button
// 							onClick={() => {
// 								/* Navigate to terms */
// 							}}
// 							className='text-green-600 hover:text-green-700 underline'>
// 							Terms of Service
// 						</button>{" "}
// 						and{" "}
// 						<button
// 							onClick={() => {
// 								/* Navigate to privacy */
// 							}}
// 							className='text-green-600 hover:text-green-700 underline'>
// 							Privacy Policy
// 						</button>
// 					</p>
// 				</div>
// 			</div>
// 		</div>
// 	);
// };

// export default LoginScreen;

"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import {
	Eye,
	EyeOff,
	Mail,
	Lock,
	User,
	CheckCircle,
	AlertCircle,
	X,
} from "lucide-react";

interface LoginData {
	email: string;
	password: string;
}

interface Toast {
	id: string;
	type: "success" | "error";
	title: string;
	message: string;
}

const LoginScreen = () => {
	const router = useRouter();

	const [formData, setFormData] = useState<LoginData>({
		email: "",
		password: "",
	});

	const [showPassword, setShowPassword] = useState(false);
	const [errors, setErrors] = useState<Record<string, string>>({});
	const [isLoading, setIsLoading] = useState(false);
	const [toasts, setToasts] = useState<Toast[]>([]);

	// Toast functions
	const addToast = (
		type: "success" | "error",
		title: string,
		message: string
	) => {
		const id = Math.random().toString(36).substr(2, 9);
		const newToast = { id, type, title, message };

		setToasts((prev) => [...prev, newToast]);

		// Auto remove toast after 5 seconds
		setTimeout(() => {
			removeToast(id);
		}, 5000);
	};

	const removeToast = (id: string) => {
		setToasts((prev) => prev.filter((toast) => toast.id !== id));
	};

	const updateFormData = (field: keyof LoginData, value: string) => {
		setFormData((prev) => ({ ...prev, [field]: value }));
		// Clear error when user starts typing
		if (errors[field]) {
			setErrors((prev) => ({ ...prev, [field]: "" }));
		}
	};

	const validateForm = () => {
		const newErrors: Record<string, string> = {};

		if (!formData.email.trim()) {
			newErrors.email = "Email is required";
		} else if (!/\S+@\S+\.\S+/.test(formData.email)) {
			newErrors.email = "Please enter a valid email";
		}

		if (!formData.password) {
			newErrors.password = "Password is required";
		}

		setErrors(newErrors);
		return Object.keys(newErrors).length === 0;
	};

	const handleLogin = async (e: React.FormEvent) => {
		e.preventDefault();

		if (!validateForm()) {
			addToast("error", "Validation Error", "Please fix the errors below");
			return;
		}

		setIsLoading(true);

		// Clear any previous API errors
		setErrors((prev) => ({ ...prev, api: "" }));

		try {
			const response = await fetch(
				"https://farmplace-backend-api.onrender.com/api/v1/auth/login",
				{
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify({
						email: formData.email.trim().toLowerCase(),
						password: formData.password,
					}),
				}
			);

			const result = await response.json();

			if (response.ok) {
				// Login successful
				console.log("Login successful:", result);

				// Store authentication data if provided
				if (result.token) {
					localStorage.setItem("auth_token", result.token);
				}
				if (result.user) {
					localStorage.setItem("user_data", JSON.stringify(result.user));
				}

				// Determine redirect path based on user type
				const userType = result.user?.usertype || result.usertype;
				let redirectPath = "/dashboard"; // default fallback
				let redirectMessage = "Welcome back! Redirecting...";

				if (userType === "farmer") {
					redirectPath = "/dashboard";
					redirectMessage = "Welcome back, farmer! Redirecting to dashboard...";
				} else if (userType === "buyer") {
					redirectPath = "/marketplace";
					redirectMessage =
						"Welcome back, buyer! Redirecting to marketplace...";
				} else if (userType === "admin") {
					redirectPath = "/dashboard";
					redirectMessage = "Welcome back, admin! Redirecting to dashboard...";
				}

				addToast("success", "Login Successful", redirectMessage);

				// Redirect after a short delay to show the success message
				setTimeout(() => {
					router.push(redirectPath);
				}, 1500);
			} else {
				// Handle API errors
				console.log("API Error:", result);
				const errorMessage =
					result.message || "Login failed. Please try again.";
				setErrors({ api: errorMessage });
				addToast("error", "Login Failed", errorMessage);
			}
		} catch (error) {
			console.error("Login error:", error);
			const errorMessage =
				"Network error. Please check your connection and try again.";
			setErrors({ api: errorMessage });
			addToast("error", "Connection Error", errorMessage);
		} finally {
			setIsLoading(false);
		}
	};

	const handleForgotPassword = () => {
		// You can implement forgot password functionality here
		addToast(
			"success",
			"Password Reset",
			"Password reset functionality coming soon!"
		);
	};

	return (
		<div className='min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-purple-50 flex items-center justify-center p-4'>
			{/* Toast Container */}
			<div className='fixed top-4 right-4 z-50 space-y-2'>
				{toasts.map((toast) => (
					<div
						key={toast.id}
						className={`max-w-sm w-full bg-white shadow-lg rounded-lg pointer-events-auto ring-1 ring-black ring-opacity-5 transform transition-all duration-300 ease-in-out ${
							toast.type === "success"
								? "border-l-4 border-green-500"
								: "border-l-4 border-red-500"
						}`}>
						<div className='p-4'>
							<div className='flex items-start'>
								<div className='flex-shrink-0'>
									{toast.type === "success" ? (
										<CheckCircle className='h-6 w-6 text-green-400' />
									) : (
										<AlertCircle className='h-6 w-6 text-red-400' />
									)}
								</div>
								<div className='ml-3 w-0 flex-1 pt-0.5'>
									<p className='text-sm font-medium text-gray-900'>
										{toast.title}
									</p>
									<p className='mt-1 text-sm text-gray-500'>{toast.message}</p>
								</div>
								<div className='ml-4 flex-shrink-0 flex'>
									<button
										className='bg-white rounded-md inline-flex text-gray-400 hover:text-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
										onClick={() => removeToast(toast.id)}>
										<X className='h-5 w-5' />
									</button>
								</div>
							</div>
						</div>
					</div>
				))}
			</div>

			<div className='max-w-md w-full'>
				<div className='bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 p-8'>
					<div className='text-center mb-8'>
						<div className='w-16 h-16 bg-gradient-to-r from-green-600 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-4'>
							<User className='w-8 h-8 text-white' />
						</div>
						<h1 className='text-3xl font-bold text-gray-900 mb-2'>
							Welcome Back
						</h1>
						<p className='text-gray-600 text-lg'>Sign in to your account</p>
					</div>

					<form onSubmit={handleLogin} className='space-y-6'>
						<div>
							<label className='block text-sm font-semibold text-gray-700 mb-2'>
								<Mail className='inline w-4 h-4 mr-2' />
								Email Address
							</label>
							<input
								type='email'
								value={formData.email}
								onChange={(e) => updateFormData("email", e.target.value)}
								placeholder='Enter your email'
								className={`w-full px-4 py-3 border-2 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all duration-200 ${
									errors.email
										? "border-red-500 bg-red-50"
										: "border-gray-200 hover:border-gray-300"
								}`}
								disabled={isLoading}
							/>
							{errors.email && (
								<p className='text-red-500 text-sm mt-1 flex items-center'>
									<span className='mr-1'>⚠</span>
									{errors.email}
								</p>
							)}
						</div>

						<div>
							<label className='block text-sm font-semibold text-gray-700 mb-2'>
								<Lock className='inline w-4 h-4 mr-2' />
								Password
							</label>
							<div className='relative'>
								<input
									type={showPassword ? "text" : "password"}
									value={formData.password}
									onChange={(e) => updateFormData("password", e.target.value)}
									placeholder='Enter your password'
									className={`w-full px-4 py-3 border-2 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all duration-200 pr-12 ${
										errors.password
											? "border-red-500 bg-red-50"
											: "border-gray-200 hover:border-gray-300"
									}`}
									disabled={isLoading}
								/>
								<button
									type='button'
									onClick={() => setShowPassword(!showPassword)}
									className='absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors'
									disabled={isLoading}>
									{showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
								</button>
							</div>
							{errors.password && (
								<p className='text-red-500 text-sm mt-1 flex items-center'>
									<span className='mr-1'>⚠</span>
									{errors.password}
								</p>
							)}
						</div>

						<div className='flex items-center justify-between'>
							<label className='flex items-center'>
								<input
									type='checkbox'
									className='w-4 h-4 text-green-600 bg-gray-100 border-gray-300 rounded focus:ring-green-500 focus:ring-2'
								/>
								<span className='ml-2 text-sm text-gray-600'>Remember me</span>
							</label>
							<button
								type='button'
								onClick={handleForgotPassword}
								className='text-sm text-green-600 hover:text-green-700 font-medium'
								disabled={isLoading}>
								Forgot password?
							</button>
						</div>

						{errors.api && (
							<div className='bg-red-50 border-2 border-red-200 rounded-xl p-4'>
								<div className='flex items-center'>
									<AlertCircle className='w-5 h-5 text-red-500 mr-2' />
									<p className='text-red-600 text-sm font-medium'>
										{errors.api}
									</p>
								</div>
							</div>
						)}

						<button
							type='submit'
							disabled={isLoading}
							className='w-full px-8 py-3 bg-gradient-to-r from-green-600 to-blue-600 text-white rounded-xl font-semibold hover:from-green-700 hover:to-blue-700 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-105 disabled:hover:scale-100'>
							{isLoading ? (
								<span className='flex items-center justify-center'>
									<div className='w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2'></div>
									Signing In...
								</span>
							) : (
								"Sign In"
							)}
						</button>

						<div className='text-center pt-4'>
							<span className='text-gray-600'>Don't have an account? </span>
							<button
								type='button'
								onClick={() => router.push("/auth/register/1")}
								className='text-green-600 hover:text-green-700 font-semibold'
								disabled={isLoading}>
								Create Account
							</button>
						</div>
					</form>
				</div>

				{/* Additional Info */}
				<div className='text-center mt-6'>
					<p className='text-sm text-gray-500'>
						By signing in, you agree to our{" "}
						<button
							onClick={() => {
								/* Navigate to terms */
							}}
							className='text-green-600 hover:text-green-700 underline'>
							Terms of Service
						</button>{" "}
						and{" "}
						<button
							onClick={() => {
								/* Navigate to privacy */
							}}
							className='text-green-600 hover:text-green-700 underline'>
							Privacy Policy
						</button>
					</p>
				</div>
			</div>
		</div>
	);
};

export default LoginScreen;
