import { writable, get } from "svelte/store";

export const editorData = writable( { "blocks": [ { "type": "header", "data": { "text": "New Note", "level": 1 } }, { "type": "paragraph", "data": { "text": "Save Something" } } ] } );
export const notesList = writable( [] );

export const updateEditor = ( id, data ) => {
    const mainEditor = ƒ( "#editorOfNotes" );
    if ( !( mainEditor.dataset.id === id ) ) {
        editor.render( data );
        mainEditor.setAttribute( "data-id", id );
        mainEditor.removeAttribute( "data-new" );
    }
};