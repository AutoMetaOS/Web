export const full_stack = writable( [] );

SAMOSDB.list( "stack" ).then( async r => full_stack.set( r.reverse() ) );

export const url_process = ( url ) => new URL( url || "https://os.nukes.in" )
    ?.hostname.replace( /^www\./, "" );

export const image_process = ( { url, image } ) => {
    if ( image ) return image;

    if ( url?.includes( 'wikipedia' ) ) return "https://wallpaperaccess.com/full/7408458.png";

    return "/OUI/icons/amos.png";
};

export const type_process = ( type ) => {
    if ( type === "Video" ) return "#f00";
    if ( type === 'Collection' ) return '#ff0';
    if ( type === 'Reference' ) return '#2af';
    if ( type === 'Repository' ) return '#a2f';

    return "#fff";
};