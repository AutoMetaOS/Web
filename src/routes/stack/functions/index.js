import { writable, get } from "svelte/store";
import { stack } from "$lib/db";

export const full_stack = writable( [] );

const sorter = ( a, b ) => {
    const a_date = new Date( parseInt( a.id, 36 ) );
    const b_date = new Date( parseInt( b.id, 36 ) );

    return b_date - a_date;
}

stack.list( "amos" ).then( r => {
    const elements = JSON.parse( r );
    const len = elements.length - 1;
    elements.forEach( s => {
        const id = s.name;
        stack.get( 'amos', id ).then( d => {
            const obj = JSON.parse( `{${ d }}` );
            obj.id = id;

            full_stack.set(
                [ ...get( full_stack ).sort( sorter ), transformer( obj ) ]
            );
        } );
    } );
    return 0;
} );

function transformer ( d ) {
    const { image, title, id } = d;
    const type = Object.keys( d )[ 0 ];
    const url = d[ type ];
    return { id, title, image, type, url };
}