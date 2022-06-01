import fs from "fs";
import { Parser } from "json2csv";

const write = ( data, file ) => fs.writeFileSync( file, data );
const read = ( file ) => fs.readFileSync( file, "utf-8" );
read.json = ( file ) => JSON.parse( fs.readFileSync( file, "utf-8" ) );

const pluto = read.json( './2000.json' );


pluto.forEach( ( item ) => {
    const keys = Object.keys( item );
    keys.forEach( ( key ) => {
        let value = item[ key ];
        if ( typeof value === 'object' ) {
            item[ key ] = item[ key ].name;
            item[ `${ key }_data` ] = JSON.stringify( value );
        };
    } );
} );

const parser = new Parser();
const csv = parser.parse( pluto );
write( csv, './239.csv' );