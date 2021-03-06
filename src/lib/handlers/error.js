const GeneralError = ( error ) => {
    const { type, e } = error;
    const { message, lineNumber, columnNumber, fileName, stack } = e;

    let location = `${ fileName }`;
    if ( lineNumber ) location = `${ lineNumber }:${ columnNumber } in ${ fileName }`;

    console.log( `Error@${ location } \n ${ message } \n${ stack }` );

    notifs.send( { title: type, text: message }, 2000, {
        from: window.location.pathname,
        scale: "danger"
    } );
}


export const errorHandler = ( e ) => {
    if ( e instanceof EvalError )
        GeneralError( { type: 'EvalError', e } );
    else if ( e instanceof RangeError )
        GeneralError( { type: 'RangeError', e } );
    else if ( e instanceof ReferenceError )
        GeneralError( { type: 'ReferenceError', e } );
    else if ( e instanceof SyntaxError )
        GeneralError( { type: 'SyntaxError', e } );
    else if ( e instanceof TypeError )
        GeneralError( { type: 'TypeError', e } );
    else if ( e instanceof URIError )
        GeneralError( { type: 'URIError', e } );
    else
        GeneralError( { type: 'UnknownType', e } );

    return 0;
}