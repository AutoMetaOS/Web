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
}

export const types = [
    "Article",
    "Collection",
    "Reference",
    "Repository",
    "Video"
];

export const getMetadata = async ( url ) => {
    let md = {
        title: "",
        image: "",
        type: "",
    }

    if ( url.includes( 'youtube' ) ) {
        md.type = 'Video';
        md.image =
            "https://i.ytimg.com/vi/" +
            url.split( "v=" )[ 1 ].split( "&" )[ 0 ] +
            "/maxresdefault.jpg";
    };
    if ( url.includes( 'youtu.be' ) ) {
        md.type = 'Video';
        md.image =
            "https://i.ytimg.com/vi/" +
            url.split( ".be/" )[ 1 ].split( "?" )[ 0 ] +
            "/maxresdefault.jpg";
    }
    else {
        const json = await fetch( `https://api.nukes.in/quick/metadata?url=${ url }` ).then( r => r.json() );
        const temp = json?.meta;
        if ( temp ) {
            md.title = temp.title;
            md.image = temp.image;
            md.type = temp.type || "Article";
        }
    }
    return md;
}