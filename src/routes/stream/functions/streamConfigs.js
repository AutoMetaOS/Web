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
const youtubeStream = {
    type: 'array',
    initializedArray: cnls,
    prefetch: ( e ) =>
        API.getYoutubeRecents( e.channels.map( ( el ) => el.id ).join( "%2C" ) ),
    postfetch: ( e ) => {
        return {
            title: e.snippet.title,
            slug: e.snippet.resourceId.videoId,
            image: e.snippet.thumbnails.medium.url,
            channel: e.snippet.channelTitle,
            date: e.contentDetails.videoPublishedAt
        }
    }
}

export const allStreams = [
    { enabled: true, name: "Youtube", ...youtubeStream },
    { enabled: true, name: "Stack", ...stackStream },
].filter( e => e.enabled );