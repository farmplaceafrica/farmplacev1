// "use client";
// import { useRouter, useParams } from "next/navigation";
// import { useState, useEffect } from "react";
// import {
// 	Eye,
// 	EyeOff,
// 	User,
// 	Mail,
// 	Phone,
// 	Calendar,
// 	MapPin,
// 	Wallet,
// 	Check,
// } from "lucide-react";
// import ConnectWallet from "@/components/global/CardanoWalletButton";

// interface FormData {
// 	fullname: string;
// 	email: string;
// 	password: string;
// 	confirmPassword: string;
// 	birthdate: string;
// 	gender: "male" | "female" | "";
// 	phone: string;
// 	location: string;
// 	usertype: "farmer" | "buyer" | "admin";
// 	wallet: string;
// }

// const STORAGE_KEY = "registration_form_data";

// const RegisterPage = () => {
// 	const router = useRouter();
// 	const params = useParams();
// 	const currentStep = parseInt(params.step as string) || 1;

// 	// Initialize form data with stored data or defaults
// 	const [formData, setFormData] = useState<FormData>(() => {
// 		if (typeof window !== "undefined") {
// 			const stored = sessionStorage.getItem(STORAGE_KEY);
// 			if (stored) {
// 				const parsedData = JSON.parse(stored);
// 				return parsedData;
// 			}
// 		}
// 		return {
// 			fullname: "",
// 			email: "",
// 			password: "",
// 			confirmPassword: "",
// 			birthdate: "",
// 			gender: "",
// 			phone: "",
// 			location: "",
// 			usertype: "buyer",
// 			wallet: "",
// 		};
// 	});

// 	const [showPassword, setShowPassword] = useState(false);
// 	const [showConfirmPassword, setShowConfirmPassword] = useState(false);
// 	const [errors, setErrors] = useState<Record<string, string>>({});
// 	const [isLoading, setIsLoading] = useState(false);

// 	// Save form data to sessionStorage whenever it changes
// 	useEffect(() => {
// 		if (typeof window !== "undefined") {
// 			sessionStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
// 		}
// 	}, [formData]);

// 	// Redirect to step 1 if invalid step
// 	useEffect(() => {
// 		if (currentStep < 1 || currentStep > 2) {
// 			router.replace("/auth/register/1");
// 		}
// 	}, [currentStep, router]);

// 	const updateFormData = (field: keyof FormData, value: string) => {
// 		setFormData((prev) => ({ ...prev, [field]: value }));
// 		// Clear error when user starts typing
// 		if (errors[field]) {
// 			setErrors((prev) => ({ ...prev, [field]: "" }));
// 		}
// 	};

// 	const validateStep1 = () => {
// 		const newErrors: Record<string, string> = {};

// 		if (!formData.fullname.trim()) {
// 			newErrors.fullname = "Full name is required";
// 		}

// 		if (!formData.email.trim()) {
// 			newErrors.email = "Email is required";
// 		} else if (!/\S+@\S+\.\S+/.test(formData.email)) {
// 			newErrors.email = "Please enter a valid email";
// 		}

// 		if (!formData.password) {
// 			newErrors.password = "Password is required";
// 		} else if (formData.password.length < 8) {
// 			newErrors.password = "Password must be at least 8 characters";
// 		}

// 		if (formData.password !== formData.confirmPassword) {
// 			newErrors.confirmPassword = "Passwords do not match";
// 		}

// 		if (!formData.birthdate) {
// 			newErrors.birthdate = "Birth date is required";
// 		}

// 		if (!formData.gender) {
// 			newErrors.gender = "Gender is required";
// 		}

// 		if (!formData.phone.trim()) {
// 			newErrors.phone = "Phone number is required";
// 		}

// 		if (!formData.location.trim()) {
// 			newErrors.location = "Location is required";
// 		}

// 		if (!formData.usertype) {
// 			newErrors.usertype = "User type is required";
// 		}

// 		setErrors(newErrors);
// 		return Object.keys(newErrors).length === 0;
// 	};

// 	const validateFinalSubmission = () => {
// 		const newErrors: Record<string, string> = {};

// 		// Basic required fields - check for empty strings properly
// 		const requiredFields = [
// 			"fullname",
// 			"email",
// 			"password",
// 			"birthdate",
// 			"gender",
// 			"phone",
// 			"location",
// 			"usertype",
// 		];

// 		requiredFields.forEach((field) => {
// 			const value = formData[field as keyof FormData];

// 			if (!value || (typeof value === "string" && value.trim() === "")) {
// 				newErrors[field] = `${
// 					field.charAt(0).toUpperCase() + field.slice(1)
// 				} is required`;
// 			}
// 		});

// 		// Email validation
// 		if (formData.email && !/\S+@\S+\.\S+/.test(formData.email)) {
// 			newErrors.email = "Please enter a valid email";
// 		}

// 		// Password validation
// 		if (formData.password && formData.password.length < 8) {
// 			newErrors.password = "Password must be at least 8 characters";
// 		}

// 		// Confirm password validation
// 		if (formData.password !== formData.confirmPassword) {
// 			newErrors.confirmPassword = "Passwords do not match";
// 		}

// 		setErrors(newErrors);
// 		return Object.keys(newErrors).length === 0;
// 	};

// 	const handleCreateAccount = async () => {
// 		setIsLoading(true);

// 		// Clear any previous API errors
// 		setErrors((prev) => ({ ...prev, api: "" }));

// 		// Validate before submission
// 		const validationResult = validateFinalSubmission();

