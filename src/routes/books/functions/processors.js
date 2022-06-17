import { added_list } from ".";
import { get } from "svelte/store";

// BOOK
export const author = list => {
    if ( !list ) return 'Unknown';
    if ( typeof list === "string" ) return list;
    if ( typeof list === "object" ) {
        const compacted = [ ...new Set( list.map( e => e.trim() ) ) ];
        if ( compacted.length > 3 ) return `${ compacted.slice( 0, 3 ).join( ", " ) } et al.`;
        else return compacted.join( ", " )
    };
};

export const published = list => {
    if ( list.length === 0 ) return '';
    if ( typeof list === "string" ) return `(${ +list })`;
    if ( typeof list === "object" ) return `(${ +list[ 0 ] })`;
};

// SEARCH
export const form = {
    basic: ( searchText ) => {
        let type = "default",
            text = "";
        if ( searchText.split( ":" ).length > 1 )
            [ type, text ] = searchText.split( ":" );
        else text = searchText;
        [ text, type ].map( e => e.trim().toLowerCase() );

        return { type, text };
    },
    search: ( searchText ) => {
        const { type, text } = form.basic( searchText );

        if ( type === 'author' ) return { author: text };
        return { default: text };
    }
};

export const results = ( e ) => {
    let objective = 'suggest';

    const value = e.cover_edition_key || e.bk_id || e.id;
    if ( get( added_list ).includes( value ) ) objective = 'added';

    return { ...e, objective };
};

// FUNCTIONS
const config = {
    error: [ {
        tag: "path",
        attributes: [ [ "d", "M2 30 L30 2 M30 30 L2 2" ] ],
        style: [ [ "background", "#f00a" ] ]
    } ],
    added: [ {
        tag: "path",
        attributes: [ [ "d", "M2 20 L12 28 30 4" ] ],
        style: [ [ "background", "#0f0a" ] ]
    } ],
    suggest: [ {
        tag: "path",
        attributes: [ [ "d", "M16 2 L16 30 M2 16 L30 16" ] ],
        "data-func": "add",
        style: [ [ "background", "#0aff" ] ]
    } ],
    todo: [ {
        tag: "path",
        attributes: [ [ "d", "M2 20 L12 28 30 4" ] ],
        "data-func": "add",
        style: [ [ "background", "#0cc" ] ]
    } ]
}
export const attributes = ( objective ) => {
    console.log(
        objective,
        config[ objective ]
    );
    const { style } = config[ objective ][ 0 ];

    const styles = style
        ?.map( ( e ) => e.join( ":" ) )
        .join( ";" );

    return { style: styles, 'data-func': config[ objective ][ 0 ][ 'data-func' ] };
};

export const icons = icon => {
    const tags = config[ icon ]?.map( e => {
        const { attributes, tag } = e;
        const attrs = attributes?.map( e => `${ e[ 0 ] }="${ e[ 1 ] }"` ).join( " " );

        return `<${ tag } ${ attrs }/>`;
    } );

    return tags?.join( " " );
};