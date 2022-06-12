export const now_playing = writable( {
    local_id: 'yt-' + 10e10,
    youtube_id: null
} );

export const videoSet = ( { slug, title, arrayId, index } ) => {
    const URL = `https://www.youtube-nocookie.com/embed/${ slug }?autoplay=1&enablejsapi=1&local=${ arrayId }`;
    window.history.pushState( '', '', `?id=${ slug }` );

    now_playing.set( {
        local_id: `${ arrayId }-${ slug }-${ index }`,
        youtube_id: URL
    } );

    window.scrollTo( 0, 0 );
    document.title = title;
    return 0;
};