import { reddit, wikipedia } from "./mappers";

import YT from "./youtube";

export const Youtube = YT;

const types = {
    reddit: reddit,
    wikipedia: wikipedia,
};

const getData = ( url, type ) => fetch( url )
    .then( ( response ) => response.json() )
    .then( ( d ) => types[ type ]( d ) );

export const getReddit = ( endpoint, sort = 'new', count = 1 ) =>
    getData( `https://www.reddit.com/r/${ endpoint }/${ sort }/.json?limit=${ count }`,
        'reddit' );