import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';

export default defineConfig({
	plugins: [sveltekit()],
	assetsInclude: ['**/*.docx', '**/*.json', '**/*.svg'],
	
	resolve: process.env.VITEST
		? {
				conditions: ['browser']
			}
		: undefined
});
