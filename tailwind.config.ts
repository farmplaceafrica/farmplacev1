import type { Config } from "tailwindcss";

const config = {
	content: [
		"./pages/**/*.{ts,tsx}",
		"./components/**/*.{ts,tsx}",
		"./app/**/*.{ts,tsx}",
		"./src/**/*.{ts,tsx}",
	],
	prefix: "",
	theme: {
		extend: {
			colors: {
				farmgreen: "#C3E0C4",
				farmgreen30: "#C3E0C44D",
			},
		},
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;

export default config;
