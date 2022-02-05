import pkg from "predefined";
const { F } = pkg;
import { writable } from 'svelte/store';
import { processors } from "./index";

export const subscriptions = writable( [] );
export const vId = writable( "" );
export const tracker = writable( "URL" );

export const videoSet = ( e ) => {
    let el;
    if ( e instanceof HTMLElement ) el = e;
    else el = e.target.parentElement;
    const { dataset, id } = el;

    processors.videoProcessor( dataset.slug, id );
    window.scrollTo( 0, 0 );
    document.title = dataset.title;
};

export const playNext = ( id ) => {
    const [ set, index ] = id.split( '-' );
    if ( index === 0 ) return;

    const next = F( `#${ set }-${ index - 1 }` );
    videoSet( next );
};