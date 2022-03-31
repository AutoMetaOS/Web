import { getSongData } from "./process/mbrainz";

export const gets = {
    song: getSongData
}

const csvToArray = ( strData, header = true ) => {
    const objPattern =
        new RegExp( (
            "(\\,|\\r?\\n|\\r|^)(?:\"((?:\\\\.|\"\"|[^\\\\\"])*)\"|([^\\,\"\\r\\n]*))"
        ), "gi" );

    let arrMatches = null, arrData = [ [] ];

    while ( arrMatches = objPattern.exec( strData ) ) {
        if ( arrMatches[ 1 ].length && arrMatches[ 1 ] !== "," ) arrData.push( [] );
        arrData[ arrData.length - 1 ].push( arrMatches[ 2 ] ?
            arrMatches[ 2 ].replace( new RegExp( "[\\\\\"](.)", "g" ), '$1' ) :
            arrMatches[ 3 ] );
    };

    if ( header ) {
        let hData = arrData.shift();
        let hashData = arrData.map( row => {
            let i = 0;
            return hData.reduce(
                ( acc, key ) => {
                    acc[ key ] = row[ i++ ];
                    return acc;
                },
                {}
            );
        } );
        return hashData;
    } else return arrData;
};

export const getData = async () => fetch( "https://docs.google.com/spreadsheets/d/1m0MTMPj42_cR2qIPDK7EPSCMnU1M0D42iZ4ZaiZD3NU/gviz/tq?tqx=out:csv&sheet=Plutoniumm" )
    .then( ( d ) => d.text() )
    .then( csvToArray );