/** @type {import('tailwindcss').Config} */
module.exports = {
	content: [
		'./pages/**/*.{js,ts,jsx,tsx}',
		'./components/**/*.{js,ts,jsx,tsx}',
		'./node_modules/tw-elements/dist/js/**/*.js'
	],
	theme: {
		container: {
			center: true,

			padding: {
				DEFAULT: '1rem',
				sm: '2rem',
				lg: '4rem',
				xl: '5rem',
				'2xl': '6rem'
			}
		},
		extend: {
			animation: {
				rebote: 'rebote 1s linear infinite'
			},
			keyframes: {
				rebote: {
					'25%': { transform: 'translateY(-3px)' },
					'75%': { transform: 'translateY(3px)' }
				}
			}
		}
	},
	plugins: [require('tw-elements/dist/plugin')]
};
