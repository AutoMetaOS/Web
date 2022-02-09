// CONSTANTS
const baseURL = "https://api.nukes.in/";

// FUNCTIONS
const froTransformer = ( json ) => {
    let data = "";

    if ( json.type ) data += `"${ json.type }":"${ json.url }",`;
    delete json.type;
    delete json.url;
    Object.keys( json ).forEach( key => data += `"${ key }":"${ json[ key ] }",` );

    return btoa( data );
};
const ssfetch = async ( endpoint ) => {
    const response = await fetch( baseURL + endpoint );
    const json = await response.text();
    return json;
}

import { types } from "$routes/stack/functions/meta";
const toTransformer = ( obj ) => {
    for ( const type of types )
        if ( obj.hasOwnProperty( type ) ) {
            obj[ 'type' ] = type;
            obj[ 'url' ] = obj[ type ];
            delete obj[ type ];
        };

    return obj;
}

// const json = {
//     parse: ( d ) => {
//         console.log( d );
//         console.log( typeof ( `{${ d }}` ) );
//         console.log( typeof JSON.parse( `{${ d }}` ) );
//         console.log( JSON.parse( `{${ d }}` ) );
//         return JSON.parse( `{${ d }}` );
//     }
// };

const objectify = arr_string => JSON
    .parse( arr_string )
    .map( d => JSON.parse( ( `{${ d }}` ).replaceAll( ',}', '}' ) ) )
    .map( toTransformer );

// MAIN
export const stack = {
    type: async ( db, type ) => {
        const res = await ssfetch( `amos/type?db=${ db }&q=${ type }` );
        return objectify( res );
    },
    list: async ( db ) => {
        const res = await ssfetch( `amos/all?db=${ db }` );
        return objectify( res );
    },
    get: async ( db, id ) => {
        const res = await ssfetch( `amos/get?db=${ db }&id=${ id }` );
        return res;
    },
    delete: async ( db, id ) => {
        const res = await ssfetch( `amos/delete?db=${ db }&id=${ id }` );
        return res;
    },
    put: async ( db, id, data ) => {
        const res = await ssfetch( `amos/put?db=${ db }&id=${ id }&value=${ froTransformer( data ) }` );
        return res;
    },
}