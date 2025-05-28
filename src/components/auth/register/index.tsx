// pages/register/[step].tsx
import { useRouter, useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";
import { Eye, EyeOff } from "lucide-react";

interface FormData {
	fullName: string;
	email: string;
	password: string;
	confirmPassword: string;
	idType: string;
	idFile: File | null;
	wallet: string;
}

const RegisterPage = () => {
	const router = useRouter();
	const searchParams = useSearchParams();
	const step = searchParams.get("step");
	const currentStep = parseInt(step || "1");

	const [formData, setFormData] = useState<FormData>({
		fullName: "",
		email: "",
		password: "",
		confirmPassword: "",
		idType: "National Identity Number",
		idFile: null,
		wallet: "",
	});

	const [showPassword, setShowPassword] = useState(false);
	const [showConfirmPassword, setShowConfirmPassword] = useState(false);
	const [errors, setErrors] = useState<Record<string, string>>({});

	// Redirect to step 1 if invalid step
	useEffect(() => {
		if (currentStep < 1 || currentStep > 3) {
			router.replace("/register/1");
		}
	}, [currentStep, router]);

	const updateFormData = (
		field: keyof FormData,
		value: string | File | null
	) => {
		setFormData((prev) => ({ ...prev, [field]: value }));
		// Clear error when user starts typing
		if (errors[field]) {
			setErrors((prev) => ({ ...prev, [field]: "" }));
		}
	};

	const validateStep1 = () => {
		const newErrors: Record<string, string> = {};

		if (!formData.fullName.trim()) {
			newErrors.fullName = "Full name is required";
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

		setErrors(newErrors);
		return Object.keys(newErrors).length === 0;
	};

	const validateStep2 = () => {
		const newErrors: Record<string, string> = {};

		if (!formData.idFile) {
			newErrors.idFile = "Please upload your ID document";
		}

		setErrors(newErrors);
		return Object.keys(newErrors).length === 0;
	};

	const handleContinue = () => {
		let isValid = false;

		if (currentStep === 1) {
			isValid = validateStep1();
		} else if (currentStep === 2) {
			isValid = validateStep2();
		}

		if (isValid && currentStep < 3) {
			router.push(`/register/${currentStep + 1}`);
		} else if (currentStep === 3) {
			// Final step - create account
			handleCreateAccount();
		}
	};

	const handleCreateAccount = () => {
		// Here you would typically send the data to your API
		console.log("Creating account with data:", formData);
		// Redirect to success page or login
		router.push("/dashboard");
	};

	const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
		const file = event.target.files?.[0] || null;
		updateFormData("idFile", file);
	};

	const handleGoogleSignIn = () => {
		// Implement Google Sign In logic
		console.log("Google Sign In");
	};

	const renderStepIndicator = () => (
		<div className='flex items-center justify-center mb-8'>
			{[1, 2, 3].map((stepNum) => (
				<div key={stepNum} className='flex items-center'>
					<div
						className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
							stepNum < currentStep
								? "bg-green-600 text-white"
								: stepNum === currentStep
								? "bg-green-600 text-white"
								: "bg-gray-200 text-gray-600"
						}`}>
						{stepNum < currentStep ? "✓" : stepNum}
					</div>
					{stepNum < 3 && (
						<div
							className={`w-16 h-0.5 mx-2 ${
								stepNum < currentStep ? "bg-green-600" : "bg-gray-200"
							}`}
						/>
					)}
				</div>
			))}
		</div>
	);

	const renderStep1 = () => (
		<div className='space-y-6'>
			<div>
				<label className='block text-sm font-medium text-gray-700 mb-2'>
					Full Name
				</label>
				<input
					type='text'
					value={formData.fullName}
					onChange={(e) => updateFormData("fullName", e.target.value)}
					placeholder='Precious Eyo'
					className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent ${
						errors.fullName ? "border-red-500" : "border-gray-300"
					}`}
				/>
				{errors.fullName && (
					<p className='text-red-500 text-sm mt-1'>{errors.fullName}</p>
				)}
			</div>

			<div>
				<label className='block text-sm font-medium text-gray-700 mb-2'>
					Email
				</label>
				<input
					type='email'
					value={formData.email}
					onChange={(e) => updateFormData("email", e.target.value)}
					placeholder='Email'
					className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent ${
						errors.email ? "border-red-500" : "border-gray-300"
					}`}
				/>
				{errors.email && (
					<p className='text-red-500 text-sm mt-1'>{errors.email}</p>
				)}
			</div>

			<div>
				<label className='block text-sm font-medium text-gray-700 mb-2'>
					Password
				</label>
				<div className='relative'>
					<input
						type={showPassword ? "text" : "password"}
						value={formData.password}
						onChange={(e) => updateFormData("password", e.target.value)}
						placeholder='Password'
						className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent pr-12 ${
							errors.password ? "border-red-500" : "border-gray-300"
						}`}
					/>
					<button
						type='button'
						onClick={() => setShowPassword(!showPassword)}
						className='absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600'>
						{showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
					</button>
				</div>
				{errors.password && (
					<p className='text-red-500 text-sm mt-1'>{errors.password}</p>
				)}
			</div>

			<div>
				<label className='block text-sm font-medium text-gray-700 mb-2'>
					Confirm Password
				</label>
				<div className='relative'>
					<input
						type={showConfirmPassword ? "text" : "password"}
						value={formData.confirmPassword}
						onChange={(e) => updateFormData("confirmPassword", e.target.value)}
						placeholder='Confirm Password'
						className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent pr-12 ${
							errors.confirmPassword ? "border-red-500" : "border-gray-300"
						}`}
					/>
					<button
						type='button'
						onClick={() => setShowConfirmPassword(!showConfirmPassword)}
						className='absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600'>
						{showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
					</button>
				</div>
				{errors.confirmPassword && (
					<p className='text-red-500 text-sm mt-1'>{errors.confirmPassword}</p>
				)}
			</div>

			<button
				onClick={handleContinue}
				className='w-full bg-green-600 text-white py-3 rounded-lg font-medium hover:bg-green-700 transition-colors'>
				Continue
			</button>

			<div className='text-center'>
				<span className='text-gray-600'>Already have an account? </span>
				<button
					onClick={() => router.push("/login")}
					className='text-green-600 hover:text-green-700 font-medium'>
					Login
				</button>
			</div>

			<div className='relative'>
				<div className='absolute inset-0 flex items-center'>
					<div className='w-full border-t border-gray-300' />
				</div>
				<div className='relative flex justify-center text-sm'>
					<span className='px-2 bg-white text-gray-500'>Or</span>
				</div>
			</div>

			<button
				onClick={handleGoogleSignIn}
				className='w-full flex items-center justify-center px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors'>
				<svg className='w-5 h-5 mr-2' viewBox='0 0 24 24'>
					<path
						fill='#4285f4'
						d='M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z'
					/>
					<path
						fill='#34a853'
						d='M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z'
					/>
					<path
						fill='#fbbc05'
						d='M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z'
					/>
					<path
						fill='#ea4335'
						d='M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z'
					/>
				</svg>
				Continue with Google
			</button>
		</div>
	);

	const renderStep2 = () => (
		<div className='space-y-6'>
			<div>
				<label className='block text-sm font-medium text-gray-700 mb-2'>
					ID Type
				</label>
				<select
					value={formData.idType}
					onChange={(e) => updateFormData("idType", e.target.value)}
					className='w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent'>
					<option>National Identity Number</option>
					<option>Driver's License</option>
					<option>Passport</option>
					<option>Voter's Card</option>
				</select>
			</div>

			<div>
				<label className='block text-sm font-medium text-gray-700 mb-2'>
					Upload ID
				</label>
				<div className='flex items-center space-x-4'>
					<label className='bg-gray-800 text-white px-4 py-2 rounded cursor-pointer hover:bg-gray-700 transition-colors'>
						Choose File
						<input
							type='file'
							accept='image/*,.pdf'
							onChange={handleFileUpload}
							className='hidden'
						/>
					</label>
					<span className='text-gray-500 text-sm'>
						{formData.idFile ? formData.idFile.name : "No file chosen"}
					</span>
				</div>
				{errors.idFile && (
					<p className='text-red-500 text-sm mt-1'>{errors.idFile}</p>
				)}
			</div>

			<button
				onClick={handleContinue}
				className='w-full bg-green-600 text-white py-3 rounded-lg font-medium hover:bg-green-700 transition-colors'>
				Continue
			</button>
		</div>
	);

	const renderStep3 = () => (
		<div className='space-y-6'>
			<div className='text-center mb-6'>
				<p className='text-gray-600 mb-2'>Connect to your Cardano wallet.</p>
				<p className='text-gray-600'>
					Don't have a wallet?{" "}
					<button
						onClick={() => router.push("/register/1")}
						className='text-green-600 hover:text-green-700'>
						Skip
					</button>
				</p>
			</div>

			<div>
				<label className='block text-sm font-medium text-gray-700 mb-2'>
					Connect Wallet
				</label>
				<select
					value={formData.wallet}
					onChange={(e) => updateFormData("wallet", e.target.value)}
					className='w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent'>
					<option value=''>Choose Wallet</option>
					<option value='nami'>Nami</option>
					<option value='ccvault'>CCVault</option>
					<option value='yoroi'>Yoroi</option>
					<option value='flint'>Flint</option>
				</select>
			</div>

			<button
				onClick={handleContinue}
				className='w-full bg-green-600 text-white py-3 rounded-lg font-medium hover:bg-green-700 transition-colors'>
				Create Account
			</button>

			<div className='text-center'>
				<button
					onClick={() => router.push("/dashboard")}
					className='text-gray-600 hover:text-gray-800'>
					Skip
				</button>
			</div>
		</div>
	);

	const getStepContent = () => {
		switch (currentStep) {
			case 1:
				return renderStep1();
			case 2:
				return renderStep2();
			case 3:
				return renderStep3();
			default:
				return renderStep1();
		}
	};

	const getStepTitle = () => {
		switch (currentStep) {
			case 1:
				return "Please fill in your details";
			case 2:
				return "Enter any form of national identification";
			case 3:
				return "";
			default:
				return "Please fill in your details";
		}
	};

	return (
		<div className='min-h-screen bg-gray-50 flex items-center justify-center p-4'>
			<div className='max-w-md w-full'>
				{renderStepIndicator()}

				<div className='bg-white rounded-lg shadow-lg p-8 border-2 border-blue-500'>
					<div className='text-center mb-8'>
						<h1 className='text-2xl font-bold text-gray-900 mb-2'>
							Create Account
						</h1>
						{getStepTitle() && (
							<p className='text-gray-600'>{getStepTitle()}</p>
						)}
					</div>

					{getStepContent()}
				</div>
			</div>
		</div>
	);
};

export default RegisterPage;
