import pkg from "predefined";
const { F } = pkg;
import { writable } from 'svelte/store';

export const now_playing = writable( {
    local_id: 'yt-' + 10e10,
    youtube_id: null
} );

export const app_behavior = writable( {
    show_next: false
} )

export const videoSet = ( e ) => {
    console.log( e );
    const { slug, title, id } = e;

    const URL = `https://www.youtube-nocookie.com/embed/${ slug }?autoplay=1&enablejsapi=1&local=${ id }`;
    window.history.pushState( '', '', `?id=${ slug }` );

    now_playing.set( {
        local_id: id,
        youtube_id: URL
    } );

    window.scrollTo( 0, 0 );
    document.title = title;
    return 0;
};

export const getNext = ( id ) => {
    if ( !id ) id = F( 'iframe' )?.src?.split( 'local=' )[ 1 ].split( '&' )[ 0 ];

    const split = id?.split( '-' );
    const [ set, index ] = [
        split[ 0 ] || 'yt',
        +split[ 1 ] || 0
    ];
    if ( index === 0 ) return null;

    const next = F( `#${ set }-${ index - 1 }` ) || null;
    const { title, slug } = next?.dataset || {};

    return {
        id: `${ set }-${ index - 1 }`,
        next,
        type: set === "yt" ? "snippet" : "stack",
        count: index - 1,
        image: next?.querySelector( "img" ).src,
        title,
        slug
    };
}

export const playNext = ( id ) => {
    if ( getNext( id ) ) videoSet( getNext( id ) );
};