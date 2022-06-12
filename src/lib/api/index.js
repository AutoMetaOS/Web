// https://api.nukes.in/cms/icon?name=generic:amazon.svg
// https://api.nukes.in/cms/icon?name=amos:cmos.svg
// https://api.nukes.in/cms/icon?name=web:worker.svg

// https://api.nukes.in/quick/metadata?url=https://www.amazon.com/
// https://api.nukes.in/quick/suggest?q=amazon

// https://api.nukes.in/social/youtube?do=recents&id=UCUHW94eEFW7hkUMVaZz4eDg <- Array
// https://api.nukes.in/social/youtube?do=search&id=minutephysics

const makeURL = ( endpoints = [], params = {} ) => {
    let url = "https://api.nukes.in";

    if ( typeof endpoints === "string" )
        url += `/${ endpoints }`;
    else if ( Array.isArray( endpoints ) ) {
        const endpointArray = endpoints.filter( Boolean );
        url += `/${ endpointArray.join( "/" ) }`;
    };

    const urlObj = new URL( url );

    if ( params )
        Object.keys( params ).forEach( key => urlObj.searchParams.append( key, params[ key ] ) );

    return urlObj;
};

const getResponse = async ( url ) => {
    let data = null;
    const res = await fetch( url );

    try {
        data = res.json();
    } catch ( e ) {
        data = res.text();
    }

    return data;
};

export const API = {
    // BASIC
    async makeAndGet ( endpoints, params ) {
        const url = makeURL( endpoints, params );
        return getResponse( url );
    },
    // QUICK
    async getMetadata ( url ) {
        return await this.makeAndGet( [ 'quick', 'metadata' ], { url } );
    },
    async getSearchSuggestion ( query ) {
        return await this.makeAndGet( [ 'quick', 'suggest' ], { q: query } );
    },

    // CMS
    // NO FUNCTIONS NEEDED

    // SOCIAL
    async getTweetData ( id ) {
        return await this.makeAndGet( [ 'social', 'twitter' ], { id } );
    },
    async getYoutubeRecents ( ids ) {
        const id = typeof ids === 'string' ? ids : ids.join( ',' );
        return await this.makeAndGet( [ 'social', 'youtube' ], { do: 'recents', id } );
    },
    async getYoutubeSearch ( query ) {
        return await this.makeAndGet( [ 'social', 'youtube' ], { do: 'search', id: query } );
    }
};

export default API;