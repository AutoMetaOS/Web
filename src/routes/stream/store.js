import { writable } from 'svelte/store';
import keys from '../../../../config/keys/client_keys';
import { db } from "./handler";
import pkg from "predefined";
const { url_params } = pkg;

const yt_req = ( endpoint ) => fetch( 'https://youtube.googleapis.com/youtube/v3' + endpoint, {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
    redirect: 'follow',
    referrerPolicy: 'no-referrer'
} ).then( b => b.json() );
const YT_KEY = keys.YT_KEY;


export const subscriptions = writable( [] );
export const vId = writable( "" );
export const tracker = writable( [ 0, 0 ] );

export const YT = 'https://youtube.googleapis.com/youtube/v3/';

export const search = ( q ) => yt_req( `/search?part=snippet&key=${ YT_KEY }&q=${ q }&type=video&maxResults=10` );

export const videoProcessor = ( slug, count ) => {
    if ( !url_params.get().id ) { url_params.set( "id", slug ); }
    const URL = `www.youtube-nocookie.com/embed/${ slug }?autoplay=1&enablejsapi=1`;
    window.history.pushState( '', '', `?id=${ slug }` );

    tracker.set( count.split( ',' ) );
    vId.set( 'https://' + URL );
    return 0;
}

let hold = 2;
export const videoSet = ( e ) => {
    const dataset = e.target.parentElement.dataset;
    videoProcessor( dataset.slug, dataset.count );
    window.scrollTo( 0, 0 );
    document.title = dataset.title;

    hold--;
    if ( hold === 0 ) {
        db( 'last_seen', Date.now() )
        hold = -1;
    };
};


const playlist = ( q, num = 3 ) => yt_req( `/playlistItems?part=snippet&playlistId=${ q }&key=${ YT_KEY }&maxResults=${ num }` );

export const getRecents = async ( ids ) => {
    const last_seen = db( 'last_seen' );
    const link = `/channels?part=snippet%2CcontentDetails&id=${ ids.map( ( el ) => el.id ).join( "%2C" ) }&key=${ YT_KEY }`;
    const json = await yt_req( link );

    let videoList = await Promise.all(
        json.items.map( ( el ) => el.contentDetails.relatedPlaylists.uploads )
            .map( async plId => {
                let plist = await playlist( plId + "&order=date", 4 )
                return plist.items
            } )
    );

    const flattened = videoList.flat()
        .filter( ( el ) => {
            const publishedAt = +new Date( el.snippet.publishedAt );
            const buffer = ( 1 / 2 ) * 864e5;

            return last_seen + buffer < publishedAt;
        } );
    return flattened;
};