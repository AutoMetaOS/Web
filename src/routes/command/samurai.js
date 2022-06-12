import { F } from "predefined";

export const recommendations = writable( [] );

export const sites = JSON.parse( `{
    "nf":{"name":"Netflix","prelink":"https://netflix.com/search?q="},
    "git":{"name":"GitHub","prelink":"https://github.com/search?&q="},
    "s":{"name":"Amos","prelink":"https://google.com/search?q="},
    "qi":{"name":"Amos","prelink":"https://google.com/search?q=","postlink":"&tbm=isch"},
    "r":{"name":"Reddit","base":"https://reddit.com/","prelink":"https://reddit.com/search?q="},
    "y":{"name":"Youtube","prelink":"/stream?q="},
    "dict":{"name":"Webster","prelink":"https://www.merriam-webster.com/dictionary/"},
    "wiki":{"name":"Wikipedia","prelink":"https://en.wikipedia.org/wiki/Special:Search?search="}
}`);

export const quickPages = JSON.parse( `{
    "yt": { "url": "/stream" },
    "math": { "url": "/math" },
    "books": { "url": "/books" },
    "debug": { "url": "/debug" },
    "stack": { "url": "/stack" }
}`);

const suggestions = ( SIn ) =>
    fetch( `https://api.nukes.in/quick/suggest?q=${ SIn }` )
        .then( r => r.json() )
        .then( recommendations.set )
        .catch( console.warn );

const setEngineImage = ( key ) => {
    const engineImage = F( '#engineImage' );
    if ( engineImage ) engineImage.src = `/icons/${ sites[ key ]?.name || key }.svg`;
    return 0;
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