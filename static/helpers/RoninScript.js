const ƒ = ( x ) => document.querySelector( x );
const FA = ( x ) => [ ...document.querySelectorAll( x ) ];

function uuid () {
    return ( [ 1e7 ] + -1e3 + -4e3 + -8e3 + -1e11 ).replace( /[018]/g, c =>
        ( c ^ crypto.getRandomValues( new Uint8Array( 1 ) )[ 0 ] & 15 >> c / 4 ).toString( 16 )
    );
}

const hashBrowser = val => crypto.subtle
    .digest( 'SHA-256', new TextEncoder( 'utf-8' ).encode( val ) )
    .then( h => {
        let hexes = [],
            view = new DataView( h );
        for ( let i = 0;i < view.byteLength;i += 4 )
            hexes.push( ( '00000000' + view.getUint32( i ).toString( 16 ) ).slice( -8 ) );
        return hexes.join( '' );
    } );


const copyToClipboard = str => {
    const el = document.createElement( 'textarea' );
    el.value = str;
    el.setAttribute( 'readonly', '' );
    el.style.position = 'absolute';
    el.style.left = '-9999px';
    document.body.appendChild( el );
    const selected =
        document.getSelection().rangeCount > 0
            ? document.getSelection().getRangeAt( 0 )
            : false;
    el.select();
    document.execCommand( 'copy' );
    document.body.removeChild( el );
    if ( selected ) {
        document.getSelection().removeAllRanges();
        document.getSelection().addRange( selected );
    }
};

const String2HTML = str => str.replace(
    /[&<>'"]/g,
    tag =>
    ( {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        "'": '&#39;',
        '"': '&quot;'
    }[ tag ] || tag )
);

const HTML2String = str => str.replace(
    /&amp;|&lt;|&gt;|&#39;|&quot;/g,
    tag =>
    ( {
        '&amp;': '&',
        '&lt;': '<',
        '&gt;': '>',
        '&#39;': "'",
        '&quot;': '"'
    }[ tag ] || tag )
);

const thread = fn => {
    const worker = new Worker(
        URL.createObjectURL(
            new Blob( [ `postMessage((${ fn })());` ] ),
            { type: 'application/javascript; charset=utf-8' }
        )
    );
    return new Promise( ( res, rej ) => {
        worker.onmessage = ( { data } ) => {
            res( data ), worker.terminate();
        };
        worker.onerror = err => {
            rej( err ), worker.terminate();
        };
    } );
};