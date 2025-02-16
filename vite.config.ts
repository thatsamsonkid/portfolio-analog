/// <reference types="vitest" />

import analog from '@analogjs/platform';
import { defineConfig } from 'vite';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
	publicDir: 'src/assets',
	build: {
		target: ['es2020'],
	},
	resolve: {
		mainFields: ['module'],
	},
	optimizeDeps: {
		include: [
			'@angular/core',
			'@angular/common',
			'@angular/forms',
			'@angular/platform-browser/animations',
			'@ng-icons/core',
			'@ng-icons/font-awesome',
			'@spartan-ng/**/*',
		],
	},
	ssr: {
		noExternal: [
			'@angular/core',
			'@ng-icons/core',
			'@ng-icons/font-awesome',
			'@spartan-ng/**/*',
		],
	},
	plugins: [
		analog({
			prerender: {
				sitemap: {
					host: 'https://sammymohamed.com/',
				},
			},
			nitro: {
				preset: 'cloudflare_pages',
				output: {
					dir: './dist/analog/public',
					serverDir: './dist/analog/public',
				},
			},
		}),
	],
	test: {
		globals: true,
		environment: 'jsdom',
		setupFiles: ['src/test.ts'],
		include: ['**/*.spec.ts'],
		reporters: ['default'],
	},
	define: {
		'import.meta.vitest': mode !== 'production',
		ngDevMode: 'undefined',
	},
}));
