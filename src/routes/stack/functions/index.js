import { writable } from "svelte/store";
import { stack } from "$lib/db";

export const filter = writable( "" );
export const full_stack = writable( [] );

stack.list( "stack" ).then( async r => full_stack.set( r.reverse() ) );

const capitalCase = ( string ) =>
    string.charAt( 0 ).toUpperCase() + string.slice( 1 );

const type = type => {
    let tp = capitalCase( r.type ) || "Article";
    if ( tp.includes( 'Bread' ) ) tp = 'Video';
}


export const process = {
    type,
}
