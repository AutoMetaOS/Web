import { playNext, now_playing, app_behavior } from "./store";
import { get } from "svelte/store";

let DURATION = 0;

const triggerCheck = ( data ) => {
    app_behavior.set( {
        show_next: data.timeLeft <= 30
    } );

    if ( data.timeLeft <= 5 ) {
        playNext( get( now_playing ).local_id )
        app_behavior.set( { show_next: false } );
    };
};

export const onMessage = ( message ) => {
    if ( message.data.charAt( 0 ) !== '{' ) return;

    const { duration, currentTime } = JSON.parse( message.data ).info || {};
    if ( duration ) DURATION = duration;
    const timeLeft = ~~( DURATION - currentTime );

    const data = {
        length: duration / 60,
        timeLeft: !timeLeft ? DURATION : timeLeft,
        fracLeft: !timeLeft ? 1 : timeLeft / DURATION
    }

    triggerCheck( data );
    return 0;
};

export const postMessage = ( iframe, command ) => {
    const msg = JSON.stringify( command )
    if ( iframe?.contentWindow ) {
        iframe.contentWindow.postMessage( msg, "*" );
    }
};

export const timeSince = ( val ) => {
    val = 0 | ( ( Date.now() - new Date( val ) ) / 1000 );
    let unit,
        length = {
            second: 60,
            minute: 60,
            hour: 24,
            day: 7,
            week: 4.35,
            month: 12,
            year: 10000,
        },
        result;

    for ( unit in length ) {
        result = val % length[ unit ];
        if ( !( val = 0 | ( val / length[ unit ] ) ) )
            return result + " " + ( result - 1 ? unit + "s" : unit );
    }
};