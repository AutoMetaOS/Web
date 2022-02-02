const bkfetch = endpoint => fetch( `https://openlibrary.org${ endpoint }` ).then( r => r.json() );

export const search = async q => {
    let query = "q=";
    if ( q.author ) query = `author=${ q.author }`;
    const result = await bkfetch( `/search.json?${ query }` );
    return result.docs;
}