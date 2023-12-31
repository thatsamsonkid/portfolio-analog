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
		],
	},
	ssr: {
		noExternal: ['@ng-icons/core', '@ng-icons/font-awesome'],
	},
	plugins: [analog()],
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
