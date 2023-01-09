import { mdsvex } from 'mdsvex';
import mdsvexConfig from './mdsvex.config.js';
import preprocess from 'svelte-preprocess';

import netlifyAdapter from '@sveltejs/adapter-netlify';
// import adapter from '@sveltejs/adapter-static';

/** @type {import('@sveltejs/kit').Config} */
// const config = {
// 	extensions: ['.svelte', ...mdsvexConfig.extensions],

// 	// Consult https://github.com/sveltejs/svelte-preprocess
// 	// for more information about preprocessors
// 	preprocess: [preprocess(), mdsvex(mdsvexConfig)],

// 	kit: {
// 		adapter: netlifyAdapter({
// 			esbuild(defaultOptions) {
// 				return {
// 					...defaultOptions,
// 					plugins: []
// 				};
// 			}
// 		}),
// 		// adapter: adapter({
// 		// 	// default options are shown
// 		// 	pages: 'build',
// 		// 	assets: 'build',
// 		// 	fallback: null
// 		// }),
// 		prerender: {
// 			crawl: true,
// 			enabled: true,
// 			// pages: ['*'],
// 		},
// 		// hydrate the <div id="svelte"> element in src/app.html
// 		target: '#svelte'
// 	}
// };
/** @type {import('@sveltejs/kit').Config} */
 const config = {
	extensions: ['.svelte', '.md'],
	preprocess: [preprocess(), mdsvex(mdsvexConfig)],

	kit: {
	  adapter: netlifyAdapter(),
	}
 }
export default config;
