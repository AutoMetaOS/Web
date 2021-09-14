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