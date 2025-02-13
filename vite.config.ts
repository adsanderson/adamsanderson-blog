/// <reference types="@vitest/browser/providers/playwright" />

import { sentrySvelteKit } from '@sentry/sveltekit';
import { defineConfig } from 'vitest/config';
import { sveltekit } from '@sveltejs/kit/vite';

export default defineConfig({
	plugins: [
		sentrySvelteKit({
			sourceMapsUploadOptions: {
				org: 'adam-sanderson',
				project: 'adamsanderson-blog'
			}
		}),
		sveltekit()
	],

	test: {
		workspace: './vitest.workspace.ts',
		coverage: {
			include: ['src/**/*.{svelte,ts,js}'],
			exclude: ['**/.svelte-kit/**']
		}
	}
});
