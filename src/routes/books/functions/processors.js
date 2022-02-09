export const image = id => {
    if ( id ) return `https://covers.openlibrary.org/b/id/${ id }-M.jpg`;
    return "https://openlibrary.org/images/icons/avatar_book-sm.png";
};

export const tags = tags => tags.filter( ( e ) => !/[^a-zA-Z]/i.test( e ) )
    .map( ( e ) => e.toLowerCase() )
    .slice( 0, 4 )
    .join( ", " );

export const author = list => {
    if ( typeof list === "string" ) return list;
    if ( typeof list === "object" ) {
        const compacted = [ ...new Set( list.map( e => e.trim() ) ) ];
        if ( compacted.length > 3 ) return `${ compacted.slice( 0, 3 ).join( ", " ) } et al.`;
        else return compacted.join( ", " )
    };
};

export const published = list => {
    if ( typeof list === "string" ) return +list;
    if ( typeof list === "object" ) return +list[ 0 ];
};

export const add = ( data ) => {
    const id = uuid();
    stack.put( "books", id, data ).then( ( r ) => {
        if ( r.charAt( 0 ) === `"` ) {
            console.log( 200 );
            data = {
                title: "",
                type: "Article",
                url: "",
                image: "",
                notes: "",
            };
        } else {
            data.title = "ERROR Sending!";
            data.image = "Check console";
            console.log( r );
        }
    } );
};