// 		if (!validationResult) {
// 			setIsLoading(false);
// 			return;
// 		}

// 		try {
// 			const submitData = new FormData();

// 			// Add all required fields
// 			submitData.append("fullname", formData.fullname.trim());
// 			submitData.append("email", formData.email.trim().toLowerCase());
// 			submitData.append("password", formData.password);
// 			submitData.append("birthdate", formData.birthdate);
// 			submitData.append("gender", formData.gender);
// 			submitData.append("phone", formData.phone.trim());
// 			submitData.append("location", formData.location.trim());
// 			submitData.append("usertype", formData.usertype);

// 			// Wallet is optional
// 			if (formData.wallet) {
// 				submitData.append("wallet", formData.wallet);
// 			}

// 			const response = await fetch(
// 				"https://farmplace-backend-api.onrender.com/api/v1/auth/register",
// 				{
// 					method: "POST",
// 					body: submitData,
// 				}
// 			);

// 			const result = await response.json();

// 			if (response.ok) {
// 				// Registration successful - clear stored data
// 				if (typeof window !== "undefined") {
// 					sessionStorage.removeItem(STORAGE_KEY);
// 				}
// 				router.push("/auth/login");
// 			} else {
// 				// Handle API errors
// 				setErrors({ api: result.message || "Registration failed" });
// 			}
// 		} catch (error) {
// 			setErrors({ api: "Network error. Please try again." });
// 		} finally {
// 			setIsLoading(false);
// 		}
// 	};

// 	const handleContinue = () => {
// 		let isValid = false;

// 		if (currentStep === 1) {
// 			isValid = validateStep1();
// 			if (isValid) {
// 				router.push(`/auth/register/${currentStep + 1}`);
// 			}
// 		} else if (currentStep === 2) {
// 			// Final step - create account
// 			handleCreateAccount();
// 		}
// 	};

// 	const handleBack = () => {
// 		if (currentStep > 1) {
// 			router.push(`/auth/register/${currentStep - 1}`);
// 		}
// 	};

// 	const renderStepIndicator = () => (
// 		<div className='flex items-center justify-center mb-8'>
// 			{[
// 				{ step: 1, label: "Details", icon: User },
// 				{ step: 2, label: "Wallet", icon: Wallet },
// 			].map(({ step, label, icon: Icon }, index) => (
// 				<div key={step} className='flex items-center'>
// 					<div className='flex flex-col items-center'>
// 						<div
// 							className={`w-12 h-12 rounded-full flex items-center justify-center text-sm font-medium transition-all duration-300 ${
// 								step < currentStep
// 									? "bg-green-600 text-white shadow-lg"
// 									: step === currentStep
// 									? "bg-green-600 text-white shadow-lg scale-110"
// 									: "bg-gray-200 text-gray-600"
// 							}`}>
// 							{step < currentStep ? <Check size={20} /> : <Icon size={20} />}
// 						</div>
// 						<span
// 							className={`mt-2 text-xs font-medium ${
// 								step <= currentStep ? "text-green-600" : "text-gray-400"
// 							}`}>
// 							{label}
// 						</span>
// 					</div>
// 					{index < 1 && (
// 						<div
// 							className={`w-16 h-0.5 mx-4 transition-all duration-300 ${
// 								step < currentStep ? "bg-green-600" : "bg-gray-200"
// 							}`}
// 						/>
// 					)}
// 				</div>
// 			))}
// 		</div>
// 	);

// 	const renderStep1 = () => (
// 		<div className='space-y-6'>
// 			<div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
// 				<div>
// 					<label className='block text-sm font-semibold text-gray-700 mb-2'>
// 						<User className='inline w-4 h-4 mr-2' />
// 						Full Name
// 					</label>
// 					<input
// 						type='text'
// 						value={formData.fullname}
// 						onChange={(e) => updateFormData("fullname", e.target.value)}
// 						placeholder='Enter your full name'
// 						className={`w-full px-4 py-3 border-2 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all duration-200 ${
// 							errors.fullname
// 								? "border-red-500 bg-red-50"
// 								: "border-gray-200 hover:border-gray-300"
// 						}`}
// 					/>
// 					{errors.fullname && (
// 						<p className='text-red-500 text-sm mt-1 flex items-center'>
// 							<span className='mr-1'>⚠</span>
// 							{errors.fullname}
// 						</p>
// 					)}
// 				</div>

// 				<div>
// 					<label className='block text-sm font-semibold text-gray-700 mb-2'>
// 						<Mail className='inline w-4 h-4 mr-2' />
// 						Email
// 					</label>
// 					<input
// 						type='email'
// 						value={formData.email}
// 						onChange={(e) => updateFormData("email", e.target.value)}
// 						placeholder='Enter your email'
// 						className={`w-full px-4 py-3 border-2 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all duration-200 ${
// 							errors.email
// 								? "border-red-500 bg-red-50"
// 								: "border-gray-200 hover:border-gray-300"
// 						}`}
// 					/>
// 					{errors.email && (
// 						<p className='text-red-500 text-sm mt-1 flex items-center'>
// 							<span className='mr-1'>⚠</span>
// 							{errors.email}
// 						</p>
// 					)}
// 				</div>
// 			</div>

