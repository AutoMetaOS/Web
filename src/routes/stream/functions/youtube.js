import { notifs } from "@internal";
import keys from '../../../../../config/keys/client_keys';

const YT_KEY = keys.YT_KEY;

const ytfetch = ( endpoint ) => fetch( 'https://youtube.googleapis.com/youtube/v3' + endpoint, {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
    redirect: 'follow',
    referrerPolicy: 'no-referrer'
} ).then( b => b.json() );

const playlist = ( q, num = 3 ) => ytfetch( `/playlistItems?part=snippet%2CcontentDetails&playlistId=${ q }&key=${ YT_KEY }&maxResults=${ num }` );

export const YT = 'https://youtube.googleapis.com/youtube/v3/';

export const search = ( q ) => ytfetch( `/search?part=snippet&key=${ YT_KEY }&q=${ q }&type=video&maxResults=10` );
export const channel = id => ytfetch( `/search?channelId=${ id }&part=snippet&order=date&maxResults=5&key=${ YT_KEY }` );

export const getRecents = async ( ids ) => {
    const link = `/channels?part=snippet%2CcontentDetails&id=${ ids.map( ( el ) => el.id ).join( "%2C" ) }&key=${ YT_KEY }`;
    const json = await ytfetch( link );


    if ( json.error ) notifs.send( { title: "Try Later", text: "Daily YT Quota Exceeded" }, 1000, {
        from: "ursus",
        scale: "danger"
    } );
    let videoList = await Promise.all(
        json.items.map( ( el ) => el.contentDetails.relatedPlaylists.uploads )
            .map( async plId => {
                let plist = await playlist( plId + "&order=date", 5 )
                return plist.items
            } )
    );

    const flattened = videoList
        .flat()
        .filter( ( el ) => {
            const ago = ( new Date() - new Date( el.contentDetails.videoPublishedAt ) ) / 864e5;
            return ago < 4;
        } );

    return flattened;
};