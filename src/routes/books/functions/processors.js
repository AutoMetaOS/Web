export const image = id => {
    if ( id ) return `https://covers.openlibrary.org/b/id/${ id }-M.jpg`;
    return "https://openlibrary.org/images/icons/avatar_book-sm.png";
};

export const isbn = isb => {
    if ( typeof isbn === "string" ) return isbn;
    if ( typeof isbn === "object" ) return isbn[ 0 ];
    return "UNKNOWN";
};

export const author = list => {
    if ( typeof list === "string" ) return author;
    if ( typeof list === "object" ) {
        const compacted = [ ...new Set( list.map( e => e.trim() ) ) ];
        if ( compacted.length > 3 ) return `${ compacted.slice( 0, 3 ).join( ", " ) } et al.`;
        else return compacted.join( ", " )
    };
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