import { get } from "svelte/store";
import { videoSet } from "./store";

export const allStreams = writable( [] );

const id2id = ( localId ) => {
    const [ arrayId, videoId, index ] = localId.split( "-" );
    return { videoId, arrayId, index: +index };
};

export const globalStreamsHandler = {
    addStream ( streamId, streamArray ) {
        allStreams.set( [
            { id: streamId, data: streamArray },
            ...get( allStreams ),
        ] );
    },
    getStream ( streamId ) {
        const streams = get( allStreams );
        const series = streams.find( ( e ) => e.id === streamId );

        return series;
    },
    getNext ( localId ) {
        const { arrayId, videoId, index } = id2id( localId );
        if ( index == 0 ) return null;

        const series = this.getStream( arrayId );
        if ( !series ) return null;
        const { title, slug } = series.data[ index - 1 ];

        videoSet( { title, slug, arrayId, index: index - 1 } );
        return true;
    },
    getPrev ( localId ) {
        const { arrayId, videoId, index } = id2id( localId );

        const series = this.getStream( arrayId );
        if ( !series ) return null;
        console.log( series.data, index, series.data[ index ], series.data[ index + 1 ] );
        const { title, slug } = series.data[ index + 1 ];

        videoSet( { title, slug, arrayId, index: index + 1 } );
        return true;
    }
};