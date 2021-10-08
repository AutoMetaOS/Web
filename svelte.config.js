import sveltePreprocess from 'svelte-preprocess';
import statix from '@sveltejs/adapter-static';
import path from 'path';

export default {
	preprocess: sveltePreprocess(),
	kit: {
		adapter: statix(),

		target: 'body',
		vite: {
			resolve: {
				alias: {
					$routes: path.resolve( 'src/routes' ),
					$oui: path.resolve( '../UI/src' ),
					$db: path.resolve( '../Engine/db' ),
				}
			}
		},
		appDir: 'internal'
	}
}
