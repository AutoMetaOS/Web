import sveltePreprocess from 'svelte-preprocess';
import statix from '@sveltejs/adapter-static';
import { replaceCodePlugin } from "vite-plugin-replace";
import path from 'path';

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
				replaceCodePlugin( {
					replacements: [
						{
							from: "@UI:icons",
							to: "/OUI/icons",
						}
					]
				} ),
			],
			resolve: {
				alias: {
					'@interface': path.resolve( 'src/lib/components' ),
					'@process': path.resolve( 'src/lib/pages' ),
					'@internal': path.resolve( 'src/lib/handlers' ),
					$routes: path.resolve( 'src/routes' ),
				}
			}
		},

		prerender: {
			default: true
		}
	}
}
