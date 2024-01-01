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
			'@angular/common',
			'@angular/forms',
			'@angular/platform-browser/animations',
			'@ng-icons/core',
			'@ng-icons/font-awesome',
			'@spartan/**',
		],
	},
	ssr: {
		noExternal: ['@ng-icons/core', '@ng-icons/font-awesome', '@spartan/**'],
	},
	plugins: [
		analog({
			ssr: false,
			static: true,
			prerender: {
				routes: ['/'],
				// sitemap: {
				//   host: 'https://analogjs.org/',
				// },
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
	},
}));