// 			<div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
// 				<div>
// 					<label className='block text-sm font-semibold text-gray-700 mb-2'>
// 						<Phone className='inline w-4 h-4 mr-2' />
// 						Phone Number
// 					</label>
// 					<input
// 						type='tel'
// 						value={formData.phone}
// 						onChange={(e) => updateFormData("phone", e.target.value)}
// 						placeholder='Enter your phone number'
// 						className={`w-full px-4 py-3 border-2 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all duration-200 ${
// 							errors.phone
// 								? "border-red-500 bg-red-50"
// 								: "border-gray-200 hover:border-gray-300"
// 						}`}
// 					/>
// 					{errors.phone && (
// 						<p className='text-red-500 text-sm mt-1 flex items-center'>
// 							<span className='mr-1'>⚠</span>
// 							{errors.phone}
// 						</p>
// 					)}
// 				</div>

// 				<div>
// 					<label className='block text-sm font-semibold text-gray-700 mb-2'>
// 						<Calendar className='inline w-4 h-4 mr-2' />
// 						Birth Date
// 					</label>
// 					<input
// 						type='date'
// 						value={formData.birthdate}
// 						onChange={(e) => updateFormData("birthdate", e.target.value)}
// 						className={`w-full px-4 py-3 border-2 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all duration-200 ${
// 							errors.birthdate
// 								? "border-red-500 bg-red-50"
// 								: "border-gray-200 hover:border-gray-300"
// 						}`}
// 					/>
// 					{errors.birthdate && (
// 						<p className='text-red-500 text-sm mt-1 flex items-center'>
// 							<span className='mr-1'>⚠</span>
// 							{errors.birthdate}
// 						</p>
// 					)}
// 				</div>
// 			</div>

// 			<div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
// 				<div>
// 					<label className='block text-sm font-semibold text-gray-700 mb-2'>
// 						Gender
// 					</label>
// 					<select
// 						value={formData.gender}
// 						onChange={(e) => updateFormData("gender", e.target.value)}
// 						className={`w-full px-4 py-3 border-2 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all duration-200 ${
// 							errors.gender
// 								? "border-red-500 bg-red-50"
// 								: "border-gray-200 hover:border-gray-300"
// 						}`}>
// 						<option value=''>Select Gender</option>
// 						<option value='male'>Male</option>
// 						<option value='female'>Female</option>
// 					</select>
// 					{errors.gender && (
// 						<p className='text-red-500 text-sm mt-1 flex items-center'>
// 							<span className='mr-1'>⚠</span>
// 							{errors.gender}
// 						</p>
// 					)}
// 				</div>

// 				<div>
// 					<label className='block text-sm font-semibold text-gray-700 mb-2'>
// 						<MapPin className='inline w-4 h-4 mr-2' />
// 						Location
// 					</label>
// 					<input
// 						type='text'
// 						value={formData.location}
// 						onChange={(e) => updateFormData("location", e.target.value)}
// 						placeholder='Enter your location'
// 						className={`w-full px-4 py-3 border-2 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all duration-200 ${
// 							errors.location
// 								? "border-red-500 bg-red-50"
// 								: "border-gray-200 hover:border-gray-300"
// 						}`}
// 					/>
// 					{errors.location && (
// 						<p className='text-red-500 text-sm mt-1 flex items-center'>
// 							<span className='mr-1'>⚠</span>
// 							{errors.location}
// 						</p>
// 					)}
// 				</div>
// 			</div>

// 			<div>
// 				<label className='block text-sm font-semibold text-gray-700 mb-2'>
// 					User Type
// 				</label>
// 				<div className='grid grid-cols-2 gap-4'>
// 					{[
// 						{
// 							value: "buyer",
// 							label: "Buyer",
// 							desc: "Purchase agricultural products",
// 						},
// 						{
// 							value: "farmer",
// 							label: "Farmer",
// 							desc: "Sell agricultural products",
// 						},
// 					].map((type) => (
// 						<div
// 							key={type.value}
// 							onClick={() => updateFormData("usertype", type.value)}
// 							className={`p-4 border-2 rounded-xl cursor-pointer transition-all duration-200 ${
// 								formData.usertype === type.value
// 									? "border-green-500 bg-green-50"
// 									: "border-gray-200 hover:border-gray-300"
// 							}`}>
// 							<div className='flex items-center justify-between mb-2'>
// 								<span className='font-semibold text-gray-900'>
// 									{type.label}
// 								</span>
// 								<div
// 									className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${
// 										formData.usertype === type.value
// 											? "border-green-500 bg-green-500"
// 											: "border-gray-300"
// 									}`}>
// 									{formData.usertype === type.value && (
// 										<div className='w-2 h-2 bg-white rounded-full' />
// 									)}
// 								</div>
// 							</div>
// 							<p className='text-sm text-gray-600'>{type.desc}</p>
// 						</div>
// 					))}
// 				</div>
// 				{errors.usertype && (
// 					<p className='text-red-500 text-sm mt-1 flex items-center'>
// 						<span className='mr-1'>⚠</span>
// 						{errors.usertype}
// 					</p>
// 				)}
// 			</div>

// 			<div>
// 				<label className='block text-sm font-semibold text-gray-700 mb-2'>
// 					Password
// 				</label>
// 				<div className='relative'>
// 					<input
// 						type={showPassword ? "text" : "password"}
// 						value={formData.password}
// 						onChange={(e) => updateFormData("password", e.target.value)}
// 						placeholder='Enter your password'
// 						className={`w-full px-4 py-3 border-2 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all duration-200 pr-12 ${
// 							errors.password
// 								? "border-red-500 bg-red-50"
// 								: "border-gray-200 hover:border-gray-300"
// 						}`}
// 					/>
// 					<button
// 						type='button'
// 						onClick={() => setShowPassword(!showPassword)}
// 						className='absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors'>
// 						{showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
// 					</button>
// 				</div>
// 				{errors.password && (
// 					<p className='text-red-500 text-sm mt-1 flex items-center'>
// 						<span className='mr-1'>⚠</span>
// 						{errors.password}
// 					</p>
// 				)}
// 			</div>

