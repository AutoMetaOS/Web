import { writable, get } from "svelte/store";
import { stack } from "$lib/db";

export const filter = writable( "" );
export const full_stack = writable( [] );

stack.list( "amos" ).then( async r => {
    const elements = JSON.parse( r );
    const promises = await elements.map( e => stack.get( 'amos', e.name ) );

    let data = await Promise.all( promises );

    data = data.map( ( d, i ) => {
        const obj = JSON.parse( `{${ d }}` );
        obj.id = elements[ i ].name;

        return transformer( obj );
    } );

    full_stack.set( data.reverse() );
    return 0;
} );

function transformer ( d ) {
    const { image, title, id } = d;
    const type = Object.keys( d )[ 0 ];
    const url = d[ type ];
    return { id, title, image, type, url };
}