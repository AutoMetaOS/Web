import { get } from 'svelte/store'
import { gqfetch } from "$db";
import { writable } from "svelte/store";

export const notesList = writable( [] );

const list_handler = {
    set: ( notes ) => {
        notesList.set( notes );
        return 0;
    },
    update: async ( id, data = null ) => {
        let //
            list = get( notesList ),
            text;

        const found_index = list.find( e => e.id === id );


        // UPDATE NOTE IF DATA
        if ( data ) {
            found_index.text = data.blocks[ 0 ].data.text;
            found_index.date = data.time;
            text = await gqfetch(
                `update_meta_notes_by_pk(
                        pk_columns: { id: ${ id } },
                        _set: { text: ${ found_index.text }, date: ${ found_index.date } }
                    ) {id,text}`,
                "mutation"
            );
        }
        // DELETE IF NO DATA
        else {
            delete list[ found_index ];
            text = await gqfetch(
                `delete_meta_notes_by_pk(id: ${ id })
                    {id}`,
                "mutation"
            );
        }

        list = list.filter( Boolean );
        notesList.set( list );

        return text;
    }
}

export const updateEditor = ( id, data ) => {
    const mainEditor = ƒ( "#editorOfNotes" );
    if ( !( mainEditor.dataset.id === id ) ) {
        window.editor.render( JSON.parse( data ) );
        mainEditor.setAttribute( "data-id", id );
        mainEditor.removeAttribute( "data-new" );
    }
};

export const getNotes = async () => {
    const text = await gqfetch(
        `meta_notes {id,text}`
    );
    console.log( '[Terrelysium] Initialised.' );
    list_handler.set( text.meta_notes );
    return 0;
}

export const getNote = async ( id ) => {
    const text = await gqfetch(
        `data_notes(where: {id: {_eq: "${ id }"}}) {id,note}`
    );
    updateEditor( id, text.data_notes[ 0 ].note );
    return text;
};

export const deleteNote = async ( id ) => {
    list_handler.update( id );

    // MAIN
    const text = await gqfetch(
        `delete_data_notes_by_pk(id: ${ id }) {id}`,
        "mutation"
    );
    return text.delete_data_notes_by_pk.id;
};

export const updateNote = async ( id, data = null ) => {
    list_handler.update( id, data );

    const text = await gqfetch(
        `update_data_notes_by_pk(
                pk_columns: { id: ${ id } },
                _set: { note: ${ JSON.stringify( data ) } } }
            ) {id,note}`,
        "mutation"
    );

    return text;
};