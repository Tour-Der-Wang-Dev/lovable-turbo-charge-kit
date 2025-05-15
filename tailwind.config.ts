
import type { Config } from "tailwindcss";

export default {
	darkMode: ["class"],
	content: [
		"./pages/**/*.{ts,tsx}",
		"./components/**/*.{ts,tsx}",
		"./app/**/*.{ts,tsx}",
		"./src/**/*.{ts,tsx}",
	],
	prefix: "",
	theme: {
		container: {
			center: true,
			padding: '2rem',
			screens: {
				'2xl': '1400px'
			}
		},
		extend: {
			colors: {
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				primary: {
					DEFAULT: 'hsl(var(--primary))',
					foreground: 'hsl(var(--primary-foreground))'
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary))',
					foreground: 'hsl(var(--secondary-foreground))'
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))'
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))'
				},
				accent: {
					DEFAULT: 'hsl(var(--accent))',
					foreground: 'hsl(var(--accent-foreground))'
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))'
				},
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))'
				},
				sidebar: {
					DEFAULT: 'hsl(var(--sidebar-background))',
					foreground: 'hsl(var(--sidebar-foreground))',
					primary: 'hsl(var(--sidebar-primary))',
					'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
					accent: 'hsl(var(--sidebar-accent))',
					'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
					border: 'hsl(var(--sidebar-border))',
					ring: 'hsl(var(--sidebar-ring))'
				},
				brand: {
					50: '#f0f7ff',
					100: '#e0eefe',
					200: '#bae0fd',
					300: '#7cc6fc',
					400: '#36a9f7',
					500: '#0c8de3',
					600: '#026dc1',
					700: '#05569d',
					800: '#094883',
					900: '#0d3c6c',
					950: '#082649',
				},
				purple: {
					50: '#f8f6fe',
					100: '#f2eefe',
					200: '#e7ddfc',
					300: '#d5c2f9',
					400: '#bd9df4',
					500: '#a274ec',
					600: '#8f54e0',
					700: '#7a3cc7',
					800: '#6731a5',
					900: '#562b86',
					950: '#35195a',
				},
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			},
			keyframes: {
				"accordion-down": {
					from: { height: '0' },
					to: { height: 'var(--radix-accordion-content-height)' },
				},
				"accordion-up": {
					from: { height: 'var(--radix-accordion-content-height)' },
					to: { height: '0' },
				},
				"pulse-ring": {
					"0%": {
						transform: "scale(0.8)",
						opacity: "0"
					},
					"50%": {
						opacity: "0.5"
					},
					"100%": {
						transform: "scale(1.3)",
						opacity: "0"
					}
				},
				"fade-in": {
					"0%": {
						opacity: "0"
					},
					"100%": {
						opacity: "1"
					}
				},
				"fade-out": {
					"0%": {
						opacity: "1"
					},
					"100%": {
						opacity: "0"
					}
				}
			},
			animation: {
				"accordion-down": "accordion-down 0.2s ease-out",
				"accordion-up": "accordion-up 0.2s ease-out",
				"pulse-ring": "pulse-ring 1.5s cubic-bezier(0.24, 0, 0.38, 1) infinite",
				"fade-in": "fade-in 0.2s ease-out",
				"fade-out": "fade-out 0.2s ease-out"
			}
		}
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;
