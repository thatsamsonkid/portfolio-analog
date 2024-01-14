/** @type {import('tailwindcss').Config} */
module.exports = {
	// presets: [require('@spartan-ng/ui-core/hlm-tailwind-preset')],
	content: ['./index.html', './src/**/*.{html,ts,md}'],
	theme: {
		colors: {
			black: '#2a303c',
			white: '#fff',
			gray: '#777777',
			'blue-jaunts': '#467dcd',
			'light-purple-fax': '#f1f1ff',
			'hip-black': '#303842',
			'geeking-orange': '#f9674e',
			'red-mans': '#e23d3d',
			'yee-purple': '#52489c',
			'ardy-green': '#1b998b',
			'wilding-yellow': '#eec643',
			'ocean-blue': '#81d3ca',
			'shadow-black': '#22282f',
			transparent: 'transparent',
		},
		extend: {},
	},
	plugins: [require('tailwindcss-animated')],
};
