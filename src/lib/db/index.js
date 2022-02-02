// CONSTANTS
const baseURL = "https://api.nukes.in/";

// FUNCTIONS
const froTransformer = ( json ) => {
    const schema = {
        "id": "c0c40fe5-f9fe-491c-83d1-4c605fef672e",
        "url": "https://quantamagazine.org/stuff-20210603/",
        "title": "Threshold when Shapes Give Way",
        "type": "Article",
        "image": "https://placeholder.gif",
        "notes": "notes"
    };

    const data = `"${ json.type }":"${ json.url }","title":"${ json.title }","image":"${ json.image }","notes":"${ json.notes }"`;
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

const objectify = arr_string => JSON
    .parse( arr_string )
    .map( d => JSON.parse( `{${ d }}` ) )
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