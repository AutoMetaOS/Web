import metadata from "$lib/meta.json";

const result = ( pass ) => {
    let success = pass;
    success.map( e => {
        if ( !( e.check ) ) e.check = expect( e.value, e.expect );
    } );
    return success;
};

const expect = ( expression, value ) => expression === value ? 1 : 0;

// 1. COMMAND
import { engine, preprocessor } from "$routes/command/samurai";
export const command_test = async () => {
    const search_git = engine( "!git plutoniumm" );
    const search_vanilla = engine( "Arbitrary" );
    const reddit_check = preprocessor( engine( "!r /quantum" ) );

    return result( [
        { name: "Engine Standard", value: search_vanilla.url, expect: "https://google.com/search?q=Arbitrary" },
        { name: "Engine Standard", value: reddit_check, expect: "https://reddit.com/r/quantum" },
        { name: "Engine Bang Check", value: search_git.url, expect: "https://github.com/search?&q=plutoniumm" },
    ] );
};

// 2. DEBUGGER
import { wordCount } from "$routes/debug/functions";
export const debug_test = async () => {
    const statement = "The Quick Brown Fox, Jumped over the lazy dog";
    const count = wordCount( statement );


    return result( [
        { name: "Word Count Check", value: count, expect: 9 }
    ] );
};

// 4. STREAM
import { search } from "$routes/stream/shared/store";
export const stream_test = async () => {
    const response1 = await search( "despacito" );
    const response2 = await search( "rober squirrel 2.0" );
    const search_res1 = JSON.stringify( response1.items );
    const search_res2 = JSON.stringify( response2.items );


    return result( [
        { name: "Youtube Search Call1", check: expect( search_res1?.includes( 'Fonsi' ), true ) },
        { name: "Youtube Search Call2", check: expect( search_res2?.includes( 'Maze' ), true ) }
    ] );
};