// 			<div>
// 				<label className='block text-sm font-semibold text-gray-700 mb-2'>
// 					Confirm Password
// 				</label>
// 				<div className='relative'>
// 					<input
// 						type={showConfirmPassword ? "text" : "password"}
// 						value={formData.confirmPassword}
// 						onChange={(e) => updateFormData("confirmPassword", e.target.value)}
// 						placeholder='Confirm your password'
// 						className={`w-full px-4 py-3 border-2 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all duration-200 pr-12 ${
// 							errors.confirmPassword
// 								? "border-red-500 bg-red-50"
// 								: "border-gray-200 hover:border-gray-300"
// 						}`}
// 					/>
// 					<button
// 						type='button'
// 						onClick={() => setShowConfirmPassword(!showConfirmPassword)}
// 						className='absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors'>
// 						{showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
// 					</button>
// 				</div>
// 				{errors.confirmPassword && (
// 					<p className='text-red-500 text-sm mt-1 flex items-center'>
// 						<span className='mr-1'>⚠</span>
// 						{errors.confirmPassword}
// 					</p>
// 				)}
// 			</div>
// 		</div>
// 	);

// 	const renderStep2 = () => (
// 		<div className='space-y-6'>
// 			<div className='text-center mb-6 p-6 bg-gradient-to-r from-purple-50 to-blue-50 rounded-xl'>
// 				<Wallet className='w-12 h-12 text-blue-600 mx-auto mb-3' />
// 				<h3 className='text-lg font-semibold text-gray-900 mb-2'>
// 					Connect Wallet
// 				</h3>
// 				<p className='text-gray-600 mb-4'>
// 					Connect your Cardano wallet for seamless transactions (Optional)
// 				</p>
// 				<p className='text-sm text-gray-500'>
// 					Don't have a wallet?{" "}
// 					<button
// 						onClick={() => handleCreateAccount()}
// 						className='text-blue-600 hover:text-blue-700 font-medium'>
// 						Skip this step
// 					</button>
// 				</p>
// 			</div>

// 			<div className='bg-white border-2 border-gray-200 rounded-xl p-6'>
// 				<label className='block text-sm font-semibold text-gray-700 mb-4'>
// 					Connect Your Cardano Wallet
// 				</label>
// 				<ConnectWallet className='w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white border-0 hover:from-purple-700 hover:to-blue-700' />
// 			</div>

// 			{Object.keys(errors).length > 0 && (
// 				<div className='bg-red-50 border-2 border-red-200 rounded-xl p-4'>
// 					<div className='flex items-center mb-2'>
// 						<span className='text-red-500 mr-2'>⚠</span>
// 						<p className='text-red-600 text-sm font-semibold'>
// 							Please fix the following errors:
// 						</p>
// 					</div>
// 					<ul className='text-red-600 text-sm space-y-1 ml-6'>
// 						{Object.entries(errors).map(([field, error]) => (
// 							<li key={field}>• {error}</li>
// 						))}
// 					</ul>
// 				</div>
// 			)}

// 			{errors.api && (
// 				<div className='bg-red-50 border-2 border-red-200 rounded-xl p-4'>
// 					<div className='flex items-center'>
// 						<span className='text-red-500 mr-2'>⚠</span>
// 						<p className='text-red-600 text-sm font-medium'>{errors.api}</p>
// 					</div>
// 				</div>
// 			)}
// 		</div>
// 	);

// 	const getStepContent = () => {
// 		switch (currentStep) {
// 			case 1:
// 				return renderStep1();
// 			case 2:
// 				return renderStep2();
// 			default:
// 				return renderStep1();
// 		}
// 	};

// 	const getStepTitle = () => {
// 		switch (currentStep) {
// 			case 1:
// 				return "Personal Information";
// 			case 2:
// 				return "Wallet Connection";
// 			default:
// 				return "Personal Information";
// 		}
// 	};

// 	return (
// 		<div className='min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-purple-50 flex items-center justify-center p-4'>
// 			<div className='max-w-2xl w-full'>
// 				{renderStepIndicator()}

// 				<div className='bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 p-8'>
// 					<div className='text-center mb-8'>
// 						<h1 className='text-3xl font-bold text-gray-900 mb-2'>
// 							Create Account
// 						</h1>
// 						<p className='text-gray-600 text-lg'>{getStepTitle()}</p>
// 					</div>

// 					{getStepContent()}

// 					<div className='flex items-center justify-between mt-8 pt-6 border-t border-gray-200'>
// 						{currentStep > 1 ? (
// 							<button
// 								onClick={handleBack}
// 								className='px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-xl font-medium hover:border-gray-400 hover:bg-gray-50 transition-all duration-200'>
// 								Back
// 							</button>
// 						) : (
// 							<div className='text-center'>
// 								<span className='text-gray-600'>Already have an account? </span>
// 								<button
// 									onClick={() => router.push("/auth/login")}
// 									className='text-green-600 hover:text-green-700 font-semibold'>
// 									Login
// 								</button>
// 							</div>
// 						)}

