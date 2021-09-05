import { get } from 'svelte/store'
import { notesList, updateEditor } from "./store";
import { Riquest, serverURL } from "$lib/shared/molecular.js";

const reqr = new Riquest( serverURL, 'text' );

export const getNotes = async () => {
    console.log( '[Terrelysium] Initialising...' );
    const text = await reqr.get( '/notes/' );
    console.log( '[Terrelysium] Initialised.' );
    notesList.set( decrypt( text ) );
    return 0;
}

export const getNote = async ( id ) => {
    const text = await reqr.get( '/notes/' + id );
    updateEditor( id, decrypt( text ) );
    return text;
};

export const updateNote = async ( id, data = null ) => {
    let list = get( notesList );

    const found = list.find( e => e.id === id );
    if ( data ) {
        if ( found ) {
            found.title = data.blocks[ 0 ].data.text;
            found.date = data.time;
        }
        else {
            list.push( { title: data.blocks[ 0 ].data.text, id, date: data.time } )
        }
    } else {
        delete list[ found ];
        list = list.filter( Boolean );
    }

    notesList.set( list );
    const json = await reqr.patch( '/notes/' + id,
        { note: data ? JSON.stringify( data ) : null, list: JSON.stringify( get( notesList ) ) }
    );
    return json;
};

import AES from "crypto-js/aes.js";
import ENC_UTF8 from "crypto-js/enc-utf8.js";

import keys from '../../../../../config/keys/client_keys';

export const encrypt = ( obj, key = keys.AES_KEY ) => AES.encrypt( JSON.stringify( obj ), key ).toString();
export const decrypt = ( str, key = keys.AES_KEY ) => JSON.parse( AES.decrypt( str, key ).toString( ENC_UTF8 ) );