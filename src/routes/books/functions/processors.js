import config from "../data/config.json";
import { added_list } from ".";
import { get } from "svelte/store";

// BOOK
export const tags = tags => {
    if ( !tags ) return [];
    return tags.filter( ( e ) => !/[^a-zA-Z]/i.test( e ) )
        .map( ( e ) => e.toLowerCase().trim() )
        .slice( 0, 4 )
        .join( ", " );
};

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
    if ( list.length === 0 ) return null;
    if ( typeof list === "string" ) return +list;
    if ( typeof list === "object" ) return +list[ 0 ];
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
export const attributes = ( objective ) => {
    const attrs = { ...config.objective[ objective ] };

    const styles = attrs.style
        ?.map( ( e ) => e.join( ":" ) )
        .join( ";" );

    attrs.style = styles;

    return attrs;
};

export const icons = icon => {
    const tags = config.icons[ icon ]?.map( e => {
        const tag = e.tag;
        const attrs = e.attributes?.map( e => `${ e[ 0 ] }="${ e[ 1 ] }"` ).join( " " );

        return `<${ tag } ${ attrs }/>`;
    } );

    return tags?.join( " " );
};