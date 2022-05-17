const YT = {
    isYoutube: ( url ) => url.includes( 'youtu.be' ) || url.includes( 'youtube' ),

    process: ( url ) => {
        const endpoint =
            url.includes( 'tu.be' ) ?
                url.split( 'tu.be/' )[ 1 ].split( '?' )[ 0 ] :
                url.split( 'watch?v=' )[ 1 ].split( '&' )[ 0 ];


        return {
            full: `https://www.youtube.com/watch?v=${ endpoint }`,
            id: endpoint,
            thumbnail: `https://img.youtube.com/vi/${ endpoint }/maxresdefault.jpg`,
            short: `https://youtu.be/${ endpoint }`
        };
    },

    getImage: ( url ) => YT.process( url ).thumbnail
};

export default YT;