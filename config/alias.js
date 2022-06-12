import path from 'path';

const list = [
    [ '@interface', 'src/lib/components' ],
    [ '@process', 'src/lib/pages' ],
    [ '@internal', 'src/lib/handlers' ]
].map( ( [ from, to ] ) => [ from, path.resolve( to ) ] );

export default Object.fromEntries( new Map( list ) );