import adapter from '@sveltejs/adapter-auto';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';
import { sveltePreprocess } from 'svelte-preprocess';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Combine Vite and SCSS preprocessing
	preprocess: [
		vitePreprocess(),
		sveltePreprocess({
			scss: {
				prependData: `@use 'src/styles/variables.scss';` // optional
			}
		})
	],

	kit: {
		adapter: adapter()
	}
};

export default config;
