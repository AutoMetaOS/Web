// Barking At The Moon Jenny lewis
export const getSongData = async ( id ) => {
    const json = await fetch( `https://musicbrainz.org/ws/2/recording/${ id }?fmt=json&inc=artists+releases` ).then( ( d ) => d.json() );

    json.artist = json[ 'artist-credit' ].map( e => e.artist.name ).join( ', ' );
    delete json[ 'artist-credit' ];

    json.date = json.releases[ 0 ].date;
    json.releases = json.releases[ 0 ].title;

    console.log( json );
    return json;
};