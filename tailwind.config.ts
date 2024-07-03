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
		nextui(),
		addIconSelectors(["mdi", "mdi-light"]),

		addDynamicIconSelectors({
			families: {
				yesicon: true,
			},
		}),
	],
};
