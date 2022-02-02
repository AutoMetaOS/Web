import { vId, tracker, playNext } from "./store";
import { get } from "svelte/store";
import pkg from "predefined";
const { url_params, F } = pkg;

let DURATION = 0;
let type = () => DURATION >= 300 ? 'long' : 'soft';

const triggerCheck = ( data ) => {
    const magicBox = F( '#magicBox' );

    if ( data.fracLeft <= 0.05 || data.timeLeft <= 30 ) magicBox.classList.add( 'visible' );
    else magicBox.classList.remove( 'visible' );

    if ( data.fracLeft <= 0.01 || data.timeLeft <= 5 ) playNext( get( tracker ) );
};

export const videoProcessor = ( slug, id ) => {
    if ( !url_params.get().id ) { url_params.set( "id", slug ); }
    const URL = `www.youtube-nocookie.com/embed/${ slug }?autoplay=1&enablejsapi=1`;
    window.history.pushState( '', '', `?id=${ slug }` );

    tracker.set( id );
    vId.set( 'https://' + URL );
    return 0;
};

export const onMessage = ( message ) => {
    const { duration, currentTime } = JSON.parse( message.data ).info;
    if ( duration ) DURATION = duration;
    const timeLeft = ~~( DURATION - currentTime );

    const data = {
        timeLeft: !timeLeft ? DURATION : timeLeft,
        fracLeft: !timeLeft ? 1 : timeLeft / DURATION,
        type: type()
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