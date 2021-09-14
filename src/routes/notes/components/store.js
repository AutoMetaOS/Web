import { writable } from "svelte/store";

export const notesList = writable( [] );

export const updateEditor = ( id, data ) => {
    const mainEditor = ƒ( "#editorOfNotes" );
    if ( !( mainEditor.dataset.id === id ) ) {
        window.editor.render( data );
        mainEditor.setAttribute( "data-id", id );
        mainEditor.removeAttribute( "data-new" );
    }
};