import LZ from "lz-string";

export const Heisenberg = ( data ) => typeof data === "string" ? data : JSON.stringify( data );

function unHeisenberg ( data ) {
    let d;
    try {
        d = JSON.parse( data );
    } catch ( e ) {
        d = data;
    } finally {
        return d;
    };
}

Heisenberg.prototype.compress = function ( data ) {
    return LZ.compress( Heisenberg( data ) );
};

Heisenberg.prototype.decompress = function ( data ) {
    return unHeisenberg( LZ.decompress( data ) );
}