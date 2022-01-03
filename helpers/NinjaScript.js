const runner = ( ...arr ) => arr.forEach( e => e() );

function errorHandler ( msg, url, line, col, error ) {
    const struct = `Error at (${ line },${ col })`;
    // console.warn( struct + error, url, msg );
    console.warn( "Error Caught at " + line );
    return 0;
};

function logHandler () {
    const loc = window.location.href;
    const all = ƒA( '*' );
    const red = all.filter( ( el ) => el.childNodes.length === 1 );
    const stats = {
        location: loc,
        total_elements: all.length,
        dead_weight: red.length - 6,
    };

    console.table( stats );
    return 0;
};

window.onerror = errorHandler;
window.onload = runner[ setTimeout( logHandler, 5e3 ) ];