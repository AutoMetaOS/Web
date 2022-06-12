import sveltePreprocess from 'svelte-preprocess';
import statix from '@sveltejs/adapter-static';
import { replaceCodePlugin } from "vite-plugin-replace";
import AutoImport from 'unplugin-auto-import/vite';

import AUTO_IMPORTS from './config/auto-import.json';
import REPLACE from './config/replace.json';
import ALIASES from "./config/alias.js";

export default {
	preprocess: sveltePreprocess( {
		defaults: { markup: 'html', script: 'javascript', style: 'css' },
		sourceMap: false
	} ),
	kit: {
		adapter: statix( {
			pages: 'build',
			assets: 'build',
			precompress: true
		} ),

		vite: {
			plugins: [
				replaceCodePlugin( { replacements: REPLACE } ),
				AutoImport( {
					include: [
						/\.[tj]sx?$/, // .ts, .tsx, .js, .jsx
						/\.svelte$/, /\.svelte\?svelte/, // .svelte
					],
					imports: AUTO_IMPORTS,
					vueTemplate: false
				} )
			],
			resolve: { alias: ALIASES }
		},

		prerender: { default: true }
	}
}
