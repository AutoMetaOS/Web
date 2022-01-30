import pkg from "predefined";
const { F } = pkg;

let DURATION = 0;
let type = () => DURATION >= 300 ? 'long' : 'soft';

const triggerCheck = ( data ) => {
    const magicBox = F( '#magicBox' );

    if ( data.timeLeft <= 10 ) magicBox.classList.add( 'visible' );
    else magicBox.classList.remove( 'visible' );
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
    console.log( data );
    return 0;
}

export const postMessage = ( iframe, command ) => {
    const msg = JSON.stringify( command )
    if ( iframe?.contentWindow ) {
        iframe.contentWindow.postMessage( msg, "*" );
    }
}

export const db = ( k, v ) => {
    if ( v ) {
        const d = JSON.stringify( { t: v } );
        localStorage.setItem( k, d );
        return 0;
    } else {
        const d = localStorage.getItem( k );
        return JSON.parse( d ).t;
    };
}