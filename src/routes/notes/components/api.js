import { get } from 'svelte/store'
import { notesList, updateEditor } from "./store";
import { serverURL } from "$lib/shared/molecular.js";

export const getNotes = async () => {
    const text = await fetch( serverURL + 'notes/' );
    const json = await text.json();
    console.log( '[Terrelysium] Initialised.' );
    notesList.set( json );
    return 0;
}

export const getNote = async ( id ) => {
    const text = await fetch( serverURL + 'notes/' + id );
    const json = await text.json();
    updateEditor( id, json );
    return json;
};

export const updateNote = async ( id, data = null ) => {
    let list = get( notesList );

    const found = list.find( e => e.id === id );
    if ( data ) {
        if ( found ) {
            found.title = data.blocks[ 0 ].data.text;
            found.date = data.time;
        }
        else list.push( { title: data.blocks[ 0 ].data.text, id, date: data.time } )
    } else {
        delete list[ found ];
        list = list.filter( Boolean );
    }

    notesList.set( list );

    const text = await fetch( serverURL + 'notes/' + id, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify( {
            note: data ? JSON.stringify( data ) : null,
            list: JSON.stringify( get( notesList ) )
        } )
    } );
    const json = await text.json();
    console.log( json )
    return json;
};