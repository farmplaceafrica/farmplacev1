import { ValidationRules } from "@/components/global/Input";
import React, { JSX } from "react";

/**
 * Represents the props for an input component.
 */
export type InputProps = {
	/**
	 * The label for the input.
	 * @example "Email"
	 * @note this is optional
	 */
	label?: string;
	icon?: JSX.Element;
	/**
	 * The placeholder text for the input.
	 * @example "Enter your email address"
	 * @note this is optional
	 */
	placeholder?: string;
	/**
	 * Additional information about the input.
	 * @example { description: "Enter your email address", title: "Email" }
	 * @note this is optional
	 */
	info?: {
		/**
		 * The description of the input.
		 */
		description?: string;
		/**
		 * The title of the input.
		 */
		title?: string;
	};
	/**
	 * The type of the input.
	 * @note this is optional
	 * @default "text"
	 * @example "text"
	 */
	type?:
		| "text"
		| "password"
		| "email"
		| "number"
		| "tel"
		| "url"
		| "search"
		| "date"
		| "time"
		| "datetime-local"
		| "month"
		| "week"
		| "color"
		| "file"
		| "range"
		| "hidden"
		| "image"
		| "checkbox"
		| "radio"
		| "submit"
		| "reset"
		| "button"
		| "amount";
	/**
	 * The ID of the input.
	 * @note this is optional
	 * @example "email"
	 */
	id?: string;
	/**
	 * The event handler for the onChange event.
	 * @param e - The change event.
	 * @note this is optional
	 * @example (e) => console.log(e.target.value)
	 */
	onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
	/**
	 * The value of the input.
	 * @note this is optional
	 */
	value?: boolean | string | number;
	/**
	 * The autocomplete attribute for the input.
	 * @example <Input autoComplete="email" />
	 * @note this is optional
	 */
	autoComplete?: string | boolean;
	/**
	 * The theme of the input.
	 * @example <Input theme="outline" />
	 * @note this is optional
	 * @default "outline"
	 */
	theme?: "outline" | "plain";
	/**
	 * Indicates whether the input is focused.
	 * @example <Input focused />
	 * @note this is optional
	 * @default false
	 */
	focused?: boolean | (() => boolean);
	/**
	 * Indicates whether the input is disabled.
	 * @example <Input disabled />
	 * @note this is optional
	 * @default false
	 */
	disabled?: boolean;
	/**
	 * The step value for number inputs.
	 * @example <Input step={2} />
	 * @note this is optional
	 * @default 1
	 */
	step?: number;
	/**
	 * The name of the input.
	 * @example <Input name="email" />
	 * @required
	 */
	name: string;
	/**
	 * The maximum number of characters allowed in the input.
	 * @example <Input characters={10} />
	 */
	characters?: number;
	/**
	 * The tag name of the input element.
	 * @example <Input tag="textarea" />
	 */
	tag?: "input" | "textarea";
	/**
	 * Indicates whether to show the password for password inputs.
	 * @example <Input showPassword />
	 * @note this is optional
	 * @default false
	 */
	showPassword?: boolean;
	/**
	 * Indicates whether the input is optional.
	 * @example <Input optional />
	 * @note this is optional
	 * @default false
	 */
	optional?: boolean;
	/**
	 * The CSS class name for the input.
	 * @example <Input className="text-red-500" />
	 * @note this is optional
	 * @default ""
	 */
	className?: string;
	/**
	 * The custom error message for the input.
	 * @example <Input customError="Invalid email address" />
	 */
	customError?: string;
	/**
	 * The custom message for the input.
	 * @example <Input customMessage="Invalid email address" />
	 */
	customMessage?: string;
	/**
	 * The JSX element to be rendered on the left side of the input.
	 * @example <Input left={<Icons.SearchIcon />} />
	 */
	left?: JSX.Element;
	/**
	 * The JSX element to be rendered on the right side of the input.
	 * @example <Input right={<Icons.SearchIcon />} />
	 */
	right?: JSX.Element;
	/**
	 * The padding-left CSS property for the input.
	 * @example <Input paddingLeft="pl-11" />
	 */
	paddingLeft?: string;
	/**
	 * The padding-right CSS property for the input.
	 * @example <Input paddingRight="pr-11" />
	 */
	paddingRight?: string;
	/**
	 * The event handler for the onBlur event.
	 * @example <Input onBlur={(e) => console.log(e.target.value)} />
	 * @note this is optional
	 * @param e - The blur event.
	 */
	onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
	/**
	 * The event handler for the onFocus event.
	 * @example <Input onFocus={(e) => console.log(e.target.value)} />
	 * @note this is optional
	 * @param e - The focus event.
	 */
	onFocus?: (e: React.FocusEvent<HTMLInputElement>) => void;
	/**
	 * The event handler for the onKeyDown event.
	 * @example <Input onKeyDown={(e) => console.log(e.target.value)} />
	 * @note this is optional
	 * @param e - The keydown event.
	 */
	onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
	/**
	 * The event handler for the onKeyUp event.
	 * @example <Input onKeyUp={(e) => console.log(e.target.value)} />
	 * @note this is optional
	 * @param e - The keyup event.
	 */
	onKeyUp?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
	/**
	 * The event handler for the onKeyPress event.
	 * @example <Input onKeyPress={(e) => console.log(e.target.value)} />
	 * @note this is optional
	 * @param e - The keypress event.
	 */
	onKeyPress?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
	/**
	 * The validation rules for the input.
	 * @example <Input rules={["required", "email"]} />
	 * @note this is optional
	 * @default []
	 */
	rules?: Array<keyof ValidationRules>;
	/**
	 * The pattern attribute for the input.
	 * @example <Input pattern="[A-Za-z]{3}" />
	 * @note this is optional
	 * @default ""
	 * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/pattern
	 * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#htmlattrdefpattern
	 */
	pattern?: string;
	/**
	 * The hint text for the input.
	 * @example <Input hint="Enter your email address" />
	 */
	hint?: string;
	/**
	 * Indicates whether the input is in a loading state.
	 * @example <Input isLoading />
	 * @note this is optional
	 * @default false
	 */
	isLoading?: boolean;
} & React.InputHTMLAttributes<HTMLInputElement>;
