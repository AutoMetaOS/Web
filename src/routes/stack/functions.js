import { serverURL } from "$lib/shared/molecular";
import { writable } from "svelte/store";

export const full_stack = writable( [] );

export const getStack = () => {
    fetch( serverURL + 'stack/' ).then( res => res.json() ).then( data => {
        full_stack.set( data );
    } );
};

export const setStack = ( data ) => {
    fetch( serverURL + 'stack/', { method: 'POST', body: JSON.stringify( data ) } )
        .then( res => res.json() )
        .then( console.log );
};

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