// 						<button
// 							onClick={handleContinue}
// 							disabled={isLoading}
// 							className='px-8 py-3 bg-gradient-to-r from-green-600 to-blue-600 text-white rounded-xl font-semibold hover:from-green-700 hover:to-blue-700 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-105'>
// 							{isLoading ? (
// 								<span className='flex items-center'>
// 									<div className='w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2'></div>
// 									Creating Account...
// 								</span>
// 							) : currentStep === 2 ? (
// 								"Create Account"
// 							) : (
// 								"Continue"
// 							)}
// 						</button>
// 					</div>

// 					{currentStep === 2 && (
// 						<div className='text-center mt-4'>
// 							<button
// 								onClick={() => handleCreateAccount()}
// 								disabled={isLoading}
// 								className='text-gray-600 hover:text-gray-800 disabled:opacity-50 text-sm'>
// 								Skip wallet connection
// 							</button>
// 						</div>
// 					)}
// 				</div>
// 			</div>
// 		</div>
// 	);
// };

// export default RegisterPage;

"use client";
import { useRouter, useParams } from "next/navigation";
import { useState, useEffect } from "react";
import {
	Eye,
	EyeOff,
	User,
	Mail,
	Phone,
	Calendar,
	MapPin,
	Wallet,
	Check,
	CheckCircle,
	X,
	AlertCircle,
} from "lucide-react";
import ConnectWallet from "@/components/global/CardanoWalletButton";

interface FormData {
	fullname: string;
	email: string;
	password: string;
	confirmPassword: string;
	birthdate: string;
	gender: "male" | "female" | "";
	phone: string;
	location: string;
	usertype: "farmer" | "buyer" | "admin";
	wallet: string;
}

interface Toast {
	id: string;
	type: "success" | "error" | "info";
	message: string;
}

const STORAGE_KEY = "registration_form_data";

