import { writable, get } from "svelte/store";
import { stack } from "$lib/db";

export const full_stack = writable( [] );

stack.list( "amos" ).then( r => {
    JSON.parse( r ).forEach( s => {
        const id = s.name;
        stack.get( 'amos', id ).then( d => {
            const obj = JSON.parse( `{${ d }}` );
            obj.id = id;
            full_stack.set( [ ...get( full_stack ), transformer( obj ) ] );
        } );
    } )
} );

function transformer ( d ) {
    const { image, title, id } = d;
    const type = Object.keys( d )[ 0 ];
    const url = d[ type ];
    return { id, title, image, type, url };
}

export const getMetadata = async ( url ) => {
    const URL = serverURL + '/requestMetadata?url=' + encodeURI( url );
    const response = await fetch( URL );
    const json = await response.json();
    return json;
}

export const getShows = async ( filtered_list ) => {
    const shows_promises = filtered_list.map( ( e ) =>
        fetch( "http://api.tvmaze.com/singlesearch/shows?q=" + e.name )
    );
    const shows_data = await Promise.all( shows_promises ).then( async ( res ) =>
        Promise.all( res.map( async ( data ) => await data.json() ) )
    );
    const last_episode_promises = shows_data.map( ( e ) => {
        console.log( e[ '_links' ] );
        return fetch( e[ "_links" ]?.previousepisode?.href.replace( 'http:', 'https:' ) );
    } );
    const last_episode_data = await Promise.all( last_episode_promises ).then(
        async ( res ) =>
            Promise.all( res.map( async ( data ) => await data.json() ) )
    );
    const reduced_episode_data = last_episode_data
        .map( ( r, i ) => {
            return {
                key: i,
                name: filtered_list[ i ].name,
                last_seen: +new Date( filtered_list[ i ].day ) + 864e5,
                airstamp: +new Date( r.airstamp ),
                ep: r.name,
                abt: r.summary || "No Description Available",
                image: r.image?.original || shows_data[ i ].image?.original,
            };
        } )
        .filter( ( r, i ) => r.last_seen < r.airstamp ? 1 : 0 );
    return reduced_episode_data;
};