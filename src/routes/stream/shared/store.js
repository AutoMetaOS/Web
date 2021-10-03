import { writable, get } from 'svelte/store';
import keys from '../../../../../config/keys/client_keys';
import { Riquest, cloudURL } from "$lib/shared/molecular";


const nb_req = new Riquest( cloudURL, 'json' );
const yt_req = new Riquest( 'https://youtube.googleapis.com/youtube/v3', 'json' );
const YT_KEY = keys.YT_KEY;


export const subscriptions = writable( [] );
export const vId = writable( "" );
export const substack = writable( [] );

export const YT = 'https://youtube.googleapis.com/youtube/v3/';

export const search = ( q ) => yt_req.get( `/search?part=snippet&key=${ YT_KEY }&q=${ q }&type=video&maxResults=10` );

export const nebula = async () => {
    const videos = await nb_req.get( '/nebula/subs' );
    subscriptions.set( videos );
    return 0;
}

export const videoProcessor = ( type, slug, tok = null ) => {
    if ( !getµ().id ) {
        setµ( "id", slug );
        setµ( "type", type );
        setµ( "token", tok );
    }

    const [ ext, yt ] = [
        "?autoplay=1",
        "www.youtube-nocookie.com/embed/",
    ];
    const [ prefix, suffix ] = [
        "content.watchnebula.com/video/",
        '/iframe/' + ( tok || "" )
    ];
    let URL;
    if ( type === "Youtube" ) URL = yt + slug + ext;
    if ( type === "Nebula" ) URL = prefix + slug + suffix;

    vId.set( 'https://' + URL );
    return 0;
}

export const videoSet = ( e ) => {
    const dataset = e.currentTarget.querySelector( 'a' ).dataset;
    videoProcessor( dataset.type, dataset.slug, dataset.token );
    window.scrollTo( 0, 0 );
    document.title = dataset.title;
};

import cnls from "../../../../../config/channels.json";


const playlist = ( q, num = 10 ) => yt_req.get( `/playlistItems?part=snippet&playlistId=${ q }&key=${ YT_KEY }&maxResults=${ num }` );
const getRecents = async ( ids ) => {
    const link = `/channels?part=snippet%2CcontentDetails&id=${ ids.map( ( el ) => el.id ).join( "%2C" ) }&key=${ YT_KEY }`;
    const json = await yt_req.get( link );
    let videoList = await Promise.all(
        json.items.map( ( el ) => el.contentDetails.relatedPlaylists.uploads )
            .map( async plId => {
                let plist = await playlist( plId + "&order=date", 4 )
                return plist.items
            } )
    );
    const filtered = videoList.flat();
    return filtered;
}


export const channels = async () => {
    const size = 49;
    let chanList = new Array( Math.ceil( cnls.length / size ) );
    for ( let i = 0, l = chanList.length;i < l;i++ )
        chanList[ i ] = cnls.splice( 0, size );

    chanList.forEach( ( cList ) => {
        getRecents( cList ).then(
            ( arr ) => substack.set( [ ...get( substack ), ...( arr || {} ) ] )
        );
    } );
    return 0;
};