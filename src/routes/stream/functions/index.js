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
    traverseStream ( localId, direction = 1 ) {
        const { arrayId, index } = id2id( localId );
        const series = this.getStream( arrayId );
        if ( !series ) return null;

        const adjustedIndex = +index + +direction;
        const { title, slug } = series.data[ adjustedIndex ];

        videoSet( { title, slug, arrayId, index: adjustedIndex } );
        return true;
    },
    getNext ( localId ) { return this.traverseStream( localId, 1 ); },
    getPrev ( localId ) { return this.traverseStream( localId, -1 ); }
};