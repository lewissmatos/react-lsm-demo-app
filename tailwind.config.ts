const { nextui } = require("@nextui-org/react");
const {
	addDynamicIconSelectors,
	addIconSelectors,
} = require("@iconify/tailwind");

/** @type {import('tailwindcss').Config} */
module.exports = {
	content: [
		"./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
		"./src/components/**/*.{js,ts,jsx,tsx,mdx}",
		"./src/app/**/*.{js,ts,jsx,tsx,mdx}",
		"./node_modules/@nextui-org/theme/dist/components/[object Object].js",
		"./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
		"./src/(app|pages|components|hooks)/**/*.{js,ts,jsx,tsx}",
		"./app/**/*.{js,ts,jsx,tsx,mdx}",
		"./pages/**/*.{js,ts,jsx,tsx,mdx}",
		"./components/**/*.{js,ts,jsx,tsx,mdx}",
		"./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
		"./src/**/*.{js,ts,jsx,tsx,mdx}",
	],
	theme: {
		extend: {},
	},
	darkMode: "class",
	plugins: [
		nextui({
			themes: {
				"purple-dark": {
					extend: "dark",
					colors: {
						background: "#0D001A",
						foreground: "#ffffff",
						primary: {
							50: "#35126E",
							100: "#451E7A",
							200: "#552A86",
							300: "#653692",
							400: "#75429E",
							500: "#854EB4",
							600: "#955AC0",
							700: "#A566CC",
							800: "#B572D8",
							900: "#C57EE4",
							DEFAULT: "#854EB4",
							foreground: "#ffffff",
						},
						focus: "#854EB4",
					},
					layout: {
						disabledOpacity: "0.3",
						radius: {
							small: "6px",
							medium: "8px",
							large: "10px",
						},
						borderWidth: {
							small: "1px",
							medium: "2px",
							large: "3px",
						},
					},
				},
			},
		}),
		addIconSelectors(["mdi", "mdi-light"]),

		addDynamicIconSelectors({
			families: {
				yesicon: true,
			},
		}),
	],
};
