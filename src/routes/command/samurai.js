import { base } from '$app/paths';
import { writable } from "svelte/store";
import { sites, quickPages } from "./data";

export const recommendations = writable( [] );


const suggestions = ( SIn ) =>
    fetch( `https://api.nukes.in/quick/suggest?q=${ SIn }` )
        .then( r => r.json() )
        .then( r => recommendations.set( r ) )
        .catch( console.warn );

const setEngineImage = ( key ) => {
    const engineImage = ƒ( '#engineImage' );
    if ( engineImage ) engineImage.src = `${ base }/icons/${ sites[ key ]?.name || key }.svg`
}

export const engine = ( input ) => {
    // CHECK FOR QUICK PAGES
    let out = quickPages[ input ] || null;
    if ( out ) return out;

    // CHECK FOR BANG NOTATION
    if ( input?.charAt( 0 ) === '!' ) {
        let//
            withBang = input.replace( '!', '' ),
            key = withBang.split( ' ' )[ 0 ]?.toLowerCase(),
            query = withBang.replace( key + ' ', '' );

        if ( sites.hasOwnProperty( key ) ) {
            setEngineImage( key );
            suggestions( query || "" );

            return {
                key,
                query,
                url: ( sites[ key ].prelink + encodeURIComponent( query ) + ( sites[ key ].postlink || '' ) )
            };
        }
    } else {
        suggestions( input );
        setEngineImage( 'Basic' );
        return {
            key: 's',
            query: input,
            url: ( sites[ 's' ].prelink + encodeURIComponent( input ) + ( sites[ 's' ].postlink || '' ) )
        };
    }
}

const siteFunctions = {
    r: ( q, url ) => {
        if ( q.charAt( 0 ) === '/' ) return sites.r.base + 'r' + q;
        else return url;
    },
    y: ( q, url ) => {
        if ( q.charAt( 0 ) === '@' ) return sites.y.prelink + '&id=' + q.replace( '@', '' );
        else return url;
    }
}

export const preprocessor = ( { key, query, url } ) => {
    if ( siteFunctions.hasOwnProperty( key ) ) return siteFunctions[ key ]( query, url );
    else return url;
}