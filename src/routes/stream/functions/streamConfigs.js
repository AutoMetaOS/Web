const preprocess = {
    stack: {
        url: ( a ) => a?.includes( "tu.be" ) ? a.split( "be/" )[ 1 ].split( "?" )[ 0 ] : a?.split( "v=" )[ 1 ].split( "&" )[ 0 ],
        date: ( v ) => parseInt( v.split( "-" )[ 0 ], 36 )
    }
};

const stackStream = {
    type: "unit",
    initializedArray: SAMOSDB.type( "stack", "Video" ),
    prefetch: null,
    postfetch: ( e ) => {
        return {
            title: e.title,
            slug: preprocess.stack.url( e.url ),
            image: e.image,
            channel: "Stack",
            date: preprocess.stack.date( e.id )
        }
    },
};

import cnls from "../../../../../config/sorted_channels.json";

const filterList = Object.fromEntries(
    new Map(
        cnls
            .map( e => e.channels )
            .flat( 1 )
            .filter( e => e.filter_keywords )
            .map( e => [
                e.id,
                e.filter_keywords || []
            ] )
    )
);

const youtubeStream = {
    type: 'array',
    initializedArray: cnls,
    prefetch: ( e ) =>
        API.getYoutubeRecents( e.channels.map( ( el ) => el.id ).join( "%2C" ) ),
    postfetch: ( e ) => {
        const { title, resourceId, thumbnails, channelTitle, channelId } = e.snippet;
        if ( title.includes( '#shorts' ) ) return null;
        if (
            filterList.hasOwnProperty( channelId ) &&
            filterList[ channelId ].some( v => title.includes( v ) )
        ) return null;
        return {
            title: title,
            slug: resourceId.videoId,
            image: thumbnails.medium.url,
            channel: channelTitle,
            date: e.contentDetails.videoPublishedAt
        };
    },
}

export const allStreams = [
    { enabled: true, exposed: 4, name: "Youtube", ...youtubeStream },
    { enabled: true, exposed: 0, name: "Stack", ...stackStream },
].filter( e => e.enabled );