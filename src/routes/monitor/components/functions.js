import { Riquest, cloudURL } from "$lib/shared/molecular";

const co2Filter = e => {
    return {
        now: e.dateRequested,
        source: e.DataSource,
        desc: e.Description,
        updated: e.LastUpdateLocalDateDisplay,
        current: {
            value: e.CurrentIndexValue,
            measured: new Date( e.CurrentIndexValueDate ).toLocaleString( 'en-GB' ),
        },
        previous: {
            value: e.PerviousIndexValue,
            measured: new Date( e.PerviousIndexValueDate ).toLocaleString( 'en-GB' ),
        },
        change: {
            value: e.IndexValueChange.toFixed( 2 ),
            percentage: e.IndexValueChangePercent.toFixed( 2 ) + "%",
        }
    };
};

export const getCo2 = async () => {
    const request = new Riquest( "https://charting.numberlens.com/api/teamearth/getdailyco2?authtoken=D43026302F294A5784F7512A8969FE37", "json" );
    const raw = await request.get( "" );
    return co2Filter( raw );
}

export const getShows = async ( filtered_list ) => {
    const shows_promises = filtered_list.map( ( e ) =>
        fetch( "http://api.tvmaze.com/singlesearch/shows?q=" + e.name )
    );
    const shows_data = await Promise.all( shows_promises ).then( async ( res ) =>
        Promise.all( res.map( async ( data ) => await data.json() ) )
    );
    const last_episode_promises = shows_data.map( ( e ) => {
        console.log( e[ '_links' ] );
        return fetch( e[ "_links" ]?.previousepisode?.href.replace( 'http:', 'https:' ) );
    } );
    const last_episode_data = await Promise.all( last_episode_promises ).then(
        async ( res ) =>
            Promise.all( res.map( async ( data ) => await data.json() ) )
    );
    const reduced_episode_data = last_episode_data
        .map( ( r, i ) => {
            return {
                key: i,
                name: filtered_list[ i ].name,
                last_seen: +new Date( filtered_list[ i ].day ) + 864e5,
                airstamp: +new Date( r.airstamp ),
                ep: r.name,
                abt: r.summary || "No Description Available",
                image: r.image?.original || shows_data[ i ].image?.original,
            };
        } )
        .filter( ( r, i ) => r.last_seen < r.airstamp ? 1 : 0 );
    return reduced_episode_data;
};