const RegisterPage = () => {
	const router = useRouter();
	const params = useParams();
	const currentStep = parseInt(params.step as string) || 1;

	// Toast state
	const [toasts, setToasts] = useState<Toast[]>([]);

	// Initialize form data with stored data or defaults
	const [formData, setFormData] = useState<FormData>(() => {
		if (typeof window !== "undefined") {
			const stored = sessionStorage.getItem(STORAGE_KEY);
			if (stored) {
				const parsedData = JSON.parse(stored);
				return parsedData;
			}
		}
		return {
			fullname: "",
			email: "",
			password: "",
			confirmPassword: "",
			birthdate: "",
			gender: "",
			phone: "",
			location: "",
			usertype: "buyer",
			wallet: "",
		};
	});

	const [showPassword, setShowPassword] = useState(false);
	const [showConfirmPassword, setShowConfirmPassword] = useState(false);
	const [errors, setErrors] = useState<Record<string, string>>({});
	const [isLoading, setIsLoading] = useState(false);

	// Toast functions
	const addToast = (type: Toast["type"], message: string) => {
		const id = Date.now().toString();
		const newToast: Toast = { id, type, message };
		setToasts((prev) => [...prev, newToast]);

		// Auto remove after 5 seconds
		setTimeout(() => {
			removeToast(id);
		}, 5000);
	};

	const removeToast = (id: string) => {
		setToasts((prev) => prev.filter((toast) => toast.id !== id));
	};

	// Save form data to sessionStorage whenever it changes
	useEffect(() => {
		if (typeof window !== "undefined") {
			sessionStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
		}
	}, [formData]);

	// Redirect to step 1 if invalid step
	useEffect(() => {
		if (currentStep < 1 || currentStep > 2) {
			router.replace("/auth/register/1");
		}
	}, [currentStep, router]);

	const updateFormData = (field: keyof FormData, value: string) => {
		setFormData((prev) => ({ ...prev, [field]: value }));
		// Clear error when user starts typing
		if (errors[field]) {
			setErrors((prev) => ({ ...prev, [field]: "" }));
		}
	};

	const validateStep1 = () => {
		const newErrors: Record<string, string> = {};

		if (!formData.fullname.trim()) {
			newErrors.fullname = "Full name is required";
		}

		if (!formData.email.trim()) {
			newErrors.email = "Email is required";
		} else if (!/\S+@\S+\.\S+/.test(formData.email)) {
			newErrors.email = "Please enter a valid email";
		}

		if (!formData.password) {
			newErrors.password = "Password is required";
		} else if (formData.password.length < 8) {
			newErrors.password = "Password must be at least 8 characters";
		}

		if (formData.password !== formData.confirmPassword) {
			newErrors.confirmPassword = "Passwords do not match";
		}

		if (!formData.birthdate) {
			newErrors.birthdate = "Birth date is required";
		}

		if (!formData.gender) {
			newErrors.gender = "Gender is required";
		}

		if (!formData.phone.trim()) {
			newErrors.phone = "Phone number is required";
		}

		if (!formData.location.trim()) {
			newErrors.location = "Location is required";
		}

		if (!formData.usertype) {
			newErrors.usertype = "User type is required";
		}

		setErrors(newErrors);
		return Object.keys(newErrors).length === 0;
	};

	const validateFinalSubmission = () => {
		const newErrors: Record<string, string> = {};

		// Basic required fields - check for empty strings properly
		const requiredFields = [
			"fullname",
			"email",
			"password",
			"birthdate",
			"gender",
			"phone",
			"location",
			"usertype",
		];

		requiredFields.forEach((field) => {
			const value = formData[field as keyof FormData];

			if (!value || (typeof value === "string" && value.trim() === "")) {
				newErrors[field] = `${
					field.charAt(0).toUpperCase() + field.slice(1)
				} is required`;
			}
		});

		// Email validation
		if (formData.email && !/\S+@\S+\.\S+/.test(formData.email)) {
			newErrors.email = "Please enter a valid email";
		}

		// Password validation
		if (formData.password && formData.password.length < 8) {
			newErrors.password = "Password must be at least 8 characters";
		}

		// Confirm password validation
		if (formData.password !== formData.confirmPassword) {
			newErrors.confirmPassword = "Passwords do not match";
		}

		setErrors(newErrors);
		return Object.keys(newErrors).length === 0;
	};

	const handleCreateAccount = async () => {
		setIsLoading(true);

		// Clear any previous API errors
		setErrors((prev) => ({ ...prev, api: "" }));

		// Validate before submission
		const validationResult = validateFinalSubmission();

		if (!validationResult) {
			setIsLoading(false);
			addToast("error", "Please fix the validation errors before continuing");
			return;
		}

		try {
			// Add request timeout
			const controller = new AbortController();
			const timeoutId = setTimeout(() => controller.abort(), 30000); // 30 second timeout

			// Use JSON instead of FormData for better performance
			const requestBody = {
				fullname: formData.fullname.trim(),
				email: formData.email.trim().toLowerCase(),
				password: formData.password,
				birthdate: formData.birthdate,
				gender: formData.gender,
				phone: formData.phone.trim(),
				location: formData.location.trim(),
				usertype: formData.usertype,
				...(formData.wallet && { wallet: formData.wallet }),
			};

			addToast("info", "Creating your account...");

			const response = await fetch(
				"https://farmplace-backend-api.onrender.com/api/v1/auth/register",
				{
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify(requestBody),
					signal: controller.signal,
				}
			);

			clearTimeout(timeoutId);

			const result = await response.json();

			if (response.ok) {
				// Registration successful
				addToast(
					"success",
					"Account created successfully! Redirecting to login..."
				);

				// Clear stored data
				if (typeof window !== "undefined") {
					sessionStorage.removeItem(STORAGE_KEY);
				}

				// Redirect after showing success message
				setTimeout(() => {
					router.push("/auth/login");
				}, 2000);
			} else {
				// Handle API errors
				const errorMessage = result.message || "Registration failed";
				setErrors({ api: errorMessage });
				addToast("error", errorMessage);
			}
		} catch (error) {
			if (error instanceof Error && error.name === "AbortError") {
				const timeoutMessage =
					"Request timeout. The server might be slow. Please try again.";
				setErrors({ api: timeoutMessage });
				addToast("error", timeoutMessage);
			} else {
				const networkMessage =
					"Network error. Please check your connection and try again.";
				setErrors({ api: networkMessage });
				addToast("error", networkMessage);
			}
		} finally {
			setIsLoading(false);
		}
	};

	const handleContinue = () => {
		let isValid = false;

		if (currentStep === 1) {
			isValid = validateStep1();
			if (isValid) {
				router.push(`/auth/register/${currentStep + 1}`);
			} else {
				addToast("error", "Please fill in all required fields correctly");
			}
		} else if (currentStep === 2) {
			// Final step - create account
			handleCreateAccount();
		}
	};

	const handleBack = () => {
		if (currentStep > 1) {
			router.push(`/auth/register/${currentStep - 1}`);
		}
	};

	// Toast Component
	const ToastContainer = () => (
		<div className='fixed top-4 right-4 z-50 space-y-2'>
			{toasts.map((toast) => (
				<div
					key={toast.id}
					className={`flex items-center p-4 rounded-lg shadow-lg border transition-all duration-300 transform translate-x-0 ${
						toast.type === "success"
							? "bg-green-50 border-green-200 text-green-800"
							: toast.type === "error"
							? "bg-red-50 border-red-200 text-red-800"
							: "bg-blue-50 border-blue-200 text-blue-800"
					}`}>
					<div className='flex-shrink-0 mr-3'>
						{toast.type === "success" && <CheckCircle size={20} />}
						{toast.type === "error" && <AlertCircle size={20} />}
						{toast.type === "info" && <AlertCircle size={20} />}
					</div>
					<div className='flex-1'>
						<p className='text-sm font-medium'>{toast.message}</p>
					</div>
					<button
						onClick={() => removeToast(toast.id)}
						className='flex-shrink-0 ml-4 text-gray-400 hover:text-gray-600'>
						<X size={16} />
					</button>
				</div>
			))}
		</div>
	);

	const renderStepIndicator = () => (
		<div className='flex items-center justify-center mb-8'>
			{[
				{ step: 1, label: "Details", icon: User },
				{ step: 2, label: "Wallet", icon: Wallet },
			].map(({ step, label, icon: Icon }, index) => (
				<div key={step} className='flex items-center'>
					<div className='flex flex-col items-center'>
						<div
							className={`w-12 h-12 rounded-full flex items-center justify-center text-sm font-medium transition-all duration-300 ${
								step < currentStep
									? "bg-green-600 text-white shadow-lg"
									: step === currentStep
									? "bg-green-600 text-white shadow-lg scale-110"
									: "bg-gray-200 text-gray-600"
							}`}>
							{step < currentStep ? <Check size={20} /> : <Icon size={20} />}
						</div>
						<span
							className={`mt-2 text-xs font-medium ${
								step <= currentStep ? "text-green-600" : "text-gray-400"
							}`}>
							{label}
						</span>
					</div>
					{index < 1 && (
						<div
							className={`w-16 h-0.5 mx-4 transition-all duration-300 ${
								step < currentStep ? "bg-green-600" : "bg-gray-200"
							}`}
						/>
					)}
				</div>
			))}
		</div>
	);

	const renderStep1 = () => (
		<div className='space-y-6'>
			<div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
				<div>
					<label className='block text-sm font-semibold text-gray-700 mb-2'>
						<User className='inline w-4 h-4 mr-2' />
						Full Name
					</label>
					<input
						type='text'
						value={formData.fullname}
						onChange={(e) => updateFormData("fullname", e.target.value)}
						placeholder='Enter your full name'
						className={`w-full px-4 py-3 border-2 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all duration-200 ${
							errors.fullname
								? "border-red-500 bg-red-50"
								: "border-gray-200 hover:border-gray-300"
						}`}
					/>
					{errors.fullname && (
						<p className='text-red-500 text-sm mt-1 flex items-center'>
							<span className='mr-1'>⚠</span>
							{errors.fullname}
						</p>
					)}
				</div>

				<div>
					<label className='block text-sm font-semibold text-gray-700 mb-2'>
						<Mail className='inline w-4 h-4 mr-2' />
						Email
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
					/>
					{errors.email && (
						<p className='text-red-500 text-sm mt-1 flex items-center'>
							<span className='mr-1'>⚠</span>
							{errors.email}
						</p>
					)}
				</div>
			</div>

			<div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
				<div>
					<label className='block text-sm font-semibold text-gray-700 mb-2'>
						<Phone className='inline w-4 h-4 mr-2' />
						Phone Number
					</label>
					<input
						type='tel'
						value={formData.phone}
						onChange={(e) => updateFormData("phone", e.target.value)}
						placeholder='Enter your phone number'
						className={`w-full px-4 py-3 border-2 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all duration-200 ${
							errors.phone
								? "border-red-500 bg-red-50"
								: "border-gray-200 hover:border-gray-300"
						}`}
					/>
					{errors.phone && (
						<p className='text-red-500 text-sm mt-1 flex items-center'>
							<span className='mr-1'>⚠</span>
							{errors.phone}
						</p>
					)}
				</div>

				<div>
					<label className='block text-sm font-semibold text-gray-700 mb-2'>
						<Calendar className='inline w-4 h-4 mr-2' />
						Birth Date
					</label>
					<input
						type='date'
						value={formData.birthdate}
						onChange={(e) => updateFormData("birthdate", e.target.value)}
						className={`w-full px-4 py-3 border-2 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all duration-200 ${
							errors.birthdate
								? "border-red-500 bg-red-50"
								: "border-gray-200 hover:border-gray-300"
						}`}
					/>
					{errors.birthdate && (
						<p className='text-red-500 text-sm mt-1 flex items-center'>
							<span className='mr-1'>⚠</span>
							{errors.birthdate}
						</p>
					)}
				</div>
			</div>

			<div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
				<div>
					<label className='block text-sm font-semibold text-gray-700 mb-2'>
						Gender
					</label>
					<select
						value={formData.gender}
						onChange={(e) => updateFormData("gender", e.target.value)}
						className={`w-full px-4 py-3 border-2 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all duration-200 ${
							errors.gender
								? "border-red-500 bg-red-50"
								: "border-gray-200 hover:border-gray-300"
						}`}>
						<option value=''>Select Gender</option>
						<option value='male'>Male</option>
						<option value='female'>Female</option>
					</select>
					{errors.gender && (
						<p className='text-red-500 text-sm mt-1 flex items-center'>
							<span className='mr-1'>⚠</span>
							{errors.gender}
						</p>
					)}
				</div>

				<div>
					<label className='block text-sm font-semibold text-gray-700 mb-2'>
						<MapPin className='inline w-4 h-4 mr-2' />
						Location
					</label>
					<input
						type='text'
						value={formData.location}
						onChange={(e) => updateFormData("location", e.target.value)}
						placeholder='Enter your location'
						className={`w-full px-4 py-3 border-2 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all duration-200 ${
							errors.location
								? "border-red-500 bg-red-50"
								: "border-gray-200 hover:border-gray-300"
						}`}
					/>
					{errors.location && (
						<p className='text-red-500 text-sm mt-1 flex items-center'>
							<span className='mr-1'>⚠</span>
							{errors.location}
						</p>
					)}
				</div>
			</div>

			<div>
				<label className='block text-sm font-semibold text-gray-700 mb-2'>
					User Type
				</label>
				<div className='grid grid-cols-2 gap-4'>
					{[
						{
							value: "buyer",
							label: "Buyer",
							desc: "Purchase agricultural products",
						},
						{
							value: "farmer",
							label: "Farmer",
							desc: "Sell agricultural products",
						},
					].map((type) => (
						<div
							key={type.value}
							onClick={() => updateFormData("usertype", type.value)}
							className={`p-4 border-2 rounded-xl cursor-pointer transition-all duration-200 ${
								formData.usertype === type.value
									? "border-green-500 bg-green-50"
									: "border-gray-200 hover:border-gray-300"
							}`}>
							<div className='flex items-center justify-between mb-2'>
								<span className='font-semibold text-gray-900'>
									{type.label}
								</span>
								<div
									className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${
										formData.usertype === type.value
											? "border-green-500 bg-green-500"
											: "border-gray-300"
									}`}>
									{formData.usertype === type.value && (
										<div className='w-2 h-2 bg-white rounded-full' />
									)}
								</div>
							</div>
							<p className='text-sm text-gray-600'>{type.desc}</p>
						</div>
					))}
				</div>
				{errors.usertype && (
					<p className='text-red-500 text-sm mt-1 flex items-center'>
						<span className='mr-1'>⚠</span>
						{errors.usertype}
					</p>
				)}
			</div>

			<div>
				<label className='block text-sm font-semibold text-gray-700 mb-2'>
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
					/>
					<button
						type='button'
						onClick={() => setShowPassword(!showPassword)}
						className='absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors'>
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

			<div>
				<label className='block text-sm font-semibold text-gray-700 mb-2'>
					Confirm Password
				</label>
				<div className='relative'>
					<input
						type={showConfirmPassword ? "text" : "password"}
						value={formData.confirmPassword}
						onChange={(e) => updateFormData("confirmPassword", e.target.value)}
						placeholder='Confirm your password'
						className={`w-full px-4 py-3 border-2 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all duration-200 pr-12 ${
							errors.confirmPassword
								? "border-red-500 bg-red-50"
								: "border-gray-200 hover:border-gray-300"
						}`}
					/>
					<button
						type='button'
						onClick={() => setShowConfirmPassword(!showConfirmPassword)}
						className='absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors'>
						{showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
					</button>
				</div>
				{errors.confirmPassword && (
					<p className='text-red-500 text-sm mt-1 flex items-center'>
						<span className='mr-1'>⚠</span>
						{errors.confirmPassword}
					</p>
				)}
			</div>
		</div>
	);

	const renderStep2 = () => (
		<div className='space-y-6'>
			<div className='text-center mb-6 p-6 bg-gradient-to-r from-purple-50 to-blue-50 rounded-xl'>
				<Wallet className='w-12 h-12 text-blue-600 mx-auto mb-3' />
				<h3 className='text-lg font-semibold text-gray-900 mb-2'>
					Connect Wallet
				</h3>
				<p className='text-gray-600 mb-4'>
					Connect your Cardano wallet for seamless transactions (Optional)
				</p>
				<p className='text-sm text-gray-500'>
					Don't have a wallet?{" "}
					<button
						onClick={() => handleCreateAccount()}
						className='text-blue-600 hover:text-blue-700 font-medium'>
						Skip this step
					</button>
				</p>
			</div>

			<div className='bg-white border-2 border-gray-200 rounded-xl p-6'>
				<label className='block text-sm font-semibold text-gray-700 mb-4'>
					Connect Your Cardano Wallet
				</label>
				<ConnectWallet className='w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white border-0 hover:from-purple-700 hover:to-blue-700' />
			</div>

			{Object.keys(errors).length > 0 && (
				<div className='bg-red-50 border-2 border-red-200 rounded-xl p-4'>
					<div className='flex items-center mb-2'>
						<span className='text-red-500 mr-2'>⚠</span>
						<p className='text-red-600 text-sm font-semibold'>
							Please fix the following errors:
						</p>
					</div>
					<ul className='text-red-600 text-sm space-y-1 ml-6'>
						{Object.entries(errors).map(([field, error]) => (
							<li key={field}>• {error}</li>
						))}
					</ul>
				</div>
			)}

			{errors.api && (
				<div className='bg-red-50 border-2 border-red-200 rounded-xl p-4'>
					<div className='flex items-center'>
						<span className='text-red-500 mr-2'>⚠</span>
						<p className='text-red-600 text-sm font-medium'>{errors.api}</p>
					</div>
				</div>
			)}
		</div>
	);

	const getStepContent = () => {
		switch (currentStep) {
			case 1:
				return renderStep1();
			case 2:
				return renderStep2();
			default:
				return renderStep1();
		}
	};

	const getStepTitle = () => {
		switch (currentStep) {
			case 1:
				return "Personal Information";
			case 2:
				return "Wallet Connection";
			default:
				return "Personal Information";
		}
	};

	return (
		<>
			<ToastContainer />
			<div className='min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-purple-50 flex items-center justify-center p-4'>
				<div className='max-w-2xl w-full'>
					{renderStepIndicator()}

					<div className='bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 p-8'>
						<div className='text-center mb-8'>
							<h1 className='text-3xl font-bold text-gray-900 mb-2'>
								Create Account
							</h1>
							<p className='text-gray-600 text-lg'>{getStepTitle()}</p>
						</div>

						{getStepContent()}

						<div className='flex items-center justify-between mt-8 pt-6 border-t border-gray-200'>
							{currentStep > 1 ? (
								<button
									onClick={handleBack}
									className='px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-xl font-medium hover:border-gray-400 hover:bg-gray-50 transition-all duration-200'>
									Back
								</button>
							) : (
								<div className='text-center'>
									<span className='text-gray-600'>
										Already have an account?{" "}
									</span>
									<button
										onClick={() => router.push("/auth/login")}
										className='text-green-600 hover:text-green-700 font-semibold'>
										Login
									</button>
								</div>
							)}

							<button
								onClick={handleContinue}
								disabled={isLoading}
								className='px-8 py-3 bg-gradient-to-r from-green-600 to-blue-600 text-white rounded-xl font-semibold hover:from-green-700 hover:to-blue-700 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-105'>
								{isLoading ? (
									<span className='flex items-center'>
										<div className='w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2'></div>
										Creating Account...
									</span>
								) : currentStep === 2 ? (
									"Create Account"
								) : (
									"Continue"
								)}
							</button>
						</div>

						{currentStep === 2 && (
							<div className='text-center mt-4'>
								<button
									onClick={() => handleCreateAccount()}
									disabled={isLoading}
									className='text-gray-600 hover:text-gray-800 disabled:opacity-50 text-sm'>
									Skip wallet connection
								</button>
							</div>
						)}
					</div>
				</div>
			</div>
		</>
	);
};

export default RegisterPage;
