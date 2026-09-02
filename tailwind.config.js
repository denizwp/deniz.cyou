const defaultTheme = require("tailwindcss/defaultTheme");
const plugin = require("tailwindcss/plugin");

/** @type {import("tailwindcss").Config} */
module.exports = {
	content: [
		"./src/components/**/*.{ts,tsx,js,jsx}",
		"./src/pages/**/*.{ts,tsx,js,jsx}"
	],
	theme: {
		screens: {
			xs: "400px",
			...defaultTheme.screens
		},
		extend: {
			colors: {
				// near-black jade, used for every surface
				ink: {
					950: "#040f0b",
					900: "#0c1a14",
					800: "#16281f",
					700: "#20372b"
				}
			},
			fontFamily: {
				sans: ['"Inter"', ...defaultTheme.fontFamily.sans],
				heading: ['"Inter"', ...defaultTheme.fontFamily.sans]
			}
		}
	},
	variants: {},
	plugins: [
		plugin(({ addVariant }) => {
			addVariant("hf", ["&:hover", "&:focus"]);
			addVariant("hv", ["&:hover", "&:focus-visible"]);
			addVariant("group-hf", [".group:hover &", ".group:focus &"]);
			addVariant("group-hv", [
				".group:hover &",
				".group:focus-visible &"
			]);
		})
	]
};
