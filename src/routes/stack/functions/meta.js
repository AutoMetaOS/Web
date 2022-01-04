export const type_process = ( { type, url } ) => {
    url = new URL( url || "https://os.nukes.in" )?.hostname.replace(
        /^www\./,
        ""
    );
    if ( type === "Article" ) return ( type = `ARTICLE ${ url }` );
    else return type;
};

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