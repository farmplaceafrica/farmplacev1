/* eslint-disable no-useless-escape */
/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable tailwindcss/classnames-order */
/* eslint-disable tailwindcss/no-custom-classname */
/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import Icons from "@/components/icons";
import { cn } from "@/lib/utils";
import type { InputProps } from "@/types/global/InputProps";
import { useEffect, useRef, useState } from "react";
import { useFormContext } from "react-hook-form";
// import Icons from "@/components/icons";

type ValidationResult = boolean | string;

export type ValidationRules = {
	email: (value: string, label?: string) => ValidationResult;
	required: (value: string, label?: string) => ValidationResult;
	phone: (value: string, label?: string) => ValidationResult;
	altPhone: (value: string, label?: string) => ValidationResult;
	password: (value: string, label?: string) => ValidationResult;
	otp: (value: string, label?: string) => ValidationResult;
	bvn: (value: string, label?: string) => ValidationResult;
	confirmPassword: (value: string, label?: string) => ValidationResult;
	noSpaces: (value: string, label?: string) => ValidationResult;
	NGNBankAccountNumber: (value: string, label?: string) => ValidationResult;
};

const Input = ({
	label,
	placeholder,
	type = "text",
	id,
	onChange = () => {},
	max,
	min,
	icon,
	pattern,
	rules = [],
	name,
	autoComplete = "off",
	disabled = false,
	theme = "outline",
	focused = false,
	optional = false,
	className = "",
	showPassword: _showPassword = false,
	left,
	right,
	paddingLeft = "",
	paddingRight = "",
	customError,
	customMessage,
	characters = 50,
	hint,
	info = {},
	tag = "input",
	isLoading = false,
	...rest
}: InputProps) => {
	const [errorMessage, setErrorMessage] = useState("");
	const [showPassword, setShowPassword] = useState(_showPassword);
	const [passwordCheck, setPasswordCheck] = useState({
		uppercase: false,
		lowercase: false,
		number: false,
		special: false,
		length: false,
	});
	const [passwordIsDirty, setPasswordIsDirty] = useState(false);
	const inputRef = useRef<HTMLInputElement | null>(null);

	const methods = useFormContext();

	const {
		watch,
		formState: { isDirty },
	} = methods;

	const validationRules: ValidationRules = {
		required: (value, label = "") => {
			if (value !== null && value !== undefined && value !== "") return true;
			else return `The ${label} field is required`;
		},
		email: (value, label = "") => {
			const match = value
				.toString()
				.match(
					/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
				);
			return match ? true : `The ${label} field has to be a valid email`;
		},
		password: (value, label = "") => {
			const messages: string[] = [];

			if (!/[A-Z]/g.test(value)) {
				messages.push("an uppercase letter");
			}
			if (!/[a-z]/g.test(value)) {
				messages.push("a lowercase letter");
			}
			if (!/[0-9]/g.test(value)) {
				messages.push("a number");
			}
			if (!/[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/g.test(value)) {
				messages.push("a special character");
			}
			if (value.length < 8) {
				messages.push("at least 8 digits");
			}

			const message =
				messages.length > 1
					? `${messages.slice(0, -1).join(", ")} and ${messages.slice(-1)}`
					: `${messages.join(", ")}`;
			return messages.length > 0
				? `The ${label} field must have ${message}`
				: true;
		},
		otp: (value, label = "") => {
			return value.length === 6
				? true
				: `The ${label} field must be of length 6`;
		},
		bvn: (value, label = "") => {
			return value?.length === 11
				? true
				: `The ${label} field must be of length 11`;
		},
		phone: (value, label = "") => {
			return value.length <= 10
				? true
				: `The ${label} field must be less than or equal to 12 digits`;
		},
		altPhone: (value, label = "") => {
			return value.length <= 12
				? true
				: `The ${label} field must be less than or equal to 12 digits`;
		},
		confirmPassword: (value, label = "") => {
			return value === watch("password") || value === watch("new_password")
				? true
				: `The ${label} field must be equal to the Password field`;
		},
		noSpaces: (value, label = "") => {
			return !value.includes(" ")
				? true
				: `The ${label} field is not allowed to contain spaces`;
		},
		NGNBankAccountNumber: (value, label = "") => {
			return value.length === 10
				? true
				: `The ${label} field must be equal to 10 digits`;
		},
	};

	const computedRules = rules.reduce<{
		[index: string]: (param: string) => ValidationResult;
	}>((map, key) => {
		map[key] = (value) => validationRules[key](value, label || name);
		return map;
	}, {});

	const { error } = methods.getFieldState(name);

	const register = methods.register(name, {
		validate: computedRules,

		pattern: pattern
			? {
					value: new RegExp(pattern),
					message:
						errorMessage ||
						`The ${label} field doesn't satisfy the regex ${pattern}`,
			  }
			: undefined,
		min: min
			? {
					value: min,
					message: `The ${label} field must be greater than or equal to ${min}`,
			  }
			: undefined,
		max: max
			? {
					value: max,
					message: `The ${label} field must be less than or equal to ${max}`,
			  }
			: undefined,
	});

	useEffect(() => {
		if (focused) {
			inputRef.current?.focus();
		}
	}, [focused]);

	const watchPassword = watch("password") || watch("new_password") || "";

	const value = watch(name);

	useEffect(() => {
		setPasswordCheck((prev) => ({
			...prev,
			uppercase: /[A-Z]/g.test(watchPassword),
			lowercase: /[a-z]/g.test(watchPassword),
			number: /[0-9]/g.test(watchPassword),
			special: /[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>/?~]/g.test(watchPassword),
			length: watchPassword?.length >= 8,
		}));
	}, [watchPassword]);

	const inputTheme = (theme: string) => {
		switch (theme) {
			case "outline":
				return `p-4 bg-white border-[1.5px] disabled:bg-[#83819729] disabled:border-[#83819729] ${
					error
						? "border-status-error-100 focus:border-status-error-100"
						: "border-[#5A5A5A33] focus:border-primary"
				}`;
			case "plain":
				return "p-4 bg-transparent border-[1.5px] border-transparent";
			default:
				return "bg-white border-[1.5px] border-[#5B5B66]";
		}
	};

	if (tag === "textarea")
		return (
			<label htmlFor={id} className='flex flex-col relative'>
				<span className='w-full text-sm space-x-1 text-left leading-5 capitalize text-[#5B5B66] mb-2'>
					<span>{label}</span>
					{rules.includes("required") && (
						<span className='text-status-error-100'>*</span>
					)}
				</span>
				<textarea
					{...register}
					className={cn(
						"w-full active:border-primary text-tc-main focus:bg-pc-02",
						inputTheme(theme),
						"text-sm overflow-hidden font-normal rounded outline-none",
						className
					)}
					rows={3}
					placeholder={placeholder}
					id={id}
					onChange={(event) => {
						register.onChange(event);
						onChange(event as any);
					}}
					ref={(e) => {
						register.ref(e);
					}}
					disabled={disabled}
				/>

				{/* <span
					className={cn(
						"text-sm text-primary font-medium absolute right-0 -bottom-6",
						{ "text-status-error-100": value.length > characters - 25 }
					)}>
					{value.length}/{characters}
				</span> */}

				{!rules.includes("password") && (error || customError) && (
					<span className='text-xs text-left mt-2 text-status-error-100'>
						*{customError || error?.message}
					</span>
				)}
			</label>
		);

	return (
		<label htmlFor={id} className='flex flex-col relative'>
			{label && (
				<span className='w-full flex items-center space-x-1 text-sm text-left leading-5 mb-2'>
					<span className='capitalize text-black-900'>{label}</span>
					{rules.includes("required") && (
						<span className='text-status-error-100'>*</span>
					)}
				</span>
			)}
			<input
				{...(icon && (
					<div className='absolute left-3 top-1/2 transform -translate-y-1/2 z-10'>
						{icon}
					</div>
				))}
				onFocus={() => setPasswordIsDirty(true)}
				{...register}
				className={`w-full active:border-primary text-dark ${inputTheme(
					theme
				)} text-sm h-10 overflow-hidden font-normal rounded outline-none ${className} ${
					type === "password" ? "pr-12" : ""
				} ${left ? paddingLeft : ""} ${right ? paddingRight : ""}`}
				type={showPassword ? "text" : type}
				placeholder={placeholder}
				id={id}
				onChange={(event) => {
					register.onChange(event);
					onChange(event);
				}}
				ref={(e) => {
					register.ref(e);
					inputRef.current = e;
				}}
				disabled={disabled}
				{...rest}
			/>
			{type === "password" && (
				<button
					type='button'
					onClick={() => setShowPassword(!showPassword)}
					className='absolute focus:border-primary focus:outline-primary flex items-center justify-center h-10 w-12 right-[2px] top-7 cursor-pointer'>
					<div className=''>
						{!showPassword ? <Icons.Unhide /> : <Icons.Hide />}
					</div>
				</button>
			)}

			{right && (
				<div
					className={cn(
						"absolute flex items-center justify-center h-10 right-[2px] top-7",
						{ "top-0": !label }
					)}>
					{right}
				</div>
			)}

			{left && (
				<div
					className={cn(
						"absolute flex items-center justify-center h-10 left-[2px] top-7",
						{ "top-0": !label }
					)}>
					{left}
				</div>
			)}

			{!rules.includes("password") && (error || customError) && (
				<span className='text-xs text-left mt-2 text-status-error-100'>
					*{customError || error?.message}
				</span>
			)}

			{passwordIsDirty && rules.includes("password") && (
				<div className='text-xs mt-2 text-left [&>*:nth-child(even)]:text-right grid grid-cols-2 gap-x-2 xl:gap-x-8 gap-y-1'>
					<div
						className={
							passwordCheck.uppercase
								? "text-status-success-100"
								: "text-status-error-100"
						}>
						*<span className='hidden sm:inline'>Must contain</span>{" "}
						<span className='capitalize sm:lowercase'>an</span> uppercase letter
					</div>
					<div
						className={
							passwordCheck.lowercase
								? "text-status-success-100"
								: "text-status-error-100"
						}>
						*<span className='hidden sm:inline'>Must contain</span>{" "}
						<span className='capitalize sm:lowercase'>a</span> lowercase letter
					</div>
					<div
						className={
							passwordCheck.number
								? "text-status-success-100"
								: "text-status-error-100"
						}>
						*<span className='hidden sm:inline'>Must contain</span>{" "}
						<span className='capitalize sm:lowercase'>a</span> number
					</div>
					<div
						className={
							passwordCheck.special
								? "text-status-success-100"
								: "text-status-error-100"
						}>
						*<span className='hidden sm:inline'>Must contain</span>{" "}
						<span className='capitalize sm:lowercase'>a</span> special character
					</div>
					<div
						className={
							passwordCheck.length
								? "text-status-success-100"
								: "text-status-error-100"
						}>
						*<span className='hidden sm:inline'>Must contain</span>{" "}
						<span className='capitalize sm:lowercase'>at</span> least 8
						characters
					</div>
				</div>
			)}

			{customMessage && (
				<span className='text-xs text-left mt-2 text-status-success-100'>
					{customMessage}
				</span>
			)}

			{hint && !customError && !error && !customMessage && (
				<span className='text-xs text-left mt-2 text-tc-03'>{hint}</span>
			)}
		</label>
	);
};

export default Input;
